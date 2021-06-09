"use strict";
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;

function AJAXStorage(objType, stringName) {
    var self=this;

    self.type = objType; //свойство класса для выбора типа объекта (напиток или блюдо)

    //создаю хэш в конструкторе (как было раньше)
    //если на удаленном сервере ничего нет, то хэш пустой
    if (getData() == null) {
         self.hash = {}; 
        }
    //если что-то есть, то заполняю этими данными
   else self.hash = getData();


    function getData() {
        $.ajax(
            {
                url : ajaxHandlerScript, 
                type : 'POST', dataType:'json',
                data : { f : 'READ', n : stringName },
                cache : false, 
                success : readReady, error : errorHandler
            }
        );
    }
    
    function readReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else if ( callresult.result!="" ) {
            var info=JSON.parse(callresult.result);
            return info;
        }
    }

    //1. МЕТОД ДОБАВЛЕНИЯ ИНФОРМАЦИИ О НАПИТКЕ (БЛЮДЕ)
    self.addValue=function(key,value){
        self.hash[key]=value;
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
