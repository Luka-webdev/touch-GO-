const wrapperWelcomeScreen = document.querySelector('.wrapperWelcomeScreen');
const wrapperAreaGame = document.querySelector('.wrapperAreaGame');
const areaGame = document.querySelector('.areaGame');
const closeWelcomeScreen = document.querySelector('.fa-window-close');
const wrapperTracks = document.querySelector('.wrapperTracks');
const tracksArray = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10, track11, track12, track13, track14, track15]

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

const showAreaGame = function () {
    wrapperAreaGame.classList.remove('visibility')
    createTrack();
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

const createTrackElement = function (x, y) {
    const item = document.createElement('div');
    item.classList.add('trackItem');
    item.style.top = y + "px";
    item.style.left = x + "px";
    areaGame.appendChild(item);
}

const createTrack = function () {
    for (let i = 0; i < tracksArray[0].layout.length; i++) {
        createTrackElement(tracksArray[0].layout[i].x, tracksArray[0].layout[i].y)
    }
    console.log(tracksArray[0].layout.length)
}

wrapperAreaGame.classList.add('visibility')
closeWelcomeScreen.addEventListener('click', function () {
    wrapperWelcomeScreen.classList.add('visibility')
})