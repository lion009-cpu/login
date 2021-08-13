"use strict";

window.onload = function(){
    
    var hw = document.getElementById('hw');
    var form = document.querySelector("form");
    var input = document.querySelector("input");
    var key = document.querySelector("name");  
    var value = document.querySelector("value");
    hw.addEventListener('click', () => {
        alert(key.value);
    })
}