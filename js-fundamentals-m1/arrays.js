const nums = [1, 2, 3, 4, 5, "green", true];

// nums = 5;  error
console.log(nums.length);

console.log(nums[-1]);
console.log(nums.includes("5"));
console.log(nums.includes(5));

// always can add/remove from arrays - unlike Java

nums.splice(2); // 3rd index and on are removed
console.log(nums); // 1, 2
nums.push(1, 2, 3, 4, 5, 6, 7, 8, 8, 9);
nums.splice(0, 2);
console.log(nums);
nums.splice(2, 2, "two"); // remove 3rd element add "two"
console.log(nums);
console.log(nums.join(", "));

nums.forEach((num) => console.log(num));
nums.forEach((num) => num++);
console.log(nums); // doesnt increment
nums.forEach((num, index, nums) => nums[index]++);
console.log(nums);

/*
nums.forEach(function (num) {
  console.log(num);
});
*/

const arr = [7, 9, 10, 11, 2, -1, 99];

lessThan10 = arr.filter((n) => n < 10);
console.log(arr.find((n) => n > 10));
console.log(lessThan10);
