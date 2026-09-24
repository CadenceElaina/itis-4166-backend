const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data", "messages.txt");
const newFilePath = path.join(__dirname, "data", "messagesCopy.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) console.log(err);
  else {
    fs.writeFile(newFilePath, data, (err) => {
      if (err) console.log(err);
      else {
        fs.appendFile(
          newFilePath,
          "\n\nThis is a copy of messages.txt",
          (err) => {
            if (err) console.log(err);
            else {
              fs.readFile(newFilePath, "utf8", (err, data) => {
                if (err) console.log(err);
                else console.log(data);
              });
            }
          }
        );
      }
    });
  }
});
