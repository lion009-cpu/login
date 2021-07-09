"use strict";

async function getGender() {

    return new Promise((resolve, reject) => {
        const genderNodeList
        = document.getElementsByName("gender");

        genderNodeList.forEach((node, err) => {
            if(err) reject(`${err}`);
            else 
                if(node.checked)  {
                    resolve(node.value);
                }
        })
    })
}



const id = document.querySelector("#id"),
      pwd= document.querySelector("#pwd"),
      confirmPwd= document.querySelector("#confirm-pwd"),
      eMail= document.querySelector("#e-mail"),      
      registerbtn= document.querySelector("#button");

registerbtn.addEventListener("click", register);

async function register() {
    if(!id.value) return alert("닉네임을 입력해 주십시요.");
    if(!pwd.value) return alert("비밀번호를 입력해 주십시요.");
    if(!confirmPwd.value) return alert("비밀번호확인을 입력해 주십시요.");
    if(!eMail.value) return alert("이메일을 입력해 주십시요.");
    if(pwd.value !== confirmPwd.value) return alert("비밀번호가 일치하지 않습니다.");
    try {
        var gender = await getGender();
        const req = {
            id: id.value,
            pwd: pwd.value,
            confirmPwd: confirmPwd.value,
            eMail: eMail.value,
            zender: gender,
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
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        }).catch((err) => {
        });
    } catch (err) {
        return {success : false, err};
    };
}