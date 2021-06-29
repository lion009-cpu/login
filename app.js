//Join the club
//express로 서버 띄우기
"use strict";

const express = require('express');
const app = express();

const home = require("./routers/home");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/", home);

module.exports = app;

//http로 서버띄우기
// const http= require("http");
// const app = http.createServer((req, res) => {
//     res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
//     if(req.url === '/')
//         res.end("여기는 루트입니다.");
//     else if(req.url === '/login')
//         res.end("여기는 로그인입니다.");
// });

// app.listen(3001, () => {
//     console.log("http로 가동한 서버입니다.");
// });



