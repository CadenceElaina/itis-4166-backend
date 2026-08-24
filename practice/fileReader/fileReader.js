const fs = require("fs");
const path = require("path");

// Get path relative to this script
const filePath = path.join(__dirname, "..", "data", "degreeworks.txt");
const text = fs.readFileSync(filePath, "utf-8");

console.log(text);
