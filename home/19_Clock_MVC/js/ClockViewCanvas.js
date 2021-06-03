"use strict";
function ClockViewCanvas(){
    var self=this;

    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка

    self.start=function(model,field) {
        myModel = model;
        myField = field;

        //нахожу соответствующий оберточный для часов div внутри рабочего элемента DOM (т.е. myField)
        var clockCont=myField.querySelector('.clock-container');
        var canvasCont = document.createElement('canvas');
        canvasCont.setAttribute('class', 'canvasContainer');
        canvasCont.setAttribute('width', '260');
        canvasCont.setAttribute('height', '260');
        clockCont.append(canvasCont);

        //ГОРОД И ЧАСОВОЙ ПОЯС
        //нахожу соответствующий оберточный для часов div внутри рабочего элемента DOM (т.е. myField)
        var cityNzone=myField.querySelector('.city-timezone');
        cityNzone.innerHTML = myModel.city + ' ' + myModel.timezone ; //и заполняю его
    }    


    self.update=function() {
        //перерисовываю (программно) 
        //ЭЛЕМЕНТЫ ЧАСОВ
        var clockCont=myField.querySelector('.clock-container');
        var canvasCont = clockCont.querySelector('.canvasContainer');
        var context = canvasCont.getContext('2d');

        //большой круг
        context.fillStyle = BIG_CIRCLE_COLOR;
        context.beginPath();
        context.arc(CLOCK_CENTER_POS, CLOCK_CENTER_POS, BIG_CIRCLE_RADIUS, 0, 2*Math.PI, false);
        context.fill();

        //центр
        context.fillStyle = CLOCK_CENTER_COLOR;
        context.beginPath();
        context.arc(CLOCK_CENTER_POS, CLOCK_CENTER_POS, CLOCK_CENTER_RADIUS, 0, 2*Math.PI, false);
        context.fill();

        //маленькие кружочки с цифрами
        for (var i=1; i<=SMALL_CIRCLE_AMOUNT; i++) {
            var smallCirclePosX = Math.round(CLOCK_CENTER_POS + TO_NUMBERS_DISTANCE*Math.sin(i*ANGLE_ROTATE_RAD));
            var smallCirclePosY = Math.round(CLOCK_CENTER_POS - TO_NUMBERS_DISTANCE*Math.cos(i*ANGLE_ROTATE_RAD));

            context.fillStyle = SMALL_CIRCLE_COLOR;
            context.beginPath();
            context.arc(smallCirclePosX, smallCirclePosY, SMALL_CIRCLE_RADIUS, 0, 2*Math.PI, false);
            context.fill();

            context.fillStyle = TEXT_COLOR;
            context.font = 'normal '+FONT_WEIGHT+' '+FONT_SIZE+'px '+FONT_FAMILY;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(i,smallCirclePosX,smallCirclePosY);
        }

        //часовая стрелка
        //учитываю, что начало стрелки и центр вращения не совпадают! Для этого "разбиваю" стрелку на 2 части
        //коэффицциенты 0.9 и 0.1 используются для пересчета длин большой и маленькой части стрелки, соответственно
        //т.е. пересчитываю координаты для начала и конца для каждого такого поворота, чтобы "перерисовывать" стрелку
        var hourStep = myModel.hourStep*Math.PI/180;
        var hourArrowStartPosX = Math.round(CLOCK_CENTER_POS - 0.1*HOUR_LENGTH*Math.sin(hourStep));
        var hourArrowStartPosY = Math.round(CLOCK_CENTER_POS + 0.1*HOUR_LENGTH*Math.cos(hourStep));
        var hourArrowEndPosX = Math.round(CLOCK_CENTER_POS + 0.9*HOUR_LENGTH*Math.sin(hourStep));
        var hourArrowEndPosY = Math.round(CLOCK_CENTER_POS - 0.9*HOUR_LENGTH*Math.cos(hourStep));
        
        //сама отрисовка
        context.strokeStyle = HOUR_COLOR; //цвет стрелки
        context.lineWidth = HOUR_WIDTH; // ширина стрелки
        context.lineCap = 'round'; //закругление
        context.beginPath();
        context.moveTo(hourArrowStartPosX, hourArrowStartPosY);
        context.lineTo(hourArrowEndPosX, hourArrowEndPosY);
        context.stroke();

        //минутная стрелка
        //аналогичный пересчет координат
        var minStep = myModel.minStep*Math.PI/180;
        var minuteArrowStartPosX = Math.round(CLOCK_CENTER_POS - 0.1*MINUTE_LENGTH*Math.sin(minStep));
        var minuteArrowStartPosY = Math.round(CLOCK_CENTER_POS + 0.1*MINUTE_LENGTH*Math.cos(minStep));
        var minuteArrowEndPosX = Math.round(CLOCK_CENTER_POS + 0.9*MINUTE_LENGTH*Math.sin(minStep));
        var minuteArrowEndPosY = Math.round(CLOCK_CENTER_POS - 0.9*MINUTE_LENGTH*Math.cos(minStep));
        
        //сама отрисовка
        context.strokeStyle = MINUTE_COLOR; //цвет стрелки
        context.lineWidth = MINUTE_WIDTH; // ширина стрелки
        context.lineCap = 'round'; //закругление
        context.beginPath();
        context.moveTo(minuteArrowStartPosX, minuteArrowStartPosY);
        context.lineTo(minuteArrowEndPosX, minuteArrowEndPosY);
        context.stroke();

        //секундная стрелка
        //аналогичный пересчет координат
        var secStep = myModel.secStep*Math.PI/180;
        var secondArrowStartPosX = Math.round(CLOCK_CENTER_POS - 0.1*SECOND_LENGTH*Math.sin(secStep));
        var secondArrowStartPosY = Math.round(CLOCK_CENTER_POS + 0.1*SECOND_LENGTH*Math.cos(secStep));
        var secondArrowEndPosX = Math.round(CLOCK_CENTER_POS + 0.9*SECOND_LENGTH*Math.sin(secStep));
        var secondArrowEndPosY = Math.round(CLOCK_CENTER_POS - 0.9*SECOND_LENGTH*Math.cos(secStep));
        
        //сама отрисовка
        context.strokeStyle = SECOND_COLOR; //цвет стрелки
        context.lineWidth = SECOND_WIDTH; // ширина стрелки
        context.lineCap = 'round'; //закругление
        context.beginPath();
        context.moveTo(secondArrowStartPosX, secondArrowStartPosY);
        context.lineTo(secondArrowEndPosX,secondArrowEndPosY);
        context.stroke();
    }
}