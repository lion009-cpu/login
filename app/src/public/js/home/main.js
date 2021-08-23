"use strict";

function popupread(q_id, nick, dt, r_cnt, s_cnt, stat, cont, symp) {
    
    const req = {
        question_id: q_id,
        id: nick,
        creat_dt: dt,
        read_cnt: r_cnt,
        reply_cnt: s_cnt,
        title: stat,
        contents: cont,
        symp_com: symp,
    };

    fetch("/main", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
          if(res.success) {
              location.href = "/readboard";              
          } else {
              if(res.err) return alert(res.err);
              alert(res.msg);
          }
      }).catch((err) => {
    });
}