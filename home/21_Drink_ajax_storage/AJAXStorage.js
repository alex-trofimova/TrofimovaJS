"use strict";
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='TROFIMOVA_DRINK_STORAGE';


function AJAXStorage(objType) {
    var self=this;

    self.type = objType; //свойство класса для выбора типа объекта (напиток или блюдо)

    //создаю хэш в конструкторе (как было раньше)
    //если в локальном хранилище ничего нет, то он пустой
    if (localStorage.getItem(self.type) == null) {
         self.hash = {}; 
        }
    //если что-то есть, то заполняю этими данными
    else self.hash = JSON.parse(localStorage.getItem(self.type));


    //1. МЕТОД ДОБАВЛЕНИЯ ИНФОРМАЦИИ О НАПИТКЕ (БЛЮДЕ)
    self.addValue=function(key,value){
        self.hash[key]=value;
        //изменился хэш - добавляю данные в localStorage
        localStorage.setItem(self.type, JSON.stringify(self.hash));
        //изменился хэш - перезаписываю данные на удаленном сервере
        //вызов функции loadData
        loadData();
    }

    function loadData(){
        updatePassword=Math.random();
        $.ajax( {   url : ajaxHandlerScript, 
                    type : 'POST', dataType:'json',
                    data : { f : 'LOCKGET', n : stringName, p : updatePassword },
                    cache : false,
                    success : lockGetReady, error : errorHandler
                }
            );
    }

    function lockGetReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else {
            $.ajax( {
                    url : ajaxHandlerScript, 
                    type : 'POST',  dataType:'json',
                    data : { f : 'UPDATE', n : stringName, v : JSON.stringify(self.hash), p : updatePassword },
                    cache : false,
                    success : updateReady, error : errorHandler
                }
            );
        }
    }

    function updateReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
    }

    function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }

    //2. МЕТОД ЧТЕНИЯ ИНФОРМАЦИИ О НАПИТКЕ (БЛЮДЕ)
    self.getValue=function(key){
        return self.hash[key];
    };

    //3. МЕТОД УДАЛЕНИЯ ИНФОРМАЦИИ О НАПИТКЕ (БЛЮДЕ) 
    self.deleteValue=function(key) {
        if (key in self.hash) {
            delete self.hash[key];
            //снова изменился хэш - опять добавляю данные в localStorage
            localStorage.setItem(self.type, JSON.stringify(self.hash));
            //изменился хэш - перезаписываю данные на удаленном сервере
            //вызов функции loadData
            loadData();
            return true;
        }
        else {
            return false;
        }
    };

    //4. МЕТОД ВЫВОДА ВСЕХ НАПИТКОВ (БЛЮД)
    self.getKeys=function(){
        return Object.keys(self.hash);
    }
}
