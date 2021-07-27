import { createExpense } from "./expenses";

document.querySelector("#submitButton").addEventListener("click", (e) => {
  const id = createExpense();
  location.assign(`/edit.html#${id}`);
});
