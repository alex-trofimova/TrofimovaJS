"use strict";

//константы
      //ЧАСЫ
      const BIG_CIRCLE_RADIUS = 130, //радиус циферблата (половина диаметра большого круга)
      BIG_CIRCLE_COLOR = '#fcca66', //цвет заливки

      //ЦЕНТР часов в виде маленького кружочка
      CLOCK_CENTER_RADIUS = BIG_CIRCLE_RADIUS*0.01, //его радиус в процентах (=1%) от размеров циферблата
      CLOCK_CENTER_POS = BIG_CIRCLE_RADIUS, //положение (с учетом размеров)
      CLOCK_CENTER_COLOR = 'black', //цвет заливки
      
      //ЦИФРЫ (12 кружков с цифрами)
      SMALL_CIRCLE_RADIUS = BIG_CIRCLE_RADIUS*0.125, //радиус в процентах (=12.5%) от размеров циферблата
      SMALL_CIRCLE_COLOR = '#48b383', //цвет заливки
      SMALL_CIRCLE_AMOUNT = 12, //количество кружков и, соответственно цифр
      ANGLE_ROTATE_GRAD = 360/SMALL_CIRCLE_AMOUNT,//угол в градусах между соседними кружками
      ANGLE_ROTATE_RAD = ANGLE_ROTATE_GRAD/180*Math.PI,//он же в радианах

      TO_NUMBERS_DISTANCE = BIG_CIRCLE_RADIUS*0.8, // положение кружков в в процентах (=80%) от размеров циферблата

      //параметры текста цифр аналоговых часов
      FONT_FAMILY = 'Arial',//шрифт
      FONT_WEIGHT = 'bold',//жирность начертания
      TEXT_COLOR = 'black',
      FONT_SIZE = 16,

      //СТРЕЛКИ
      //часовая
      HOUR_LENGTH = BIG_CIRCLE_RADIUS*0.5, //длина стрелки в процентах (=50%) от размеров циферблата
      HOUR_WIDTH = 8, //толщина стрелки в пикселях
      HOUR_ROUNDING = 10, //радиус закругления в пикселях
      HOUR_COLOR = 'rgba(50,50,50,0.5)', //цвет стрелки
      //координаты начала и конца стрелки
      HOUR_START_POS_X = CLOCK_CENTER_POS,
      HOUR_START_POS_Y = CLOCK_CENTER_POS+0.1*HOUR_LENGTH,//смещаю положение стрелки на 10% от ее длины (чтобы хвостик торчал)
      HOUR_END_POS_X = CLOCK_CENTER_POS,
      HOUR_END_POS_Y = CLOCK_CENTER_POS-0.9*HOUR_LENGTH,

      //минутная
      MINUTE_LENGTH = BIG_CIRCLE_RADIUS*0.7, //длина стрелки в процентах (=75%) от размеров циферблата
      MINUTE_WIDTH = 4, //толщина стрелки в пикселях
      MINUTE_ROUNDING = 8, //радиус закругления в пикселях
      MINUTE_COLOR = 'rgba(50,50,50,0.5)', //цвет стрелки
      //координаты начала и конца стрелки
      MINUTE_START_POS_X = CLOCK_CENTER_POS,
      MINUTE_START_POS_Y = CLOCK_CENTER_POS+0.1*MINUTE_LENGTH,//смещаю положение стрелки на 10% от ее длины (чтобы хвостик торчал)
      MINUTE_END_POS_X = CLOCK_CENTER_POS,
      MINUTE_END_POS_Y = CLOCK_CENTER_POS-MINUTE_LENGTH,

      //секундная
      SECOND_LENGTH = BIG_CIRCLE_RADIUS*0.85, //длина стрелки в процентах (=85%) от размеров циферблата
      SECOND_WIDTH = 3, //толщина стрелки в пикселях
      SECOND_ROUNDING = 6, //радиус закругления в пикселях
      SECOND_COLOR = 'rgba(255,0,0,0.5)', //цвет стрелки
      //координаты начала и конца стрелки
        SECOND_START_POS_X = CLOCK_CENTER_POS,
        SECOND_START_POS_Y = CLOCK_CENTER_POS+0.1*SECOND_LENGTH,//смещаю положение стрелки на 10% от ее длины (чтобы хвостик торчал)
        SECOND_END_POS_X = CLOCK_CENTER_POS,
        SECOND_END_POS_Y = CLOCK_CENTER_POS-0.9*SECOND_LENGTH;


function ClockViewDOM(){
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
        
        //большой круг
        var bigCircle = document.createElement('div');

        bigCircle.style.height = 2*BIG_CIRCLE_RADIUS+'px';
        bigCircle.style.width = 2*BIG_CIRCLE_RADIUS+'px';
        bigCircle.style.backgroundColor = BIG_CIRCLE_COLOR;
        bigCircle.style.borderRadius = '50%';
        bigCircle.style.position = 'relative';

        clockCont.append(bigCircle);

        //центр
        var center = document.createElement('div');

        center.style.height = 2*CLOCK_CENTER_RADIUS+'px';
        center.style.width = 2*CLOCK_CENTER_RADIUS+'px';
        center.style.backgroundColor = CLOCK_CENTER_COLOR;
        center.style.borderRadius = '50%';
        center.style.position = 'absolute';
        center.style.left = CLOCK_CENTER_POS-CLOCK_CENTER_RADIUS+'px';
        center.style.top = CLOCK_CENTER_POS-CLOCK_CENTER_RADIUS+'px';

        bigCircle.append(center);

        //маленькие кружочки с цифрами
        for (var i=1; i<=SMALL_CIRCLE_AMOUNT; i++) {
            var smallCircle = document.createElement('div');
            
            smallCircle.style.position = 'absolute';
            smallCircle.style.height = 2*SMALL_CIRCLE_RADIUS+'px';
            smallCircle.style.width = 2*SMALL_CIRCLE_RADIUS+'px';
            smallCircle.style.backgroundColor = SMALL_CIRCLE_COLOR;
            smallCircle.style.borderRadius = '50%';
            
            smallCircle.innerHTML = i;
            smallCircle.style.lineHeight = '220%';
            smallCircle.style.fontFamily = FONT_FAMILY;
            smallCircle.style.fontWeight = FONT_WEIGHT;
            smallCircle.style.textAlign = 'center';

            //задаю положение кружочков, каждый на 30 град от соседнего
            var smallCirclePosX = BIG_CIRCLE_RADIUS + TO_NUMBERS_DISTANCE*Math.sin(i*ANGLE_ROTATE_RAD);
            var smallCirclePosY = BIG_CIRCLE_RADIUS - TO_NUMBERS_DISTANCE*Math.cos(i*ANGLE_ROTATE_RAD);

            smallCircle.style.left = Math.round(smallCirclePosX-SMALL_CIRCLE_RADIUS)+'px';
            smallCircle.style.top = Math.round(smallCirclePosY-SMALL_CIRCLE_RADIUS)+'px';

            bigCircle.append(smallCircle);
        }

        //часовая стрелка
        var hourArrow = document.createElement('div');
        hourArrow.className = 'hourArrow';
        hourArrow.style.height = HOUR_LENGTH + 'px';
        hourArrow.style.borderRadius = HOUR_ROUNDING+'px';
        hourArrow.style.borderStyle = 'solid';
        hourArrow.style.borderColor = HOUR_COLOR;
        hourArrow.style.backgroundColor = HOUR_COLOR;

        hourArrow.style.borderWidth = HOUR_WIDTH/2+'px';
        hourArrow.style.position = 'absolute';
        hourArrow.style.left = (BIG_CIRCLE_RADIUS-HOUR_WIDTH/2)+'px'; 
        hourArrow.style.top = (BIG_CIRCLE_RADIUS-0.95*HOUR_LENGTH)+'px';
        hourArrow.style.transformOrigin = HOUR_WIDTH/2+'px'+' '+0.95*HOUR_LENGTH +'px';

        bigCircle.append(hourArrow);

        //минутная стрелка
        var minuteArrow = document.createElement('div');
        minuteArrow.className = 'minuteArrow';
        minuteArrow.style.height = MINUTE_LENGTH + 'px';
        minuteArrow.style.borderRadius = MINUTE_ROUNDING+'px';
        minuteArrow.style.borderStyle = 'solid';
        minuteArrow.style.borderColor = MINUTE_COLOR;
        minuteArrow.style.backgroundColor = MINUTE_COLOR;
        minuteArrow.style.borderWidth = MINUTE_WIDTH+'px';
        minuteArrow.style.position = 'absolute';
        minuteArrow.style.left = (BIG_CIRCLE_RADIUS-MINUTE_WIDTH)+'px';
        minuteArrow.style.top = (BIG_CIRCLE_RADIUS-0.95*MINUTE_LENGTH)+'px';
        minuteArrow.style.transformOrigin = MINUTE_WIDTH+'px'+' '+0.95*MINUTE_LENGTH +'px'; 

        bigCircle.append(minuteArrow);

        //секундная стрелка
        var secondArrow = document.createElement('div');
        secondArrow.className = 'secondArrow';
        secondArrow.style.height = SECOND_LENGTH + 'px';
        secondArrow.style.borderRadius = SECOND_ROUNDING+'px';
        secondArrow.style.borderStyle = 'solid';
        secondArrow.style.borderColor = SECOND_COLOR;
        secondArrow.style.borderWidth = SECOND_WIDTH+'px';
        secondArrow.style.position = 'absolute';
        secondArrow.style.left = (BIG_CIRCLE_RADIUS-SECOND_WIDTH)+'px';
        secondArrow.style.top = (BIG_CIRCLE_RADIUS-0.95*SECOND_LENGTH)+'px';
        secondArrow.style.transformOrigin = SECOND_WIDTH+'px'+' '+0.95*SECOND_LENGTH +'px';

        bigCircle.append(secondArrow);

        
        //ГОРОД И ЧАСОВОЙ ПОЯС
        //нахожу соответствующий оберточный для часов div внутри рабочего элемента DOM (т.е. myField)
        var cityNzone=myField.querySelector('.city-timezone');
        cityNzone.innerHTML = myModel.city + ' ' + myModel.timezone ; //и заполняю его

    }

    self.update=function() {
        var secondArrow = myField.querySelector('.secondArrow');
        secondArrow.style.transform = "rotate("+myModel.secStep+"deg) translate(0px, 0px)";
        var minuteArrow = myField.querySelector('.minuteArrow');
        minuteArrow.style.transform = "rotate("+myModel.minStep+"deg)";
        var hourArrow = myField.querySelector('.hourArrow');
        hourArrow.style.transform = "rotate("+myModel.hourStep+"deg)";
    }
}