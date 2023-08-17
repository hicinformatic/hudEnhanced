var container;
var stats = {};
var cfg_stats = {
    health: {
        colors: {r: 61, g: 215, b: 90},
    },
    thirst: {
        colors: {r: 0, g: 222, b: 230}
    },
    hunger: {
        colors: {r: 245, g: 122, b: 0}
    },
    shield: {
        colors: {r: 102, g: 102, b: 102}
    },
    stamina: {
        colors: {r: 0, g: 149, b: 255}
    },
    oxygen: {
        colors: {r: 0, g: 149, b: 255}
    },
}

//"parachute:white",
//"armed:gray",
//"harness:purple",
//"nitro:blue",

var getRGBA = function(colors, a=1) {
    console.log("rgba("+colors.r+", "+colors.g+", "+colors.b+", "+a+")");
    return "rgba("+colors.r+", "+colors.g+", "+colors.b+", "+a+")";
}

var addStat = function (name, conf){
    var elements = ["stat", "icon", "framedesc", "desc", "framebar", "bar"]
    for (let i = 0; i < elements.length; i++) {
        window["el"+elements[i]] = document.createElement("div");
        window["el"+elements[i]].className = elements[i];
        window["el"+elements[i]].id = name+elements[i];
    }

    elbar.style.backgroundColor = getRGBA(conf.colors);
    elbar.style.width = "60%";
    elframebar.style.backgroundColor = getRGBA(conf.colors, 0.4);
    elframebar.appendChild(elbar);
    eldesc.innerHTML = name;
    eldesc.style.color = getRGBA(conf.colors);
    elframedesc.appendChild(eldesc);
    elframedesc.appendChild(elframebar);
    elicon.style.borderColor = getRGBA(conf.colors);
    elicon.style.backgroundColor = getRGBA(conf.colors, 0.2);
    elstat.style.backgroundColor = getRGBA(conf.colors, 0.2);
    elstat.style.borderColor = getRGBA(conf.colors);
    elstat.appendChild(elicon);
    elstat.appendChild(elframedesc);
    container.appendChild(elstat);
}



var startstats = function(){
    container = document.getElementById("stats");
    startFrame("stats");
    for (const [key, value] of Object.entries(cfg_stats)) {
        addStat(key, value);
    }

}

startstats()