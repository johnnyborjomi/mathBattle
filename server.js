const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;
const express = require("express");

const app = express();

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("run");
});

app.listen(port, () => console.log(`App running on port:${port}`));

// const reqHandler = (req, res) => {
//   console.log(req.url);
//   switch (req.url) {
//     case "/":
//       res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
//       res.end(fs.readFileSync("dist/index.html"));
//       break;
//     case "app/app.js":
//       res.writeHead(200, { "Content-Type": "text/javascript" });
//       res.end(fs.readFileSync("app/app.js"));
//       break;
//     case "/ping":
//       serverInterval(res);
//       break;
//     default:
//       serverInterval(res);
//       break;
//   }
// };

// function hasResponse() {
//   return !Math.floor(Math.random() * 2);
// }

// function serverInterval(res) {
//   let responseState = hasResponse();
//   if (responseState) {
//     setTimeout(() => {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("pong");
//     }, 1000);
//   } else {
//     setTimeout(() => {
//       res.writeHead(404, "server error lol", { "Content-Type": "text/plain" });
//       res.end(res.statusText);
//     }, 1000);
//   }
//   console.log(responseState);
// }

// const server = http.createServer(reqHandler);

// server.listen(port, err => {
//   if (err) {
//     return console.log("something bad happened", err);
//   }
//   console.log(`server listening to port ${port}`);
// });
