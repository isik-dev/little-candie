const apifuncs = require("./api-functions");
const renderCurrentSessionDB = apifuncs.renderCurrentSessionDB;
const loadExpensesDB = apifuncs.loadExpensesDB;
const getSortedExpensesDB = apifuncs.getSortedExpensesDB;
const updateSessionDB = apifuncs.updateSessionDB;

/////////////////////-----------Everything related to Expenses Array------------////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////

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
    amountEl.textContent = `${formatCurr(expense.amount)}`;
  } else {
    amountEl.textContent = "Amount Not Given";
  }
  amountEl.classList.add("list-item__title");
  expenseEl.appendChild(amountEl);

  // setup the link
  expenseEl.setAttribute("href", `edit.html#${expense._id}`);
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

// renderExpenseDB
// render application expenses
const renderExpenseDB = async (uniqueToken) => {
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

  const expensesDB = await getSortedExpensesDB();

  // sort expenses by user
  const { justinExpenses, davidExpenses } = await sortExpensesByUserDB();

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

// sorteExpensesByUserDB function
const sortExpensesByUserDB = async () => {
  const o = { davidExpenses: [], justinExpenses: [] };
  const expensesDB = await loadExpensesDB();
  expensesDB.forEach((e) => {
    if (e.user === "david") {
      o.davidExpenses.push(e);
    } else o.justinExpenses.push(e);
  });
  return o;
};

// getCurrentTotal: checks the current session id and for all expenses that include current session id for a given argument {user} returns total.
// getCurrentTotalDB function
const getCurrentTotalDB = async (userToken) => {
  const sessionDB = await renderCurrentSessionDB();
  const currentSessionID = sessionDB._id;

  const expensesDB = await loadExpensesDB();
  let totalUserExpense = 0;

  expensesDB.forEach((expense) => {
    if (expense.sessionID === currentSessionID && expense.user === userToken) {
      totalUserExpense += parseInt(expense.amount);
    } else {
      return totalUserExpense;
    }
  });

  return totalUserExpense;
};

// format currency
const formatCurr = (v) => {
  const fmtCurr = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
  return fmtCurr.format(v);
};

///////////////////////////////////////////// --------- Difference Functions --------- ///////////////////////////////////////////////////////////////
// calculateDifference
const calculateDifference = (a, b) => {
  if (a > b) {
    return a - b;
  } else if (a < b) {
    return b - a;
  } else {
    return 0;
  }
};

/////////////////////////////////////////// ----------- Reconciliation Functions ------------- //////////////////////////////////////////////////////////////

// reconcileBalanceD: reconciles david's balance
const reconcileBalanceD = async () => {
  const currentSession = await renderCurrentSessionDB();

  const id = currentSession._id;
  let davidComplete;
  let justinComplete;
  let sessionComplete;

  if (!currentSession.justinComplete) {
    davidComplete = true;
    justinComplete = false;
    sessionComplete = false;
    updateSessionDB(id, { davidComplete, justinComplete, sessionComplete });
  } else if (currentSession.justinComplete) {
    // currentSession.davidComplete = true;
    // currentSession.sessionComplete = true;
    davidComplete = true;
    justinComplete = true;
    sessionComplete = true;
    updateSessionDB(id, { davidComplete, justinComplete, sessionComplete });
    renderCurrentSessionDB();
  }
};

// reconcileBalanceJ: reconciles justin's balance
const reconcileBalanceJ = async () => {
  const currentSession = await renderCurrentSessionDB();

  const id = currentSession._id;
  let davidComplete;
  let justinComplete;
  let sessionComplete;

  if (!currentSession.davidComplete) {
    davidComplete = false;
    justinComplete = true;
    sessionComplete = false;
    updateSessionDB(id, { davidComplete, justinComplete, sessionComplete });
  } else if (currentSession.davidComplete) {
    // currentSession.davidComplete = true;
    // currentSession.sessionComplete = true;
    davidComplete = true;
    justinComplete = true;
    sessionComplete = true;
    updateSessionDB(id, { davidComplete, justinComplete, sessionComplete });
    renderCurrentSessionDB();
  }
};

/////////////////////////////////////////////////////////
module.exports = {
  formatCurr,
  calculateDifference,
  reconcileBalanceD,
  reconcileBalanceJ,
  renderExpenseDB,
  getCurrentTotalDB,
};
