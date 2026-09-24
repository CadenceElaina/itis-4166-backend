const nums = [7, -9, 11, 12, 32, 69.42, "e", false, false, true, null];

const nonNumbers = nums
  .filter((num) => typeof num !== "number")
  .map((num) => `Value: ${num}\nType: ${typeof num}`);
console.log(nonNumbers.join("\n---\n"));

// reduce (function, initialValue)

const numbers = nums.filter((n) => typeof n === "number");

const total = numbers.reduce((res, n) => {
  console.log(
    `Accumulator: ${res}\nCurrent Number: ${n}\nTotal: ${res + n}\n---`,
  );
  return res + n;
}, 1000);
console.log(`Final Total ${total}`);

const arr = [7, 0, 11, 9, 7, 8, 12];

const noRepeat = arr.reduce((result, num) => {
  if (!result.includes(num)) result.push(num);
  return result;
}, []);

console.log(noRepeat, arr);
