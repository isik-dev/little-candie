import {
  createExpense,
  renderExpense,
  getCurrentTotal,
  formatCurr,
  calculateDifference,
  reconcileBalanceD,
  reconcileBalanceJ,
} from "./functions";

// Getting uniqueToken
const uniqueToken = localStorage.getItem("user");

renderExpense(uniqueToken);
console.log("you are in the render page");

// listen for the add button, sign out button for both users
const addElement = document.querySelector("#renderaddD");
const addElementJ = document.querySelector("#renderaddJ");
const signoutElement = document.querySelector("#renderoutD");
const signoutElementJ = document.querySelector("#renderoutJ");
const totalD = document.querySelector("#totalD");
const totalJ = document.querySelector("#totalJ");
const resetD = document.querySelector("#resetD");
const resetJ = document.querySelector("#resetJ");

// initially disabling all the buttons
addElement.disabled = true;
signoutElement.disabled = true;
addElementJ.disabled = true;
signoutElementJ.disabled = true;
resetD.disabled = true;
resetJ.disabled = true;

// Based on the users, enable the buttons

if (uniqueToken === "david") {
  // Reconcile balances --- David
  resetD.disabled = false;
  resetD.addEventListener("click", (e) => {
    reconcileBalanceD();
    window.location.reload(true);
  });

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
  // Reconcile balances --- Justin
  resetJ.disabled = false;
  resetJ.addEventListener("click", (e) => {
    reconcileBalanceJ();
    window.location.reload(true);
  });

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

// getCurrentTotal --- both David and Justin
const davidTotExp = getCurrentTotal("david");
const justinTotExp = getCurrentTotal("justin");

// renderTotInd --- both Justin and David
totalD.textContent = `${formatCurr(davidTotExp)}`;
totalJ.textContent = `${formatCurr(justinTotExp)}`;

// renderTotDiff --- both Justin and David
const difference = calculateDifference(davidTotExp, justinTotExp);
const dOperationSign = davidTotExp < justinTotExp ? "-" : "";
const jOperationSign = justinTotExp < davidTotExp ? "-" : "";

differenceD.textContent = `${dOperationSign} ${formatCurr(difference)}`;
differenceJ.textContent = `${jOperationSign} ${formatCurr(difference)}`;
