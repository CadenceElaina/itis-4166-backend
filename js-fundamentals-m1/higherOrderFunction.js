// Higher-Order function - takes either a function as a parameter or
// returns another function (map, reduce, filter)

function greaterThan(a) {
  return function (b) {
    return b > a;
  };
}

const greaterThan10 = greaterThan(10);

console.log(greaterThan10);
// [Function (anonymous)]

console.log(greaterThan10(5));
const greaterThan5 = greaterThan(5);
console.log(greaterThan5(6));

const nums = [3, 10, 17, 5, 3, -5];

// by default Array.prototype.sort() sorts elements to strings
// then sorts them in UTF-16 code unit order (lexicopgrahical order) not numerical
/*

Hoisting: JS hoists the fn to the top of the scope before running the code
// In-Place Mutation: .sort() mutates original nums array directly in memory rather than returning a new array
// JS moves fns to the top during its compilation through hoisting

nums.sort(comp);  // without const comp = (a,b) => a-b; it would print the array after being sorted numerically via the comp fn
console.log(nums);

function comp(a, b) {
  return a - b;
}

console.log(nums);
*/

console.log(nums);
//console.log(comp);
const comp = (a, b) => a - b; // makes it so the above numbers.sort(comp) throws a ReferenceError - cannot access 'comp' before initialization
console.log(comp);

// Fully hoisted: can be called before this line
/*
function comp1(a, b) {
  return a - b;
}
  */
// ReferenceError: Cannot access 'comp' before initialization
/*nums.sort(comp2);

const comp2 = function (a, b) {
  return a - b;
};
*/
