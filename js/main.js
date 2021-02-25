const wrapperWelcomeScreen = document.querySelector('.wrapperWelcomeScreen');
const wrapperAreaGame = document.querySelector('.wrapperAreaGame');
const areaGame = document.querySelector('.areaGame');
const closeWelcomeScreen = document.querySelector('.fa-window-close');
const wrapperTracks = document.querySelector('.wrapperTracks');
const ball = document.querySelector('.ball');
const tracksArray = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13, track14, track15]
wrapperAreaGame.classList.add('visibility');
let flag = false;
let dimensionsAreaGame = getComputedStyle(areaGame);
let size = 0.6;

const settings = {
    shiftX: parseInt(dimensionsAreaGame.marginLeft),
    shiftY: parseInt(dimensionsAreaGame.marginTop),
    heightTrackElement: parseInt(dimensionsAreaGame.height) / 7,
    widthTrackElement: parseInt(dimensionsAreaGame.width) / 12,
    ballSize: parseInt(dimensionsAreaGame.height) / 7 * size
}

// functions for creating boxes showing all tracks and showing area game for active track

const showAreaGame = function () {
    wrapperAreaGame.classList.remove('visibility')
    createTrack();
}

const createTrackBox = function (param) {
    const divElement = document.createElement('div');
    divElement.classList.add('trackBox');
    if (param == "ready") {
        divElement.style.backgroundImage = 'url(pictures/picture1.png)';
        divElement.addEventListener('click', showAreaGame)
    } else if (param == "blocked") {
        divElement.innerHTML = '<i class = "fas fa-lock" ></i>';
    }
    wrapperTracks.appendChild(divElement);
}
const showAllTracks = function () {
    for (let i = 0; i < tracksArray.length; i++) {
        if (tracksArray[i].status == "ready") {
            createTrackBox("ready");
        } else {
            createTrackBox("blocked");
        }
    }
}
showAllTracks();

// functions for creating a track

const createTrackElement = function (column, row) {
    const item = document.createElement('div');
    item.classList.add('trackItem');
    item.style.gridColumn = column;
    item.style.gridRow = row;
    areaGame.appendChild(item);
}

const createTrack = function () {
    for (let i = 0; i < tracksArray[0].layout.length; i++) {
        createTrackElement(tracksArray[0].layout[i].column, tracksArray[0].layout[i].row)
    }
    createBall()
}

// function to create ball 

const createBall = function () {
    ball.style.width = settings.ballSize + "px";
    ball.style.height = settings.ballSize + "px";
    ball.style.top = settings.heightTrackElement * (tracksArray[0].layout[0].row - 1) + (settings.heightTrackElement / 2) - settings.ballSize / 2 + "px";
}

//determining the ending conditions of the game

const gameOverConditions = function (direction) {
    let leftBorderTrackItem = actualColumn * settings.widthTrackElement;
    let rightBorderTrackItem = (actualColumn - 1) * settings.widthTrackElement;
    let bottomBorderTrackItem = actualRow * settings.heightTrackElement;
    let topBorderTrackItem = (actualRow - 1) * settings.heightTrackElement;
    switch (direction) {
        case 'horizontal':
            if ((ballCenterY + settings.ballSize / 2) > bottomBorderTrackItem || (ballCenterY - settings.ballSize / 2) < topBorderTrackItem) {
                alert("działa");
            }
            break;

        case 'vertical':
            if ((ballCenterX + settings.ballSize / 2) > leftBorderTrackItem || (ballCenterX - settings.ballSize / 2) < rightBorderTrackItem) {
                alert("działa");
            }
            break;
        case 'top-right':
            if ((ballCenterX + settings.ballSize / 2) > leftBorderTrackItem || (ballCenterY - settings.ballSize / 2) < topBorderTrackItem) {
                alert("działa");
            }
            break;
        case 'bottom-left':
            if ((ballCenterX - settings.ballSize / 2) < rightBorderTrackItem || (ballCenterY + settings.ballSize / 2) > bottomBorderTrackItem) {
                alert("działa");
            }
            break;
    }
}

//function for recognizing a track element

const recognizeTrackElement = function () {
    ballCenterX = parseInt(ball.style.left) + settings.ballSize / 2;
    ballCenterY = parseInt(ball.style.top) + settings.ballSize / 2;
    actualColumn = Math.ceil(ballCenterX / settings.widthTrackElement);
    actualRow = Math.ceil(ballCenterY / settings.heightTrackElement);
    for (let i = 0; i < tracksArray[0].layout.length; i++) {
        if (tracksArray[0].layout[i].column == actualColumn && tracksArray[0].layout[i].row == actualRow) {
            let direction = tracksArray[0].layout[i].direction;
            gameOverConditions(direction)
        }
    }
}

//functions to move ball

const moveBall = function (e) {

    if (flag) {
        ball.style.top = e.clientY - settings.shiftY - offsetY + "px";
        ball.style.left = e.clientX - settings.shiftX - offsetX + "px";
        recognizeTrackElement();
    }
}
const getOffsetProperty = function (e) {
    flag = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
}
ball.addEventListener('mousedown', getOffsetProperty);

ball.addEventListener('mouseup', function () {
    flag = false;
})
areaGame.addEventListener('mousemove', moveBall)

// close the welcome screen

closeWelcomeScreen.addEventListener('click', function () {
    wrapperWelcomeScreen.classList.add('visibility');
})