const menu = document.querySelector(".menu");
const timerContainer = document.querySelector(".displayTimeContainer");

// Adds clickability to the hamburger menu
menu.addEventListener('click', (e) => {
    timerControls.classList.toggle('hidden');
})

// If the mobile view is displayed and you click outside of the timer controls, then hide them (the menu)
timerContainer.addEventListener('click', e => {
    console.log(e.target.dataset)
    if (window.innerWidth <= 600 && ![...timerControls.classList].includes("hidden") && e.target.dataset.method !== 'stop') {
        timerControls.classList.add('hidden');
    }
})

// On page load, if the view is mobile, hide the hamburger menu, and the timer controls so only the modal is displayed
window.addEventListener('load', e => {
    if (window.innerWidth <= 600) {
        timerControls.classList.add("hidden");
        menu.classList.add("hidden");
    }
});