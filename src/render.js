import {
  createExpense,
  renderExpense,
  renderSession,
  formatCurr,
  getDifference,
  renderTotInd,
  getSession,
  updateSession,
  saveSession,
} from "./functions";

// Getting uniqueToken
const uniqueToken = localStorage.getItem("user");

// render current session
renderSession();

renderExpense(uniqueToken);
console.log("you are in the render page");

// listen for the add button, sign out button for both users
const addElement = document.querySelector("#renderaddD");
const addElementJ = document.querySelector("#renderaddJ");
const signoutElement = document.querySelector("#renderoutD");
const signoutElementJ = document.querySelector("#renderoutJ");
const reconcileD = document.querySelector("#resetD");
const reconcileJ = document.querySelector("#resetJ");

// initially disabling all the buttons
addElement.disabled = true;
signoutElement.disabled = true;
addElementJ.disabled = true;
signoutElementJ.disabled = true;
reconcileD.disabled = true;
reconcileJ.disabled = true;

// Based on the users, enable the buttons

if (uniqueToken === "david") {
  // Add Button Functionality --- David
  addElement.disabled = false;
  addElement.addEventListener("click", (e) => {
    const expenseID = createExpense();
    location.assign(`edit.html#${expenseID}`);
  });

  // Sign out Button Functionality --- David
  signoutElement.disabled = false;
  signoutElement.addEventListener("click", (e) => {
    location.assign(`index.html`);
  });
} else {
  // Add Button Functionality --- Justin
  addElementJ.disabled = false;
  addElementJ.addEventListener("click", (e) => {
    const expenseID = createExpense();
    location.assign(`edit.html#${expenseID}`);
  });

  // Sign out Button Functionality --- Justin
  signoutElementJ.disabled = false;
  signoutElementJ.addEventListener("click", (e) => {
    location.assign("index.html");
  });
}

// renderTotInd --- both Justin and David
const davidTotExp = renderTotInd("david");
const justinTotExp = renderTotInd("justin");

totalD.textContent = `${formatCurr(davidTotExp)}`;
totalJ.textContent = `${formatCurr(justinTotExp)}`;

// renderDifference --- both Justin and David

const renderDifference = () => {
  const difference = getDifference();

  if (davidTotExp > justinTotExp) {
    differenceD.textContent = `${formatCurr(difference)}`;
    differenceJ.textContent = `- ${formatCurr(difference)}`;
  } else if (davidTotExp < justinTotExp) {
    differenceJ.textContent = `${formatCurr(difference)}`;
    differenceD.textContent = `- ${formatCurr(difference)}`;
  } else {
    differenceD.textContent = `${formatCurr(difference)}`;
    differenceJ.textContent = `${formatCurr(difference)}`;
  }
};

renderDifference();

// check for a new session

if (uniqueToken === "david") {
  const session = getSession();
  reconcileD.disabled = false;
  reconcileD.addEventListener("click", (e) => {
    if (session.justinComplete === true) {
      session.davidComplete = true;
      session.sessionComplete = true;
      updateSession();
      renderDifference();
    } else {
      session.davidComplete = true;
      saveSession();
      renderDifference();
    }
  });
} else if (uniqueToken === "justin") {
  const session = getSession();
  reconcileJ.disabled = false;
  reconcileJ.addEventListener("click", (e) => {
    if (session.davidComplete === true) {
      session.justinComplete = true;
      session.sessionComplete = true;
      updateSession();
      renderDifference();
    } else {
      session.justinComplete = true;
      saveSession();
      renderDifference();
    }
  });
} else {
  console.log("error inside checking for a new session");
}
