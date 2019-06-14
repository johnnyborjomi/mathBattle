const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;
const express = require("express");

const app = express();

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
    var user = findUserOnAuth(req.body);
    if (user) {
      let userInfo = {
        auth: Boolean(user),
        playerName: user.name
      };
      res.send(JSON.stringify(userInfo));
    }
    res.send({ auth: false });
  })
  .post("/signup", (req, res) => {
    let result = checkUserSignUp(req.body);
    if (result.success) {
      registerUser(req.body);
      console.log(req.body);
      res.send(JSON.stringify({ success: true, playerName: req.body.name }));
    } else {
      res.send(JSON.stringify(result));
    }
  })
  .post("/saveScore", (req, res) => {
    let users = getUsers();
    let userIndex = findUserIndexByName(req.body.playerName);
    users[userIndex].score = req.body.score;
    writeUsers(users);
    res.send("score saved");
  });

app.listen(port, () => console.log(`App running on port:${port}`));

function getUsers() {
  let users = fs.readFileSync(__dirname + "/users.json");
  return JSON.parse(users);
}

function writeUsers(users) {
  fs.writeFileSync(__dirname + "/users.json", JSON.stringify(users));
}

function findUserOnAuth(currentUser) {
  return getUsers().find(user => {
    return user.name === currentUser.name && user.pass === currentUser.pass;
  });
}

function findUserIndexByName(userName) {
  return getUsers().findIndex(user => {
    return user.name === userName;
  });
}

function checkUserSignUp(currentUser) {
  const shortName = "Name should be more than 3 symbols.";
  const shortPass = "Password must be more than 5 symbols.";
  const nameUsed = "This name already used.";
  let result = {
    success: true,
    failMess: null
  };

  function changeResult(result, success, mess) {
    result.success = success;
    result.failMess = mess;
  }

  let users = getUsers();

  currentUser.name.length >= 3 ? "" : changeResult(result, false, shortName);
  currentUser.pass.length >= 5 ? "" : changeResult(result, false, shortPass);

  !users.find(user => {
    return user.name === currentUser.name;
  })
    ? ""
    : changeResult(result, false, nameUsed);

  return result;
}

function registerUser(user) {
  let usersArr = getUsers();
  usersArr.push(user);
  console.log(usersArr);
  writeUsers(usersArr);
}
