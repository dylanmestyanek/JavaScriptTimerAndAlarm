export const menu = document.querySelector(".menu");
export const timerContainer = document.querySelector(".displayTimeContainer");
import { timerControls } from "./index";
// Adds clickability to the hamburger menu
menu.addEventListener('click', (e) => {
    timerControls.classList.toggle('hidden');
});
// If the mobile view is displayed and you click outside of the timer controls, then hide them (the menu)
timerContainer.addEventListener('click', e => {
    if (window.innerWidth <= 600 && !timerControls.classList.contains("hidden") && e.target.dataset.method !== 'stop') {
        timerControls.classList.add('hidden');
    }
});
// On page load, if the view is mobile, hide the hamburger menu, and the timer controls so only the modal is displayed
window.addEventListener('load', e => {
    if (window.innerWidth <= 600) {
        timerControls.classList.add("hidden");
        menu.classList.add("hidden");
    }
});
