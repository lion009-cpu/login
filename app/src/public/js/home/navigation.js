"use strict";

function navigation(navi_id) {
    const req = {
        direction: navi_id,
    };

    fetch("/navigation", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
          if(res.success) {
              location.href = "/upload";              
          } else {
              if(res.err) return alert(res.err);
              alert(res.msg);
          }
      }).catch((err) => {
    });
}
