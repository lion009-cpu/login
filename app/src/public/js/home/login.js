"use strict";

const id = document.querySelector("#id"),
      pwd= document.querySelector("#pwd"),
      loginbtn= document.querySelector("#button");

loginbtn.addEventListener("click", login);

function login() {
    if(!id.value) return alert("닉네임을 입력해 주십시요.");
    if(!pwd.value) return alert("비밀번호를 입력해 주십시요.");

    const req = {
        id: id.value,
        pwd: pwd.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
          if(res.success) {
              location.href = "/navigation";              
          } else {
              if(res.err) return alert(res.err);
              alert(res.msg);
          }
      }).catch((err) => {
      });
}