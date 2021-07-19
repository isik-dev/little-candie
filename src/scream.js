// 1. Setup scream as the default export
// 2. Update the import statement in the index.js to use it

const scream = (word) => `${word.toUpperCase()}!`;

export { scream as default };
