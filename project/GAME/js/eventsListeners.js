"use strict";
//ОБРАБОТЧИКИ РАЗНЫХ СОБЫТИЙ. ПОДПИСКА НА НИХ

//1.События при загрузке страницы
window.addEventListener('load',showAnim);

function showAnim() {
    var figure1 = document.querySelector(".figure1");
    var figure2 = document.querySelector(".figure2");
    var figure3 = document.querySelector(".figure3");
    var figure4 = document.querySelector(".figure4");
    var figure5 = document.querySelector(".figure5");
    var figure6 = document.querySelector(".figure6");
    figure1.style.transform="translateZ(0) translateY(9vh)";
    figure2.style.transform="translateZ(0) translateY(9vh)";
    figure3.style.transform="translateZ(0) translateY(9vh)";
    figure4.style.transform="translateZ(0) translateY(-3vh)";
    figure5.style.transform="translateZ(0) translateY(-3vh)";
    figure6.style.transform="translateZ(0) translateY(-3vh)";
    var gameDemo = document.querySelector(".game_demo");
    gameDemo.style.height='32vh';
}


//2. Нажатие на панель Правила (и закрытие модального окна)
var rulesButton = document.querySelector(".rules_button");
rulesButton.addEventListener('click',showRulesModal);

function showRulesModal(){
    var rulesModal = document.querySelector(".modal_rules");
    rulesModal.classList.remove('hidden');
    rulesModal.classList.add('show');
    var closeButton = rulesModal.querySelector(".modal_close_icon");
    closeButton.addEventListener('click',closeModal);
}

//3. Нажатие на панель Настройки (и закрытие модального окна)
var settingsButton = document.querySelector(".settings_button");
settingsButton.addEventListener('click',showSettingsModal);

function showSettingsModal(){
    var settingsModal = document.querySelector(".modal_settings");
    settingsModal.classList.remove('hidden');
    settingsModal.classList.add('show');
    var closeButton = settingsModal.querySelector(".modal_close_icon");
    closeButton.addEventListener('click',closeModal);
}

function closeModal(){
    var windowModal = document.getElementsByClassName('modal');
    console.log(windowModal);
    for (var i=0; i<windowModal.length;i++) {
        if (windowModal[i].classList.contains('show')){
                windowModal[i].classList.add('hidden');
                windowModal[i].classList.remove('show');
        }
    }
}

//4. Изменение цветовой палитры
var palette1 = document.querySelector(".palette1");
var palette2 = document.querySelector(".palette2");
var palette3 = document.querySelector(".palette3");

palette1.addEventListener('click',usePalette1);
palette2.addEventListener('click',usePalette2);
palette3.addEventListener('click',usePalette3);

function usePalette1(){
    palette1.classList.add('palette_selected');
    palette2.classList.remove('palette_selected');
    palette3.classList.remove('palette_selected');
    paletteArr=paletteArr1;
}
function usePalette2(){
    palette2.classList.add('palette_selected');
    palette3.classList.remove('palette_selected');
    palette1.classList.remove('palette_selected');
    paletteArr=paletteArr2;
}
function usePalette3(){
    palette3.classList.add('palette_selected');
    palette1.classList.remove('palette_selected');
    palette2.classList.remove('palette_selected');
    paletteArr=paletteArr3;
}

 


