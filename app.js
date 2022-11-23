const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.static(path.resolve(__dirname, "dist")));

app.get("*", (req, res) => {
  const html = fs.readFileSync(
    path.resolve(__dirname, "dist/index.html"),
    "utf-8"
  );
  res.send(html);
});

app.listen(3005, () => {
  console.log("start 3005");
});
