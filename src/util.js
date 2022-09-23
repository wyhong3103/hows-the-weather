function createComp(type, cls = ""){
    const element = document.createElement(type);
    if (cls !== ""){
        element.classList.add(cls);
    }
    return element;
}

function selectComp(selector){
    return document.querySelector(selector);
}

async function myFetch(url){
    return fetch(
        url,
        {
            'mode' : 'cors'
        }
    ).then(
        response => {
            if (!response.ok){
                throw new Error("Location not found!");
            }
            return response;
        }
    ).catch(
        (err) => Promise.reject(err)
    )
}

function getTime(timezone){
    // Best & easiest way I could think of to extract a date & time from different time zone
    const timestamp = (new Date().getTime()) + (timezone*1000);
    const date = (new Date(timestamp)).toUTCString();
    const re = /(.+) GMT/;
    const match = date.match(re);
    return match[1];
}

function getTemperature(temp, celcius){
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

export {
    createComp,
    selectComp,
    myFetch,
    getTime,
    getTemperature,
    capitalizeString
};
