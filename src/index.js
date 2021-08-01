import { renderTotInd, reconciliation } from "./functions";

console.log("index.js is runnig");
// querySelectors for index.html
const checkedD = document.querySelector("#checkboxD");
const checkedJ = document.querySelector("#checkboxJ");
const passwordD = document.querySelector("#passwordD");
const passwordJ = document.querySelector("#passwordJ");
const submitD = document.querySelector("#submitD");
const submitJ = document.querySelector("#submitJ");
const totalD = document.querySelector("#totalD");
const totalJ = document.querySelector("#totalJ");

// Checkbox Functionality --- David
let checkboxCheckedD;
checkedD.addEventListener("change", (e) => {
  checkboxCheckedD = e.target.value;
  e.target.value = false;
});

// Checkbox Functionality --- Justin
let checkboxCheckedJ;
checkedJ.addEventListener("change", (e) => {
  checkboxCheckedJ = e.target.value;
  e.target.value = false;
});

// Password Functionality --- David
let passwordValueD;
passwordD.addEventListener("change", (e) => {
  passwordValueD = e.target.value;
});

// Password Functionality --- Justin
let passwordValueJ;
passwordJ.addEventListener("change", (e) => {
  passwordValueJ = e.target.value;
});

// Submit Button Functionality --- Justin
submitD.addEventListener("click", (e) => {
  if (checkboxCheckedD && passwordValueD.toLowerCase() === "123") {
    localStorage.setItem("user", "david");
    location.assign(`render.html`);
  } else alert("incorrect password, sucka or checkbox, no?");
});

// Submit Functionality --- Justin
submitJ.addEventListener("click", (e) => {
  if (checkboxCheckedJ && passwordValueJ.toLowerCase() === "321") {
    localStorage.setItem("user", "justin");
    location.assign(`render.html`);
  } else alert("incorrect password, sucka or checkbox, no?");
});

// renderTotInd --- both Justin and David
const davidTotExp = renderTotInd("david");
const justinTotExp = renderTotInd("justin");

totalD.textContent = `₩ ${davidTotExp}`;
totalJ.textContent = `₩ ${justinTotExp}`;

reconciliation();
