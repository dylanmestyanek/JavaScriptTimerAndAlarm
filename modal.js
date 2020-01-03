const modal = document.querySelector(".modal");
const infoButton = document.querySelector(".fa-question-circle");
const helpButton = document.querySelector(".help-button");
const startButton = document.querySelector(".start-button");
const hamburgerMenu = document.querySelector(".menu");
const timerMenu = document.querySelector(".timerControls")

infoButton.addEventListener('click', e => {
    modal.style.display = "block";
    document.querySelector("#main").style.filter = "blur(2px)";
})

helpButton.addEventListener('click', e => {
    timerMenu.classList.add("hidden");
    hamburgerMenu.classList.add("hidden");
    modal.style.display = "block";
    document.querySelector("#main").style.filter = "blur(2px)";
})

startButton.addEventListener('click', e => {
  timerMenu.classList.remove("hidden");
  hamburgerMenu.classList.remove("hidden");
  modal.style.display = "none";
  document.querySelector("#main").style.filter = "blur(0px)";
});

