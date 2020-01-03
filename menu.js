const menu = document.querySelector(".menu");
const timerControls = document.querySelector(".timerControls")

menu.addEventListener('click', (e) => {
    timerControls.classList.toggle('hidden');
})