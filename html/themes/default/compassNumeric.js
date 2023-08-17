const coords = { x: -1, y: 0, targetX: -1, targetY: 0 };
const coordinatesToDegrees = (x, y) => (Math.atan2(y, x) * 180) / Math.PI + 180;
var container;

class Compass {
    container = document.getElementById("compass");
    canvas = document.createElement("canvas");
    ctx = this.canvas.getContext("2d");

    constructor(size) {
        this.pixelRatio = Math.round(devicePixelRatio) ?? 1;

        this.size = size * this.pixelRatio;

        this.canvas.width = this.size;
        this.canvas.height = this.size / 4;
        this.canvas.style.width = this.size / this.pixelRatio + "px";
        this.canvas.style.height = this.size / 4 / this.pixelRatio + "px";
        this.drawCanvas();

        requestAnimationFrame(this.drawCanvas);

        this.container.appendChild(this.canvas);
        document.body.appendChild(this.container);
    }

    drawHeading(degrees) {
        const heading = Math.round(degrees).toString().padStart(3, "0");

        // Mask shapes below fillRect
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.fillRect(
            this.canvas.width / 2 - 30,
            this.canvas.height / 2 - 30,
            60,
            25
        );
        this.ctx.globalCompositeOperation = "source-over";

        // Draw current heading
        this.ctx.font = "18px B612 Mono, monospace";
        this.ctx.fillStyle = "#fff";

        this.ctx.fillText(
            heading,
            this.canvas.width / 2 - this.ctx.measureText(heading).width / 2,
            this.canvas.height / 2 - 10
        );
    }

    drawMarkings(offset) {
        // To include the last line, we subtract 0.5
        const WIDTH_6_DEG = ((this.canvas.width - 0.5) * 2) / 360;

        this.ctx.fillStyle = "#fff";
        this.ctx.strokeStyle = "#fff";

        for (let i = 0; i < 360; i += 6) {
            const x = WIDTH_6_DEG * i + offset;

            // Draw lines every 6th degree, with a larger one every 30th
            this.ctx.beginPath();

            if (i % 30 === 0) {
                this.ctx.moveTo(x + 0.5, this.canvas.height / 2 + 0);
                this.ctx.lineTo(x + 0.5, this.canvas.height / 2 + 15);
            } else {
                this.ctx.moveTo(x + 0.5, this.canvas.height / 2 + 5);
                this.ctx.lineTo(x + 0.5, this.canvas.height / 2 + 10);
            }

            this.ctx.stroke();

            // Draw cardinal points and headings
            this.ctx.font = "16px B612 Mono, monospace";

            if (i === 0 || i === 360) {
                this.ctx.fillText(
                    "N",
                    x - this.ctx.measureText("N").width / 2,
                    this.canvas.height / 2 - 10
                );
            } else if (i === 90) {
                this.ctx.fillText(
                    "E",
                    x - this.ctx.measureText("E").width / 2,
                    this.canvas.height / 2 - 10
                );
            } else if (i === 180) {
                this.ctx.fillText(
                    "S",
                    x - this.ctx.measureText("S").width / 2,
                    this.canvas.height / 2 - 10
                );
            } else if (i === 270) {
                this.ctx.fillText(
                    "W",
                    x - this.ctx.measureText("W").width / 2,
                    this.canvas.height / 2 - 10
                );
            } else if (i % 30 === 0) {
                const heading = i > 10 ? Math.round(i / 10) : i;

                this.ctx.font = "12px B612 Mono, monospace";
                this.ctx.fillText(
                    heading,
                    x - this.ctx.measureText(heading).width / 2,
                    this.canvas.height / 2 - 10
                );
            }
        }
    }

    drawCanvas = () => {
        requestAnimationFrame(this.drawCanvas);

        // Clear canvas
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const degrees = coordinatesToDegrees(coords.x, coords.y);

        const WIDTH_90_DEG = this.canvas.width / 2;
        const WIDTH_360_DEG = this.canvas.width * 2;

        const offset = WIDTH_90_DEG - (degrees / 360) * WIDTH_360_DEG;

        this.drawMarkings(offset - WIDTH_360_DEG);
        this.drawMarkings(offset);
        this.drawMarkings(offset + WIDTH_360_DEG);
        this.drawHeading(degrees);
    };
}

var showPlace = function(el) {
  el.innerHTML = "test";
 
};

var startcompass = function(){
    startFrame("compass", 0, 0.5);
    container = document.getElementById("compass");
    new Compass(300);
}
startcompass();