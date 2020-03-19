const modal = document.querySelector(".modal") as HTMLDivElement;
const helpButton = document.querySelector(".help-button") as HTMLButtonElement;
const startButton = document.querySelector(".start-button") as HTMLButtonElement;
const timerControls = document.querySelector(".timerControls") as HTMLDivElement; // The timer container holding all preset timer value buttons
import { menu, timerContainer } from "./menu"

// The menu constant is created in menu.js

// Opens the modal, and hides everything else if you're in mobile view so the screen isn't crowded
helpButton.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
      timerControls.classList.add("hidden");
      menu.classList.add("hidden");
    }

    modal.style.display = "block";
    timerContainer.style.filter = "blur(2px)";
});

// The 'Get Started' button in the modal, which brings everything back into view so you can use the application
startButton.addEventListener('click', () => {
  console.log("clicked")
  timerControls.classList.remove("hidden");
  menu.classList.remove("hidden");
  modal.style.display = "none";
  timerContainer.style.filter = "blur(0px)";
});

