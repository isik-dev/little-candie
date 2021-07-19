// Named export --> we can export as many as we want
// Default export --> we can export only one things. Big "class" Recommended

console.log("utilities.js");

const add = (a, b) => a + b;
const name = "Jeremy";

const square = (x) => x * x;

export { add, name, square as default };
