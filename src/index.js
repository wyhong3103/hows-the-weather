import { selectComp } from "./util";
import display from "./display";

const controller =(()=>{
    function setSearchBar(){
        const searchInp = selectComp("#search");
        const searchBtn = selectComp(".search-btn");
    }

    function init(){
        display.mainPage();
        display.showErrorMsg("HI");
    }

    return {
        init
    }
})();

controller.init();
