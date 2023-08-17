
var container;
var cardinals = ["north", "east", "west", "south"];
var contcomp = ["frame", "main", "rose", "cardial", "ordinal", "center", "needle"];

var prepareCompass = function(){
    for (let i = 0; i < contcomp.length; i++) {
        window["el"+contcomp[i]] = document.createElement("div");
        window["el"+contcomp[i]].id = "compass"+contcomp[i];
    }

    // Labels
    for (let i = 0; i < cardinals.length; i++) {
        window["ellabel"+cardinals[i]] = document.createElement("div");
        window["ellabel"+cardinals[i]].id = "compasslabel" + cardinals[i];
        window["ellabel"+cardinals[i]].innerText = cardinals[i].charAt(0);
        elmain.appendChild(window["ellabel"+cardinals[i]]);
        window["elcardial"+cardinals[i]] = document.createElement("div");
        window["elcardial"+cardinals[i]].id = "compasscardinal" + cardinals[i];
        window["elcardial"+cardinals[i]].className = "pointer" + cardinals[i] + " pointer";
        elcardial.appendChild(window["elcardial"+cardinals[i]]);
        window["elordinal"+cardinals[i]] = document.createElement("div");
        window["elordinal"+cardinals[i]].id = "compassordinal" + cardinals[i];
        window["elordinal"+cardinals[i]].className = "pointer" + cardinals[i];
        elordinal.appendChild(window["elordinal"+cardinals[i]]);
    }

    elrose.appendChild(elcardial);
    elrose.appendChild(elordinal);
    elmain.appendChild(elrose);
    elmain.appendChild(elcenter);
    elmain.appendChild(elneedle);
    elframe.appendChild(elmain);
    container.appendChild(elframe);
}

var startcompass = function(){
    startFrame("compass");
    container = document.getElementById("compass");
    prepareCompass();
}
startcompass();