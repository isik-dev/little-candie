// if you have any suggestion of questions, pleasse feel free to send me an email to chiholiu10@gmail.com
const { url: base_url } = require("../env");
const getData = new Promise((res, rej) => {
  const parser = new URL(window.location);
  const pageQueryParam = parser.searchParams.get("page");

  const response = fetch(
    `${base_url}/history/${pageQueryParam ? pageQueryParam : 1}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    if (response.status < 400) {
      res(response.json());
    }
  });
});
const totalD = document.querySelector("#totalD");
const totalJ = document.querySelector("#totalJ");
const differenceD = document.querySelector("#differenceD");
const differenceJ = document.querySelector("#differenceJ");
(function () {
  "use strict";

  function Pagination(dataSession, totalCount) {
    let objJson = [
      { adName: "adName 1" },
      { adName: "adName 2" },
      { adName: "adName 3" },
      { adName: "adName 4" },
      { adName: "adName 5" },
      { adName: "adName 6" },
      { adName: "adName 7" },
      { adName: "adName 8" },
      { adName: "adName 9" },
      { adName: "adName 10" },
      { adName: "adName 11" },
      { adName: "adName 12" },
      { adName: "adName 13" },
      { adName: "adName 14" },
      { adName: "adName 15" },
      { adName: "adName 16" },
    ];

    const prevButton = document.getElementById("button_prev");
    const nextButton = document.getElementById("button_next");
    const clickPageNumber = document.querySelectorAll(".clickPageNumber");
    const parser = new URL(window.location);
    const _current_page = parser.searchParams.get("page");
    let current_page = _current_page ? _current_page : 1;
    let records_per_page = 1;

    this.init = function () {
      changePage(1);
      pageNumbers();
      selectedPage();
      clickPage();
      addEventListeners();
    };

    let addEventListeners = function () {
      prevButton.addEventListener("click", prevPage);
      nextButton.addEventListener("click", nextPage);
    };

    let selectedPage = function () {
      let page_number = document
        .getElementById("page_number")
        .getElementsByClassName("clickPageNumber");
      for (let i = 0; i < page_number.length; i++) {
        if (i == current_page - 1) {
          page_number[i].style.opacity = "1.0";
        } else {
          page_number[i].style.opacity = "0.5";
        }
      }
    };

    let checkButtonOpacity = function () {
      current_page == 1
        ? prevButton.classList.add("opacity")
        : prevButton.classList.remove("opacity");
      current_page == numPages()
        ? nextButton.classList.add("opacity")
        : nextButton.classList.remove("opacity");
    };

    let changePage = function (page) {
      const listingTable = document.getElementById("listingTable");

      if (page < 1) {
        page = 1;
      }
      if (page > numPages() - 1) {
        page = numPages();
      }

      listingTable.innerHTML = "";

      for (
        var i = (page - 1) * records_per_page;
        i < page * records_per_page && i < objJson.length;
        i++
      ) {
        listingTable.innerHTML +=
          "<div class='objectBlock'>" + objJson[i].adName + "</div>";
      }
      checkButtonOpacity();
      selectedPage();
    };

    let prevPage = function () {
      if (current_page > 1) {
        new URL(window.location);
        ``;
        parser.searchParams.set("page", Number(current_page) - 1);
        window.location = parser.href;
      }
    };

    let nextPage = function () {
      if (current_page < numPages()) {
        new URL(window.location);
        parser.searchParams.set("page", Number(current_page) + 1);
        window.location = parser.href;
      }
    };

    let clickPage = function () {
      document.addEventListener("click", function (e) {
        if (
          e.target.nodeName == "SPAN" &&
          e.target.classList.contains("clickPageNumber")
        ) {
          let page_togo = e.target.textContent;
          parser.searchParams.set("page", page_togo);
          window.location = parser.href;
        }
      });
    };

    let pageNumbers = function () {
      let pageNumber = document.getElementById("page_number");
      pageNumber.innerHTML = "";

      for (let i = 1; i < numPages() + 1; i++) {
        pageNumber.innerHTML +=
          "<span class='clickPageNumber'>" + i + "</span>";
      }
    };

    let numPages = function () {
      return totalCount; // Math.ceil(objJson.length / records_per_page);
    };
  }
  getData.then((data) => {
    let pagination = new Pagination(data.sessions[0], data.totalCount);
    pagination.init();
  });
})();
