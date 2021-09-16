"use strict";

async function getGender() {

    return new Promise((resolve, reject) => {
        resolve($('input:radio[name="gender"]:checked').val());
    })
}

const id = document.querySelector("#id"),
      pwd= document.querySelector("#pwd"),
      confirmPwd= document.querySelector("#confirm-pwd"),
      eMail= document.querySelector("#e-mail"),      
      registerbtn= document.querySelector("#button");

registerbtn.addEventListener("click", register);

async function register() {

    var strTitle     = '필수항목누락.',
            strContent   = '',
            strTarget    = '#alertErrorModal',
            strTitleId   = '#alertErrorModalLabel',
            strContentId = '#alertErrorModalBody';

    if(!id.value || !pwd.value || !confirmPwd.value || !eMail.value || pwd.value !== confirmPwd.value) {
        if(!id.value) {
            strContent   = '<h4><span>닉네임이 반드시 필요합니다!!!</span></h4>';
        } else if(!pwd.value) {
            strContent   = '<h4><span>비밀번호가 반드시 필요합니다!!!</span></h4>';
        } else if(!confirmPwd.value) {
            strContent   = '<h4><span>비밀번호확인은 반드시 필요합니다!!!</span></h4>';
        } else if(!eMail.value) {
            strContent   = '<h4><span>이메일이 반드시 필요합니다!!!</span></h4>';
        } else if(pwd.value !== confirmPwd.value) {
            strContent   = '<h4><span>비밀번호가 일치하지 않습니다!!!</span></h4>';
        }
        callModal(strTarget, strTitleId, strTitle, strContentId, strContent);
    } else {     
        try {
            console.log('before getGender');
            var gender = await getGender();
            const req = {
                id: id.value,
                pwd: pwd.value,
                confirmPwd: confirmPwd.value,
                eMail: eMail.value,
                zender: gender,
            };
            console.log('after getGender');
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
