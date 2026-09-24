// function name(parameter list) {//body}
// can call this function prior to declaration

function sum(a, b) {
  return a + b;
}

console.log(sum(3, 4));

// function expression
// const name = function(parameter list) {//body}
// anonymous functions - callback

// cannot be called before declared!
//console.log(sumExp(3, 4));

const sumExp = function (a, b) {
  return a + b;
};

console.log(sumExp(3, 4));

// arrow function (ES6)

// const name = (parameter list) => {//body};

const sumArrow = (a, b) => a + b;
const sumArrow1 = (a, b) => {
  return a + b;
};
