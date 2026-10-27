const path = require("path"); // provides several utility functions for file and directory path

const myPath = "/users/documents/path-example.js";

/* console.log(`The file path is ${path.dirname(myPath)}`);
console.log(`The file path is ${path.basename(myPath)}`);
console.log(`The file path is ${path.extname(myPath)}`); */
//console.log(` ${path.parse(myPath)}`); `` forces the returned object into a string[object Object]

console.log(path.parse(myPath));
console.log(path.join("users", "documents", "teacher")); //.join(strings only as args)
