const apiHandler = (() => {
    const apiKey = "d51250594163cc694b2b3bef2feae0c5";

    function handleError(fn){
        return (
            (...params) => fn (...params).catch(
                (err) => err
            )
            );
    }

    async function fetcWeatherhDate(place){
        const responseCur = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`,
            {
                'mode' : 'cors'
            }
        );

        const curWeatherData = await responseCur.json();

        const responseFu = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${apiKey}`,
            {
                'mode' : 'cors'
            }
        );

        const fuWeatherData = await responseFu.json();
        
        return {
            "curWeatherData" : curWeatherData,
            "fuWeatherData" : fuWeatherData,
        }
    }

    async function coordToPlace(lon, lat){
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`,
            {
                "mode" : "cors"
            }
        );

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
        const weatherData = await fetcWeatherhDate(place);

        const {curWeatherData} = weatherData;
        const {fuWeatherData} = weatherData;

        const locArr = await coordToPlace(curWeatherData.coord.lon, curWeatherData.coord.lat);
        const loc = locArr.join(", ");
        

        const ret = {
            "curWeatherData" : {
                "temperature" : curWeatherData.main.temp,
                "place" : loc,
                "desc" : curWeatherData.weather.description,
                "iconId" : curWeatherData.weather.icon,
                "feelsLikeVal" : curWeatherData.main.feels_like,
                "humidityVal" : curWeatherData.main.humidity,
                "visibilityVal" : curWeatherData.visibility,
                "windVal" : curWeatherData.wind.speed,
                "cloudinessVal" : curWeatherData.clouds.all,
            },
            "fuWeatherData" : []
        }  

        for(let i = 0; i < fuWeatherData.list.length(); i++){
            const dt = fuWeatherData.list[i].dt_txt;
            const {date, time} = dt.split(" ");

            if (time === "12:00:00"){
                ret.fuWeatherData.push(
                    {
                        "date" : date,
                        "temperature" : fuWeatherData.list[i].main.temp,
                        "iconId" : fuWeatherData.list[i].weather.icon
                    }
                )
            }
        }

        return ret;
    }

    const getWeatherDataSafe = handleError(getWeatherData);

    return{
        getWeatherDataSafe
    };
});

export default apiHandler;