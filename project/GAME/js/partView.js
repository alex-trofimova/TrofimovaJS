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
        if (myModel.type === 3) {
            elem.setAttribute('d', 'M '+myModel.dataHash.m[0]+' '+myModel.dataHash.m[1]+ 
                                ' L '+myModel.dataHash.l1[0]+' '+myModel.dataHash.l1[1]+
                                ' L '+myModel.dataHash.l2[0]+' '+myModel.dataHash.l2[1]+
                                ' z');
        }

        else if (myModel.type === 4) {
            elem.setAttribute('d', 'M '+myModel.dataHash.m[0]+' '+myModel.dataHash.m[1]+ 
                                ' L '+myModel.dataHash.l1[0]+' '+myModel.dataHash.l1[1]+
                                ' L '+myModel.dataHash.l2[0]+' '+myModel.dataHash.l2[1]+
                                ' L '+myModel.dataHash.l3[0]+' '+myModel.dataHash.l3[1]+
                                ' z');
        }

        else if (myModel.type === 6) {
            elem.setAttribute('d', 'M '+myModel.dataHash.m[0]+' '+myModel.dataHash.m[1]+ 
                                ' L '+myModel.dataHash.l1[0]+' '+myModel.dataHash.l1[1]+
                                ' L '+myModel.dataHash.l2[0]+' '+myModel.dataHash.l2[1]+
                                ' L '+myModel.dataHash.l3[0]+' '+myModel.dataHash.l3[1]+
                                ' L '+myModel.dataHash.l4[0]+' '+myModel.dataHash.l4[1]+
                                ' L '+myModel.dataHash.l5[0]+' '+myModel.dataHash.l5[1]+
                                ' z');
        }

        elem.setAttribute('fill', paletteArr[myModel.colorNumber-1]);
        elem.setAttribute('transform', "translate ("+myModel.transX+" "+myModel.transY+") rotate ("+myModel.rotateAngle+" "+myModel.rotateOriginX+" "+myModel.rotateOriginY+")");
        elem.setAttribute('id', myModel.id);
        myField.append(elem);

        var anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        anim.setAttribute('attributeType', 'XML');
        anim.setAttribute('attributeName', 'fill-opacity');
        anim.setAttribute('fill', 'freeze');
        anim.setAttribute('from', "1");
        anim.setAttribute('to', "0.2");
        anim.setAttribute('dur', "2s");
        anim.setAttribute('begin', "contextmenu");
        anim.setAttribute('class', "animation");
        elem.append(anim);
    }

    self.update = function () {
        var figure = document.getElementById(myModel.id);
        myField.append(figure);
        figure.setAttribute('transform', "translate ("+myModel.transX+" "+myModel.transY+") rotate ("+myModel.rotateAngle+" "+myModel.rotateOriginX+" "+myModel.rotateOriginY+")");
    }

    self.getCurrentData = function () {
        var figure = document.getElementById(myModel.id);
        var figureArr = figure.getAttribute('transform').replace(/[()]/g, '').split(" ");
        return figureArr;
    }

    self.fix = function () {
        var figure = document.getElementById(myModel.id);
        figure.classList.add('fixed');
        var anim = figure.getElementsByClassName("animation")[0];
        anim.setAttribute('from', "1");
        anim.setAttribute('to', "0.2");
        fixAudio.play();
        console.log('должна пойти анимация');
        //для клавиатуры
        figure.setAttribute('fill-opacity', '0.2');
    }

    self.unfix = function () {
        var figure = document.getElementById(myModel.id);
        figure.classList.remove('fixed');
        figure.setAttribute('cursor', 'default');
        var anim = figure.getElementsByClassName("animation")[0];
        anim.setAttribute('from', "0.2");
        anim.setAttribute('to', "1");
        //для клавиатуры
        figure.setAttribute('fill-opacity', '1');
    }

    self.forbidfix = function () {
        var figure = document.getElementById(myModel.id);
        figure.setAttribute('cursor', 'not-allowed');
        var anim = figure.getElementsByClassName("animation")[0];
        anim.setAttribute('from', "1");
        anim.setAttribute('to', "1");
    }

    self.showSuccess = function () {
        succesAudio.play();
        alert('УРА!');
    }

}