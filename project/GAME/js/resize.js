"use strict";

//ИЗМЕНЕНИЕ ШИРИНЫ ЭКРАНА
window.onresize=resizeGameField;
var contGame = document.querySelector(".game_container");
contGame.width = document.body.clientWidth;

function resizeGameField() {
    var contGame = document.querySelector(".game_container");
    contGame.width = document.body.clientWidth;
    console.log(contGame.width);
    var contGame = document.querySelector(".game_container");
    if (contGame.width<540) {
        var svgCont = document.getElementById('svgcont');
        console.log('ширина стала меньше 540');
        svgCont.setAttribute('viewBox', '40 0 760 700');
    }
    else {
        var svgCont = document.getElementById('svgcont');
        svgCont.setAttribute('viewBox', '0 0 1200 480');
    }
}