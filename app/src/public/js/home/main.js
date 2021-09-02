"use strict";

const title = document.querySelector("#recipient-name"),
      content= document.querySelector("#message-text"),
      uploadBtn= document.querySelector("#upload");

var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('hidden.bs.modal', function (event) {

});

function eraseText() {
  document.getElementById("message-text").value = "";
}

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

exampleModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  var question_id = button.getAttribute('data-bs-id');
  var likersCnt = button.getAttribute('data-bs-cnt');
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  var modalTitle = exampleModal.querySelector('.modal-title');
  var likersList = exampleModal.querySelector('#likers-list');

  modalTitle.textContent = '모두 ' + likersCnt;
  const req = {
    question_id: question_id,
  }

  fetch("/likers", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }).then((res) => res.json())
    .then((res) => {
        if(res.success) {
            // location.href = "/readboard"; 
            var text = "";
            for(var i=0; i<res.likers.length; i++) {
              // likersList.textContent = res.likers[i].id+'가 좋아해요';
              text += "<ul>\n"
              text += "<li><h5>" + res.likers[i].id + "</h5></li>\n"
              text += "</ul>\n"
            }
            console.log(text);
            likersList.innerHTML = text;
        } else {
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    }).catch((err) => {
  });
})

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

function like(q_id, nick, ed, li_id, lik) {

    const req = {
        question_id: q_id,
        id: nick,
        liked: ed,
        like_id: li_id,
        lik_cd: lik,        
    };

    fetch("/like", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
          if(res.success) {
              location.href = "/main";
            // res.send(true);
          } else {
            // if(res.err) return alert(res.err);
            alert(res.msg);
            location.href = "/login";
          }
      }).catch((err) => {
    });
}

function likers(id) {
    
    var likeform = document.likeform ;
    var url = "likers";
    var title = "좋아요";
    var options = "toolbar=no,directories=no,scrollbars=no,"
                  +"resizable=no,status=no,menubar=no,width=240, height=200, top=0,left=20";
    window.open("", title, options);
    var user_id =  $('#user_id').val();
    console.log(user_id);
    
    
    likeform.target = title ;
    likeform.action = url ;

    console.log(likeform.name);
         
    likeform.submit() ;
            
}

