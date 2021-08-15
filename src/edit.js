const myfuncs = require("./functions");
const apifuncs = require("./api-functions");

const removeExpensesDB = apifuncs.removeExpensesDB;
const initializedEditPageDB = myfuncs.initializedEditPageDB;
const updateExpensesDB = apifuncs.updateExpensesDB;

// Query selectors from my edit.html
const amountElement = document.querySelector("#amountD");
const descriptionElement = document.querySelector("#descriptionD");
const submitEl = document.querySelector("#submitD");
const removeElement = document.querySelector("#removeD");

// take a hold of noteID & uniqueToken --> unique uuid coming from index.js
const noteID = location.hash.substring(1);
const uniqueToken = localStorage.getItem("user");

const editP = async () => {
  await initializedEditPageDB(noteID);
};

editP();

let amount;
let description;

// appending the amount property of the expense object
amountElement.addEventListener("input", (e) => {
  amount = e.target.value;
});

// appending the description property of the expense object
descriptionElement.addEventListener("input", (e) => {
  description = e.target.value;
});

// redirecting to the render page when submit button is pressed
submitEl.addEventListener("click", async (e) => {
  await updateExpensesDB(noteID, {
    amount: amount,
    description: description,
  });
  location.assign(`render.html#${uniqueToken}`);
});

// remove an object and redirect to home page
removeElement.addEventListener("click", async (e) => {
  await removeExpensesDB(noteID);
  location.assign(`render.html#${uniqueToken}`);
});
