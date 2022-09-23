import {format} from 'date-fns' 

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

function getNow(){
    return (format(new Date(), "yyyy-MM-dd HH:mm:ss"))
}

export {
    createComp,
    selectComp,
    myFetch,
    getNow
};
