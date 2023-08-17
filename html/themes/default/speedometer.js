var container = document.getElementById("speedometer");
let speed = 0, tacho = 0 ,gas = 0, mileage = 0;
let width = 425, height = 210;
let turnSignalsStates = { 'left':  true, 'right': true }
let iconsStates = {
    // main circle
    'dippedBeam': 1,
    'brake':      1,
    'drift':      1,
    'highBeam':   1,
    'lock':       1,
    'seatBelt':   1,
    'engineTemp': 2,
    'stab':       1,
    'abs':        1,
    // right circle
    'gas':        2,
    'trunk':      1,
    'bonnet':     1,
    'doors':      1,
    // left circle
    'battery':    2,
    'oil':        2,
    'engineFail': 2
}

function redraw(canvas, ctx) {
    draw(canvas, ctx, speed, tacho, gas, mileage, turnSignalsStates, iconsStates);
}

var startspeedometer = function(){
    startFrame("speedometer");
    var eldiv = document.createElement("div");
    eldiv.style.display = "none";
    var elimg = document.createElement("img");
    elimg.src = "themes/default/icons/speedometer.svg";
    elimg.id = "sprite-speedometer";
    eldiv.appendChild(elimg);
    container.appendChild(eldiv);
    var elcanvas = document.createElement("canvas");
    elcanvas.id = "canvas-speedometer";
    elcanvas.height = height;
    elcanvas.width = width;
    container.appendChild(elcanvas);
    const ctx = elcanvas.getContext('2d');
    redraw(elcanvas, ctx);
}

startspeedometer();