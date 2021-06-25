"use strict";
//ОТРИСОВКА ФИГУР

//вызов функции загрузки данных для отрисовки фигур
loadData();

//описание функции
function loadData() {
    $.ajax("json/data2.json",
        {   type:'GET', 
            dataType:'json', 
            success: function (data) {
                useDataToCreateElements(data);    
            },
            error:errorHandler }
    );
}

function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
}

function useDataToCreateElements(arr) {
    for (var i=0; i<arr.length; i++){

        //создаю все компоненты MVC
        var fig = new PartModel(arr[i][0], arr[i][1], arr[i][2], arr[i][3], arr[i][4], arr[i][5], 
                                arr[i][6], arr[i][7], arr[i][8], arr[i][9], arr[i][10], arr[i][11],
                                arr[i][12], arr[i][13], arr[i][14], arr[i][15]);
        var viewFig = new PartView();
        var controlFig= new PartController();

        //связываю компоненты
        fig.start(viewFig, controlFig);
        viewFig.start(fig, svgContainer);

        //первичное отображение фигуры
        viewFig.draw();

        //запускаю контроллер
        controlFig.start(fig, svgContainer);
    }

}
