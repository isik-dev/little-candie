////////////////// -------------- API Requests -------------- ///////////////////
const { url: base_url } = require("../env");
console.log("THIS IS BASE URL", base_url);
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
    console.log(result);
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
    console.log(result);
    return result[0].passwordJ;
  } catch (error) {
    console.log("err", error);
  }
};

//////////////////////////// ------------- Session / MongoDB ------------ ///////////////////////////////

// initialize the session
let sessionDB = {};

// getSessionDB: exposes a current session object
const getSessionDB = () => sessionDB;

// saveSessionDB: takes the current session and sends it to the backend
const saveSessionDB = async () => {
  await fetch(`${base_url}/session/saveSessionDB`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sessionDB),
  });
};

// saveSessionDB();

// createSessionDB: does not take argument, just sends a request to the backend
const createSessionDB = async () => {
  const result = await fetch(`${base_url}/session/createSessionDB`, {
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
  const data = await result.json();
  return data;
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

let expensesDB = {};

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
    console.log("sdslldlsldd", result);
    return result;
  } catch (error) {
    localStorage.setItem("err", error.toString());
    console.log("err", error);
  }
};

// save expenses into the database
const saveExpensesDB = async () => {
  const rawResponse = await fetch(`${base_url}/getexp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expensesDB),
  });
  const content = await rawResponse.json();

  console.log(content);
};

// getExpenseDB exposes expenses
const getExpenseDB = () => expensesDB;

//////////////////////////////////////////////////////////////////////////
// push a new object into the expenses array
const createExpenseDB = async () => {
  const sessionDB = await renderCurrentSessionDB();
  console.log("this is sesssionDD", sessionDB);
  const currentSessionID = sessionDB._id;
  const getUser = localStorage.getItem("user");

  const result = await fetch(`${base_url}/expenses/createExpense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionID: currentSessionID,
      amount: "",
      description: "",
      user: getUser,
    }),
  });

  const data = await result.json();
  console.log("this is createExpense", data);
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

const removeExpensesDB = (id) => {
  const result = fetch(`${base_url}/expenses/removeExp`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
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
};
