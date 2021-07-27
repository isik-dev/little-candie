import { createExpense } from "./expenses";
import { renderExpenses } from "./view";

renderExpenses();

document.querySelector("#submitButton").addEventListener("click", (e) => {
  const id = createExpense();
  location.assign(`/edit.html#${id}`);
});
