import { updateExpenses } from "./functions";

// Query selectors from my edit.html
const amountElement = document.querySelector("#amountD");
const descriptionElement = document.querySelector("#descriptionD");

// take a hold of noteID --> unique uuid coming from index.js
const noteID = location.hash.substring(1);

amountElement.addEventListener("input", (e) => {
  updateExpenses(noteID, {
    amount: e.target.value,
  });
});

descriptionElement.addEventListener("input", (e) => {
  updateExpenses(noteID, {
    description: e.target.value,
  });
});
