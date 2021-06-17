"use strict";
function PartView(){
    var self=this;

    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка

    self.start=function(model,field) {
        myModel = model;
        myField = field;        
    }

    self.draw = function () {
        //создаю (программно) 
        //разрезную фигурку квадрата
        //нахожу соответствующий оберточный svg container (т.е. myField)
        var triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        triangle.setAttribute('points', myModel.x1+' '+myModel.y1+', '+myModel.x2+' '+myModel.y2+', '+myModel.x3+' '+myModel.y3);
        triangle.setAttribute('fill', 'blue');
        triangle.setAttribute('transform', "translate ("+myModel.transX+" "+myModel.transY+") rotate ("+myModel.rotateAngle+" "+myModel.rotateOriginX+" "+myModel.rotateOriginY+")")
        triangle.setAttribute('id', myModel.id);
        myField.append(triangle);
    }

    self.update = function () {
        var triangle = document.getElementById(myModel.id);
        triangle.setAttribute('transform', "translate ("+myModel.transX+" "+myModel.transY+") rotate ("+myModel.rotateAngle+" "+myModel.rotateOriginX+" "+myModel.rotateOriginY+")");
    }
}