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

export {
    createComp,
    selectComp
};
