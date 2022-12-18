import { selectComp, getTime, getTemperature, capitalizeString} from "./util";
import apiHandler from "./apiHandler";
import display from "./display";

const controller =(()=>{
    let weatherData = {};
    let celcius = true;

    function getProcessedData(){
        return{
            "time" : getTime(weatherData.curWeatherData.timezone),
            "place" : weatherData.curWeatherData.place,
            "temperature" : `${getTemperature(weatherData.curWeatherData.temperature, celcius)} ${(celcius === true ? "°C" : "°F")}`,
            "desc" : capitalizeString(weatherData.curWeatherData.desc),
            "iconId" : weatherData.curWeatherData.iconId,
            "feelsLikeVal" : `${getTemperature(weatherData.curWeatherData.feelsLikeVal, celcius)} ${(celcius === true ? "°C" : "°F")}`,
            "humidityVal" : `${weatherData.curWeatherData.humidityVal} %`,
            "visibilityVal" :`${weatherData.curWeatherData.visibilityVal} m`,
            "windVal" : `${weatherData.curWeatherData.windVal} m/s`,
            "cloudinessVal" : `${weatherData.curWeatherData.cloudinessVal} %`,
        }
    }

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
                    weatherData = await apiHandler.getWeatherData(searchVal);
                    display.clearPage();
                    display.resultPage(celcius);
                    setResultPage();
                })()
                .catch (
                    (err) =>  display.showErrorMsg(err)
                );
            }
        });
    }

    function setResultPage(){
        const curProcessedData = getProcessedData();
        display.setCurData(curProcessedData);
        for(let i = 0; i < weatherData.fuWeatherData.length; i++){
            const curData = weatherData.fuWeatherData[i];
            const {date} = curData;
            const temperature = `${getTemperature(curData.temperature, celcius)} ${(celcius === true ? "°C" : "°F")}`;
            const {iconId} = curData;
            display.addFutureCard(date, temperature, iconId);
        }

        const switchBtn = selectComp(".switch-btn");
        switchBtn.addEventListener("click" , () => {
            celcius = !celcius;
            display.clearPage();
            display.resultPage(celcius);
            setResultPage();
        });

        const newSearchBtn = selectComp(".new-search-btn");
        newSearchBtn.addEventListener("click", ()=>{
            display.clearPage();
            display.mainPage();
            setSearchBar();
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
