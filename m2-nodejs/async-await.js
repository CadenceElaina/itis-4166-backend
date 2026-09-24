//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

// Async: define a function that returns a promise
// Await expressions make promise-returning functions behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected
CODE = "cute_penguins";

function getData(password) {
  return new Promise((resolve, reject) => {
    if (password === CODE) {
      resolve("Penguins are cute! :3");
    } else {
      reject("Wrong password silly!");
    }
  });
}

let savedResult = null;
let savedError = null;

getData("cute_penguins")
  .then((res) => {
    savedResult = res;
    useStoreData(savedResult);
  })
  .catch((err) => {
    savedError = err;
  });

const useStoreData = (data) => {
  console.log("Using stored data:", data);
};

async function processTasks() {
  try {
    const d = await getData("yay_code");
    console.log(d);
  } catch (err) {
    console.log(`oopsie youve got a "${err}" problem!`);
  }
}

processTasks();
//failedP = getData("yay_coding").then;
//succeedP = getData("cute_penguins");
//console.log(`${failedP} \n ${succeedP}`);

//async function processTasks() {}
