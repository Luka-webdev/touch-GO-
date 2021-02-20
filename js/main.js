const wrapperWelcomeScreen = document.querySelector('.wrapperWelcomeScreen');
const wrapperAreaGame = document.querySelector('.wrapperAreaGame');
const closeWelcomewScreen = document.querySelector('.fa-window-close');

// wrapperAreaGame.classList.add('visibility')
closeWelcomewScreen.addEventListener('click', function () {
    wrapperWelcomeScreen.classList.add('visibility')
})