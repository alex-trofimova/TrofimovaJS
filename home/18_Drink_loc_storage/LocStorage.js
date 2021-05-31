"use strict";
function LocStorage(objType) {
    var self=this;

    self.type = objType; //свойство класса для выбора типа объекта (напиток или блюдо)

    //создаю хэш в конструкторе (как было раньше)
    //если в локальном хранилище ничего нет, то он пустой
    if (localStorage.getItem(self.type) == null) {
         self.hash = {}; 
        }
    //если что-то есть, то заполняю этими данными
    else self.hash = JSON.parse(localStorage.getItem(self.type));
     
    self.addValue=function(key,value){
        self.hash[key]=value;
        localStorage.setItem(self.type, JSON.stringify(self.hash));
    }

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
