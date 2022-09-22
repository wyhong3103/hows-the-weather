import display from "./display";

const controller =(()=>{
    function init(){
        display.mainPage();
    }

    return {
        init
    }
})();

controller.init();
