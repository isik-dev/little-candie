import moment from "moment";
import { getFilters } from "./filters";
import { getExpenses, sortExpenses } from "./expenses";

// Generate new DOM 'p' for each new expense
const generateDOM = (expense) => {
  const expenseEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // Setup expense text
  if (expense.title.length > 0) {
    textEl.textContent = expense.title;
  } else {
    textEl.textContent = "amount not entered";
  }
};
