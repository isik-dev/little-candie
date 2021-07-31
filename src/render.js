import { createExpense, renderExpense } from "./functions";

// Getting uniqueToken
const uniqueToken = localStorage.getItem("user");

renderExpense(uniqueToken);
console.log("you are in the render page");

// listen for the add button, sign out button for both users
const addElement = document.querySelector("#renderaddD");
const addElementJ = document.querySelector("#renderaddJ");
const signoutElement = document.querySelector("#renderoutD");
const signoutElementJ = document.querySelector("#renderoutJ");

// initially disabling all the buttons
addElement.disabled = true;
signoutElement.disabled = true;
addElementJ.disabled = true;
signoutElementJ.disabled = true;

// Based on the users, enable the buttons

if (uniqueToken === "david") {
  // Add Button Functionality --- David
  addElement.disabled = false;
  addElement.addEventListener("click", (e) => {
    const expenseID = createExpense();
    location.assign(`edit.html#${expenseID}`);
  });

  // Sign out Button Functionality --- David
  signoutElement.disabled = false;
  signoutElement.addEventListener("click", (e) => {
    location.assign(`index.html`);
  });
} else {
  // Add Button Functionality --- Justin
  addElementJ.disabled = false;
  addElementJ.addEventListener("click", (e) => {
    const expenseID = createExpense();
    location.assign(`edit.html#${expenseID}`);
  });

  // Sign out Button Functionality --- Justin
  signoutElementJ.disabled = false;
  signoutElementJ.addEventListener("click", (e) => {
    location.assign("index.html");
  });
}
