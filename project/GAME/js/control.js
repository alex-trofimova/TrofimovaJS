"use strict";
//1. Выбор фигуры с клавиатуры
window.addEventListener('keypress',chooseElem);

var i=1;

function chooseElem(event){
    var code = event.charCode || event.which;
    var elems = document.getElementsByTagName('path');
    if (code === 112) {//клавиша p
        event.preventDefault();
        if (i<elems.length) {
            elems[i].setAttribute('stroke', '#323232');
            elems[i].classList.add('chosen');
            elems[i-1].setAttribute('stroke', 'none');
            elems[i-1].classList.remove('chosen');
            i++;            
        }
        else {
            elems[elems.length-1].setAttribute('stroke', 'none');
            elems[i-1].classList.remove('chosen');
            elems[0].setAttribute('stroke', '#323232');
            elems[0].classList.add('chosen');
            console.log(elems[0]);
            i=1;   
        }
    }
}

//2. Нажатие на значок Мышь (и закрытие модального окна)
var mouseControlButton = document.querySelector(".mouse_control");
mouseControlButton.addEventListener('click',showMouseModal);

function showMouseModal(){
    var mouseControlModal = document.querySelector(".modal_mouse");
    mouseControlModal.classList.remove('hidden');
    mouseControlModal.classList.add('show');
    var closeButton = mouseControlModal.querySelector(".modal_close_icon");
    closeButton.addEventListener('click',closeModal);
}

//3. Нажатие на значок Клавиатура (и закрытие модального окна)
var keyboardControlButton = document.querySelector(".keyboard_control");
keyboardControlButton.addEventListener('click',showKeyboardModal);

function showKeyboardModal(){
    var keyboardControlModal = document.querySelector(".modal_keyboard");
    keyboardControlModal.classList.remove('hidden');
    keyboardControlModal.classList.add('show');
    var closeButton = keyboardControlModal.querySelector(".modal_close_icon");
    closeButton.addEventListener('click',closeModal);
}

function closeModal(){
    var windowModal = document.getElementsByClassName('modal');
    console.log(windowModal);
    for (var i=0; i<windowModal.length;i++) {
        if (windowModal[i].classList.contains('show')){
                windowModal[i].classList.add('hidden');
                windowModal[i].classList.remove('show');
        }
    }
}

//4. Закрытие модального окна по клавише Esc
window.addEventListener('keydown',closeModalEsc);

function closeModalEsc(event){
    var code = event.charCode || event.which;
    if (code === 27) {//клавиша Esc
        event.preventDefault();
        console.log('клавиша Esc нажата');
        closeModal();
    }
    else return;
}

//5. Выключение звука
var soundOnButton = document.querySelector(".sound-on");
soundOnButton.addEventListener('click',turnOffSound);

function turnOffSound() {
    var soundOnButton = document.querySelector(".sound-on");
    soundOnButton.classList.add('hidden');
    var soundOffButton = document.querySelector(".sound-off");
    soundOffButton.classList.remove('hidden');
    soundStatus = false;
}

//6. Включение звука
var soundOffButton = document.querySelector(".sound-off");
soundOffButton.addEventListener('click',turnOnSound);

function turnOnSound() {
    var soundOnButton = document.querySelector(".sound-on");
    soundOnButton.classList.remove('hidden');
    var soundOffButton = document.querySelector(".sound-off");
    soundOffButton.classList.add('hidden');
    soundStatus = true;
}