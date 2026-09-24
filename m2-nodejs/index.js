const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "messages.txt");
const newFilePath = path.join(__dirname, "data", "messagescopy.txt");

fs.readFile(filePath, "utf-8", (readErr, data) => {
  if (readErr) {
    console.log(readErr);
    return;
  }

  fs.writeFile(newFilePath, data, (writeErr) => {
    if (writeErr) {
      console.log(writeErr);
      return;
    }

    console.log(data);
  });
});
