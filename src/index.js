console.log("index.js is runnig");

// checking if the checkbox is checked
const checkedD = document.querySelector("#checkboxD");
let checkboxChecked;
checkedD.addEventListener("change", (e) => {
  checkboxChecked = e.target.value;
});

// saving password input value inside passwordValue
const passwordD = document.querySelector("#passwordD");
let passwordValue;
passwordD.addEventListener("change", (e) => {
  passwordValue = e.target.value;
});

// Submit button
const submitD = document.querySelector("#submitD");
submitD.addEventListener("click", (e) => {
  if (checkboxChecked && passwordValue === "password") {
    console.log("we can go to the next page");
  }
});
