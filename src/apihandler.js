import { myFetch } from "./util";

const apiHandler = (() => {
    // YES I AM AWARE!!
    const apiKey = "d51250594163cc694b2b3bef2feae0c5";

    async function fetchWeatherData(place){
        const responseCur = await myFetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`);
        const curWeatherData = await responseCur.json();
        const responseFu = await myFetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${apiKey}`);
        const fuWeatherData = await responseFu.json();

        return {
            "curWeatherData" : curWeatherData,
            "fuWeatherData" : fuWeatherData,
        }
    }

    async function coordToPlace(lon, lat){
        const response = await myFetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        const locData = await response.json();

        const loc = [];
        
        if (locData[0].name === locData[0].state){
            loc.push(locData[0].state);
        }else{
            loc.push(locData[0].name);
            loc.push(locData[0].state);
        }
        loc.push(locData[0].country);

        return loc
    }

    async function getWeatherData(place){
        const weatherData = await fetchWeatherData(place);
        const {curWeatherData} = weatherData;
        const {fuWeatherData} = weatherData;

        const locArr = await coordToPlace(curWeatherData.coord.lon, curWeatherData.coord.lat);
        const loc = locArr.join(", ");

        const ret = {
            "curWeatherData" : {
                "timezone" : curWeatherData.timezone,
                "temperature" : curWeatherData.main.temp,
                "place" : loc,
                "desc" : curWeatherData.weather[0].description,
                "iconId" : curWeatherData.weather[0].icon,
                "feelsLikeVal" : curWeatherData.main.feels_like,
                "humidityVal" : curWeatherData.main.humidity,
                "visibilityVal" : curWeatherData.visibility,
                "windVal" : curWeatherData.wind.speed,
                "cloudinessVal" : curWeatherData.clouds.all,
            },
            "fuWeatherData" : []
        }  

        for(let i = 0; i < fuWeatherData.list.length; i++){
            const dt = fuWeatherData.list[i].dt_txt;
            const [date, time] = dt.split(" ");
            if (time === "12:00:00"){
                ret.fuWeatherData.push(
                    {
                        "date" : date,
                        "temperature" : fuWeatherData.list[i].main.temp,
                        "iconId" : fuWeatherData.list[i].weather[0].icon
                    }
                )
            }
        }

        return ret;
    }


    return{
        getWeatherData
    };
})();

export default apiHandler;