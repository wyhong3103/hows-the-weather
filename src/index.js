import { selectComp } from "./util";
import apiHandler from "./apiHandler";
import display from "./display";

const controller =(()=>{
    function setSearchBar(){
        const searchInp = selectComp("#search");
        const searchBtn = selectComp(".search-btn");

        searchBtn.addEventListener("click", ()=>{
            const searchVal = searchInp.value;
            if (searchVal === "") {
                const msg = selectComp(".msg");
                msg.textContent = "Please enter a location";
            }else{
                (async () => {
                    const weatherData = await apiHandler.getWeatherData(searchVal);
                    console.log(weatherData);
                })()
                .catch (
                    (err) =>  display.showErrorMsg(err)
                );
            }
        });
    }

    function init(){
        display.mainPage();
        setSearchBar();
    }

    return {
        init
    }
})();

controller.init();
