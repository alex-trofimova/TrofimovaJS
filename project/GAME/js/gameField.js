"use strict";

var svgContainer = document.getElementById('svgcont');

var squareCont = document.createElementNS("http://www.w3.org/2000/svg", "rect");
squareCont.setAttribute('x', 80);
squareCont.setAttribute('y', 10);
squareCont.setAttribute('width', 680);
squareCont.setAttribute('height', 460);
squareCont.setAttribute('fill', '#c3c3c3');
svgContainer.append(squareCont);

//функция отрисовки пустых квадратов
drawSquares();

//описание функции
function drawSquares() {
    $.ajax("json/squares.json",
        {   type:'GET', 
            dataType:'json', 
            success: function (data) {
                useDataToDrawSquares(data);    
            },
            error:errorHandler }
    );
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

function useDataToDrawSquares(arr) {
    for (var i=0; i<arr.length; i++){
        var square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        square.setAttribute('x', arr[i][0]);
        square.setAttribute('y', arr[i][1]);
        square.setAttribute('width', arr[i][2]-arr[i][0]);
        square.setAttribute('height', arr[i][3]-arr[i][1]);
        square.setAttribute('fill', '#e6e6e6');
        square.setAttribute('class', 'square'+i);
        svgContainer.append(square);
    }
}

var elemCont = document.createElementNS("http://www.w3.org/2000/svg", "rect");
elemCont.setAttribute('x', 800);
elemCont.setAttribute('y', 0);
elemCont.setAttribute('width', 430);
elemCont.setAttribute('height', 480);
elemCont.setAttribute('fill', '#c3c3c3');
elemCont.setAttribute('id', "base")
svgContainer.append(elemCont);

//массив с инфо о фиксированных элементах
var fixedElemArr = [
        {}, //квадрат №1
        {}, //квадрат №2
        {}, //квадрат №3
        {}, //квадрат №4
        {}, //квадрат №5
        {}, //квадрат №6
    ];

var fixedElemAreaTotal = 0;

//массив с инфо о времени прохождения уровня

var timeLevelArr = [60];

var bestTimeLevel = Math.min.apply(null, timeLevelArr);
console.log(bestTimeLevel);

//обмен данными с удаленным сервером
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var stringName = 'TROFIMOVA_PROJECT_COLOR_SQUARES';
var updatePassword;

//чтение данных
getData();

function getData() {
    $.ajax(
        {
            url : ajaxHandlerScript, 
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName },
            cache : false, 
            success : readReady, error : errorHandler
        }
    );
}

function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        var levelInfo=JSON.parse(callresult.result);
        var quantityInfoSpan=document.querySelector(".quantity_info");
        quantityInfoSpan.textContent=levelInfo.length;
        var bestTimeInfoSpan=document.querySelector(".best-time_info");
        bestTimeInfoSpan.textContent=Math.max.apply(null, levelInfo);
    }   
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}
