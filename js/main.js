const wrapperWelcomeScreen = document.querySelector('.wrapperWelcomeScreen');
const wrapperAreaGame = document.querySelector('.wrapperAreaGame');
const areaGame = document.querySelector('.areaGame');
const closeWelcomeScreen = document.querySelector('.fa-window-close');
const wrapperTracks = document.querySelector('.wrapperTracks');
const ball = document.querySelector('.ball');
const tracksArray = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13, track14, track15]
wrapperAreaGame.classList.add('visibility');
let flag = false;

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
    let heightTrackElement = parseInt(getComputedStyle(areaGame).height) / 7;
    let ballSize = heightTrackElement * 0.6;
    ball.style.width = ballSize + "px";
    ball.style.height = ballSize + "px";
    ball.style.top = heightTrackElement * (tracksArray[0].layout[0].row - 1) + (heightTrackElement / 2) - ballSize / 2 + "px";
}

//functions to move ball

ball.addEventListener('mousedown', function () {
    flag = true;
})
ball.addEventListener('mouseup', function () {
    flag = false;
})
ball.addEventListener('mousemove', function (e) {
    let shiftX = parseInt(getComputedStyle(areaGame).marginLeft);
    let shiftY = parseInt(getComputedStyle(areaGame).marginTop);
    if (flag) {
        ball.style.top = e.clientY - shiftY - parseInt(ball.style.width) / 2 + "px";
        ball.style.left = e.clientX - shiftX - parseInt(ball.style.width) / 2 + "px";
    }
})

// close the welcome screen

closeWelcomeScreen.addEventListener('click', function () {
    wrapperWelcomeScreen.classList.add('visibility');
})