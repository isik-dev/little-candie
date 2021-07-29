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
  expenses.push({
    id: id,
    amount: "",
    description: "",
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

expenses = loadExpenses();

//////////////////////////////////////////////////////////
export {
  loadExpenses,
  saveExpenses,
  getExpenses,
  createExpense,
  updateExpenses,
};
