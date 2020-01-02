// Get the modal
var modals = document.querySelectorAll("#modal");

// Get all project images 
var projectImages = document.querySelectorAll("#project-image");

// Get all project titles 
var projectTitles = document.querySelectorAll("#project-title");

// Get all project title text
var projectTitlesText = document.querySelectorAll("#project-title h3");

// Get the <span> element that closes the modal
var closeButtons = document.querySelectorAll(".close");

// When the user clicks on the image, open the modal
projectImages.forEach(btn => btn.addEventListener('click', e => {
    const index = e.target.dataset.image;

    modals[index].style.display = "block";

    document.querySelector("#main").style.filter = "blur(2px)";
}))

// When the user clicks on the title, open the modal
projectTitles.forEach(title => title.addEventListener('click', e => {

    const index = e.target.dataset.image;

    modals[index].style.display = "block";

    document.querySelector("#main").style.filter = "blur(2px)";
}))

// When the user clicks on the title, open the modal
projectTitlesText.forEach(title => title.addEventListener('click', e => {

    const index = e.target.dataset.image;

    modals[index].style.display = "block";

    document.querySelector("#main").style.filter = "blur(2px)";
}))

// When the user clicks on <span> (x), close the modal
closeButtons.forEach(button => button.addEventListener('click', e => {
  const index = +e.target.dataset.span;
  
  modals[index].style.display = "none";
  document.querySelector("#main").style.filter = "blur(0px)";
}))

