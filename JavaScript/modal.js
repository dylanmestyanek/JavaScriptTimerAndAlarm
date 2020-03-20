"use strict";
const modal = document.querySelector(".modal");
const helpButton = document.querySelector(".help-button");
const startButton = document.querySelector(".start-button");
const modalTimerControls = document.querySelector(".timerControls"); // The timer container holding all preset timer value buttons
const modalTimerContainer = document.querySelector(".displayTimeContainer");
const modalMenu = document.querySelector(".menu");
// Opens the modal, and hides everything else if you're in mobile view so the screen isn't crowded
helpButton.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
        modalTimerControls.classList.add("hidden");
        modalMenu.classList.add("hidden");
    }
    modal.style.display = "block";
    modalTimerContainer.style.filter = "blur(2px)";
});
// The 'Get Started' button in the modal, which brings everything back into view so you can use the application
startButton.addEventListener('click', () => {
    modalTimerControls.classList.remove("hidden");
    modalMenu.classList.remove("hidden");
    modal.style.display = "none";
    modalTimerContainer.style.filter = "blur(0px)";
});
