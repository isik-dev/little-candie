// Destructuring -- very handful when working with objects
const todo = {
  id: "doasnoia",
  text: "pay the bills",
  status: false,
};

const printTodo = ({ text, status }) => {
  console.log(`${text}: ${status}`);
};
printTodo(todo);

const {
  text: todoText,
  status,
  details = "no details provided",
  ...others
} = todo;

console.log(todoText);
console.log(status);
console.log(details);
console.log(others);

// Destructuring with arrays
const age = [22, 42, 21, 53, 5, 76, 90];
const [firstAge, secondAge, , lastAge, moreAge = 26, ...otherAges] = age;
console.log(firstAge);
console.log(secondAge);
console.log(lastAge);
console.log(moreAge);
console.log(otherAges);
