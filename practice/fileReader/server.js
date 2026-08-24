const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const DATA_DIR = path.join(__dirname, "data");

// 1. Endpoint to list and filter filenames
app.get("/api/files", (req, res) => {
  const query = (req.query.search || "").toLowerCase();
  const files = fs.readdirSync(DATA_DIR);

  const filtered = files.filter((file) => file.toLowerCase().includes(query));
  res.json(filtered);
});

// 2. Endpoint to fetch a specific file's content
app.get("/api/files/:name", (req, res) => {
  const filePath = path.join(DATA_DIR, req.params.name);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const content = fs.readFileSync(filePath, "utf-8");
  res.send(content);
});

app.list(3000, () => console.log("Server running on http://localhose:3000"));
