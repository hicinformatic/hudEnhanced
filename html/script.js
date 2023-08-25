var loadCssFile = function(theme, frame){
    var link = document.createElement( "link" );
    link.href = "themes/" + theme + "/css/" + frame + ".css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild( link );
}

var loadJsFile = function(theme, frame){
    var scriptTag = document.createElement('script');
    scriptTag.src = "themes/"+theme+"/"+frame+".js";;
    document.getElementsByTagName("body")[0].appendChild(scriptTag);
}

var setDebug = function(){
    if(cfg_preferences.debug){
        var el = document.getElementById(cfg_preferences.base);
        el.className = "debug";
    }
}

var backupFrame = function(frame){
    var el = document.getElementById(frame);
    frames_backup[frame] = {};
    for (let i = 0; i < frames_info.length; i++) {
        frames_backup[frame][frames_info[i]] = el[frames_info[i]];
    }
}

var cleanFrame = function(frame){
    var el = document.getElementById(frame);
    for (let i = 0; i < frames_info.length; i++) {
        el[frames_info[i]] = frames_backup[frame][frames_info[i]];
    }
}

var usePreference = function(frame){
    var el = document.getElementById(frame);
    if(!cfg_preferences[frame]){
        cfg_preferences[frame] = { show: true, };
        for (let i = 0; i < frames_info.length; i++) {
            cfg_preferences[frame][frames_info[i]] = el[frames_info[i]];
        }
    }
}

var setCoord = function(frame, x, y){
    var el = document.getElementById(frame);
    x = x || el.offsetLeft || 0;
    y = y || el.offsetTop || 0;
    if(!frames_backup[frame].coord){
        var coord = document.createElement("div");
        coord.id = "dataxy"+"-"+frame;
        coord.className = "dataxy";
        el.appendChild(coord);
        frames_backup[frame].coord = coord;
    }
    frames_backup[frame].coord.innerText = "x:"+x+" y:"+y;
}

var showData = function(frame){
    var el = document.getElementById(frame);
    setCoord(frame, 0, 0);
    var name = document.createElement("div");
    name.className = "data-name";
    name.innerText = frame;
    el.appendChild(name);
}

var startFrame = function(frame, offsetheight=0, offsetwidth=0){
    console.log("start: "+frame);
    backupFrame(frame);
    usePreference(frame);
    showData(frame);
    dragElement(frame, offsetheight, offsetwidth);
    frames_ready[frame] = true;
    console.log(frame, frames_ready);
}

var onFramesReady = function(){
    console.log("frames ready");
};

var framesReadyToDrag = function() {
    console.log("test: ", frames_ready);
    const flag = Object.keys(frames_ready).filter((k) => cfg_except.ready.indexOf(k) == -1).every((k) => frames_ready[k]);
    if(flag === false) {
        window.setTimeout(framesReadyToDrag, 1000);
    } else {
        onFramesReady();
    }
}

function dragElement(id, offsetheight=0, offsetwidth=0) {
    var elX = 0, elY = 0, posX = 0, posY = 0;
    var el = document.getElementById(id);
    var offsetheight = el.offsetHeight*offsetheight;
    var offsetwidth = el.offsetWidth*offsetwidth;
    el.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        posX = e.clientX, posY = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        elY = posY - e.clientY;
        elX = posX - e.clientX;
        posX = e.clientX, posY = e.clientY;
        var offsetY = el.offsetTop - elY, offsetX =  el.offsetLeft - elX;
        var minY = offsetheight, maxY = offsetY + el.offsetHeight;
        var minX = offsetwidth, maxX = offsetX + el.offsetWidth;

        // top/bot constraint
        if (el.offsetTop < minY) {
            offsetY = minY;
        }else if(maxY > document.body.offsetHeight+offsetheight){
            offsetY = document.body.offsetHeight+offsetheight - el.offsetHeight;
        }
        el.style.top = offsetY + "px";

        // left/right constraint
        if (el.offsetLeft < minX) {
            offsetX = minX;
        }else if(maxX > document.body.offsetWidth+offsetwidth){
            offsetX = document.body.offsetWidth+offsetwidth - el.offsetWidth;
        }
        el.style.left = offsetX + "px";
        setCoord(el.id, offsetX, offsetY);
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var cfg_css_addons = [];
var cfg_preferences = {};
var cfg_js_addons = ["js/fraction.min", "js/speedometer"];
var cfg_frames = ["stats", "weapons", "map", "speedometer", "flight"];
var cfg_except = {css: ["flight",], js: [], ready: ["flight",]};
var cfg_theme = "default";
var frames_info = ["outerHtml", "offsetHeight", "offsetWidth"];
var frames_ready = {};
var frames_backup = {};

var startHUD = function({frames, theme, preferences, except, base, debug}) {
    cfg_frames = frames || cfg_frames;
    cfg_theme = theme || cfg_theme;
    cfg_preferences = preferences || cfg_preferences;
    cfg_except = except || cfg_except;
    cfg_preferences.base = base || "hud-enhanced";
    cfg_preferences.debug = debug || false;

    for (let i = 0; i < cfg_css_addons.length; i++) {
        loadCssFile(cfg_theme, cfg_css_addons[i]);
    }
    
    for (let i = 0; i < cfg_js_addons.length; i++) {
        loadJsFile(cfg_theme, cfg_js_addons[i]);
    }
    
    for (let i = 0; i < cfg_frames.length; i++) {
        frames_ready[cfg_frames[i]] = false;
        if(cfg_except.css.indexOf(cfg_frames[i]) == -1)
            loadCssFile(cfg_theme, cfg_frames[i]);
        if(cfg_except.js.indexOf(cfg_frames[i]) == -1)
            loadJsFile(cfg_theme, cfg_frames[i]);
    }

    setDebug();
    framesReadyToDrag();
}