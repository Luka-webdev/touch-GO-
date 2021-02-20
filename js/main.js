const welcomeScreen = document.querySelector('.welcomeScreen');
const closeWelcomewScreen = document.querySelector('.fa-window-close');

closeWelcomewScreen.addEventListener('click', function () {
    welcomeScreen.classList.add('visibility')
})