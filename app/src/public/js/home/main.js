"use strict";

var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
  alert('hi');
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute('data-bs-id')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  var modalTitle = exampleModal.querySelector('.modal-title')
  var modalBodyInput = exampleModal.querySelector('.modal-body input')

  modalTitle.textContent = 'New message to ' + recipient
  modalBodyInput.value = recipient
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

