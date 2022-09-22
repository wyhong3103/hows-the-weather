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

    return {
        mainPage
    }
})();

export default display;
