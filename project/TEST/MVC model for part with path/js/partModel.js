"use strict";
function PartModel(level, type, x0, y0, x1, y1, x2, y2, x3, y3){
    var self=this;

    var myView = null;
    var myController = null;

    self.level = level; //номер уровня (от 1 до 6)
   
    self.type = type; //количество углов в фигуре (3 - трехугольник, 4 - четырехуголник, 6 - шестиугольник)

    self.id = "fig_"+ self.level + "_type_" +  self.type;

    //координаты начальной точки
    self.x0 = x0;
    self.y0 = y0;

    if (self.type == '3') {//если это треугольник
        
        self.l1_x = x1;
        self.l1_y = y1;
        self.l2_x = x2;
        self.l2_y = y2;

        self.dataHash = {m: [self.x0, self.y0],
                         l1: [self.l1_x, self.l1_y],
                         l2: [self.l2_x, self.l2_y],
                        };

    }

    if (self.type == '4') {//если это четырехугольник
        
        self.l1_x = x1;
        self.l1_y = y1;
        self.l2_x = x2;
        self.l2_y = y2;
        self.l3_x = x3;
        self.l3_y = y3;

        self.dataHash = {m: [self.x0, self.y0],
                         l1: [self.l1_x, self.l1_y],
                         l2: [self.l2_x, self.l2_y],
                         l3: [self.l3_x, self.l3_y],
                        };

    }

    //координаты смещения (параметры translate у transform)
    self.transX = 0;
    self.transY = 0;

    //координаты поворота (параметр rotate у transform)
    self.rotateAngle = 0;
    self.rotateOriginX = self.x0+self.transX;
    self.rotateOriginY = self.y0+self.transY;

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