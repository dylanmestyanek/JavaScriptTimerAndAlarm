var modal = document.querySelector(".modal");
var infoButton = document.querySelector(".fa-question-circle");
var startButton = document.querySelector(".start-button");

// When the user clicks on the image, open the modal
infoButton.addEventListener('click', e => {
    modal.style.display = "block";
    document.querySelector("#main").style.filter = "blur(2px)";
})

// When the user clicks on <span> (x), close the modal
startButton.addEventListener('click', e => {
  console.log("test")
  modal.style.display = "none";
  document.querySelector("#main").style.filter = "blur(0px)";
});

