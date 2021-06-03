"use strict";
function ClockViewSVG(){
    var self=this;

    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка

    self.start=function(model,field) {
        myModel = model;
        myField = field;

        //создаю (программно) 
        //ЭЛЕМЕНТЫ ЧАСОВ
        //нахожу соответствующий оберточный для часов div внутри рабочего элемента DOM (т.е. myField)
        var clockCont=myField.querySelector('.clock-container');

        var svgCont = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgCont.setAttribute('version', '1.1');
        svgCont.setAttribute('width', '260');
        svgCont.setAttribute('height', '260');
        svgCont.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        clockCont.append(svgCont);

        //большой круг
        var bigCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        bigCircle.setAttribute('cx', CLOCK_CENTER_POS);
        bigCircle.setAttribute('cy', CLOCK_CENTER_POS);
        bigCircle.setAttribute('r', BIG_CIRCLE_RADIUS);
        bigCircle.setAttribute('fill', BIG_CIRCLE_COLOR);
        svgCont.append(bigCircle);

        //центр
        var center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        center.setAttribute('cx', CLOCK_CENTER_POS);
        center.setAttribute('cy', CLOCK_CENTER_POS);
        center.setAttribute('r', CLOCK_CENTER_RADIUS);
        center.setAttribute('fill', CLOCK_CENTER_COLOR);
        svgCont.append(center);

        //маленькие кружочки с цифрами
        for (var i=1; i<=SMALL_CIRCLE_AMOUNT; i++) {
            var smallCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            
            //задаю положение кружочков, каждый на 30 град от соседнего
            var smallCirclePosX = Math.round(CLOCK_CENTER_POS + TO_NUMBERS_DISTANCE*Math.sin(i*ANGLE_ROTATE_RAD));
            var smallCirclePosY = Math.round(CLOCK_CENTER_POS - TO_NUMBERS_DISTANCE*Math.cos(i*ANGLE_ROTATE_RAD));

            smallCircle.setAttribute('cx', smallCirclePosX);
            smallCircle.setAttribute('cy', smallCirclePosY);
            smallCircle.setAttribute('r', SMALL_CIRCLE_RADIUS);
            smallCircle.setAttribute('fill', SMALL_CIRCLE_COLOR);

            var numberText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            numberText.innerHTML = i;
            numberText.setAttribute('x', smallCirclePosX);
            numberText.setAttribute('y', smallCirclePosY);
            numberText.setAttribute('text-anchor', 'middle');
            numberText.setAttribute('style', 'font-weight:'+ FONT_WEIGHT+'; font-family:'+ FONT_FAMILY);

            svgCont.append(smallCircle);
            svgCont.append(numberText);
        }

        //часовая стрелка
        var hourArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        hourArrow.setAttribute('class', 'hourArrow');
        hourArrow.setAttribute('x1', HOUR_START_POS_X);
        hourArrow.setAttribute('y1', HOUR_START_POS_Y);
        hourArrow.setAttribute('x2', HOUR_END_POS_X);
        hourArrow.setAttribute('y2', HOUR_END_POS_Y);
        hourArrow.setAttribute('stroke', HOUR_COLOR);
        hourArrow.setAttribute('stroke-width', HOUR_WIDTH);
        hourArrow.setAttribute('stroke-linecap', 'round');
        svgCont.append(hourArrow);

        //минутная стрелка
        var minuteArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        minuteArrow.setAttribute('class', 'minuteArrow');
        minuteArrow.setAttribute('x1', MINUTE_START_POS_X);
        minuteArrow.setAttribute('y1', MINUTE_START_POS_Y);
        minuteArrow.setAttribute('x2', MINUTE_END_POS_X);
        minuteArrow.setAttribute('y2', MINUTE_END_POS_Y);
        minuteArrow.setAttribute('stroke', MINUTE_COLOR);
        minuteArrow.setAttribute('stroke-width', MINUTE_WIDTH);
        minuteArrow.setAttribute('stroke-linecap', 'round');
        svgCont.append(minuteArrow);

        //секундная стрелка
        var secondArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        secondArrow.setAttribute('class', 'secondArrow');
        secondArrow.setAttribute('x1', SECOND_START_POS_X);
        secondArrow.setAttribute('y1', SECOND_START_POS_Y);
        secondArrow.setAttribute('x2', SECOND_END_POS_X);
        secondArrow.setAttribute('y2', SECOND_END_POS_Y);
        secondArrow.setAttribute('stroke', SECOND_COLOR);
        secondArrow.setAttribute('stroke-width', SECOND_WIDTH);
        secondArrow.setAttribute('stroke-linecap', 'round');
        svgCont.append(secondArrow);

        //ГОРОД И ЧАСОВОЙ ПОЯС
        //нахожу соответствующий оберточный для часов div внутри рабочего элемента DOM (т.е. myField)
        var cityNzone=myField.querySelector('.city-timezone');
        cityNzone.innerHTML = myModel.city + ' ' + myModel.timezone ; //и заполняю его
    }
        self.update=function() {
            var secondArrow = myField.querySelector('.secondArrow');
            secondArrow.setAttribute('transform', 'rotate('+ myModel.secStep +' '+CLOCK_CENTER_POS+' '+CLOCK_CENTER_POS+')');
            var minuteArrow = myField.querySelector('.minuteArrow');
            minuteArrow.setAttribute('transform', 'rotate('+ myModel.minStep +' '+CLOCK_CENTER_POS+' '+CLOCK_CENTER_POS+')');
            var hourArrow = myField.querySelector('.hourArrow');
            hourArrow.setAttribute('transform', 'rotate('+ myModel.hourStep +' '+CLOCK_CENTER_POS+' '+CLOCK_CENTER_POS+')');
        }
}