const modal = document.querySelector(".modal");
const helpButton = document.querySelector(".help-button");
const startButton = document.querySelector(".start-button");
const hamburgerMenu = document.querySelector(".menu");
const timerMenu = document.querySelector(".timerControls")

// Opens the modal, and hides everything else if you're in mobile view so the screen isn't crowded
helpButton.addEventListener('click', e => {
    if (window.innerWidth <= 600) {
      timerMenu.classList.add("hidden");
      hamburgerMenu.classList.add("hidden");
    }

    modal.style.display = "block";
    document.querySelector(".timerContainer").style.filter = "blur(2px)";
})

// The 'Get Started' button in the modal, which brings everything back into view so you can use the application
startButton.addEventListener('click', e => {
  timerMenu.classList.remove("hidden");
  hamburgerMenu.classList.remove("hidden");
  modal.style.display = "none";
  document.querySelector(".timerContainer").style.filter = "blur(0px)";
});

