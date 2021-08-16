// addElement: need to fix everything related to this button.
// when this button is clicked we should just redirect the user to the edit page. ------- done
// no need to create an empty object in the database ------- done
// no need to pass any id in href!!! ----- done

// Regarding the reconciliation of balances:
// Both buttons should work, revise functions!

const myfuncs = require("./functions");
const formatCurr = myfuncs.formatCurr;
const calculateDifference = myfuncs.calculateDifference;
const reconcileBalanceD = myfuncs.reconcileBalanceD;
const reconcileBalanceJ = myfuncs.reconcileBalanceJ;
const apifuncs = require("./api-functions");
const renderExpenseDB = myfuncs.renderExpenseDB;
const getCurrentTotalDB = myfuncs.getCurrentTotalDB;
const createExpenseDB = apifuncs.createExpenseDB;

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

// Getting uniqueToken
const uniqueToken = localStorage.getItem("user");

// renderExpense(uniqueToken);
const runRen = async () => {
  await renderExpenseDB(uniqueToken);
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
    addElement.addEventListener("click", async (e) => {
      location.assign(`edit.html`);
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
    addElementJ.addEventListener("click", async (e) => {
      location.assign(`edit.html`);
    });

    // Sign out Button Functionality --- Justin
    signoutElementJ.disabled = false;
    signoutElementJ.addEventListener("click", (e) => {
      location.assign("index.html");
    });
  }

  // getCurrentTotal --- both David and Justin
  const davidTotExp = await getCurrentTotalDB("david");
  const justinTotExp = await getCurrentTotalDB("justin");

  // renderTotInd --- both Justin and David
  totalD.textContent = `${formatCurr(davidTotExp)}`;
  totalJ.textContent = `${formatCurr(justinTotExp)}`;

  // renderTotDiff --- both Justin and David
  const difference = calculateDifference(davidTotExp, justinTotExp);
  const dOperationSign = davidTotExp < justinTotExp ? "-" : "";
  const jOperationSign = justinTotExp < davidTotExp ? "-" : "";

  differenceD.textContent = `${dOperationSign} ${formatCurr(difference)}`;
  differenceJ.textContent = `${jOperationSign} ${formatCurr(difference)}`;
};
runRen();

console.log("you are in the render page");
