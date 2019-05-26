const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;
const express = require("express");

const app = express();

function getUsers() {
  let users = fs.readFileSync(__dirname + "/users.json");
  return JSON.parse(users);
}

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("run");
});
app.get("/users", (req, res) => {
  res.send(JSON.stringify(getUsers()));
});

app.listen(port, () => console.log(`App running on port:${port}`));
