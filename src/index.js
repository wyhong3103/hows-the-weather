import display from "./display";

const controller =(()=>{
    function init(){
        display.resultPage();
    }

    return {
        init
    }
})();

controller.init();
