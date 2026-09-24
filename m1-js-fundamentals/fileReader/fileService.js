const fs = require("fs");
const path = require("path");
//const fileToFind = process.argv[2]; // 3rd element is the variable input

const DATA_DIR = path.join(__dirname, "..", "data");

// Read a single file by filename
function readFileContent(filename) {
  const filePath = path.join(DATA_DIR, filename);
  return fs.readFileSync(filePath, "utf-8");
}

// List all files and their contents into an array of objects
// giving parameter a value of "" ensures that default is ""
function readAllDataFiles(filterTerm = "") {
  // read the contents of a specified directory synchronously, returning an array of file names within that directory
  const filenames = fs.readdirSync(DATA_DIR);

  return (
    filenames
      //.filter((name) => name.includes(`${fileToFind}`))
      .filter((name) => name.toLowerCase().includes(filterTerm.toLowerCase()))
      .map((name) => ({
        content: fs.readFileSync(path.join(DATA_DIR, name), "utf-8"),
      }))
  );
}

module.exports = { readFileContent, readAllDataFiles };

// --- CLI Execution Check ---
// if we run it from this file its good to grab input
// if we ran from another file using require then it will not use input
if (require.main === module) {
  const fileToFind = process.argv[2] || "";
  const results = readAllDataFiles(fileToFind);

  if (results.length === 0) {
    console.log(`No files matched "${fileToFind}".`);
  } else {
    results.forEach((file) => {
      console.log(`\n=== Found: ${file.name} ===\n`);
      console.log(file.content);
    });
  }
}
