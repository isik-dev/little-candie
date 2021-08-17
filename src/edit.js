// Functions from the api functions folder
const apifuncs = require("./api-functions");
const removeExpensesDB = apifuncs.removeExpensesDB;
const updateExpensesDB = apifuncs.updateExpensesDB;
const createExpenseDB = apifuncs.createExpenseDB;

// Query selectors from my edit.html
const amountElement = document.querySelector("#amountD");
const descriptionElement = document.querySelector("#descriptionD");
const submitEl = document.querySelector("#submitD");
const removeElement = document.querySelector("#removeD");

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
      await removeExpensesDB(noteID);
      location.assign(`render.html#${uniqueToken}`);
    }
  });
};

editP();
