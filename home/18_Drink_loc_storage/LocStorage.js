"use strict";
function LocStorage(objType) {
    var self=this;

    self.type = objType; //свойство класса для выбора типа объекта (напиток или блюдо)

    self.hash={};//хэш класа для хранения хэшей с информацией

    self.store=function (){
        var keyH = JSON.stringify(objType);
        var valueH = JSON.stringify(self.hash);
        localStorage.setItem(keyH, valueH);        
    }
    
    self.addValue=function(key,value){
        self.hash[key]=value;
        self.store();
    };

    self.getValue=function(key){
        
        return self.hash[key];
    };

    self.deleteValue=function(key) {
        if (key in self.hash) {
            delete self.hash[key];
            return true;
        }
        else {
            return false;
        }
    };

    self.getKeys=function(){
        return Object.keys(self.hash);
    }

}
