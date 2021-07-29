console.log("you are in the render page");

// listen for the add button push & redirect to the edit page
const addElement = document.querySelector("#renderaddD");
addElement.addEventListener("click", (e) => {
  location.assign(`edit.html`);
});
