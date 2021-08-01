import { v4 as uuidv4 } from "uuid";

// generate an empty expenses array
let expenses = [];

// load data from the local storage
const loadExpenses = () => {
  const expensesJSON = localStorage.getItem("expenses");
  try {
    return expensesJSON ? JSON.parse(expensesJSON) : [];
  } catch (e) {
    return [];
  }
};

// save expenses into the local storage
const saveExpenses = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

// expose notes from module
const getExpenses = () => expenses;

// push a new object into the expenses array
const createExpense = () => {
  const id = uuidv4();
  const getUser = localStorage.getItem("user");
  console.log("getUser", getUser);
  expenses.push({
    id: id,
    amount: "",
    description: "",
    user: getUser,
  });
  saveExpenses();
  return id;
};

// update function for an individual expense
const updateExpenses = (id, updates) => {
  const expense = expenses.find((expense) => expense.id === id);

  if (!expense) {
    return;
  }

  if (typeof updates.amount === "string") {
    expense.amount = updates.amount;
  }

  if (typeof updates.description === "string") {
    expense.description = updates.description;
  }

  saveExpenses();
  return expense;
};

// remove function for an individual expense
const removeExpense = (id) => {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);
  if (expenseIndex > -1) {
    expenses.splice(expenseIndex, 1);
    saveExpenses();
  }
};

expenses = loadExpenses();

//////////////////////////////////////////////////////////

// generate the DOM structure for each expense
const generateDOM = (expense) => {
  const expenseEl = document.createElement("a");
  const amountEl = document.createElement("p");
  const descriptionEl = document.createElement("p");

  // add classes to generated tags
  expenseEl.classList.add("expense-a-tag");
  amountEl.classList.add("expense-p-tag");
  descriptionEl.classList.add("expense-p-tag");

  // setup the expense amount text
  if (expense.amount.length > 0) {
    amountEl.textContent = expense.amount;
  } else {
    amountEl.textContent = "Amount Not Given";
  }
  amountEl.classList.add("list-item__title");
  expenseEl.appendChild(amountEl);

  // setup the link
  expenseEl.setAttribute("href", `edit.html#${expense.id}`);
  expenseEl.classList.add("list-item");

  // setup the description
  if (expense.description.length > 0) {
    descriptionEl.textContent = expense.description;
  } else {
    descriptionEl.textContent = "Description Not Given";
  }
  descriptionEl.classList.add("list-item__subtitle");
  expenseEl.appendChild(descriptionEl);

  return expenseEl;
};

// render application expenses
const renderExpense = (uniqueToken) => {
  let expensesElDavid;
  let expensesElJustin;
  if (uniqueToken) {
    expensesElDavid = document.querySelector("#expenses");

    expensesElJustin = document.querySelector("#expensesJ");
  } else {
    alert("wrong password");
  }

  // Depending on the user id enable/disable click on expense divs
  if (uniqueToken === "david") {
    expensesElJustin.style.pointerEvents = "none";
  } else if (uniqueToken === "justin") {
    expensesElDavid.style.pointerEvents = "none";
  }

  const expenses = getExpenses();

  // sort expenses by user
  const { justinExpenses, davidExpenses } = sortExpensesByUser();

  if (davidExpenses.length > 0) {
    davidExpenses.forEach((davidExpenses) => {
      const expenseElDavid = generateDOM(davidExpenses);

      expensesElDavid.appendChild(expenseElDavid);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No expenses to show";
    emptyMessage.classList.add("empty-message");
    expensesElDavid.appendChild(emptyMessage);
  }
  if (justinExpenses.length > 0) {
    justinExpenses.forEach((justinExpenses) => {
      const expenseElJustin = generateDOM(justinExpenses);
      expensesElJustin.appendChild(expenseElJustin);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No expenses to show";
    emptyMessage.classList.add("empty-message");
    expensesElJustin.appendChild(emptyMessage);
  }
};

// initializedEditPage function
const initializedEditPage = (id) => {
  const amountEl = document.querySelector("#amountD");
  const descriptionEl = document.querySelector("#descriptionD");
  expenses = getExpenses();
  const expense = expenses.find((expense) => expense.id === id);

  if (!expense) {
    location.assign("/index.html");
  }

  amountEl.value = expense.amount;
  descriptionEl.value = expense.description;
};

// format currency
const formatCurr = (v) => {
  const fmtCurr = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
  return fmtCurr.format(v);
};

const sortExpensesByUser = () => {
  const o = { davidExpenses: [], justinExpenses: [] };
  expenses.forEach((e) => {
    if (e.user === "david") {
      o.davidExpenses.push(e);
    } else o.justinExpenses.push(e);
  });
  return o;
};
//////////////////////////////////////////////////////////
export {
  loadExpenses,
  saveExpenses,
  getExpenses,
  createExpense,
  updateExpenses,
  removeExpense,
  renderExpense,
  generateDOM,
  initializedEditPage,
  formatCurr,
};
