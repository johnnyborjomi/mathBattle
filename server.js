const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;
const express = require("express");

const app = express();

const TOP_SCORE_LENGTH = 5;

app.use(express.static("dist"));

app.get("/getScore", (req, res) => {
  let users = getUsers();
  let sortedUsers = sortUsersByScore(users);
  let passLessUsers = cleanUsersPassewords(sortedUsers);
  let topScores = getTopScores(passLessUsers);
  res.json(topScores);
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
    } else {
      res.send({ auth: false });
    }
  })
  .post("/signup", (req, res) => {
    let result = checkUserSignUp(req.body);
    if (result.success) {
      registerUser(req.body);
      res.send(JSON.stringify({ success: true, playerName: req.body.name }));
    } else {
      res.send(JSON.stringify(result));
    }
  })
  .post("/saveScore", (req, res) => {
    let users = getUsers();
    let userIndex = findUserIndexByName(req.body.playerName);
    users[userIndex].score = req.body.score;
    let sortedUsers = sortUsersByScore(users);
    writeUsers(sortedUsers);
    let passLessUsers = cleanUsersPassewords(sortedUsers);
    let topScores = getTopScores(passLessUsers);
    res.json(topScores);
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
  if (!user.score) user.score = 0;
  usersArr.push(user);
  writeUsers(usersArr);
}

function sortUsersByScore(users) {
  return users.sort((a, b) => {
    return b.score - a.score;
  });
}

function cleanUsersPassewords(users) {
  return users.map(user => {
    delete user.pass;
    return user;
  });
}

function getTopScores(scoreArr) {
  if (scoreArr.length > TOP_SCORE_LENGTH) {
    scoreArr.splice(TOP_SCORE_LENGTH);
  }
  return scoreArr;
}
