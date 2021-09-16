"use strict";

function eraseText() {
  document.getElementById("message-text").value = "";
}


function reply(a, b, c, d) {
  
  const req = {
      a: a,
      b: b,
      c: c,
      d: d,
  };

  fetch("/reply", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
  }).then((res) => res.json())
    .then((res) => {
        if(res.success) {
            location.href = "/reply";              
        } else {
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    }).catch((err) => {
    });
}

var exampleModal = document.getElementById('exampleModal');
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
              text += "<li><h5>" + res.likers[i].id + "가 좋아해요</h5></li>\n"
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

var board_view = document.querySelector('.board_view');
var currentTarget;

function activate(elem) {
  elem.classList.add('focus');
  currentTarget = elem;
  console.log("activate");
}

function deactivate(elem) {
  elem.classList.remove('focus');
  console.log("deactivate");
}

function makeUl(id) {
  var elem =  document.getElementById(id);
  var elemList = document.createElement('ul');
  elemList.className = 'list-group';
  elemList.id = id+"-ul";
  elem.insertBefore(elemList, elem.firstChild);
  console.log('makeUl');
}
function deleteUl(elem) {  
  elem.removeChild(elem.firstChild);
  console.log('delete');
}

function focusOutHandler(event) {
  let elem = event.target || event.srcElement;

  while (
    !elem.classList.contains('fc') && 
    !elem.classList.contains('open-modal') &&
    !elem.classList.contains('fas')
  ) {
    if(elem.nodeName === 'BODY') {
      elem = null;
      // event.stopPropagation();
      return;
      
    }
    elem = elem.parentNode;
  }
  if(currentTarget) {
    if(currentTarget.classList.contains('fc')) {
      deactivate(currentTarget);
    }
  }
  if(elem.classList.contains('fc')) {
    var nodes = elem.parentNode.childNodes;
    var node = nodes.item(3);
    var btn = document.getElementById(nodes.item(3).id);
    btn.style.display = 'none';
    deactivate(elem);
  }
}
board_view.addEventListener('focusout', focusOutHandler);

function focusInHandler(event) {
  let elem = event.target || event.srcElement;
  while (
    !elem.classList.contains('fc') && 
    !elem.classList.contains('open-modal')
  ) {
    
    if(elem.nodeName === 'BODY') {
      elem = null;
      return;
    }
    elem = elem.parentNode;
  }
  currentTarget = elem;
  if(elem.classList.contains('fc')) {
    var nodes = elem.parentNode.childNodes;
    var node = nodes.item(3);
    var btn = document.getElementById(nodes.item(3).id);
    btn.style.display = 'block';
  }
}
board_view.addEventListener('focusin', focusInHandler);

async function mousedownHandler(event) {
  let elem = event.target || event.srcElement;
       
  while (
    !elem.classList.contains('fc') && //댓글창
    !elem.classList.contains('login-reply') && //댓글달기 버튼
    !elem.classList.contains('like') && //좋아요 및 좋아요 취소
    !elem.classList.contains('open-modal') && //좋아요 리스트 모달 띄우기
    !elem.classList.contains('fa-paper-plane') &&//댓글달기
    !elem.classList.contains('btn-bird')
  ) {
    
    if(elem.nodeName === 'BODY') {
      elem = null;
      return;
    }
    elem = elem.parentNode;
  }
  
  currentTarget = elem;
  
  if(elem.classList.contains('fc')) {    
    if(elem.classList.contains('focus')) {
    } else {
      activate(elem);
    }
    var nodes = elem.parentNode.childNodes;
    var node = nodes.item(3);
    var btn = document.getElementById(nodes.item(3).id);
    btn.style.display = 'block';
  }
  if(elem.classList.contains('like')) {   
    var response = await isSessioned(elem);
    if(response.success) {
      updateLikeDb(elem);
    } else {
      var strTitle     = '로그인 상태가 아닙니다.',
          strContent   = '<h4><span>로그인 하세요!!!</span></h4>',
          strTarget    = '#alertModal',
          strTitleId   = '#alertModalLabel',
          strContentId = '#alertModalBody';

      callModal(strTarget, strTitleId, strTitle, strContentId, strContent);
    }
  }
  if(elem.classList.contains('fa-paper-plane') || elem.classList.contains('btn-bird')) {  //댓글 달기
    
    var response = await isSessioned(elem);
    if(response.success) {
      var tx = elem.getAttribute('data-bs-tx'),
          node = document.getElementById(tx),
          content = node.value,
          question_id = node.getAttribute('data-bs-key'),
          ulid  = elem.getAttribute('data-bs-acc');
      node.value = '';
      if(content) {
        updateReplyCnt(elem);  
        replyQ(question_id, content, elem.getAttribute('data-bs-user'), ulid);  
      } else {
        var strTitle     = '필수항목누락.',
            strContent   = '<h4><span>댓글을 입력 하세요!!!</span></h4>',
            strTarget    = '#alertErrorModal',
            strTitleId   = '#alertErrorModalLabel',
            strContentId = '#alertErrorModalBody';

        callModal(strTarget, strTitleId, strTitle, strContentId, strContent);
      }
    } else {
      var strTitle     = '로그인 상태가 아닙니다.',
          strContent   = '<h4><span>로그인 하세요!!!</span></h4>',
          strTarget    = '#alertModal',
          strTitleId   = '#alertModalLabel',
          strContentId = '#alertModalBody';

      callModal(strTarget, strTitleId, strTitle, strContentId, strContent);
    }
  }    
  
  if(elem.classList.contains('login-reply')) {  //댓글달기버튼 클릭
    if(elem.classList.contains('collapsed')) {
      var pos = elem.getAttribute('data-bs-pos'),
          parent = document.getElementById(pos);
      makeUl(parent.id);
      getReply(elem, elem.getAttribute('data-bs-id'), parent.childNodes.item(0).id);
    } else {      
      var pos = elem.getAttribute('data-bs-pos'),
          parent = document.getElementById(pos);
      console.log(parent);
      deleteUl(parent);
    }
  }
}

board_view.addEventListener('mousedown', mousedownHandler);

function isSessioned(elem) {

  const req = {
    log: elem.getAttribute('data-bs-status'),
  };  
  
  console.log(req);

  return new Promise((resolve, reject) => {
    fetch("/session", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then((res) => res.json())
      .then((res) => {
        if(res.success) {
          resolve(res);
        } else {
            if(res.err) {     
              return res;
            }
            resolve(res);
        }
      }).catch((err) => {
    });
  });  
}

function updateReplyCnt(elem) {
  var pos = elem.getAttribute('data-bs-pos');
  console.log(pos);
  var element = document.getElementById(pos);
  var reply_cnt = Number(element.getAttribute('value'));
  reply_cnt = reply_cnt+1;
  element.innerText = "댓글 "+reply_cnt+"개";
}
function updateLikeInfo(elem) {
  var liked    = elem.getAttribute('data-bs-liked'), //좋아요 선택 여부
      show     = elem.getAttribute('data-bs-show'), //좋아요 모달 버튼
      hitId    = elem.getAttribute('data-bs-hitlike'), //좋아요 버튼
      modal    = elem.getAttribute('data-bs-pos'), //좋아요 a tag 영역
      totcnt   = elem.getAttribute('data-bs-totcnt'),
      hitElem  = document.getElementById(hitId),
      showElem = document.getElementById(show),
      modElem  = document.getElementById(modal),
      totElem  = document.getElementById(totcnt),
      like_cnt = Number(elem.getAttribute('data-bs-cnt'));//좋아요 

  if(liked == 1) {
    like_cnt = like_cnt-1;
    elem.setAttribute('data-bs-liked', 0);
    elem.setAttribute('data-bs-cnt', like_cnt);
    modElem.setAttribute('data-bs-cnt', like_cnt);
    hitElem.className  = 'far fa-thumbs-up';//좋아요 미선택
    console.log(hitElem);
    showElem.className = 'far fa-thumbs-up';
  } else {
    like_cnt = like_cnt+1;
    elem.setAttribute('data-bs-liked', 1);
    elem.setAttribute('data-bs-cnt', like_cnt);
    modElem.setAttribute('data-bs-cnt', like_cnt);
    hitElem.className  = 'fas fa-thumbs-up';
    showElem.className = 'fas fa-thumbs-up';
  }
  totElem.innerText = like_cnt+'개';
}

function callModal(strTarget, strTitleId, strTitle, strContentId, strContent) {
  $(document).ready(function() {
    $(strTitleId)[0].innerText = strTitle;
    $(strContentId)[0].innerHTML = strContent;
    $(strTarget).modal('show');   
  });
}

$(document).ready(() => {
  $('#alertModal').on('hidden.bs.modal', function () {    
    location.href = "/login";
  });
  $('#alertErrorModal').on('hidden.bs.modal', function (event) { 
  });
});

function updateLikeDb(elem) {

  const req = {
    question_id: elem.getAttribute('data-bs-key'),
    liked: elem.getAttribute('data-bs-liked'),
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
        updateLikeInfo(elem);
      } else {
          if(res.err) {
            return alert(res.err);
          }
          alert(res.msg);
      }
    }).catch((err) => {
  });
}

function replyQ(question_id, content, nick, node) {

  const req = {
      question_id: question_id,
      content: content,
  };

  fetch("/reply", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
  }).then((res) => res.json())
    .then((res) => {
        if(res.success) {
            // location.href = "/main";  
            var elemList = document.createElement('li');
            elemList.className = 'list-group-item';
            elemList.innerHTML = '<dl><dt><span>'+nick+'</span></dt><dd><span>'+content+'</span></dd></dl>';
            // console.log('#'+node);
            var mom = document.querySelector('#'+node);
            console.log(mom);
            // mom.appendChild(elemList);
            mom.insertBefore(elemList, mom.firstChild);            
            // var location = mom.offsetHeigth;
            // console.log(location);
            // window.scrollTo({top:location, behavior:'smooth'});
            mom.scrollIntoView(false);
        } else {
            if(res.err) {
              return alert(res.err);
            }
            alert(res.msg);
        }
    }).catch((err) => {
  });
}

function getReply(elem, question_id, node) {

  const req = {
      question_id: question_id,
  };

  fetch("/getReply", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
  }).then((res) => res.json())
    .then((res) => {
        if(res.success) {
            for(var i=0; i<res.result.length; i++) {
              var elemList = document.createElement('li');
              elemList.className = 'list-group-item';
              elemList.innerHTML = '<dl><dt><span>'+res.result[i].user_id+'</span></dt><dd><span>'+res.result[i].contents+'</span></dd></dl>';
              // console.log(elemList);
              // console.log('#'+node);
              var mom = document.querySelector('#'+node);
              // console.log(mom);
              // mom.appendChild(elemList);
              mom.insertBefore(elemList, mom.firstChild);                           
            }
            console.log(document.getElementById(elem.getAttribute('data-bs-tot')));
            document.getElementById(elem.getAttribute('data-bs-tot')).innerText = '댓글 '+res.result.length+'개';
        } else {
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
    }).catch((err) => {
  });
}

