/* 
Objects that represent the eventual completion or failure of an asynchronous operation and its resulting value.
 Pending | Fulfilled | Rejected

const promise = Promise(function(resolve, reject){
    // perform async operations
    if ( success ){
    resolve(value) 
    } else {
        reject(error)
        }
});

async fn -> promise -> consumed by calling .then() and .catch() on the promise

promise.then(onFulfilled)
promise.catch(onRejected)

 */

function getData() {
  let number = Math.random(0, 1);
  console.log(number);
  return new Promise(function (resolve, reject) {
    if (number > 0.5) {
      console.log(`${number} is a succesful value`);
      resolve(999);
    } else {
      reject(`An error happened during data retrieval.`);
    }
  });
}

function processData(data) {
  // let number = 0.6;
  // console.log(number);
  let number = data;
  return new Promise(function (resolve, reject) {
    if (number > 0.5) {
      resolve(`The data was processed successfully.`);
    } else {
      reject(`An error happened during data processing.`);
    }
  });
}

function recordData() {
  let number = 0.6;
  //console.log(number);
  return new Promise(function (resolve, reject) {
    if (number > 0.5) {
      resolve(`The data was processed successfully.`);
    } else {
      reject(`An error happened during data processing.`);
    }
  });
}

/*
getData()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
*/

getData()
  .then((data) => {
    console.log(data);
    return processData(data);
  })
  .then((data) => {
    // promise return from processData();
    console.log(data);
    return recordData(data);
  })
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
