"use strict";

//ПАЛИТРЫ ЦВЕТОВ
var paletteArr = [];
var paletteArr1 = ['#368036', '#003366', '#00bfff', '#b5262b', '#ffba00', '#cd5700'];
var paletteArr2 = ['#2683c6', '#84acb6', '#7a8c8e', '#75bda7', '#58b6c0', '#3494ba'];
var paletteArr3 = ['#9c6a6a', '#e64823', '#ec6f16', '#ce8d3e', '#f8921d', '#ffca08'];

paletteArr=paletteArr1;

//ЗВУКИ
//при событиях:
// 1) фиксирования фигуры
var fixAudio = new Audio("music/fix.mp3");
// 2) непопадания фигуры в квадрат
var forbidAudio = new Audio("music/forbid.mp3");
// 3) прохождении уровня
var succesAudio = new Audio("music/success.mp3");

var soundStatus = true;

// в закладке URL-а будут храниться разделенные подчеркиваниями слова
    // #Menu - начальная страница меню (панели Правила, Играть и Настройки, плюс Звук вкл/выкл)
    // #Play - страница с уровнями
    // #Level_1(2,3,4,5,6) - страница определенного уровня игры
    // #Rules - модальное окно с правилами игры
    // #Settings - модальное окно установок (выбор палитры цветов)

    // отслеживается изменение закладки в УРЛе
    // оно происходит при любом виде навигации
    // в т.ч. при нажатии кнопок браузера ВПЕРЕД/НАЗАД
    window.onhashchange=switchToStateFromURLHash;
    var contGame = document.querySelector(".game_container");
    // текущее состояние приложения
    var SPAState={};

    // хэш ссылок скриптов уровней
    var levels={
        1: 'js/gameLevel1.js',
        2: 'js/gameLevel2.js',
        3: 'js/gameLevel3.js',
        4: 'js/gameLevel4.js',
        5: 'js/gameLevel5.js',
        6: 'js/gameLevel6.js'
    }

    //управление приложением через URL
    function switchToStateFromURLHash() {
        var URLHash=window.location.hash;
    
        // минус "#"
        var stateStr=URLHash.substr(1);

        if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
            var parts=stateStr.split("_")
            SPAState={ pagename: parts[0] };// первая часть закладки - номер страницы

            if ( SPAState.pagename=='Level' ) 
                SPAState.levelnumber=parts[1]; // для Level нужна ещё вторая часть закладки - номер уровня
                                                      
        }
        
        else {
            SPAState={ pagename:'Main' }; // иначе отображается начальная страница с меню
        }

        console.log('Новое состояние приложения:');
        console.log(SPAState);


        function includeScript(url) {
            var script = document.createElement('script');
            script.src = url;
            document.body.append(script);
          }

        // под текущее состояние обновляется вариабельная часть страницы 
        var pageHTML="";
        switch ( SPAState.pagename ) {
            case 'Main':
                pageHTML+=`<h1 class="game_title">СЛОЖИ КВАДРАТ</h1>`;
                pageHTML+=`<div class="game_demo">
                                <div class="demo-figures figure1"></div>
                                <div class="demo-figures figure2"></div>
                                <div class="demo-figures figure3"></div>
                                <div class="demo-container demo-container_base">
                                    <div class="base">
                                        <div class="demo-squares"></div>
                                        <div class="demo-squares"></div>
                                        <div class="demo-squares"></div>
                                        <div class="demo-squares"></div>
                                        <div class="demo-squares"></div>
                                        <div class="demo-squares"></div>
                                    </div>  
                                </div>
                                <div class="demo-figures figure4"></div>
                                <div class="demo-figures figure5"></div>
                                <div class="demo-figures figure6"></div>           
                            </div>`
                pageHTML+=`<div class="game_menu">
                                <div class="menu menu_rules">
                                    <button class="rules_button">Правила</button>
                                </div>
                                <div class="modal modal_menu modal_rules hidden">
                                    <div class="modal_close_icon">
                                        <i class="fas fa-times"></i>
                                    </div>
                                    <h2>Правила</h2>
                                    <div class="modal_text">
                                    "Сложи квадрат" &mdash; известная головоломка, в которой требуется 
                                    из нескольких фигурок различной формы сложить квадрат. Игра имеет несколько 
                                    уровней сложности, чем дальше &mdash; тем больше разрезных частей<br>
                                    Фигурки можно перемещать, а также вращать с шагом в 45 градусов (левая клавиша мыши или пробел).<br>
                                    Разместив фигуру в квадрат, ее следует зафиксировать (правая клавиша мыши или Enter).<br>
                                    Каждый квадрат может быть заполнен фигурками только одного цвета.<br>
                                    Уровень считается пройденным, если составлены все 6 квадратов 
                                    </div>
                                </div>
                                <div class="menu menu_play">
                                    <button class="play_button" onclick="switchToPlayPage()">Играть</button>
                                </div>
                                <div class="menu menu_settings">
                                    <button class="settings_button">Настройки</button>
                                </div>
                                <div class="modal modal_menu modal_settings hidden">
                                    <div class="modal_close_icon">
                                        <i class="fas fa-times"></i>
                                    </div>
                                    <h2>Выбор цветовой палитры</h2>
                                    <div class="modal_setting-container">
                                        <div class="modal_setting-palette palette1 palette_selected">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div class="modal_setting-palette palette2">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <div class="modal_setting-palette palette3">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                    
                                </div> 
                            </div>`
                includeScript("js/eventsListeners.js");
            break;

            case 'Play':
                pageHTML+=`<div class="game_play">
                <div class="level">
                    <button class="level_button" value="1" onclick="switchToLevelPage('1')">1 уровень</button>
                </div>
                <div class="level">
                    <button class="level_button" value="2" onclick="switchToLevelPage('2')">2 уровень</button>
                </div>
                <div class="level">
                    <button class="level_button" value="3" onclick="switchToLevelPage('3')">3 уровень</button>
                </div>
                <div class="level">
                    <button class="level_button" value="4" onclick="switchToLevelPage('4')" disabled>4 уровень</button>
                </div>
                <div class="level">
                    <button class="level_button" value="5" onclick="switchToLevelPage('5')" disabled>5 уровень</button>
                </div>
                <div class="level">
                    <button class="level_button" value="6" onclick="switchToLevelPage('6')" disabled>6 уровень</button>
                </div>
            </div>`
            
            break;

            case 'Level':
                var levelScriptURL = levels[SPAState.levelnumber];
                pageHTML+=`<div class="game_level">
                            <div class="game_level-info">
                                <div class="game_level-control">
                                    <div class="icon home" onclick="switchToMainPage()"><i class="fas fa-home"></i></i></div>
                                    <div class="icon sound-on"><i class="fas fa-volume-up"></i></div>
                                    <div class="icon sound-off hidden"><i class="fas fa-volume-mute"></i></div>
                                </div>
                                <div class="level_number">Уровень `+SPAState.levelnumber+`</div>
                                <div class="game_level-control">
                                    <div class="icon mouse_control"><i class="fas fa-mouse"></i></div>
                                    <div class="modal modal_mouse hidden">
                                        <div class="modal_close_icon">
                                            <i class="fas fa-times"></i>
                                        </div>
                                        <h2>Управление мышью</h2>
                                        <div class="modal_text">
                                                Перетаскивание фигуры &mdash; зажатая левая кнопка мыши<br>
                                                Фиксирование фигуры &mdash; щелчок правой кнопкой мыши<br>
                                                Отфиксирование фигуры &mdash; повторный щелчок правой кнопкой мыши<br>
                                                Поворот фигуры на 45 градусов &mdash; щелчок левой кнопкой мыши<br>
                                        </div>
                                    </div>
                                    <div class="icon keyboard_control"><i class="fas fa-keyboard"></i></div>
                                    <div class="modal modal_keyboard hidden">
                                        <div class="modal_close_icon">
                                            <i class="fas fa-times"></i>
                                        </div>
                                        <h2>Управление с клавиатуры</h2>
                                        <div class="modal_text">
                                                Выбор фигуры &mdash; последовательное нажатие клавиши "p" (латинская буква)<br>
                                                Перетаскивание фигуры &mdash; использование клавиш стрелок: вверх, вниз, вправо и влево<br>
                                                Фиксирование фигуры &mdash; нажатие клавиши "Enter"<br>
                                                Отфиксирование фигуры &mdash; повторное нажатие клавиши "Enter"<br>
                                                Поворот фигуры на 45 градусов &mdash; нажатие клавиши "пробел"<br>
                                        </div>
                                    </div>
                                    <div class="icon level_info"><i class="fas fa-info"></i></div>
                                </div>   
                            </div>`
                
                pageHTML+=`<div class="game_level-field">
                                <svg version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    
                                    viewBox="0 0 1200 480"
                                    preserveAspectRatio="xMidYMin meet"
                                    id="svgcont">
                                </svg>
                            </div>
                        </div>`
                pageHTML+=` <div class="modal modal_level modal_success hidden">
                                <div class="modal_close_icon">
                                    <i class="fas fa-times"></i>
                                </div>                
                                <div class="modal_text">
                                    Уровень  `+SPAState.levelnumber+` пройден! Поздравляю!
                                </div>      
                            </div>`
            // includeScript("js/resize.js");
            includeScript("js/partModel.js");
            includeScript("js/partView.js");
            includeScript("js/partControl.js");
            includeScript("js/gameField.js");
            includeScript(levelScriptURL);
            includeScript("js/control.js");
            break;
        }
        contGame.innerHTML=pageHTML;
    }

    function switchToState(newState) {
      var stateStr = newState.pagename;
      if ( newState.pagename=='Level' ){
        stateStr+="_"+newState.levelnumber;
      }
      location.hash = stateStr;
    }

    function switchToMainPage() {
        switchToState( { pagename:'Main' } );
    }

    function switchToRulesPage() {
        switchToState( { pagename:'Rules' } );
    }

    function switchToPlayPage() {
        switchToState( { pagename:'Play' } );
    }

    function switchToLevelPage(levelNumber) {
        switchToState( { pagename:'Level', levelnumber: levelNumber } );  
    }

    // переключение в состояние, которое сейчас прописано в закладке УРЛ
  switchToStateFromURLHash();

  

      