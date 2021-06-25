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
console.log(fixedElemArr);
console.log(fixedElemAreaTotal);



//ОТРИСОВКА ФИГУР

//ПАЛИТРЫ ЦВЕТОВ
var paletteArr = [];
var paletteArr1 = ['#368036', '#003366', '#00bfff', '#b5262b', '#ffba00', '#cd5700'];
var paletteArr2 = ['#2683c6', '#84acb6', '#7a8c8e', '#75bda7', '#58b6c0', '#3494ba'];
var paletteArr3 = ['#9c6a6a', '#e64823', '#ec6f16', '#ce8d3e', '#f8921d', '#ffca08'];

paletteArr=paletteArr1;


//вызов функции загрузки данных для отрисовки фигур
loadData();

//описание функции
function loadData() {
    $.ajax("json/data1.json",
        {   type:'GET', 
            dataType:'json', 
            success: function (data) {
                useDataToCreateElements(data);    
            },
            error:errorHandler }
    );
}

function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
}

function useDataToCreateElements(arr) {
    for (var i=0; i<arr.length; i++){

        // var argStr = arr[i].join(',');
        // console.log(argStr);

        //создаю все компоненты MVC
        var fig = new PartModel(arr[i][0], arr[i][1], arr[i][2], arr[i][3], arr[i][4], arr[i][5], 
                                arr[i][6], arr[i][7], arr[i][8], arr[i][9], arr[i][10], arr[i][11],
                                arr[i][12], arr[i][13], arr[i][14], arr[i][15]);
        var viewFig = new PartView();
        var controlFig= new PartController();

        //связываю компоненты
        fig.start(viewFig, controlFig);
        viewFig.start(fig, svgContainer);

        //первичное отображение фигуры
        viewFig.draw();

        //запускаю контроллер
        controlFig.start(fig, svgContainer);
    }

}

//назначаю обработчик события keypress
window.addEventListener('keypress',chooseElem);

var i=1;

function chooseElem(event){
    var code = event.charCode || event.which;
    var elems = document.getElementsByTagName('path');
    console.log(elems.length);
    if (code === 112) {//клавиша p
        event.preventDefault();
        if (i<elems.length) {
            elems[i].setAttribute('stroke', '#323232');
            elems[i].classList.add('chosen');
            elems[i-1].setAttribute('stroke', 'none');
            elems[i-1].classList.remove('chosen');
            console.log('p нажат');
            console.log(i);
            console.log(elems[i]);
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