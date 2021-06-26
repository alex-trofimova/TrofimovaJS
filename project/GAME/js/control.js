"use strict";
//1. Запуск таймера
var startTime;
var timer1;
var timeInSec;

start();

function start() {
    startTime = new Date();
    timer1 = setInterval(tick,1000);
    timeInSec=0;
}

function tick(){
    var timeInSec=Math.round(((new Date)-startTime)/1000);

    if ((fixedElemAreaTotal > 240000)||(fixedElemAreaTotal == 240000)) {
        clearInterval(timer1);
        console.log('таймер остановлен!');

        //запись новых данных на удаленный сервер
        loadNewDatatoAJAX();

        function loadNewDatatoAJAX() {
            var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
            var stringName = 'TROFIMOVA_PROJECT_COLOR_SQUARES';
            var updatePassword;
       
           updatePassword=Math.random();
           $.ajax( {   url : ajaxHandlerScript, 
                       type : 'POST', dataType:'json',
                       data : { f : 'LOCKGET', n : stringName, p : updatePassword },
                       cache : false,
                       success : lockGetReady, error : errorHandler
                       }
                   );
       
            function lockGetReady(callresult) {
                if ( callresult.error!=undefined )
                    alert(callresult.error);
                else {
                   var levelInfo=JSON.parse(callresult.result);
                   levelInfo.push(timeInSec);
       
                    $.ajax( {
                            url : ajaxHandlerScript, 
                            type : 'POST',  dataType:'json',
                            data : { f : 'UPDATE', n : stringName, v : JSON.stringify(levelInfo), p : updatePassword },
                            cache : false,
                            success : updateReady, error : errorHandler
                        }
                    );
                }
            }
       
            function updateReady(callresult) {
                if ( callresult.error!=undefined )
                    alert(callresult.error);
            }
       
            function errorHandler(jqXHR,statusStr,errorStr) {
                alert(statusStr+' '+errorStr);
            }
       }

    }
}

//2. Вывод информации о потере данных при обновлении или закрытии страницы
window.onbeforeunload=befUnload;

function befUnload(EO) {
    EO=EO||window.event;
    //если ни один элемент не зафиксирован - значит изменений нет!
    if ( !(fixedElemAreaTotal === 0) ) {
        EO.returnValue='А у вас есть несохранённые изменения!';
    } 
};

//3. Выбор фигуры с клавиатуры
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

//4. Нажатие на значок Мышь (и закрытие модального окна)
var mouseControlButton = document.querySelector(".mouse_control");
mouseControlButton.addEventListener('click',showMouseModal);

function showMouseModal(){
    var mouseControlModal = document.querySelector(".modal_mouse");
    mouseControlModal.classList.remove('hidden');
    mouseControlModal.classList.add('show');
    var closeButton = mouseControlModal.querySelector(".modal_close_icon");
    closeButton.addEventListener('click',closeModal);
}

//5. Нажатие на значок Клавиатура (и закрытие модального окна)
var keyboardControlButton = document.querySelector(".keyboard_control");
keyboardControlButton.addEventListener('click',showKeyboardModal);

function showKeyboardModal(){
    var keyboardControlModal = document.querySelector(".modal_keyboard");
    keyboardControlModal.classList.remove('hidden');
    keyboardControlModal.classList.add('show');
    var closeButton = keyboardControlModal.querySelector(".modal_close_icon");
    closeButton.addEventListener('click',closeModal);
}

//6. Нажатие на значок Инфо (и закрытие модального окна)
var infoButton = document.querySelector(".level_info");
infoButton.addEventListener('click',showInfoModal);

function showInfoModal(){
    var infoModal = document.querySelector(".modal_info");
    infoModal.classList.remove('hidden');
    infoModal.classList.add('show');
    var closeButton = infoModal.querySelector(".modal_close_icon");
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

//7. Закрытие модального окна по клавише Esc
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

//8. Выключение звука
var soundOnButton = document.querySelector(".sound-on");
soundOnButton.addEventListener('click',turnOffSound);

function turnOffSound() {
    var soundOnButton = document.querySelector(".sound-on");
    soundOnButton.classList.add('hidden');
    var soundOffButton = document.querySelector(".sound-off");
    soundOffButton.classList.remove('hidden');
    soundStatus = false;
}

//9. Включение звука
var soundOffButton = document.querySelector(".sound-off");
soundOffButton.addEventListener('click',turnOnSound);

function turnOnSound() {
    var soundOnButton = document.querySelector(".sound-on");
    soundOnButton.classList.remove('hidden');
    var soundOffButton = document.querySelector(".sound-off");
    soundOffButton.classList.add('hidden');
    soundStatus = true;
}