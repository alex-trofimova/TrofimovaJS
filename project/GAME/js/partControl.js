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

        // назначаю обработчик события mousedown
        partToMove.addEventListener('mousedown',self.startMove);

        //подписываюсь на событие клавиатуры keydown
        document.addEventListener("keydown", self.keyDownControl, false);
    }

    self.keyDownControl=function(EO){
        EO=EO||window.event;
        var partToControl=document.getElementById(myModel.id);

        if (partToControl.classList.contains('chosen')){
            if(EO.keyCode === 38) {//кнопка вверх
                console.log('эелемент ' +myModel.id+ ' сдвинулся вверх');
                myModel.moveUp();
            }

            if(EO.keyCode === 40) {//кнопка вниз
                EO.preventDefault();
                console.log('эелемент ' +myModel.id+ ' сдвинулся вниз');
                myModel.moveDown();
            }

            if(EO.keyCode === 37) {//кнопка влево
                EO.preventDefault();
                console.log('эелемент ' +myModel.id+ ' сдвинулся влево');
                myModel.moveLeft();
            }

            if(EO.keyCode === 39) {//кнопка вправо
                EO.preventDefault();
                console.log('эелемент ' +myModel.id+ ' сдвинулся вправо');
                myModel.moveRight();
            }

            if(EO.keyCode === 32) {//пробел (для поворота)
                EO.preventDefault();
                console.log('эелемент ' +myModel.id+ ' повернулся на 45 град');
                myModel.rotate();
            }

            if(EO.keyCode === 13) {//Enter (для фиксирования)
                EO.preventDefault();
                console.log('эелемент ' +myModel.id+ ' зафиксирован');
                myModel.fixByKey();
            }

            // if(EO.keyCode === 33) {//pageUp (для отфиксирования)
               
            //     console.log('эелемент ' +myModel.id+ ' зафиксирован');
            //     myModel.unfix();
            // }



        }
        else return;
    }

    // self.keyUpControl=function(EO){
    //     EO=EO||window.event;
    //     var partToControl=document.getElementById(myModel.id);

    //     if (partToControl.classList.contains('chosen')){
    //         if(EO.keyCode === 38) {
    //             console.log('эелемент ' +myModel.id+ ' уже не двигается вверх');
    //         }

    //         if(EO.keyCode === 40) {
    //             console.log('эелемент ' +myModel.id+ ' уже не двигается вниз');
    //         }
    //         if(EO.keyCode === 37) {
    //             console.log('эелемент ' +myModel.id+ ' уже не двигается влево');
    //         }

    //         if(EO.keyCode === 39) {
    //             console.log('эелемент ' +myModel.id+ ' уже не двигается вправо');
    //         }
    //     }
    //     else return;
    // }



    self.startMove=function(EO){
        EO=EO||window.event;

        var partToChange=document.getElementById(myModel.id);

        myModel.startMoveAndRotate();

        //назначаю обработчики событий mousemove, mouseup и click
        document.addEventListener('mousemove',self.move);
        partToChange.addEventListener('mouseup',self.endMove);
        partToChange.addEventListener('click', self.rotate);
        partToChange.addEventListener('contextmenu', self.fix);
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

    self.fix=function(){
        myModel.fix();
    }


    self.endMove=function(){
        myModel.endMove();

        var partToChange=document.getElementById(myModel.id);       

        //удаляю обработчики событий mouseup и mousemove
        partToChange.removeEventListener('mouseup',self.endMove);
        document.removeEventListener('mousemove',self.move);
    }
}