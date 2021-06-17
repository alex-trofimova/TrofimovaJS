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
        var elem = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (myModel.type == '3') {
            elem.setAttribute('d', 'M '+myModel.dataHash.m[0]+' '+myModel.dataHash.m[1]+ 
                                ' L '+myModel.dataHash.l1[0]+' '+myModel.dataHash.l1[1]+
                                ' L '+myModel.dataHash.l2[0]+' '+myModel.dataHash.l2[1]+
                                ' z');
        }

        else if (myModel.type == '4') {
            elem.setAttribute('d', 'M '+myModel.dataHash.m[0]+' '+myModel.dataHash.m[1]+ 
                                ' L '+myModel.dataHash.l1[0]+' '+myModel.dataHash.l1[1]+
                                ' L '+myModel.dataHash.l2[0]+' '+myModel.dataHash.l2[1]+
                                ' L '+myModel.dataHash.l3[0]+' '+myModel.dataHash.l3[1]+
                                ' z');
        }

        else if (myModel.type == '6') {
            elem.setAttribute('d', 'M '+myModel.dataHash.m[0]+' '+myModel.dataHash.m[1]+ 
                                ' L '+myModel.dataHash.l1[0]+' '+myModel.dataHash.l1[1]+
                                ' L '+myModel.dataHash.l2[0]+' '+myModel.dataHash.l2[1]+
                                ' L '+myModel.dataHash.l3[0]+' '+myModel.dataHash.l3[1]+
                                ' L '+myModel.dataHash.l4[0]+' '+myModel.dataHash.l4[1]+
                                ' L '+myModel.dataHash.l5[0]+' '+myModel.dataHash.l5[1]+
                                ' z');
        }

        elem.setAttribute('fill', '#7092be');
        elem.setAttribute('transform', "translate ("+myModel.transX+" "+myModel.transY+") rotate ("+myModel.rotateAngle+" "+myModel.rotateOriginX+" "+myModel.rotateOriginY+")");
        elem.setAttribute('id', myModel.id);
        myField.append(elem);
    }

    self.update = function () {
        var figure = document.getElementById(myModel.id);
        figure.setAttribute('transform', "translate ("+myModel.transX+" "+myModel.transY+") rotate ("+myModel.rotateAngle+" "+myModel.rotateOriginX+" "+myModel.rotateOriginY+")");
    }
}