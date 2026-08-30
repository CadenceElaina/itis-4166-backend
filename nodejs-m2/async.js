// Synchronous: each statement finishes before the next one starts.
const fs = require("fs");
const path = require("path");

// fs.promises is the same file system module, but its methods return promises.
const fsp = require("fs/promises");

const filePath = path.join(__dirname, "file.txt");
const dummyPath = path.join(__dirname, "dummy.txt");

// 1. SYNC - blocks everything until the read finishes, then returns the data.
const data = fs.readFileSync(filePath, "utf-8");
console.log("1 sync:", data);

// 2. ASYNC, CALLBACK - returns immediately. Node runs the callback later,
// once the read is done. err is null on success.
fs.readFile(dummyPath, "utf-8", (err, contents) => {
    if (err) {
        console.error("2 callback failed:", err.message);
        return;
    }
    console.log("2 callback:", contents.trim());
});

// 3. ASYNC, PROMISE - same idea, but the result arrives through .then().
fsp.readFile(dummyPath, "utf-8")
    .then((contents) => console.log("3 promise:", contents.trim()))
    .catch((err) => console.error("3 promise failed:", err.message));

// 4. ASYNC/AWAIT - promises again, written to read top to bottom.
// await only works inside an async function, so we define one and call it.
async function readWithAwait() {
    try {
        const contents = await fsp.readFile(dummyPath, "utf-8");
        console.log("4 await:", contents.trim());
    } catch (err) {
        console.error("4 await failed:", err.message);
    }
}
readWithAwait();

// Proof that 2, 3 and 4 did not block: this runs before any of their output.
console.log("5 end of file - printed before the async reads finish");
