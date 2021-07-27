import { updateExpense } from "./expenses";

console.log("testing edit page");

const amountBox = document.querySelector("#amountTextbox");
const descriptionBox = document.querySelector("#descriptionTextbox");

const expenseID = location.hash.substring(1);
console.log(expenseID);

amountBox.addEventListener("input", (e) => {
  const expense = updateExpense(expenseID, {
    amount: e.target.value,
  });
});

descriptionBox.addEventListener("input", (e) => {
  const expense = updateExpense(expenseID, {
    description: e.target.value,
  });
});

window.addEventListener("storage", () => {
  // When local storage changes, dump the list to
  // the console.
  console.log(JSON.parse(window.localStorage.getItem("expenses")));
});
