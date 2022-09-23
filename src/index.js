import { selectComp, getNow} from "./util";
import apiHandler from "./apiHandler";
import display from "./display";

const controller =(()=>{
    let weatherData = {};
    let celcius = true;

    function getTemperature(temp){
        return Math.floor(celcius === true ? temp - 273.15 : 1.8*(temp-273.15) + 32);
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
      

    function capitalizeString(string){
        const arr = string.split(" ");
        const newArr = [];
        for(let i = 0; i < arr.length; i++){
            newArr.push(capitalizeFirstLetter(arr[i]));
        }
        return newArr.join(" ");
    }

    function getProcessedData(){
        return{
            "time" : getNow(),
            "place" : weatherData.curWeatherData.place,
            "temperature" : `${getTemperature(weatherData.curWeatherData.temperature)} ${(celcius === true ? "°C" : "°F")}`,
            "desc" : capitalizeString(weatherData.curWeatherData.desc),
            "iconId" : weatherData.curWeatherData.iconId,
            "feelsLikeVal" : `${getTemperature(weatherData.curWeatherData.feelsLikeVal)} ${(celcius === true ? "°C" : "°F")}`,
            "humidityVal" : `${weatherData.curWeatherData.humidityVal} %`,
            "visibilityVal" :`${Math.floor(weatherData.curWeatherData.visibilityVal/10000) * 100} %`,
            "windVal" : `${weatherData.curWeatherData.windVal} m/s`,
            "cloudinessVal" : `${weatherData.curWeatherData.cloudinessVal} %`,
        }
    }

    function setResultPage(){
        const curProcessedData = getProcessedData();
        display.setCurData(curProcessedData);
        for(let i = 0; i < weatherData.fuWeatherData.length; i++){
            const curData = weatherData.fuWeatherData[i];
            const {date} = curData;
            const temperature = `${getTemperature(curData.temperature)} ${(celcius === true ? "°C" : "°F")}`;
            const {iconId} = curData;
            display.addFutureCard(date, temperature, iconId);
        }

        const switchBtn = selectComp(".switch-btn");
        switchBtn.addEventListener("click" , () => {
            celcius = !celcius;
            if (celcius === true) switchBtn.textContent = "°C";
            else switchBtn.textContent = "°F";
            display.clearPage();
            display.resultPage();
            setResultPage();
        })
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
                    display.resultPage();
                    setResultPage();
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
