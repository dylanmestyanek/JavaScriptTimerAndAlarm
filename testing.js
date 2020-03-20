const modal = document.querySelector(".modal");
const helpButton = document.querySelector(".help-button");
const startButton = document.querySelector(".start-button");
// The menu constant is created in menu.js

// Opens the modal, and hides everything else if you're in mobile view so the screen isn't crowded
helpButton.addEventListener('click', e => {
    if (window.innerWidth <= 600) {
      timerControls.classList.add("hidden");
      menu.classList.add("hidden");
    }

    modal.style.display = "block";
    document.querySelector(".timerContainer").style.filter = "blur(2px)";
})

// The 'Get Started' button in the modal, which brings everything back into view so you can use the application
startButton.addEventListener('click', e => {
  timerControls.classList.remove("hidden");
  menu.classList.remove("hidden");
  modal.style.display = "none";
  document.querySelector(".timerContainer").style.filter = "blur(0px)";
});

