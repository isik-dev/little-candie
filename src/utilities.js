// Named export --> we can export as many as we want
// Default export --> we can export only one things. Big "class" Recommended

console.log("utilities.js");

const add = (a, b) => a + b;
const name = "Something";

const square = (x) => x * x;
console.log("From my code");
export { add, name, square as default };
