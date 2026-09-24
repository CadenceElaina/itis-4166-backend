import http from "http";
import fs from "fs/promises";
import { join } from "path";

const port = 9090;
//const filePath = join(import.meta.dirname, "index.html");

const server = http.createServer(async (req, res) => {
  // res.statusCode = 200;
  //  res.setHeader("Content-Type", "text/plain");
  // res.setHead("Content-Type", "text/plain");
  // res.writeHead(200, { "Content-Type": "text/html" });
  // let url = req.url;
  //if (req.url === "/") url = "index.html";
  // const filePath = join(import.meta.dirname, "index.html");
  //const filePath = join(import.meta.dirname, "images", url);
  //let fileType = url.split(".").pop();
  //console.log(fileType);
  //console.log(filePath);

  let url = req.url;
  let filePath;
  if (url === "/") {
    filePath = join(import.meta.dirname, "index.html");
  } else {
    filePath = join(import.meta.dirname, "images", url.replace(/^\//, ""));
  }

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`${data} :3`);
  } catch (error) {
    console.log(error);
  }
  //res.write("<h1>Hello world!</h1>");

  // res.write("Hello world!");
  //res.end("<h3>:3 !</h3>");
  /*console.log(req.method);
  console.log(req.url);
  console.log("test");
  */
});

server.listen(port, () => console.log(`server is running on port ${port}`));
