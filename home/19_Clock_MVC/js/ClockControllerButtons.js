"use strict";

function ClockControllerButtons(){
    var self=this;

    var myModel = null; // с какой моделью работаю
    var myField = null; // внутри какого элемента DOM вёрстка

    self.start=function(model,field) {
        myModel = model;
        myField = field;

        // осущетсвляю поиск кнопок
        var buttonStop=myField.querySelector('.stop');
        var buttonStart=myField.querySelector('.start');

        // назначаю обработчики событий
        buttonStop.addEventListener('click',self.stopTimer);
        buttonStart.addEventListener('click',self.startTimer);    
    }

    self.stopTimer=function() {
        myModel.stop(); // контроллер вызывает метод модели stop
    }

    self.startTimer=function() {
        myModel.run(); // контроллер вызывает метод модели start
        //myModel.updateView();
    }
}