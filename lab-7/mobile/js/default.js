let defaultEventsLogs = [];

window.onload = (event) => {
    defaultEventsLogs = JSON.parse(localStorage.getItem("defaultEventsLogs"));
    if (defaultEventsLogs == null) {
        defaultEventsLogs = [];
    }
}

let square;
let width;
let height;
let startingHeight;

function playDefault() {
    document.querySelector("#defaultReload").style.display = "none";
    document.querySelector("#defaultStop").style.display = "none";
    document.querySelector("#defaultWork").style.display = "block";
    document.querySelector("#defaultClose").style.display = "block";
    document.querySelector("#defaultStart").style.display = "block";

    let animField = document.querySelector("#defaultAnimationField");
    square = document.querySelector("#square-box");
    width = animField.offsetWidth - 15;
    height = animField.offsetHeight;
    square.style.left = width + "px";
    startingHeight = document.querySelector("#defaultControls").offsetHeight + 5;
    square.style.top = "";
}

function closeDefault() {
    writeEventDef("Кнопка Close нажата");
    document.querySelector("#defaultWork").style.display = "none";
    isDefaultStopped = true;
    localStorage.setItem("defaultEventsLogs", JSON.stringify(defaultEventsLogs));
    printDefOut();
}

let isDefaultStopped;

function startDefault() {
    writeEventDef("Кнопка Start нажата");
    document.querySelector("#defaultStart").style.display = "none";
    document.querySelector("#defaultStop").style.display = "block";

    let fromTop = startingHeight;
    let fromLeft = width;
    let isBottomDirection = true;
    isDefaultStopped = false;

    let interval = setInterval(
        function () {
            if (isBottomDirection) {
                if (fromTop > height + startingHeight - 25) {
                    isBottomDirection = false;
                    writeEventDef("Коло коснулся нижней линии");
                }
                fromTop += 5;
                fromLeft -= 3;
            } else {
                if (fromTop < startingHeight + 5) {
                    isBottomDirection = true;
                    writeEventDef("Коло коснулся верхней линии");
                }
                fromTop -= 5;
                fromLeft -= 3;
            }
            if (fromLeft < -50) {
                clearInterval(interval)
                writeEventDef("Коло вышел за анимацию блока");
                document.querySelector('#defaultStop').style.display = 'none';
                document.querySelector('#defaultReload').style.display = 'block';

            }
            if (isDefaultStopped) {
                clearInterval(interval)
            }

            square.style.top = fromTop + "px";
            square.style.left = fromLeft + "px";
        }, 15);

}

function reloadDefault() {
    writeEventDef("Кнопка Reload нажата");
    document.querySelector('#defaultReload').style.display = 'none';
    document.querySelector('#defaultStart').style.display = 'block';

    let animField = document.querySelector("#defaultAnimationField");
    square = document.querySelector("#square-box");
    width = animField.offsetWidth - 15;
    height = animField.offsetHeight;
    square.style.left = width + "px";
    startingHeight = document.querySelector("#defaultControls").offsetHeight + 5;
    square.style.top = "";
}

function stopDefault() {
    writeEventDef("Кнопка Stop нажата");
    document.querySelector('#defaultStop').style.display = 'none';
    document.querySelector('#defaultStart').style.display = 'block';
    isDefaultStopped = true;
}

function writeEventDef(message) {
    let output = document.getElementById("defaultEventsOutput");
    output.textContent = message;

    defaultEventsLogs[defaultEventsLogs.length] = {
        message: message,
        time: getTimeNow()
    }
    localStorage.setItem("defaultEventsLogs", JSON.stringify(eventsLogs));
}

function printDefOut() {
    defaultEventsLogs = JSON.parse(localStorage.getItem("defaultEventsLogs"));
    if (defaultEventsLogs == null) {
        defaultEventsLogs = [];
    }

    let out = document.getElementById("right-subCol");
    out.innerHTML = "";
    let outElement = document.createElement("p");
    outElement.textContent = "DEFAULT EVENT LOGS:";
    out.appendChild(outElement);

    for (let i = eventsLogs.length - 1; i > 0; i--) {
        outElement = document.createElement("p");
        outElement.textContent = eventsLogs[i].message + " " + eventsLogs[i].time + " ";
        out.appendChild(outElement);
    }
}

function getTimeNow() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time;
}