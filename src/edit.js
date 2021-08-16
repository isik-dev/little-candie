// Things to fix:
// There should be two ways we can access this page:
// 1. Through clicking on an addElement button in the render page, here we are creating a new expense object.
// 2. Through clicking on an individual expense div, here we are updating an existing object.

const myfuncs = require("./functions");
const apifuncs = require("./api-functions");

const removeExpensesDB = apifuncs.removeExpensesDB;
const initializedEditPageDB = myfuncs.initializedEditPageDB;
const updateExpensesDB = apifuncs.updateExpensesDB;
const createExpenseDB = apifuncs.createExpenseDB;

// Query selectors from my edit.html
const amountElement = document.querySelector("#amountD");
const descriptionElement = document.querySelector("#descriptionD");
const submitEl = document.querySelector("#submitD");
const removeElement = document.querySelector("#removeD");

// take a hold of noteID & uniqueToken --> unique uuid coming from index.js

const editP = async () => {
  const uniqueToken = localStorage.getItem("user");
  let amount;
  let description;
  const noteID = location.hash.substring(1);

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
    if (noteID.length === 0) {
      await createExpenseDB(amount, description, uniqueToken);
      location.assign(`render.html#${uniqueToken}`);
    } else {
      await updateExpensesDB(noteID, {
        amount,
        description,
      });
      location.assign(`render.html#${uniqueToken}`);
    }
  });
  // remove an object and redirect to home page
  removeElement.addEventListener("click", async (e) => {
    if (noteID.length === 0) {
      location.assign(`render.html#${uniqueToken}`);
    } else {
      await removeExpensesDB(noteID, console.log(noteID));
      location.assign(`render.html#${uniqueToken}`);
    }
  });
};

editP();
