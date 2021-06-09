"use strict";
var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;

function AJAXStorage(stringName) {
    var self=this;

    self.type = stringName; //свойство класса для выбора типа объекта (напиток или блюдо)

    function getData() {
        $.ajax(
            {
                url : ajaxHandlerScript, 
                type : 'POST', dataType:'json',
                data : { f : 'READ', n : self.type },
                cache : false, 
                success : readReady, error : errorHandler
            }
        );
    }
    
    function readReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else if ( callresult.result!="" ) {
            self.hash=JSON.parse(callresult.result);
        }
    }
    //заполняю хэш данными с удаленного сервера
    getData();


    //1. МЕТОД ДОБАВЛЕНИЯ ИНФОРМАЦИИ О НАПИТКЕ (БЛЮДЕ)
    self.addValue=function(key,value){
        self.hash[key]=value;
        //изменился хэш - перезаписываю данные на удаленном сервере
        //т.е. вызываю функцию loadData
        loadData();
    }

    function loadData(){
        updatePassword=Math.random();
        $.ajax( {   url : ajaxHandlerScript, 
                    type : 'POST', dataType:'json',
                    data : { f : 'LOCKGET', n : self.type, p : updatePassword },
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
                    data : { f : 'UPDATE', n : self.type, v : JSON.stringify(self.hash), p : updatePassword },
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
            //т.е. вызываю функцию loadData
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
