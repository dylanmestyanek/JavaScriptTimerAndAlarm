let countdown; 
let errorMessage; // Error message when you've waited too long to speak for voice recognition
const timerDisplay = document.querySelector('.displayTimeLeft'); // Div for displaying countdown duration
const endTimeDisplay = document.querySelector('.displayEndTime'); // Div for displaying timer end time 
const timerButtons = document.querySelectorAll('.timerButton'); // Quick select preset timer buttons 
const timerModifierButtons = document.querySelectorAll('.timerModifiers'); // Pause/Stop Buttons below countdown on screen

// Runs timer, and displays timer duration
function timer(seconds){
    // Clears any timers and error messages off screen before beginning a new timer
    clearInterval(countdown);
    clearInterval(errorMessage);
    // Displays pause/stop button when timer is active
    timerModifierButtons.forEach(button => button.style.display = 'inline-block');

    // Displays countdown time and displays timer's end time
    const now = Date.now();
    const then = now + seconds * 1000;
    timerDisplay.style.fontSize = '20rem';
    displayTimeLeft(seconds);
    displayEndTime(then);

    // Subtracts a second from remaining timer duration, every second, and updates the amount of time left
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown); 
            return;
        };
        displayTimeLeft(secondsLeft);
    }, 1000);

}

// Displays timer duration on screen and browser tab
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    const today = new Date();
    const currentTime = `${today.getHours() - 12}:${today.getMinutes()}` 

    timerDisplay.textContent = display;
    document.title = display;
}

// Displays timer's end time on the screen
function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTimeDisplay.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Runs timer with preset value buttons (5 min, 20 min, lunch break)
function runButton(e){
    const timeValue = e.target.dataset.time;
    timer(timeValue);
}

// Takes in custom time duration within input field
function customTime(e){
    e.preventDefault();
    const timeValue = this.minutes.value * 60;
    timer(timeValue);
}

// Pause/Stop button functionality
function adjustTimer(e){
    // If 'Stop' button is pressed, clear timer, timer displays, and hide Pause/Stop buttons
    if (this.textContent == ' Stop ') {
        clearInterval(countdown);
        timerDisplay.textContent = '';
        endTimeDisplay.textContent = '';
        timerModifierButtons.forEach(button => button.style.display = 'none');
    }
}

timerModifierButtons.forEach(button => button.addEventListener('click', adjustTimer)); // Gives Pause/Stop button 'Click' functionality
timerButtons.forEach(button => button.addEventListener('click', runButton)); // Gives preset value buttons 'Click' functionality
document.customTimeForm.addEventListener('submit', customTime); // Allows input of custom timer duration within input field

// =============================== SPEECH RECOGNITION FUNCTIONALITY =============================== //

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

// Listening for voice command
recognition.addEventListener('result', e => {
    let youreDoneSpeaking = e.results[0].isFinal;
    // Grabs sentence spoke into microphone
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    
    if (youreDoneSpeaking && (transcript.includes("set a timer for") || transcript.includes("set timer for"))){
        let lastWordSpoken = transcript.split(' ')[transcript.split(' ').length - 1];
        let timeValueSpokenInMic = transcript.split('').filter(letter => (/\d/).test(letter)).join('');

        lastWordSpoken == 'minutes' && timer(timeValueSpokenInMic * 60);
        lastWordSpoken == 'seconds' && timer(timeValueSpokenInMic);
    }
});
    
// When 'Voice Recognition' button is clicked - Clear timer and timer display - Display "listening..." notification - Begin listening to user
document.querySelector(".voiceRecognitionButton").onclick = () => {
    clearInterval(countdown);
    endTimeDisplay.textContent = '';
    timerDisplay.textContent = 'Listening for time duration...'
    timerDisplay.style.fontSize = '60px';

    recognition.start();
    // If voice recognition duration expires, display error message
    errorMessage = setTimeout(() => (timerDisplay.textContent = "Woops! \r\n You waited too long to speak. \r\n Click 'Voice Control' to restart."), 8000);
};
