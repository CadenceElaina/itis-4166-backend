const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "./file.txt"), "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// Node uses asynchronous, non-blocking I/O model
/*                                        I/O REQUESTS-------------
                                            /                      \
EVENT QUEUE                             SINGLE-THREADED            THREAD POOL----> DATABASE
|                                       EVENT LOOP               |            \
|                                        |                      |              \---> FILESYSTEM
---------CALLBACK FUNCTION-----------------COMPLETE NOTIFICATION
*/
