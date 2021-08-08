const myfuncs = require("./functions");
const updateExpenses = myfuncs.updateExpenses;
const removeExpense = myfuncs.removeExpense;
const initializedEditPage = myfuncs.initializedEditPage;

// Query selectors from my edit.html
const amountElement = document.querySelector("#amountD");
const descriptionElement = document.querySelector("#descriptionD");
const submitEl = document.querySelector("#submitD");
const removeElement = document.querySelector("#removeD");

// take a hold of noteID & uniqueToken --> unique uuid coming from index.js
const noteID = location.hash.substring(1);
const uniqueToken = localStorage.getItem("user");

// setting initial values if there are
initializedEditPage(noteID);

// appending the amount property of the expense object
amountElement.addEventListener("input", (e) => {
  updateExpenses(noteID, {
    amount: e.target.value,
  });
});

// appending the description property of the expense object
descriptionElement.addEventListener("input", (e) => {
  updateExpenses(noteID, {
    description: e.target.value,
  });
});

// redirecting to the render page when submit button is pressed
submitEl.addEventListener("click", (e) => {
  location.assign(`render.html#${uniqueToken}`);
});

// remove an object and redirect to home page
removeElement.addEventListener("click", (e) => {
  removeExpense(noteID);
  location.assign(`render.html#${uniqueToken}`);
});
