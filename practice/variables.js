//let const var
// let: global scope or block scope

let a = 10; //global scope

if (a > 1) {
  let b = 5; // block scope defined within curly brackets
  a = a * b;
}

console.log(a);
// console.log(b); compiler error - b is not defined block scope

// const: constants whose values cannot be changed
const c = 100;
//c = 10;
//console.log(c) // TypeError: Assignment to constant variable

// var: global scope or function scope
var d = 12; // global scope

function double() {
  var b = a * 2;
  console.log(b);
}
console.log(a);
double();
//console.log(b); // b is not defined - function scope cannot be accessed outside

/*
if (a > 5){
    var b = a * 2; // global scope not function scope
    console.log(b);
}
    console.log(b); //works!
*/
