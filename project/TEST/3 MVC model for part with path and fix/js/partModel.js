"use strict";
function PartModel(level, type, number, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5){
    var self=this;

    var myView = null;
    var myController = null;

    self.level = level; //номер уровня (от 1 до 6)
   
    self.type = type; //количество углов в фигуре (3 - трехугольник, 4 - четырехуголник, 6 - шестиугольник)
    console.log(typeof(self.type));
    self.number = number;//номер фигуры

    self.ismoveable = true;
    self.isfixed = false;

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
                         l2: [self.x2, self.y2],
                        };
        //площадь треугольника
        self.area = Math.abs(self.x0*(self.y1-self.y2)+self.x1*(self.y2-self.y0)+self.x2*(self.y0-self.y1))/2;
    }

    if (self.type === 4) {//если это четырехугольник
        self.dataHash = {m: [self.x0, self.y0],
                         l1: [self.x1, self.y1],
                         l2: [self.x2, self.y2],
                         l3: [self.x3, self.y3],
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
                         l5: [self.x5, self.y5],
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

    //ПЕРЕМЕЩЕНИЕ ФИГУРЫ

    self.move =function(EO) {
        if (self.ismoveable) {
            EO=EO||window.event;

            EO.preventDefault();

            draggedPart=EO.target;

            draggedPart.setAttribute('cursor', 'grabbing');

            self.transX = EO.pageX - pressShiftLeft;
            self.transY = EO.pageY - pressShiftTop;

            self.updateView();
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

    // ввожу переменную для объекта фиксирования (пока здесь ничего нет)
    //var fixedPart=null;

    //ФИКСИРОВАНИЕ ФИГУРЫ
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
            
            //создание хэша с информацией о фигуре для передачи в массив фиксированных фигур
            //ключ - id, значение - массив с координатами, тип фигуры и ее площадь
            self.arrInfo = self.arrPosX.concat(self.arrPosY);
            self.arrInfo.push(self.type);
            self.arrInfo.push(self.area);

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
                            console.log(self.id + ' зафиксировался в квадрате № ' + (i+1));
                            console.log('и он тут пока единственный');

                            self.isfixed = true;
                            fixedPart.setAttribute('cursor', 'not-allowed');
                            
                            self.ismoveable = false;
                            fixedPart.classList.add('fixed');
                            fixedPart.setAttribute('fill-opacity', '0.6');
                            fixedElemArr[i][self.id]=self.arrInfo;
                            console.log(fixedElemArr);    
                        }
                        else {
                            console.log('что-то уже успели зафиксировать');
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

                                        function checkSum(element, index, array){
                                            if (element === area) {
                                                return true;
                                            }
                                            else return false;
                                        }
                                        //если хоть одна вершина пересекает зафиксированную фигуру, то фиксировать нельзя 
                                        if (sumAreas.some(checkSum) === true) {
                                            console.log('нельзя зафиксировать фигуру в этом месте');   
                                        }

                                        else {
                                            fixedPart.setAttribute('cursor', 'not-allowed');
                                            fixedPart.classList.add('fixed');
                                            fixedPart.setAttribute('fill-opacity', '0.6');
                                            fixedElemArr[i][self.id]=self.arrInfo;
                                            console.log(fixedElemArr);

                                            self.isfixed = true;
                                            self.ismoveable = false;
                                        }
                                }                       
                            function calculateTriangleArea(x1,x2,x3,y1,y2,y3) {
                                var a = Math.abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2;
                                return a;
                            }   
                        }   
                    }
                }
            }
        }
        else {
            EO=EO||window.event;

            EO.preventDefault();

            var unfixedPart=EO.target;
            var unfixedpartId = unfixedPart.getAttribute('id');
            
            for (var k=0; k<fixedElemArr.length; k++) {
                if (unfixedpartId in fixedElemArr[k]) {
                    delete fixedElemArr[k][unfixedpartId];
                }
            }

            console.log(fixedElemArr);
            unfixedPart.classList.remove('fixed');
            unfixedPart.setAttribute('cursor', 'default');
            unfixedPart.setAttribute('fill-opacity', '1.0');
            self.isfixed = false;
            self.ismoveable = true;
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