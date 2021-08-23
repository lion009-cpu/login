"use strict";

const title = document.querySelector("#title"),
      content= document.querySelector("#content"),
      uploadBtn= document.querySelector("#button");

uploadBtn.addEventListener("click", upload);

function upload() {
    if(!title.value) return alert("간략증상을 입력해 주십시요.");
    if(!content.value) return alert("상세증상을 입력해 주십시요.");

    const req = {
        title: title.value,
        content: content.value,
    };

    fetch("/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
          if(res.success) {
              location.href = "/main";              
          } else {
              if(res.err) return alert(res.err);
              alert(res.msg);
          }
      }).catch((err) => {
      });
}