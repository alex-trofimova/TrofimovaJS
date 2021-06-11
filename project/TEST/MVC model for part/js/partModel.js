"use strict";
function PartModel(level, cutFrom, number, x1, y1, x2, y2, x3, y3){
    var self=this;

    var myView = null;
    var myController = null;

    self.level = level; //номер уровня (от 1 до 6)
    self.cutFrom = cutFrom; //номер квадрата, из которого вырезана фигура (от 1 до 6)
    self.number = number; //номер фигуры в квадрате (может быть 1; 1 и 2; и т.д.)

    self.id = "fig_"+ self.level + "_" +  self.cutFrom + "_" + self.number;

    //координаты
    self.x1 = x1;
    self.y1 = y1;
    self.x2 = x2;
    self.y2 = y2;
    self.x3 = x3;
    self.y3 = y3;

    //координаты смещения (параметры translate у transform)
    self.transX = 0;
    self.transY = 0;

    //координаты поворота (параметр rotate у transform)
    self.rotateAngle = 0;
    self.rotateOriginX = self.x1/2+self.x2/2+self.transX;
    self.rotateOriginY = self.y1/2+self.y2/2+self.transY;

    //инициализация (потом вызову в основном скрипте)
    self.start=function(view,controller) {
        myView = view;
        myController = controller;        
    }

    //обновление представления (View)
    self.updateView=function() {
        if (myView) {
            myView.update(); 
        }    
    }

   //ПОДГОТОВКА К ПЕРЕМЕЩЕНИЮ И ВРАЩЕНИЮ ФИГУРЫ
    var pressShiftLeft = 0;
    var pressShiftTop = 0;

    self.startMoveAndRotate =function(EO) {

        EO=EO||window.event;

        EO.preventDefault();

        var draggedPart=EO.target;

        draggedPart.setAttribute('cursor', 'pointer');

        var partArr = draggedPart.getAttribute('transform').replace(/[()]/g, '').split(" ");
        self.transX = parseFloat(partArr[1]);
        self.transY = parseFloat(partArr[2]);
        self.rotateAngle = parseFloat(partArr[4]);
        self.rotateOriginX = parseFloat(partArr[5]);
        self.rotateOriginY = parseFloat(partArr[6]);

        pressShiftLeft = EO.clientX - self.transX;
        pressShiftTop = EO.clientY - self.transY;

    }
    //ПЕРЕМЕЩЕНИЕ ФИГУРЫ

    self.move =function(EO) {
        EO=EO||window.event;

        EO.preventDefault();

        self.transX = EO.pageX - pressShiftLeft;
        self.transY = EO.pageY - pressShiftTop;

        self.updateView();
    }

    //ВРАЩЕНИЕ ФИГУРЫ
    self.rotate =function(EO) {
        EO=EO||window.event;

        EO.preventDefault();

        self.rotateAngle -= 45; //шаг поворота - потом вынесу в константы

        self.updateView();
    }

    self.endMove = function(EO) {
        EO=EO||window.event;

        var draggedPart=EO.target;

        draggedPart.setAttribute('cursor', 'default');

        EO.preventDefault();
    }

    
    

}