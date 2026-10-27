// synchronous blocking of call stack

const fs = require("fs");
const path = require("path");

console.log(path);
const dirPath = path.join(__dirname, "data");
//const filePath = path.join(dirPath, "message1.txt");
const newFilePath = path.join(dirPath, "newMessage.txt");
const newDirPath = path.join(__dirname, "newData");

const filePath = path.join(dirPath, "message.txt");

// read a file
try {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8"); // utf8 makes it readable instead of  the buffer/numbers
    console.log(data);
  } else {
    console.log(`${filePath} does not exist in ${__dirname}`);
  }
} catch (error) {
  console.log(error);
}

// create and write a file
try {
  fs.writeFileSync(newFilePath, "This is a demo of writing a file");
  fs.writeFileSync(newFilePath, "This overwrites the line above");
} catch (error) {
  console.log(error);
}

// append to a file
try {
  fs.appendFileSync(newFilePath, "\n---\nThis is from the appendFileSync()");
} catch (error) {
  console.log(error);
}

// delete a file
try {
  fs.unlinkSync(newFilePath);
} catch (error) {
  console.log(error);
}

// create a new folder
try {
  fs.mkdirSync(newDirPath);
  console.log(error);
} catch (error) {
  console.log(error);
}

// remove a new folder
try {
  // fs.rmDirSync(newDirPath); // only works if folder is empty
  //fs.rmDirSync(dirPath); // error its not empty
  //fs.rmSync(newDirPath, { recursive: true }); // removes none empty folders and their contents

  console.log(error);
} catch (error) {
  console.log(error);
}
