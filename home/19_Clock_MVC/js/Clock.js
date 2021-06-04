"use strict";
//константы
const 
      //СТРЕЛКИ
      //часовая
      HOUR_ROTATE_ANGLE = 360/12,//угол поворота стрелки за один час в градусах (=30 градусов)
      HOUR_ROTATE_ANGLE_RAD = HOUR_ROTATE_ANGLE/180*Math.PI,

      //минутная
      MINUTE_ROTATE_ANGLE = 360/60,//угол поворота стрелки за одну минуту в градусах (=6 градусов)
      MINUTE_ROTATE_ANGLE_RAD = MINUTE_ROTATE_ANGLE/180*Math.PI,

      //секундная
      SECOND_ROTATE_ANGLE = 360/60, //угол поворота стрелки за одну секунду в градусах (=6 градусов)
      SECOND_ROTATE_ANGLE_RAD = SECOND_ROTATE_ANGLE/180*Math.PI;


function Clock (city) {
    var self=this;

    var myView = null;

    self.city = city;

    //параметры, используемые для отображения времени в зависимости от часового пояса (точнее города)
    if (self.city == 'Минск') {
        self.timezone = '(GMT+3)';
        self.addhour = 0;
    }

    else if (self.city == 'Нью-Йорк') {
        self.timezone = '(GMT-5)';
        self.addhour = -7;
    }

    else if (self.city == 'Лондон') {
        self.timezone = '(GMT)';
        self.addhour = -2;
    }

    else if (self.city == 'Берлин') {
        self.timezone = '(GMT+1)';
        self.addhour = -1;
    }

    else if (self.city == 'Токио') {
        self.timezone = '(GMT+9)';
        self.addhour = +6;
    }

    else if (self.city == 'Владивосток') {
        self.timezone = '(GMT+10)';
        self.addhour = +7;
    }

    //элементы часов (их параметры - только те, которые ИЗМЕНЯЮТСЯ СО ВРЕМЕНЕМ)
    //текущее время
    self.currTime=new Date();
    self.hours = self.currTime.getHours()+self.addhour;
    self.minutes = self.currTime.getMinutes();
    self.seconds = self.currTime.getSeconds();
    
    //форматированное текущее время в виде строки - для вывода
    self.currTimeStr=formatTime(self.currTime);

    function formatTime() {
        return str0l(self.hours,2) + ':' + str0l(self.minutes,2) + ':' + str0l(self.seconds,2);
    }

    // дополняет строку val слева нулями до длины len
    function str0l(val,len) {
        var strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
    }

    //для стрелок - это шаг угла hourStep, minStep и secondStep, только шаг зависит от времени
    //причем для всех типов рисования одинаково
    self.hourStep = 0;
    self.minStep = 0;
    self.secStep = 0;

    //инициализация (потом вызову в основном скрипте)
    self.start=function(view) {
        myView = view;        
    }

    //обновление представления (View)
    self.updateView=function() {
        if (myView) {
           myView.update(); 
        }    
    };

    //запуск часов
    self.run=function() {
       runTime();
       console.log('запустить часы');
       self.timer = setInterval(runTime,1000);
    }

    //функция для корректного перезапуска часов при обновлении страницы (чтобы не через секунду, а сразу - AtOnce)
    self.showTimeAtOnce = function(){
        runTime();
        self.run();
    }

    //функция таймера (в ней нам нужны часы, минуты и секунды, а также само время в цифровом формате)
    function runTime() {
        self.currTime=new Date();
        self.hours=self.currTime.getHours()+self.addhour;
        self.minutes=self.currTime.getMinutes();
        self.seconds=self.currTime.getSeconds();

        self.currTimeStr=formatTime(self.currTime);

       //расчет шага поворота для стрелок в зависимости от времени
       self.secStep = SECOND_ROTATE_ANGLE*self.seconds;
       self.minStep = MINUTE_ROTATE_ANGLE*(self.minutes+self.seconds/60);
       self.hourStep = HOUR_ROTATE_ANGLE*(self.hours+self.minutes/60);

       self.updateView();//раз что-то поменялось, вызываю обновление представления
    }

    //остановка часов
    self.stop=function() {
        console.log('остановить часы');
        clearInterval(self.timer);
    }
    
}