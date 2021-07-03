"use strict";

const id = document.querySelector("#id"),
      pwd= document.querySelector("#pwd"),
      confirmPwd= document.querySelector("#confirm-pwd"),
      registerbtn= document.querySelector("#button");

registerbtn.addEventListener("click", register);

function register() {
    if(!id.value) return alert("닉네임을 입력해 주십시요.");
    if(!pwd.value) return alert("비밀번호를 입력해 주십시요.");
    if(!confirmPwd.value) return alert("비밀번호확인을 입력해 주십시요.");
    if(pwd.value !== confirmPwd.value) return alert("비밀번호가 일치하지 않습니다.");

    const req = {
        id: id.value,
        pwd: pwd.value,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
          if(res.success) {
              location.href = "/login";              
          } else {
              alert(res.msg);
          }
      }).catch((err) => {
          console.error("회원가입중 에러 발생");
      });
}