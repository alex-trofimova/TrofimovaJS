"use strict";
function PartModel(level, type, number, color_number, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5){
    var self=this;

    var myView = null;
    var myController = null;

    self.level = level; //номер уровня (от 1 до 6)
   
    self.type = type; //количество углов в фигуре (3 - трехугольник, 4 - четырехуголник, 6 - шестиугольник)
    self.number = number;//номер фигуры
    self.colorNumber = color_number;

    self.ismoveable = true;
    self.isfixed = false;

    self.stepmove = 5;

    //координаты вершин фигур
    self.x0 = x0;
    self.y0 = y0;
    self.x1 = x1;
    self.y1 = y1;
    self.x2 = x2;
    self.y2 = y2;
    self.x3 = x3;
    self.y3 = y3;
    self.x4 = x4;
    self.y4 = y4;
    self.x5 = x5;
    self.y5 = y5;

    if (self.type === 3) {//если это треугольник
        self.dataHash = {m: [self.x0, self.y0],
                         l1: [self.x1, self.y1],
                         l2: [self.x2, self.y2]
                        };
        //площадь треугольника
        self.area = Math.abs(self.x0*(self.y1-self.y2)+self.x1*(self.y2-self.y0)+self.x2*(self.y0-self.y1))/2;
    }

    if (self.type === 4) {//если это четырехугольник
        self.dataHash = {m: [self.x0, self.y0],
                         l1: [self.x1, self.y1],
                         l2: [self.x2, self.y2],
                         l3: [self.x3, self.y3]
                        };
        //площадь четырехугольника
        self.area = Math.abs(self.x0*self.y1+self.x1*self.y2+self.x2*self.y3+
                             self.x3*self.y0-self.x1*self.y0-self.x2*self.y1-
                             self.x3*self.y2-self.x0*self.y3)/2;
    }

    if (self.type === 6) {//если это шестиугольник
        self.dataHash = {m: [self.x0, self.y0],
                         l1: [self.x1, self.y1],
                         l2: [self.x2, self.y2],
                         l3: [self.x3, self.y3],
                         l4: [self.x4, self.y4],
                         l5: [self.x5, self.y5]
                        };
        //площадь шестиугольника
        self.area = Math.abs(self.x0*self.y1+self.x1*self.y2+self.x2*self.y3+
                             self.x3*self.y4+self.x4*self.y5+self.x5*self.y0-
                             self.x1*self.y0-self.x2*self.y1-self.x3*self.y2-
                             self.x4*self.y3-self.x5*self.y4-self.x0*self.y5)/2;
    }

    self.id = "fig_"+ self.number;

    //координаты смещения (параметры translate у transform)
    self.transX = 0;
    self.transY = 0;

    //координаты поворота (параметр rotate у transform)
    self.rotateAngle = 0;
    self.rotateOriginX = self.x0+self.transX;
    self.rotateOriginY = self.y0+self.transY;

    //текущие координаты вершин, меняющиеся при движении и повороте фигуры (отсчет от верхнего левого угла)
    self.posx0 = self.x0;
    self.posy0 = self.y0;
    self.posx1 = self.x1;
    self.posy1 = self.y1;
    self.posx2 = self.x2;
    self.posy2 = self.y2;
    self.posx3 = self.x3;
    self.posy3 = self.y3;
    self.posx4 = self.x4;
    self.posy4 = self.y4;
    self.posx5 = self.x5;
    self.posy5 = self.y5;
    

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

    //изменение представления (View) при фиксировании фигуры
    self.fixView=function() {
        if (myView) {
            myView.fix(); 
        }    
    }

    //изменение представления (View) при отфиксировании фигуры
    self.unfixView=function() {
        if (myView) {
            myView.unfix(); 
        }    
    }

    //изменение представления (View) при невозможности фиксирования фигуры
    self.forbidfixView=function() {
        if (myView) {
            myView.forbidfix(); 
        }    
    }

    self.successView=function(){
        if (myView) {
            myView.showSuccess(); 
        }
    }

    //получение значений параметров текущего представления (View) 
    self.getCurrentViewData=function() {
        if (myView) {
            myView.getCurrentData(); 
        }    
    }

    self.getInfo = function () {
        //пересчет положения координат вершин (т.е. с учетом того, что фигуру вращали и перетаскивали)
        self.posx0 = self.transX + self.x0;
        self.posy0 = self.transY + self.y0;
        self.posx1 = self.transX + self.x0 + (self.x1-self.x0)*Math.cos(self.rotateAngle*Math.PI/180) - (self.y1-self.y0)*Math.sin(self.rotateAngle*Math.PI/180);
        self.posy1 = self.transY + self.y0 + (self.x1-self.x0)*Math.sin(self.rotateAngle*Math.PI/180) + (self.y1-self.y0)*Math.cos(self.rotateAngle*Math.PI/180);
        self.posx2 = self.transX + self.x0 + (self.x2-self.x0)*Math.cos(self.rotateAngle*Math.PI/180) - (self.y2-self.y0)*Math.sin(self.rotateAngle*Math.PI/180);
        self.posy2 = self.transY + self.y0 + (self.x2-self.x0)*Math.sin(self.rotateAngle*Math.PI/180) + (self.y2-self.y0)*Math.cos(self.rotateAngle*Math.PI/180);
        self.posx3 = self.transX + self.x0 + (self.x3-self.x0)*Math.cos(self.rotateAngle*Math.PI/180) - (self.y3-self.y0)*Math.sin(self.rotateAngle*Math.PI/180);
        self.posy3 = self.transY + self.y0 + (self.x3-self.x0)*Math.sin(self.rotateAngle*Math.PI/180) + (self.y3-self.y0)*Math.cos(self.rotateAngle*Math.PI/180);
        self.posx4 = self.transX + self.x0 + (self.x4-self.x0)*Math.cos(self.rotateAngle*Math.PI/180) - (self.y4-self.y0)*Math.sin(self.rotateAngle*Math.PI/180);
        self.posy4 = self.transY + self.y0 + (self.x4-self.x0)*Math.sin(self.rotateAngle*Math.PI/180) + (self.y4-self.y0)*Math.cos(self.rotateAngle*Math.PI/180);
        self.posx5 = self.transX + self.x0 + (self.x5-self.x0)*Math.cos(self.rotateAngle*Math.PI/180) - (self.y5-self.y0)*Math.sin(self.rotateAngle*Math.PI/180);
        self.posy5 = self.transY + self.y0 + (self.x5-self.x0)*Math.sin(self.rotateAngle*Math.PI/180) + (self.y5-self.y0)*Math.cos(self.rotateAngle*Math.PI/180);

        //массивы X и Y координат вершин
        
        //для треугольника
        if (self.type === 3) {
            self.arrPosX = [self.posx0, self.posx1, self.posx2];
            self.arrPosY = [self.posy0, self.posy1, self.posy2];
        }

        //для четырехугольника
        else if (self.type === 4) {
            self.arrPosX = [self.posx0, self.posx1, self.posx2, self.posx3];
            self.arrPosY = [self.posy0, self.posy1, self.posy2, self.posy3];
        }

        //для шестиугольника
        else if (self.type === 6) {
            self.arrPosX = [self.posx0, self.posx1, self.posx2, self.posx3, self.posx4, self.posx5];
            self.arrPosY = [self.posy0, self.posy1, self.posy2, self.posy3, self.posy4, self.posy5];
        }
        
        //создание хэша с информацией о фигуре для передачи в массив 
        //зафиксированных в конкретном квадрате фигур
        //ключ - id, значение - массив с координатами, тип фигуры и ее площадь
        self.arrInfo = self.arrPosX.concat(self.arrPosY);
        self.arrInfo.push(self.colorNumber);
        self.arrInfo.push(self.type);
        self.arrInfo.push(self.area);
    }

   //ПОДГОТОВКА К ПЕРЕМЕЩЕНИЮ И ВРАЩЕНИЮ ФИГУРЫ
    var pressShiftLeft = 0;
    var pressShiftTop = 0;

    // ввожу переменную для объекта перемещения (пока здесь ничего нет)
    var draggedPart=null;

    self.startMoveAndRotate =function(EO) {

        EO=EO||window.event;

        EO.preventDefault();

            draggedPart=EO.target;

            draggedPart.setAttribute('cursor', 'grab');

            var partArr = draggedPart.getAttribute('transform').replace(/[()]/g, '').split(" ");
            self.transX = parseFloat(partArr[1]);
            self.transY = parseFloat(partArr[2]);
            self.rotateAngle = parseFloat(partArr[4]);
            self.rotateOriginX = parseFloat(partArr[5]);
            self.rotateOriginY = parseFloat(partArr[6]);

            pressShiftLeft = EO.clientX - self.transX;
            pressShiftTop = EO.clientY - self.transY;       

    }

    //функции проверки выхода фигуры за края игрового поля (svg тега)
    function checkRestrictXleft(element, index, array){
        if (element <0) {
            return true;
        }
        else return false;
    }

    function checkRestrictXright(element, index, array){
        if (element >1200) {//внести как ширину контейнера
            return true;
        }
        else return false;
    }

    function checkRestrictYtop(element, index, array){
        if (element <0) {
            return true;
        }
        else return false;
    }

    function checkRestrictYbottom(element, index, array){
        if (element >480) {
            return true;
        }
        else return false;
    }

    //ПЕРЕМЕЩЕНИЕ ФИГУРЫ
    //мышкой
    self.move =function(EO) {
        if (self.ismoveable) {
            EO=EO||window.event;

            EO.preventDefault();

            draggedPart=EO.target;

            draggedPart.setAttribute('cursor', 'grabbing');

            self.transX = EO.pageX - pressShiftLeft;
            self.transY = EO.pageY - pressShiftTop;

            self.getInfo();
            var svgCont = document.getElementById('svgcont');
            
            //если хоть одна вершина заходит за края
            if ((self.arrPosX.some(checkRestrictXleft) === true) || 
                (self.arrPosX.some(checkRestrictXright) === true) ||
                (self.arrPosY.some(checkRestrictYtop) === true) ||
                (self.arrPosY.some(checkRestrictYbottom) === true)
               ) {
                console.log('куда это вы??!!');
                return;   
            }         
            else {
                self.updateView();
            }       
        }
        else return;
        
    }

    
    //с клавиатуры
    self.moveUp = function(){
        if (self.ismoveable) {
            self.transY -= self.stepmove;
            self.getInfo();
            if (self.arrPosY.some(checkRestrictYtop) === true){
                self.transY += self.stepmove;
                return;
            }
            else {
                self.updateView();
            }
        }
        else return;
    }

    self.moveDown = function(){
        if (self.ismoveable) {
            self.transY += self.stepmove;
            self.getInfo();
            if (self.arrPosY.some(checkRestrictYbottom) === true){
                self.transY -= self.stepmove;
                return;
            }
            else {
                self.updateView();
            }
        }
        else return;
    }

    self.moveLeft = function(){
        if (self.ismoveable) {
            self.transX -= self.stepmove;
            self.getInfo();
            if (self.arrPosX.some(checkRestrictXleft) === true){
                self.transX += self.stepmove;
                return;
            }
            else {
                self.updateView();
            }
            
        }
        else return;
    }

    self.moveRight = function(){
        if (self.ismoveable) {
            self.transX += self.stepmove;
            self.getInfo();
            if (self.arrPosX.some(checkRestrictXright) === true){
                self.transX -= self.stepmove;
                return;
            }
            else {
                self.updateView();
            }
        }
        else return;
    }

    //ВРАЩЕНИЕ ФИГУРЫ
    self.rotate =function(EO) {
        if (self.ismoveable) {
            EO=EO||window.event;

            EO.preventDefault();

            self.rotateAngle -= 45; //шаг поворота - потом вынесу в константы
            self.updateView();
        }
        else return;          
    }


    //ФИКСИРОВАНИЕ ФИГУРЫ
    //мышкой (правая кнопка)
    self.fix =function(EO) {

        if (self.isfixed == false) {

            EO=EO||window.event;

            EO.preventDefault();

            var fixedPart=EO.target;
            
            //получение текущих параметров фигуры   
            var partArr = fixedPart.getAttribute('transform').replace(/[()]/g, '').split(" ");
            self.transX = parseFloat(partArr[1]);
            self.transY = parseFloat(partArr[2]);
            self.rotateAngle = parseFloat(partArr[4]);
            self.rotateOriginX = parseFloat(partArr[5]);
            self.rotateOriginY = parseFloat(partArr[6]);

            self.check();
        }

        else {
            EO=EO||window.event;

            EO.preventDefault();

            var unfixedPart=EO.target;
            var unfixedpartId = unfixedPart.getAttribute('id');
            
             
            
            for (var k=0; k<fixedElemArr.length; k++) {
                if (unfixedpartId in fixedElemArr[k]) {
                    delete fixedElemArr[k][unfixedpartId];
                    console.log(fixedElemArr);
                    console.log(fixedElemArr[k]);
                    // if(Object.keys(fixedElemArr[k]).length === 1) {
                    //     delete fixedElemArr[k]['color'];//"очищаю" цвет этого
                    //     console.log(fixedElemArr[k]);
                    // }                    
                    fixedElemAreaTotal-=self.area;
                }
            }
            self.isfixed = false;
            self.ismoveable = true;
            self.unfixView();
            
            
        }
    }

     //с клавиатуры
     self.fixByKey = function(){
        if (self.isfixed == false){
            self.getCurrentViewData();
            self.check();

        }
        else {
            for (var k=0; k<fixedElemArr.length; k++) {
                if (self.id in fixedElemArr[k]) {
                    delete fixedElemArr[k][self.id];
                    fixedElemAreaTotal-=self.area;
                }
            }
            self.isfixed = false;
            self.ismoveable = true;
            self.unfixView();    
        }
     }

    //описание функции проверок: 
    //1) расположена ли фигура внутри пустого квадрата и 
    //2) не пересекает уже зафиксированные там фигуры
    self.check = function(){

        //вызов функции получения массива данных фигуры
        self.getInfo();

        //вызов функции проверки возможности фиксирования в пустых квадратах
        checkPos();

        //описание функции
        function checkPos() {
            $.ajax("json/squares.json",
                {   type:'GET', 
                    dataType:'json', 
                    success: function (data) {
                        useDataToCheckPos(data);    
                    },
                    error:errorHandler }
            );
        }

        function errorHandler(jqXHR,statusStr,errorStr) {
                alert(statusStr+' '+errorStr);
        }

        //проверка помещается ли фигура в квадрат
        function useDataToCheckPos(arr) {
            for (var i=0; i<arr.length; i++){
                //по x-координатам   
                function checkPosX(element, index, array){
                    if (element>arr[i][0] && element<arr[i][2]) {
                        return true;
                    }
                    else return false;
                }
                //по y-координатам 
                function checkPosY(element, index, array){
                    if (element>arr[i][1] && element<arr[i][3]) {
                        return true;
                    }
                    else return false;
                }
                //если проверка успешна   
                if ((self.arrPosX.every(checkPosX)) && (self.arrPosY.every(checkPosY))){
                    if (Object.keys(fixedElemArr[i]).length === 0) {
                        self.isfixed = true;                            
                        self.ismoveable = false;
                        self.fixView();
                        fixedElemArr[i]['color']=self.colorNumber;
                        fixedElemArr[i][self.id]=self.arrInfo;
                        fixedElemAreaTotal+=self.area;
                        // console.log(fixedElemArr);
                        console.log(self.area);
                        console.log('первый раз');
                        console.log(fixedElemAreaTotal);

                    }
                    else {
                        console.log('что-то уже успели зафиксировать');
                        if (self.colorNumber === fixedElemArr[i]['color']) {
                            delete fixedElemArr[i]['color'];
                            for (var key in fixedElemArr[i]){
                                    var infoArr = fixedElemArr[i][key];
                                //проверка пересечения фигур в одном квадрате
                                //(infoArr - массив координат фигуры с которой проверяем пересечение)
                                //(arrInfo - массив координат фигуры, которую проверяем на пересечение)
                                //с треугольником                                    
                                if (infoArr[infoArr.length-2] === 3) {
                                    var x1=infoArr[0];
                                    var x2=infoArr[1];
                                    var x3=infoArr[2];
                                    var y1=infoArr[3];
                                    var y2=infoArr[4];
                                    var y3=infoArr[5];
                                    var area = infoArr[infoArr.length-1];
                                    var sumAreas =[];
                                    for (var j=0; j<self.arrPosX.length; j++) {
                                        sumAreas[j]=
                                            calculateTriangleArea(self.arrInfo[j],x1,x2,self.arrInfo[j+3],y1,y2)+
                                            calculateTriangleArea(self.arrInfo[j],x2,x3,self.arrInfo[j+3],y2,y3)+
                                            calculateTriangleArea(self.arrInfo[j],x3,x1,self.arrInfo[j+3],y3,y1); 
                                    }
                                }
                                                    
                                //с четырехугольником
                                    if (infoArr[infoArr.length-2] === 4) {
                                        var x1=infoArr[0];
                                        var x2=infoArr[1];
                                        var x3=infoArr[2];
                                        var x4=infoArr[3];
                                        var y1=infoArr[4];
                                        var y2=infoArr[5];
                                        var y3=infoArr[6];
                                        var y4=infoArr[7];
                                        var area = infoArr[infoArr.length-1];
                                        var sumAreas =[];
                                        for (var j=0; j<self.arrPosX.length; j++) {
                                            sumAreas[j]=
                                                calculateTriangleArea(self.arrInfo[j],x1,x2,self.arrInfo[j+4],y1,y2)+
                                                calculateTriangleArea(self.arrInfo[j],x2,x3,self.arrInfo[j+4],y2,y3)+
                                                calculateTriangleArea(self.arrInfo[j],x3,x4,self.arrInfo[j+4],y3,y4)+
                                                calculateTriangleArea(self.arrInfo[j],x4,x1,self.arrInfo[j+4],y4,y1); 
                                        }
                                        console.log(sumAreas);
                                    }

                                    //с шестиугольником
                                    if (infoArr[infoArr.length-2] === 6) {
                                        var x1=infoArr[0];
                                        var x2=infoArr[1];
                                        var x3=infoArr[2];
                                        var x4=infoArr[3];
                                        var x5=infoArr[4];
                                        var x6=infoArr[5];
                                        var y1=infoArr[6];
                                        var y2=infoArr[7];
                                        var y3=infoArr[8];
                                        var y4=infoArr[9];
                                        var y5=infoArr[10];
                                        var y6=infoArr[11];
                                        var area = infoArr[infoArr.length-1];
                                        var sumAreas =[];
                                        for (var j=0; j<self.arrPosX.length; j++) {
                                            sumAreas[j]=
                                                calculateTriangleArea(self.arrInfo[j],x1,x2,self.arrInfo[j+6],y1,y2)+
                                                calculateTriangleArea(self.arrInfo[j],x2,x3,self.arrInfo[j+6],y2,y3)+
                                                calculateTriangleArea(self.arrInfo[j],x3,x4,self.arrInfo[j+6],y3,y4)+
                                                calculateTriangleArea(self.arrInfo[j],x4,x5,self.arrInfo[j+6],y4,y5)+ 
                                                calculateTriangleArea(self.arrInfo[j],x5,x6,self.arrInfo[j+6],y5,y6)+
                                                calculateTriangleArea(self.arrInfo[j],x6,x1,self.arrInfo[j+6],y6,y1); 
                                            }
                                    }

                                    function calculateTriangleArea(x1,x2,x3,y1,y2,y3) {
                                        var a = Math.abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2;
                                        return a;
                                    } 

                                        function checkSum(element, index, array){
                                            if (element === area) {
                                                return true;
                                            }
                                            else return false;
                                        }
                                        //если хоть одна вершина пересекает зафиксированную фигуру, то фиксировать нельзя 
                                        if (sumAreas.some(checkSum) === true) {
                                            console.log('нельзя зафиксировать фигуру в этом месте');
                                            break;   
                                        }  
                            }
                            self.isfixed = true;
                            self.ismoveable = false;
                            self.fixView();
                            fixedElemArr[i][self.id]=self.arrInfo;
                            fixedElemArr[i]['color']=self.colorNumber;
                            fixedElemAreaTotal+=self.area;
                            console.log('второй раз');
                            console.log(fixedElemAreaTotal);
                            //проверка , что уровень пройден! ЗАМЕНИТЬ РЕЗУЛЬТАТ УСПЕХА!
                            if (fixedElemAreaTotal>240000){//вынести в константы
                                self.successView();
                            }
                            
                        }
                        else {
                            console.log('Фигура не того цвета');
                            break;
                        }
                    } 
                    break;  
                }
                else {
                    console.log('нельзя зафиксировать эту фигуру в этом месте');
                    self.forbidfixView();
                }
            }
        }
    }

    self.endMove = function(EO) {
        EO=EO||window.event;

        draggedPart.setAttribute('cursor', 'default');

        EO.preventDefault();

        //"очистка" объекта перетаскивания
        draggedPart = null;
    }

}