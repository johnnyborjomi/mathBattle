const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;
const express = require("express");

const app = express();

function getUsers() {
  let users = fs.readFileSync(__dirname + "/users.json");
  return JSON.parse(users);
}

function writeUsers(users) {
  fs.writeFileSync(__dirname + "/users.json", users);
}

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("run");
});
app.get("/users", (req, res) => {
  res.send(JSON.stringify(getUsers()));
});

app.use(express.json());

app
  .post("/login", (req, res) => {
    var user = findUser(req.body);
    if (user) {
      let userInfo = {
        auth: Boolean(user),
        playerName: user.name
      };
      res.send(JSON.stringify(userInfo));
    }
  })
  .post("/signup", (req, res) => {
    if (!checkUserSignUp(req.body)) {
      registerUser(req.body);
      console.log(req.body);
      res.send(true);
    } else {
      res.send(false);
    }
  });

app.listen(port, () => console.log(`App running on port:${port}`));

function findUser(currentUser) {
  return getUsers().find(user => {
    return user.name === currentUser.name && user.pass === currentUser.pass;
  });
}

function checkUserSignUp(currentUser) {
  let success = false;
  let users = getUsers();

  currentUser.name.length >= 3 ? (success = true) : (success = false);
  currentUser.pass.length >= 5 ? (success = true) : (success = false);

  success = users.find(user => {
    return user.name === currentUser.name;
  });

  return success;
}

function registerUser(user) {
  let usersArr = getUsers();
  usersArr.push(user);
  console.log(usersArr);
  writeUsers(JSON.stringify(usersArr));
}
