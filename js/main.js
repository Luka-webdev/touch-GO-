const wrapperWelcomeScreen = document.querySelector('.wrapperWelcomeScreen');
const wrapperAreaGame = document.querySelector('.wrapperAreaGame');
const areaGame = document.querySelector('.areaGame');
const closeWelcomeScreen = document.querySelector('.fa-window-close');
const continueGame = document.querySelector('.continueGame');
const trackWin = document.querySelector('.trackWin');
const gameWin = document.querySelector('.gameWin');
const continueGameBtn = document.querySelector('.fa-arrow-circle-right');
const wrapperTracks = document.querySelector('.wrapperTracks');
const ball = document.querySelector('.ball');
const counter = document.querySelector('.counter');
const tryAgain = document.querySelector('.fa-undo-alt');
const totalTime = document.querySelector('.totalTime');
const totalMistakes = document.querySelector('.totalMistakes');
const tracksArray = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13, track14, track15]
let flag = false;
let startTiming = 0;
let totalMistakesSum = 0;
let totalTimesSum = 0;
let dimensionsAreaGame = getComputedStyle(areaGame);
let size = 0.5;
let actualTrack = 0;

// adjusting the size of the areagame depending on the ratio of the width and length of the screen

let ratioWidthToHeight = (window.innerWidth / window.innerHeight).toFixed(1);
if (ratioWidthToHeight == 1.3) {
    areaGame.style.width = 100 + "vw";
}
if (ratioWidthToHeight > 2.1) {
    areaGame.style.height = 95 + "vh";
}

// object with basic parameters

const settings = {
    shiftX: parseInt(dimensionsAreaGame.marginLeft),
    shiftY: parseInt(dimensionsAreaGame.marginTop),
    heightTrackElement: parseInt(dimensionsAreaGame.height) / 7,
    widthTrackElement: parseInt(dimensionsAreaGame.width) / 12,
    ballSize: parseInt(dimensionsAreaGame.height) / 7 * size
}

// functions for creating boxes showing all tracks and showing area game for active track

const showAreaGame = function () {
    wrapperAreaGame.classList.remove('visibility');
    createTrack();
    counter.textContent = `${Math.ceil(tracksArray[actualTrack].layout.length / 3).toFixed(2)}`;
}

const createTrackBox = function (param, index) {
    const divElement = document.createElement('div');
    divElement.classList.add('trackBox');
    if (param == "ready") {
        divElement.style.backgroundImage = 'url(pictures/picture' + actualTrack + '.png)';
        divElement.addEventListener('click', showAreaGame)
    } else if (param == "blocked") {
        divElement.innerHTML = '<i class = "fas fa-lock" ></i>';
    } else if (param == "done") {
        divElement.style.backgroundImage = 'url(pictures/picture' + (index) + '.png)';
        divElement.innerHTML = '<i class="fas fa-check"></i>';
    }
    wrapperTracks.appendChild(divElement);
}
const showAllTracks = function () {
    for (let i = 0; i < tracksArray.length; i++) {
        if (tracksArray[i].status == "ready") {
            createTrackBox("ready");
        } else if (tracksArray[i].status == "blocked") {
            createTrackBox("blocked");
        } else if (tracksArray[i].status == "done") {
            createTrackBox("done", i);
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
    for (let i = 0; i < tracksArray[actualTrack].layout.length; i++) {
        createTrackElement(tracksArray[actualTrack].layout[i].column, tracksArray[actualTrack].layout[i].row)
    };
    createBall()
}

// function to create ball 

const createBall = function () {
    ball.style.width = settings.ballSize + "px";
    ball.style.height = settings.ballSize + "px";
    ball.style.left = 0 + "px";
    ball.style.top = settings.heightTrackElement * (tracksArray[actualTrack].layout[0].row - 1) + (settings.heightTrackElement / 2) - settings.ballSize / 2 + "px";
}

// time measurement

const timing = function () {
    let second = Math.ceil(tracksArray[actualTrack].layout.length / 3);
    if (startTiming == 1) {
        interval = setInterval(() => {
            counter.textContent = `${second.toFixed(2)}`;
            second -= 0.01;
            if (second < 0) {
                clearInterval(interval);
                gameOver();
            }
        }, 10);
    }
}

// counting times

const countingTimes = function () {
    let trackTime = Math.ceil(tracksArray[actualTrack].layout.length / 3) - counter.textContent;
    totalTimesSum += trackTime;
};

// function to lose game

const gameOver = function () {
    flag = false;
    startTiming = 0;
    totalMistakesSum++;
    clearInterval(interval);
    setTimeout(() => {
        continueGame.classList.remove('visibility');
    }, 500)
}

//determining the conditions for losing the game

const gameOverConditions = function (direction) {
    let rightBorderTrackItem = actualColumn * settings.widthTrackElement;
    let leftBorderTrackItem = (actualColumn - 1) * settings.widthTrackElement;
    let bottomBorderTrackItem = actualRow * settings.heightTrackElement;
    let topBorderTrackItem = (actualRow - 1) * settings.heightTrackElement;
    switch (direction) {
        case 'horizontal':
            if ((ballCenterY + settings.ballSize / 2) > bottomBorderTrackItem || (ballCenterY - settings.ballSize / 2) < topBorderTrackItem) {
                gameOver();
            }
            break;
        case 'vertical':
            if ((ballCenterX - settings.ballSize / 2) < leftBorderTrackItem || (ballCenterX + settings.ballSize / 2) > rightBorderTrackItem) {
                gameOver();
            }
            break;
        case 'top-right':
            if ((ballCenterX + settings.ballSize / 2) > rightBorderTrackItem || (ballCenterY - settings.ballSize / 2) < topBorderTrackItem) {
                gameOver();
            }
            break;
        case 'bottom-left':
            if ((ballCenterX - settings.ballSize / 2) < leftBorderTrackItem || (ballCenterY + settings.ballSize / 2) > bottomBorderTrackItem) {
                gameOver();
            }
            break;
        case 'bottom-right':
            if ((ballCenterX + settings.ballSize / 2) > rightBorderTrackItem || (ballCenterY + settings.ballSize / 2) > bottomBorderTrackItem) {
                gameOver();
            }
            break;
        case 'top-left':
            if ((ballCenterX - settings.ballSize / 2) < leftBorderTrackItem || (ballCenterY - settings.ballSize / 2) < topBorderTrackItem) {
                gameOver();
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
    for (let i = 0; i < tracksArray[actualTrack].layout.length; i++) {
        if (tracksArray[actualTrack].layout[i].column == actualColumn && tracksArray[actualTrack].layout[i].row == actualRow) {
            let direction = tracksArray[actualTrack].layout[i].direction;
            gameOverConditions(direction)
        }
    }
}

//remove all tracks boxes

const removeTracksBoxes = function () {
    const allTrackBoxes = wrapperTracks.querySelectorAll('div');
    for (let i = 0; i < allTrackBoxes.length; i++) {
        wrapperTracks.removeChild(allTrackBoxes[i]);
    }
}

//remove previous track

const removeTrack = function () {
    const previousTrack = areaGame.querySelectorAll('.trackItem');
    for (let i = 0; i < previousTrack.length; i++) {
        areaGame.removeChild(previousTrack[i]);
    }
}

//function informing about the crossing of the track and change of the current track number

const trackCrossing = function () {
    if (parseInt(ball.style.left) + settings.ballSize >= parseInt(dimensionsAreaGame.width)) {
        flag = false;
        startTiming = 0;
        countingTimes();
        clearInterval(interval);
        setTimeout(() => {
            if (actualTrack == tracksArray.length - 1) {
                totalMistakes.textContent = `Łączna ilość błędów: ${totalMistakesSum}`;
                totalTime.textContent = `Łączny czas przejścia wszystkich labiryntów: ${totalTimesSum.toFixed(2)} s`;
                gameWin.classList.remove('visibility');
            } else {
                trackWin.classList.remove('visibility');
            }
        }, 500)
        setTimeout(() => {
            if (actualTrack != tracksArray.length - 1) {
                trackWin.classList.add('visibility');
                wrapperAreaGame.classList.add('visibility');
                tracksArray[actualTrack].status = "done";
                removeTracksBoxes();
                removeTrack();
                actualTrack++;
                settings.ballSize += 1;
                tracksArray[actualTrack].status = "ready";
                showAllTracks();
            }
        }, 3000);
    }
}

//functions to move ball

const moveBall = function (e, mobile) {
    if (flag) {
        if (mobile == true) {
            ball.style.top = e.touches[0].clientY - settings.shiftY - settings.ballSize / 2 + "px";
            ball.style.left = e.touches[0].clientX - settings.shiftX - settings.ballSize / 2 + "px";
        } else {
            ball.style.top = e.clientY - settings.shiftY - offsetY + "px";
            ball.style.left = e.clientX - settings.shiftX - offsetX + "px";
        }
        if (ball.style.left < 0 + "px") {
            ball.style.left = 0 + "px";
        }
        recognizeTrackElement();
        trackCrossing();
    }
}

const getOffsetProperty = function (e, mobile) {
    if (continueGame.classList.contains('visibility') && gameWin.classList.contains('visibility') && trackWin.classList.contains('visibility')) {
        flag = true;
        startTiming++;
        timing();
        if (mobile != true) {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        }
    }
}

ball.addEventListener('mousedown', function (e) {
    getOffsetProperty(e, false)
});
ball.addEventListener('touchstart', function (e) {
    getOffsetProperty(e, true)
});

ball.addEventListener('mouseup', function () {
    flag = false;
})
ball.addEventListener('touchend', function () {
    flag = false;
})
areaGame.addEventListener('mousemove', function (e) {
    moveBall(e, false)
})
areaGame.addEventListener('touchmove', function (e) {
    moveBall(e, true)
})

// close the welcome screen

closeWelcomeScreen.addEventListener('click', function () {
    wrapperWelcomeScreen.classList.add('visibility');
})

// continue game

continueGameBtn.addEventListener('click', function () {
    continueGame.classList.add('visibility');
    removeTrack();
    showAreaGame();
})
// game from the beginning

tryAgain.addEventListener('click', function () {
    gameWin.classList.add('visibility');
    wrapperAreaGame.classList.add('visibility');
    removeTrack();
    removeTracksBoxes();
    settings.ballSize = parseInt(dimensionsAreaGame.height) / 7 * size;
    actualTrack = 0;
    totalMistakesSum = 0;
    totalTimesSum = 0;
    for (let i = 0; i < tracksArray.length; i++) {
        if (i == 0) {
            tracksArray[i].status = "ready";
        } else {
            tracksArray[i].status = "blocked";
        }
    }
    showAllTracks();
})