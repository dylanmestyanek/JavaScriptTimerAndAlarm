const menu = document.querySelector(".menu");
const timerControls = document.querySelector(".timerControls");
const timerContainer = document.querySelector(".displayTimeContainer");

menu.addEventListener('click', (e) => {
    timerControls.classList.toggle('hidden');
})

timerContainer.addEventListener('click', e => {
    if (window.innerWidth <= 600 && ![...timerControls.classList].includes("hidden") && e.target.textContent !== " Stop ") {
        timerControls.classList.add('hidden');
    }
})