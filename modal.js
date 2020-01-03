var modal = document.querySelector(".modal");
var infoButton = document.querySelector(".fa-question-circle");
var helpButton = document.querySelector(".help-button");
var startButton = document.querySelector(".start-button");

infoButton.addEventListener('click', e => {
    modal.style.display = "block";
    document.querySelector("#main").style.filter = "blur(2px)";
})

helpButton.addEventListener('click', e => {
    modal.style.display = "block";
    document.querySelector("#main").style.filter = "blur(2px)";
})

startButton.addEventListener('click', e => {
  console.log("test")
  modal.style.display = "none";
  document.querySelector("#main").style.filter = "blur(0px)";
});

