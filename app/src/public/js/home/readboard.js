"use strict";

function search_board(data) {

    const checkAuth = document.getElementsByName("checkAuth");
    const len = checkAuth.length;
    let symp_code = "";
    let symp_state = "";
    for(var i=0; i<len; i++) {
        if(checkAuth[i].checked) {
            symp_code += checkAuth[i].value;
            if(i === 0) {
                symp_state += checkAuth[i].id;
            } else {
                symp_state += "," + checkAuth[i].id;
            }
        }    
    }

    const req = {
        key_code: symp_code,
        key_nm: symp_state,
    };

    fetch("/symptom", {
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
