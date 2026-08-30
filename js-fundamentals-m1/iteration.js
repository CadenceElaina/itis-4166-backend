const nums = [1, 2, 3, 4, 5];

for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}

const result = [];
for (let num of nums) {
  result.push(num);
}
console.log(...result); // makes working with array values easier
console.log(result);

const scores = [
  {
    course: "Linear Algebra",
    grade: 71,
    credits: 3,
  },
  {
    course: "Intro to Stats & Prob",
    grade: 92,
    credits: 3,
  },
  {
    course: "Intro to Comp Sys",
    grade: 82,
    credits: 4,
  },
  {
    course: ""
  },
];

const highest = Math.max(...scores);
console.log(highest);
