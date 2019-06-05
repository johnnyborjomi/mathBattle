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
app
  .get("/users", (req, res) => {
    res.send(JSON.stringify(getUsers()));
  })
  .post("/login", (req, res) => {
    let reqString = "";
    req.on("data", data => {
      reqString += data;
      console.log(reqString);
    });

    if (checkUserLogin(JSON.parse(reqString))) {
      res.send(true);
    } else {
      res.send(false);
    }
  });

app.listen(port, () => console.log(`App running on port:${port}`));

function checkUserLogin(currentUser) {
  let usersArr = getUsers();
  return usersArr.find(user => {
    return user.name === currentUser.name && user.pass === currentUser.pass;
  });
}
