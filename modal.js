const modal = document.querySelector(".modal");
const helpButton = document.querySelector(".help-button");
const startButton = document.querySelector(".start-button");
const hamburgerMenu = document.querySelector(".menu");
const timerMenu = document.querySelector(".timerControls")

helpButton.addEventListener('click', e => {
    if (window.innerWidth <= 600) {
      timerMenu.classList.add("hidden");
      hamburgerMenu.classList.add("hidden");
    }

    modal.style.display = "block";
    document.querySelector(".timerContainer").style.filter = "blur(2px)";
})

startButton.addEventListener('click', e => {
  timerMenu.classList.remove("hidden");
  hamburgerMenu.classList.remove("hidden");
  modal.style.display = "none";
  document.querySelector(".timerContainer").style.filter = "blur(0px)";
});

