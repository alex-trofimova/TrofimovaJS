"use strict";

function PartController(){
    var self=this;

    var myModel = null; // с какой моделью работаю
    var myField = null; // внутри какого элемента DOM вёрстка    

    self.start=function(model,field) {
        myModel = model;
        myField = field;

        // осуществляю поиск фигуры
        var partToMove=document.getElementById(myModel.id);
        console.log(partToMove);

        // назначаю обработчик события mousedown
        partToMove.addEventListener('mousedown',self.startMove); 

    }

    self.startMove=function(EO){
        EO=EO||window.event;

        var partToChange=document.getElementById(myModel.id);

        myModel.startMoveAndRotate();

        //назначаю обработчики событий mousemove, mouseup и click
        document.addEventListener('mousemove',self.move);
        partToChange.addEventListener('mouseup',self.endMove);
        partToChange.addEventListener('click',self.rotate);

    }

    self.move=function(){
        var partToChange=document.getElementById(myModel.id);
        
        //удаляю обработчик события click, чтобы фигура не вращалась в конце движения
        partToChange.removeEventListener('click',self.rotate);
        
        myModel.move();
    }

    self.rotate=function(){
        myModel.rotate();
    }

    self.endMove=function(EO){
        var partToChange=document.getElementById(myModel.id);

        EO=EO||window.event;

        //удаляю обработчики событий mouseup и mousemove
        partToChange.removeEventListener('mouseup',self.startMove);
        document.removeEventListener('mousemove',self.move);

        myModel.endMove();
    }
}