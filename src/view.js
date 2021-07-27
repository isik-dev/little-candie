import { getExpenses } from "./expenses";

// Generate new DOM 'p' for each new expense
const generateDOM = (expense) => {
  const expenseEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // Setup expense text
  if (expense.amount.length > 0) {
    textEl.textContent = expense.amount;
  } else {
    textEl.textContent = "amount not entered";
  }
  textEl.classList.add("list-item__title");
  expenseEl.appendChild(textEl);

  // Setup the link
  expenseEl.setAttribute("href", `/edit.html#${expense.id}`);
  expenseEl.classList.add("list-item");
};

// Render expenses
const renderExpenses = () => {
  const expenseEl = document.querySelector("#expenses");
  const expenses = getExpenses();

  expenseEl.innerHTML = "";

  if (expenses.length > 0) {
    expenses.forEach((expense) => {
      expenseEl.appendChild(generateDOM(expense));
    });
  } else {
    const emptyEl = document.createElement("p");
    emptyEl.textContent = "No expenses to show";
    emptyEl.classList.add("empty-message");
    expenseEl.appendChild(emptyEl);
  }
};

export { generateDOM, renderExpenses };
