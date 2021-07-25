import moment from "moment";
import { v4 as uuidv4 } from "uuid";

console.log("testing");

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
  const timestamp = moment().valueOf();
  expenses.push({
    id: id,
    amount: 0,
    description: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveExpenses();
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

// sort expense by one of two ways
const sortExpenses = (sortBy) => {
  if (sortBy === "byEdited") {
    return expenses.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return expenses.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return expenses;
  }
};

// update expenses
const updateExpense = (id, updates) => {
  const expense = expenses.find((expense) => expense.id === id);
  if (!expense) {
    return;
  }
  if (typeof expense.amount === "number") {
    expense.amount = updates.amount;
    expense.updatedAt = moment().valueOf();
  }
  if (typeof expense.description === "string") {
    expense.description = updates.description;
    expense.updatedAt = moment().valueOf();
  }
  saveExpenses(expenses);
  return expense;
};

expenses = loadExpenses();

// calculateTotal: does not take any arguments, returns total amount
const calculateTotal = () => {
  let total = 0;
  expenses.forEach((value) => {
    total += value.amount;
  });
  return total;
};

const now = moment().valueOf();
console.log(now);
