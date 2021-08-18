////////////////// -------------- API Requests -------------- ////////////////////
const { url: base_url } = require("../env");

// GET david's password from the database
const getPasswordD = async () => {
  const response = await fetch(`${base_url}/loginpageget`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const result = await response.json();

    return result[0].passwordD;
  } catch (error) {
    console.log("err", error);
  }
};

// GET justin's password from the database
const getPasswordJ = async () => {
  const response = await fetch(`${base_url}/loginpageget`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const result = await response.json();

    return result[0].passwordJ;
  } catch (error) {
    console.log("err", error);
  }
};

//////////////////////////// ------------- Session / MongoDB ------------ ///////////////////////////////

// createSessionDB: does not take argument, just sends a request to the backend
const updateSessionDB = async (id, updates) => {
  const result = await fetch(`${base_url}/session/updateSessionDB`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      updates,
    }),
  });
};

// renderCurrentSessionDB: sends a get request to the DB and brings the latest session from there
const renderCurrentSessionDB = async () => {
  const result = await fetch(`${base_url}/session/renderCurrentSessionDB`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      davidComplete: false,
      justinComplete: false,
      sessionComplete: false,
    }),
  });
  const sessionDB = await result.json();
  return sessionDB;
};

//////////////////////////// ------------- Expenses / MongoDB ------------ ///////////////////////////////

// load data from the database
const loadExpensesDB = async () => {
  const response = await fetch(`${base_url}/expenses/getexp`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const result = await response.json();

    return result;
  } catch (error) {
    localStorage.setItem("err", error.toString());
    console.log("err", error);
  }
};

// push a new object into the expenses array
const createExpenseDB = async (amount, description, user) => {
  const sessionDB = await renderCurrentSessionDB();
  const currentSessionID = sessionDB._id;

  const result = await fetch(`${base_url}/expenses/createExpense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionID: currentSessionID,
      amount: amount,
      description: description,
      user: user,
    }),
  });

  const data = await result.json();

  return data;
};

// getSortedExpenses: sort expenses by latest
const getSortedExpensesDB = async () => {
  const expenses = await loadExpensesDB();
  return expenses.sort((a, b) => {
    if (a.updatedAt > b.updatedAt) {
      return -1;
    } else if (a.updatedAt < b.updatedAt) {
      return 1;
    } else {
      return 0;
    }
  });
};

const updateExpensesDB = async (id, updates) => {
  const result = await fetch(`${base_url}/expenses/updateExp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      updates,
    }),
  });
};

const removeExpensesDB = async (id) => {
  const result = await fetch(`${base_url}/expenses/removeExp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
};

module.exports = {
  getPasswordJ,
  getPasswordD,
  renderCurrentSessionDB,
  createExpenseDB,
  loadExpensesDB,
  getSortedExpensesDB,
  updateExpensesDB,
  removeExpensesDB,
  updateSessionDB,
};
