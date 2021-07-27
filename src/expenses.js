import uuidv4 from "uuid/v4";

// Iniatializing expenses array.
let expenses = [];

// get saved expenses from the local storage
const loadExpenses = () => {
  const expensesJSON = localStorage.getItem("expenses");
  try {
    return expensesJSON ? JSON.parse(expensesJSON) : [];
  } catch (e) {
    return [];
  }
};

// save expenses into the local storage
const saveExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

// expose expense from module
const getExpenses = () => expenses;

// addExpense function: take 2 arguments, appends into the expenses array. Does not return anything
const createExpense = () => {
  const id = uuidv4();
  expenses.push({
    id: id,
    amount: "",
    description: "",
  });
  saveExpenses(expenses);
  return id;
};

// remove expense from the list
const removeExpense = (id) => {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);
  if (expenseIndex > -1) {
    expenses.splice(expenseIndex, 1);
    saveExpenses(expenses);
  }
};

// update expenses
const updateExpense = (id, updates) => {
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
  saveExpenses(expenses);
  return expense;
};

expenses = loadExpenses();

export { getExpenses, createExpense, updateExpense, removeExpense };
