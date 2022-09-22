import { createComp, selectComp } from "./util";
import './style.css';

const display = (() => {
    const content = selectComp("#content");

    function mainPage(){
        const title = createComp("div", "title");
        const titleLeft = createComp("span", "title-1");
        const titleRight = createComp("span", "title-2");

        titleLeft.textContent = "What's The";
        titleRight.textContent = " Weather?";

        title.appendChild(titleLeft);
        title.appendChild(titleRight);

        const searchBar = createComp("div", "search-bar");
        const searchInpDiv = createComp("div", "search-inp");
        const searchInp = createComp("input");
        searchInp.id = "search";
        searchInp.setAttribute("placeholder", "City(optional), Country");
        searchInpDiv.appendChild(searchInp);

        const searchBtn = createComp("div","search-btn");
        const searchSvg = createComp("img", "icon-svg");
        searchSvg.src = "./assets/search.svg";
        searchBtn.appendChild(searchSvg);

        searchBar.appendChild(searchInpDiv);
        searchBar.appendChild(searchBtn);
        content.appendChild(title);
        content.appendChild(searchBar);
    }

    function resultPage(){
        const mainContainer = createComp("div", "main-container");
        
        const curWeather = createComp("div", "cur-weather");
        const curTitle = createComp("h1", "cur-title");
        curTitle.textContent = "Current Weather Data";

        const newSearchContainer = createComp("div", "new-search");
        const newSerachBtn = createComp("div", "new-search-btn");
        newSerachBtn.textContent = "New Search";

        const switchContainer = createComp("div", "switch");
        const switchBtn = createComp("div", "switch-btn");
        switchBtn.textContent = "°C";

        curWeather.appendChild(curTitle);
        curWeather.appendChild(newSearchContainer);
        curWeather.appendChild(switchContainer);

        const curLeftContainer = createComp("div", "cur-left-container");

        const leftFlexContainer = createComp("div", "left-flex-container");
        curLeftContainer.appendChild(leftFlexContainer);

        const curTime = createComp("div", "cur-time");
        curTime.textContent = "10-10-2022 11:00 AM"
        const curPlace = createComp("div", "cur-place");
        curPlace.textContent = "New York, USA"
        const curTemperature = createComp("div", "cur-temperature");
        curTemperature.textContent = "26°C";

        leftFlexContainer.appendChild(curTime);
        leftFlexContainer.appendChild(curPlace);
        leftFlexContainer.appendChild(curTemperature);

        curWeather.appendChild(curLeftContainer);

        const curRightContainer = createComp("div", "cur-right-container");
        
        const curWeatherSvg = createComp("img");
        curWeatherSvg.id = "cur-weather-svg";
        const curDesc = createComp("div", "cur-desc");

        const rightFlexContainer = createComp("div", "right-flex-container");

        const feelsLikeCard = createComp("div", "feels-like");
        feelsLikeCard.classList.add("right-card");
        const feelsLikeIcon = createComp("img", "icon-svg");
        feelsLikeIcon.src = "./assets/feels-like.svg";

        const feelsLikeTitle =createComp("div", "feels-like-title");
        feelsLikeTitle.classList.add("right-title");
        feelsLikeTitle.textContent = "Feels Like";

        const feelsLikeVal = createComp("div", "feels-like-val");
        feelsLikeVal.classList.add("right-val");
        feelsLikeVal.textContent = "26 °C";
        feelsLikeCard.appendChild(feelsLikeIcon);
        feelsLikeCard.appendChild(feelsLikeTitle);
        feelsLikeCard.appendChild(feelsLikeVal);
        

        const humidityCard = createComp("div", "humidity");
        humidityCard.classList.add("right-card");
        const humidityIcon = createComp("img", "icon-svg");
        humidityIcon.src = "./assets/humidity.svg";

        const humidityTitle =createComp("div", "humidity-title");
        humidityTitle.classList.add("right-title");
        humidityTitle.textContent = "Humidity";

        const humidityVal = createComp("div", "humidity-val");
        humidityVal.classList.add("right-val");
        humidityVal.textContent = "28 %";

        humidityCard.appendChild(humidityIcon);
        humidityCard.appendChild(humidityTitle);
        humidityCard.appendChild(humidityVal);

        const windCard = createComp("div", "windspeed");
        windCard.classList.add("right-card");
        const windIcon = createComp("img", "icon-svg");
        windIcon.src = "./assets/wind.svg";

        const windTitle =createComp("div", "wind-title");
        windTitle.classList.add("right-title");
        windTitle.textContent = "Wind Speed";

        const windVal = createComp("div", "wind-val");
        windVal.classList.add("right-val");
        windVal.textContent = "28 km/h";

        windCard.appendChild(windIcon);
        windCard.appendChild(windTitle);
        windCard.appendChild(windVal);

        const visibilityCard = createComp("div", "visibility");
        visibilityCard.classList.add("right-card");
        const visibilityIcon = createComp("img", "icon-svg");
        visibilityIcon.src = "./assets/visibility.svg";

        const visibilityTitle =createComp("div", "visibility-title");
        visibilityTitle.classList.add("right-title");
        visibilityTitle.textContent = "Visibility";

        const visibilityVal = createComp("div", "visibility-val");
        visibilityVal.classList.add("right-val");
        visibilityVal.textContent = "89%";

        visibilityCard.appendChild(visibilityIcon);
        visibilityCard.appendChild(visibilityTitle);
        visibilityCard.appendChild(visibilityVal);

        const cloudinessCard = createComp("div", "cloudiness");
        cloudinessCard.classList.add("right-card");
        const cloudinessIcon = createComp("img", "icon-svg");
        cloudinessIcon.src = "./assets/cloudiness.svg";

        const cloudinessTitle =createComp("div", "cloudiness-title");
        cloudinessTitle.classList.add("right-title");
        cloudinessTitle.textContent = "Cloudiness";

        const cloudinessVal = createComp("div", "cloudiness-val");
        cloudinessVal.classList.add("right-val");
        cloudinessVal.textContent = "49%";

        cloudinessCard.appendChild(cloudinessIcon);
        cloudinessCard.appendChild(cloudinessTitle);
        cloudinessCard.appendChild(cloudinessVal);

        rightFlexContainer.appendChild(feelsLikeCard);
        rightFlexContainer.appendChild(humidityCard);
        rightFlexContainer.appendChild(windCard);
        rightFlexContainer.appendChild(visibilityCard);
        rightFlexContainer.appendChild(cloudinessCard);

        curRightContainer.appendChild(curWeatherSvg);
        curRightContainer.appendChild(curDesc);
        curRightContainer.appendChild(rightFlexContainer);

        curWeather.appendChild(curRightContainer);

        const futureWeather = createComp("div", "future-weather");

        const futureTitle = createComp("div", "future-title");
        futureTitle.textContent = "Future Weather Data";

        const futureCardsFlex = createComp("div", "future-cards-flex");
        const futureCardsContainer = createComp("div", "future-cards-container");

        futureCardsFlex.appendChild(futureCardsContainer);
        futureWeather.appendChild(futureTitle);
        futureWeather.appendChild(futureCardsFlex);

        mainContainer.appendChild(curWeather);
        mainContainer.appendChild(futureWeather);

        content.appendChild(mainContainer);
    }

    return {
        mainPage,
        resultPage
    }
})();

export default display;
