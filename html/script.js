var loadCssFile = function(theme, frame){
    var link = document.createElement( "link" );
    link.href = "themes/" + theme + "/css/" + frame + ".css";
    console.log("add css: " + link.href);
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName( "head" )[0].appendChild( link );
};

var loadJsFile = function(theme, frame){
    var scriptTag = document.createElement('script');
    scriptTag.src = "themes/" + theme + "/" + frame + ".js";;
    console.log(scriptTag.src);
    document.getElementsByTagName( "body" )[0].appendChild(scriptTag);
};

var startFrame = function(frame, offsetheight=0, offsetwidth=0){
    console.log("start frame: " + frame);
    dragElement(frame, offsetheight, offsetwidth);
    frames_ready[frame] = true;
}

var onFramesReady = function(){
    console.log("frames ready");
};

var framesReadyToDrag = function() {
    const flag = Object.keys(frames_ready).every((k) => frames_ready[k]);
    if(flag === false) {
        window.setTimeout(framesReadyToDrag, 1000);
    } else {
        onFramesReady();
    }
};

var startDraggable = function(){
    console.log("ready to drag");
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
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var cfg_css_addons = [];
var cfg_js_addons = ["js/fraction.min", "js/speedometer"];
var cfg_frames = ["stats", "weapons", "map", "speedometer"];
var cfg_frames_standalone = ["coordinator", "airspeed", "altimeter", "verticalspeed", "attitude", "turn",]
var cfg_theme = "default";
var frames_ready = {};

var startHUD = function(frames, theme) {
    cfg_frames = frames || cfg_frames;
    cfg_theme = theme || cfg_theme;

    for (let i = 0; i < cfg_css_addons.length; i++) {
        loadCssFile(cfg_theme, cfg_css_addons[i]);
    }

    for (let i = 0; i < cfg_js_addons.length; i++) {
        loadJsFile(cfg_theme, cfg_js_addons[i]);
    }

    for (let i = 0; i < cfg_frames.length; i++) {
        frames_ready[cfg_frames[i]] = false;
        loadCssFile(cfg_theme, cfg_frames[i]);
        loadJsFile(cfg_theme, cfg_frames[i]);
        if(debug){
            document.getElementById(cfg_frames[i]).classList.add("debug");
        }
    }

    for (let i = 0; i < cfg_frames_standalone.length; i++) {
        frames_ready[cfg_frames_standalone[i]] = false;
        if(debug){
            document.getElementById(cfg_frames_standalone[i]).classList.add("debug");
        }
        startFrame(cfg_frames_standalone[i]);
    }

    framesReadyToDrag();
}