"use strict";

const id = document.querySelector("#id"),
      pwd= document.querySelector("#pwd"),
      confirmPwd= document.querySelector("#confirm-pwd"),
      registerbtn= document.querySelector("#button");

registerbtn.addEventListener("click", register);

function register() {
    const req = {
        id: id.value,
        pwd: pwd.value,
        confirmPwd: confirmPwd.value,
    };

    console.log(req);

    // fetch("/register", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(req),
    // }).then((res) => res.json())
    //   .then((res) => {
    //       if(res.success) {
    //           location.href = "/";              
    //       } else {
    //           alert(res.msg);
    //       }
    //   }).catch((err) => {
    //       console.error(new Error("로그인중 에러 발생"));
    //   });
}