/*
Сверстать проект VALID_FORM по образцу.
Сделать валидацию вводимых значений; правила валидации продумать самостоятельно, описать их в комментариях; 
как минимум, пустое (начальное) значение каждого из полей должно считаться ошибочным.
При уходе с текстового поля формы или изменении чекбокса, радиогруппы, выпадающего списка — валидировать 
только данное поле и в случае ошибки сообщение об ошибке сразу отобразить рядом с полем (сообщения об ошибках 
возле остальных полей не должны стираться); позволять пользователю уйти с поля, даже если оно заполнено с ошибкой.
При попытке отправки формы — валидировать сразу все поля и отобразить сразу все сообщения об ошибках рядом 
с ошибочно заполненными полями; скроллировать страницу к первому ошибочно заполненному полю, фокусировать это поле.
В качестве скрипта, обрабатывающего данные формы (атрибут action тега form), 
можно установить https://fe.it-academy.by/TestForm.php
*/

"use strict";

createSpan();

//функция создания пустого span-а для всех полей
function createSpan () {
    var wrapArr = document.getElementsByClassName('wrapper');
    for (var j = 0; j < wrapArr.length; j++) {
        var error = document.createElement('span');
        wrapArr[j].append(error);
        error.className = 'error';
    }
}

// осуществляю поиск формы по ее атрибуту name
var frm = document.forms['validform']; 

// осуществляю поиск каждого элемента формы по его атрибуту name
// подписываюсь на событие blur для него
// описывающую соответствующую функцию валидации

// 1) Поле "Разработчики"
var dev = frm.elements['developers'];
dev.addEventListener('blur',validateDevField);

//функция проверяет заполнение кирилицей
function validateDevField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var wrap = document.getElementById('developers');
    var error = wrap.querySelector('span');
    var dev = frm.elements['developers'];

    var valid = false; //переменная "успешности" прохождения валидации

    // переменная значения поля (без внешних пробелов)
    var value = dev.value.trim();
    
    //валидация на кирилицу
    var regexp = /[а-я]/gi;   

    if (!value) {
        error.textContent = 'Поле необходимо заполнить!';
    }

    else if (!(regexp.test(value))) {
        error.textContent = 'Нужно использовать только русские буквы';
    }

    else {
        error.textContent = '';
        valid = true;
    }
    return valid;
}

// 2) Поле "Название сайта"
var stnm = frm.elements['siteName'];
stnm.addEventListener('blur',validateSitenameField);

//функция проверяет чтобы название по длине не было больше 30 символов
function validateSitenameField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var wrap = document.getElementById('siteName');
    var error = wrap.querySelector('span');
    var stnm = frm.elements['siteName'];

    var valid = false;

    var maxlength = 30;

    // переменная значения поля (без внешних пробелов)
    var value = stnm.value.trim();

    if (!value) {
        error.textContent = 'Поле необходимо заполнить!';
    }

    else if (value.length > maxlength) {
        error.textContent = 'Название должно быть не длиннее '+ maxlength+ ' символов';
    }

    else {
        error.textContent = '';
        valid = true;
    }

    return valid;
}

// 3) Поле "URL сайта"
var sturl = frm.elements['siteUrl']; 
sturl.addEventListener('blur',validateSiteUrlField);

//функция проверяет в приемлемом ли формате указан url сайта
function validateSiteUrlField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var wrap = document.getElementById('siteUrl');
    var error = wrap.querySelector('span');
    var sturl = frm.elements['siteUrl'];

    var valid = false;

    // переменная значения поля (без внешних пробелов)
    var value = sturl.value.trim();

    var regexp = /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/gi;

    if (!value) {
        error.textContent = 'Поле необходимо заполнить!';
    }

    else if (!(regexp.test(value))) {
        error.textContent = 'URL сайта должно быть представлено минимально в виде test.com';
    }

    else {
        error.textContent = '';
        valid = true;
    }

    return valid;
}

// 4) Поле "Дата запуска сайта"
var stdt = frm.elements['siteDate'];
stdt.addEventListener('blur',validateSiteDateField);

//функция проверяет в приемлемом ли формате указана дата
function validateSiteDateField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var wrap = document.getElementById('siteDate');
    var error = wrap.querySelector('span');
    var stdt = frm.elements['siteDate'];

    var valid = false;

    // переменная значения поля (без внешних пробелов)
    var value = stdt.value.trim();

    //валидация на формат даты
    var regexp = /(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[012]).(19|20)\d\d/gi; 

    if (!value) {
        error.textContent = 'Поле необходимо заполнить!';
    }

    else if (!(regexp.test(value))) {
        error.textContent = 'Дату необходимо правильно ввести в формате дд.мм.гггг';
    }

    else {
        error.textContent = '';
        valid = true;
    }

    return valid;
}

// 5) Поле "Посетителей в сутки"
var visnmb = frm.elements['visitorsNumber'];
visnmb.addEventListener('blur',validateVisNumberField);

//функция проверяет положительно ли введенное число
function validateVisNumberField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var wrap = document.getElementById('visitorsNumber');
    var error = wrap.querySelector('span');
    var visnmb = frm.elements['visitorsNumber'];

    var valid = false;

    // переменная значения поля (без внешних пробелов)
    var value = visnmb.value.trim();

    //валидация на только цифры
    var regexp = /(?<![-.,])\b[0-9]+\b(?![.,][0-9])/gi; 

    if (!value) {
        error.textContent = 'Поле необходимо заполнить!';
    }

    else if (!(regexp.test(value))) {
        error.textContent = 'Значение должно быть целым положительным числом';
    }

    else {
        error.textContent = '';
        valid = true;
    }
    return valid;
}

// 6) Поле "E-mail для связи"
var mail = frm.elements['email'];
mail.addEventListener('blur',validateMailField);

//функция проверяет формат введения адреса
function validateMailField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var wrap = document.getElementById('email');
    var error = wrap.querySelector('span');
    var mail = frm.elements['email'];

    var valid = false;

    // переменная значения поля (без внешних пробелов)
    var value = mail.value.trim();

    //валидация на только цифры
    var regexp = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gi; 

    if (!value) {
        error.textContent = 'Поле необходимо заполнить!';
    }

    else if (!(regexp.test(value))) {
        error.textContent = 'Адрес почты необходимо ввести в формате aaa@bb.cc';
    }

    else {
        error.textContent = '';
        valid = true;
    }

    return valid;
}

// 7) Поле "Рубрика каталога"
var ctlg = frm.elements['catalog'];
ctlg.addEventListener('change',validateCatalogField);

//функция не позволяет выбрать "домашний уют"
function validateCatalogField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var wrap = document.getElementById('catalog');
    var error = wrap.querySelector('span');
    var ctlg = frm.elements['catalog'];

    var valid = false;

    // переменная значения поля
    var value = ctlg.value;
    if (value == '2') {
        error.textContent = 'Следует выбрать другую рубрику';
    }

    else {
        error.textContent = '';
        valid = true;
    }

    return valid;
}

// 8) Поле "Размещение"
var paymwrap = document.getElementById('payment');
var paym = paymwrap.querySelectorAll('[name=payment]');
for (var i = 0; i < paym.length; i++) {
    paym[i].addEventListener('click',validatePaymentField);
}

//функция не позволяет выбрать "VIP"
function validatePaymentField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var paymwrap = document.getElementById('payment');
    var error = paymwrap.querySelector('span');
    var paym = paymwrap.querySelector('[name=payment]:checked');
    
    var valid = false;
    
    if (paym == null) {
        error.textContent = 'Нужно выбрать одно из значений';
    }
    
    else if (paym.value == '33') {    
        error.textContent = 'Размещение VIP пока не доступно';
    }
    else {
        error.textContent = '';
        valid = true;
    }

    return valid;
}

// 9) Поле "Разрешить отзывы"
var votes = frm.elements['votes'];
votes.addEventListener('click',validateVotesField);

//функция отмечает выключение чекбокса
function validateVotesField (EO) {
    EO=EO||window.event;

    var votes = frm.elements['votes'];
    var wrap = document.getElementById('votes');
    var error = wrap.querySelector('span');

    var valid = false;

    var isChecked = votes.checked;

    if (!isChecked) {
        error.textContent = 'Вы не разрешаете разместить отзывы!';
    }

    else {
        error.textContent = '';
        valid = true;
    }

    return valid;
}

// 10) Поле "Описание сайта"
var desc = frm.elements['description'];
desc.addEventListener('blur',validateDescriptionField);

//функция проверяет чтобы название по длине не было больше 2000 символов
function validateDescriptionField (EO) {
    EO=EO||window.event;

    var frm = document.forms['validform'];
    var wrap = document.getElementById('description');
    var error = wrap.querySelector('span');
    var desc = frm.elements['description'];

    var valid = false;

    var maxlength = 2000;

    // переменная значения поля (без внешних пробелов)
    var value = desc.value.trim();

    if (!value) {
        error.textContent = 'Поле необходимо заполнить!';
    }

    else if (value.length > maxlength) {
        error.textContent = 'Описание должно быть не длиннее '+ maxlength+ ' символов';
    }

    else {
        error.textContent = '';
        valid = true;
    }

    return valid;
}

//Валидация при отправке формы
var frm = document.forms['validform'];
frm.addEventListener('submit',validateForm);

//функция валидации формы при отправке (submit)
function validateForm (EO) {
    EO=EO||window.event;

    try {
        /*вызываю функции валидации всех полей и
        прописываю условия непрохождения валидации:
        1. неотправки на сервер; 
        2. скролла к этому полю и фокусировки поля
        */
        
        // 1) Поле "Разработчики"
        var dev = frm.elements['developers'];
        var devVal = validateDevField ();
        // 2) Поле "Название сайта"
        var stnm = frm.elements['siteName'];
        var stnmVal = validateSitenameField ();
        // 3) Поле "URL сайта"
        var sturl = frm.elements['siteUrl']; 
        var sturlVal = validateSiteUrlField ();
        // 4) Поле "Дата запуска сайта"
        var stdt = frm.elements['siteDate'];
        var stdtVal = validateSiteDateField ();
        // 5) Поле "Посетителей в сутки"
        var visnmb = frm.elements['visitorsNumber'];
        var visnmbVal = validateVisNumberField ();
        // 6) Поле "E-mail для связи"
        var mail = frm.elements['email'];
        var mailVal = validateMailField ();
        // 8) Поле "Размещение"
        var paymwrap = document.getElementById('payment');
        var paymVal = validatePaymentField ();
        // 9) Поле "Разрешить отзывы"
        var votes = frm.elements['votes'];
        var votesVal = validateVotesField ();
        // 10) Поле "Описание сайта"
        var desc = frm.elements['description'];
        var descVal = validateDescriptionField ();

        //делаю условия вложенными друг в друга, 
        //причем в глубине располагаю условие самого первого поля (для того чтобы фокусировка к нему сначала шла)
        if (!descVal) {
            desc.focus();
            if (!votesVal) {
                votes.focus();
                if (!paymVal) {
                    paymwrap.scrollIntoView();
                    if (!mailVal) {
                        mail.focus();
                        if (!visnmbVal) {
                            visnmb.focus();
                            if (!stdtVal) {
                                stdt.focus();
                                if (!sturlVal) {
                                    sturl.focus();
                                    if (!stnmVal) {
                                        stnm.focus();
                                        if (!devVal) {
                                            dev.focus();
                                            EO.preventDefault();
                                            return;
                                        }
                                    EO.preventDefault();
                                    return;
                                    }
                                    EO.preventDefault();
                                    return;
                                }
                                EO.preventDefault();
                                return;
                            }
                            EO.preventDefault();
                            return;
                        }
                        EO.preventDefault();
                        return;
                    }
                    EO.preventDefault();
                    return;
                }
                EO.preventDefault();
                return;
            }
            EO.preventDefault();
            return;
        }
        
        //запускаю отдельно, т.к. это поле всегда заполнено по умолчанию
        //7) Поле "Рубрика каталога"
        var ctlg = frm.elements['catalog'];
        var ctlgVal = validateCatalogField ();
        if (!ctlgVal) {
            EO.preventDefault();
            ctlg.focus();
            return;
        }
    
    }
    catch ( ex ) {
        alert('Cбой отправки сообщения!');
        EO.preventDefault();
    }
}    

