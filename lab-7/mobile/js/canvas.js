let eventsLogs = [];

window.onload = (event) => {
    eventsLogs = JSON.parse(localStorage.getItem("eventsLogs"));
    if (eventsLogs == null) {
        eventsLogs = [];
    }
}

function playCanvas() {
    document.querySelector('#work').style.display = 'block';
    document.querySelector('#closeCanvas').style.display = 'block';
    document.querySelector('#startCanvas').style.display = 'block';
    fillCanvasBackground();

    eventsLogs[eventsLogs.length] = {
        message: "WORK displayed",
        time: getTimeNow()
    }
    localStorage.setItem("eventsLogs", JSON.stringify(eventsLogs));
}

let img;

function fillCanvasBackground() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    img = new Image();
    img.src = "./images/bg.jpg";

    img.onload = () => {
        ctx.fillStyle = ctx.createPattern(img, "repeat");
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000";
        ctx.fillRect(canvas.width - 10, 0, 10, 10);
    };
}

function closeCanvas() {
    document.querySelector('#startCanvas').style.display = 'none';
    document.querySelector('#reloadCanvas').style.display = 'none';
    document.querySelector('#work').style.display = 'none';
    isStopped = true;
    writeEvent("");

    eventsLogs[eventsLogs.length] = {
        message: "WORK stopped displaying",
        time: getTimeNow()
    }
    localStorage.setItem("eventsLogs", JSON.stringify(eventsLogs));
    printToAfterCloseOutput();
}

function printToAfterCloseOutput() {
    eventsLogs = JSON.parse(localStorage.getItem("eventsLogs"));
    if (eventsLogs == null) {
        eventsLogs = [];
    }

    let out = document.getElementById("right-subCol");
    out.innerHTML = "";
    let outElement = document.createElement("p");
    outElement.textContent = "CANVAS EVENT LOGS:";
    out.appendChild(outElement);

    for (let i = eventsLogs.length - 1; i > 0; i--) {
        outElement = document.createElement("p");
        outElement.textContent = eventsLogs[i].message + " " + eventsLogs[i].time + " ";
        out.appendChild(outElement);
    }
}

function reloadCanvas() {
    writeEvent("Кнопка Reload нажата");
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    fillCanvasBackground();

    ctx.fillStyle = "#000";
    ctx.fillRect(width - 10, 0, 10, 10);
    document.querySelector('#startCanvas').style.display = 'block';
    document.querySelector('#reloadCanvas').style.display = 'none';
}

function stopCanvas() {
    writeEvent("Кнока Stop нажата");
    isStopped = true;
}

function startCanvas() {
    writeEvent("Кнопка Start нажата");
    isStopped = false;
    document.querySelector('#startCanvas').style.display = 'none';
    document.querySelector('#stopCanvas').style.display = 'block';
    fillCanvasBackground();
    moveCanvas();
}

let isRunning = false;
let isStopped = false;

function moveCanvas() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let width = canvas.width;
    let height = canvas.height;
    let x = width - 10;
    let y = 0;
    let isBottomDirection = true;

    if (!isRunning) {
        isRunning = true;
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, 10, 10);
        requestAnimationFrame(draw);
    }

    function draw(timeStamp) {

        ctx.fillStyle = ctx.createPattern(img, "repeat");
        if (isBottomDirection) {
            ctx.fillRect(x, y - 6, 14, 14);
        } else {
            ctx.fillRect(x, y + 3, 14, 16);
        }
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, 10, 10);

        setTimeout(function () {
            console.log('End of animation')
        }, 500);

        if (isBottomDirection) {
            if (y >= height - 10) {
                isBottomDirection = false;
                writeEvent("Коло коснулся нижнего края блока")
            } else {
                y += 3;
                x -= 2;
            }
        } else {
            if (y < 0) {
                isBottomDirection = true;
                writeEvent("Коло коснулся верхнего края блока")
            } else {
                y -= 3;
                x -= 2;
            }
        }

        if (isStopped) {
            ctx = null;
            isRunning = false;
            document.querySelector('#startCanvas').style.display = 'block';
            document.querySelector('#stopCanvas').style.display = 'none';
            return
        }

        if (x < 0) {
            ctx.fillStyle = ctx.createPattern(img, "repeat");
            ctx.fillRect(x, y - 4, 20, 20);

            ctx = null;
            isRunning = false;
            document.querySelector('#reloadCanvas').style.display = 'block';
            document.querySelector('#stopCanvas').style.display = 'none';

            writeEvent("Коло за пределами области");
            return;
        }


        setTimeout(draw, 16);
    }
}

function clearPrevCanvasStep(x, y) {
    if (isBottomDirection) {
        ctx.fillRect(x, y - 6, 14, 14);
    } else {
        ctx.fillRect(x, y + 3, 14, 16);
    }
}


function writeEvent(message) {
    let output = document.querySelector("#canvasEventsOutput").innerHTML = message;

    eventsLogs[eventsLogs.length] = {
        message: message,
        time: getTimeNow()
    }
    localStorage.setItem("eventsLogs", JSON.stringify(eventsLogs));
}