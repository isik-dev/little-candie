import { v4 as uuidv4 } from "uuid";
import moment from "moment";

console.log("index.js is runnig");

// checking if the checkbox is checked
const checkedD = document.querySelector("#checkboxD");
let checkboxChecked;
checkedD.addEventListener("change", (e) => {
  checkboxChecked = e.target.value;
  e.target.value = false;
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
  if (checkboxChecked && passwordValue.toLowerCase() === "123") {
    console.log("we can go to the next page");
    location.assign(`edit.html`);
  }
});

// generate an empty expenses array
let expenses = [];

// load data from the local storage
const loadExpenses = () => {
  const expensesJSON = localStorage.getItem("expenses");
  try {
    return expensesJSON ? JSON.parse(expensesJSON) : [];
  } catch (e) {
    return [];
  }
};

// save expenses into the local storage
const saveExpenses = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

// expose notes from module
const getExpenses = () => expenses;

// push a new object into the expenses array
const createExpense = () => {
  const id = uuidv4();
  expenses.push({
    id: id,
    amount: "",
    description: "",
  });
  saveExpenses();
  return id;
};
