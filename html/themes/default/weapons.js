var container, elframe, elammo, elimg;

var prepareWeapons = function(){
    elframe = document.createElement("div");
    elframe.id = "weaponsframe";
    elimg = document.createElement("div");
    elimg.id = "weaponsimg";
    elframe.appendChild(elimg);
    elammo = document.createElement("div");
    elammo.id = "weaponsammo";
    elframe.appendChild(elammo);
    container.appendChild(elframe);

};

var displayAmmo = function(){
    elammo.innerText = "0";
};

var startweapons = function(){
    startFrame("weapons");
    container = document.getElementById("weapons");
    prepareWeapons();
    displayAmmo();
};

startweapons();