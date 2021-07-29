import { createExpense, renderExpense } from "./functions";

renderExpense();
console.log("you are in the render page");

// listen for the add button, sign out button for both users
const addElement = document.querySelector("#renderaddD");
const addElementJ = document.querySelector("#renderaddJ");
const signoutElement = document.querySelector("#renderoutD");
const signoutElementJ = document.querySelector("#renderoutJ");

// Add Button Functionality --- David
addElement.addEventListener("click", (e) => {
  const expenseID = createExpense();
  location.assign(`edit.html#${expenseID}`);
});

// Add Button Functionality --- Justin
addElementJ.addEventListener("click", (e) => {
  const expenseID = createExpense();
  location.assign(`edit.html#${expenseID}`);
});

// Sign out Button Functionality --- David
signoutElement.addEventListener("click", (e) => {
  location.assign(`index.html`);
});

// Sign out Button Functionality --- Justin
signoutElementJ.addEventListener("click", (e) => {
  location.assign("index.html");
});
