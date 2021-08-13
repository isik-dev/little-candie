////////////////// -------------- API Requests -------------- ///////////////////

// GET david's password from the database
const getPasswordD = async () => {
  const response = await fetch("http://localhost:3080/loginpageget", {
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
  const response = await fetch("http://localhost:3080/loginpageget", {
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
  await fetch("http://localhost:3080/session/saveSessionDB", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sessionDB),
  });
};

// saveSessionDB();

// createSessionDB: does not take argument, just sends a request to the backend
const createSessionDB = async () => {
  const result = await fetch("http://localhost:3080/session/createSessionDB", {
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
  const result = await fetch(
    "http://localhost:3080/session/renderCurrentSessionDB",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        davidComplete: false,
        justinComplete: false,
        sessionComplete: false,
      }),
    }
  );
  const sessionDB = await result.json();
  return sessionDB;
};

//////////////////////////// ------------- Expenses / MongoDB ------------ ///////////////////////////////

let expensesDB = {};

// load data from the database
const loadExpensesDB = async () => {
  const response = await fetch("http://localhost:3080/getexp", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  try {
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("err", error);
  }
};

// save expenses into the database
const saveExpensesDB = async () => {
  const rawResponse = await fetch("http://localhost:3080/getexp", {
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
  const sessionDB = await renderCurrentSessionDB(); // new line of code
  const currentSessionID = sessionDB._id;
  const getUser = localStorage.getItem("user");

  const result = await fetch("http://localhost:3080/expenses/createExpense", {
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
  return data;
};

createExpenseDB();

module.exports = {
  getPasswordJ,
  getPasswordD,
  renderCurrentSessionDB,
};
