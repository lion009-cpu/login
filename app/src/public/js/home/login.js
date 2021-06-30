"use strict";

const { post } = require("../../../routers/home");

const id = document.querySelector("#id"),
      pwd= document.querySelector("#pwd"),
      loginbtn= document.querySelector("button");

loginbtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        pwd: pwd.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    })
}