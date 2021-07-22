// Rest parameters: assigned as "...restparametes"

const printTeam = (team, coach, ...players) => {
  console.log(`Team: ${team}`);
  console.log(`Coach: ${coach}`);
  console.log(`Players: ${players.join(", ")}`);
};

// printTeam("Liberty", "Casey Penn", "Merge", "Aiden", "Herbert", "Sherry");

// Spread Syntax:

const team = {
  name: "Liberty",
  coach: "Casey Penn",
  players: ["Merge", "Aiden", "Herbert", "Sherry"],
};

printTeam(team.name, team.coach, ...team.players);

let cities = ["Barcelona", "Cape town", "Bordeaux"];
cities = ["Paris", ...cities];
const citiesCopy = [...cities, "Santiago"];

console.log(cities);
console.log(citiesCopy);

// Object Spread Syntax
let house = {
  bedrooms: 2,
  bathrooms: 1.5,
  yearBuilt: 2018,
};

let newHouse = {
  basement: true,
  ...house,
  bedrooms: 3,
};
newHouse.yearBuilt = 2017;

console.log(house);
console.log(newHouse);

// Creat a person object with name and age
// Create a location object with city and country
// Create a new overview object and use the spread operator to add all four properties

const person = {
  name: "Jeff",
  age: 56,
};

const location = {
  city: "New York",
  country: "USA",
};

const overview = {
  ...person,
  ...location,
};
console.log(overview);
