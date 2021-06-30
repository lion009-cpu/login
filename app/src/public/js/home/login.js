"use strict";

const id = document.querySelector("#id"),
      pwd= document.querySelector("#pwd"),
      loginbtn= document.querySelector("button");

loginbtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        pwd: pwd.value,
    };
    console.log(req);
}