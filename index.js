let countdown; 
let timerExpired;
let errorMessage; // Error message when you've waited too long to speak for voice recognition
const timerDisplay = document.querySelector('.displayTimeLeft'); // Div for displaying countdown duration
const endTimeDisplay = document.querySelector('.displayEndTime'); // Div for displaying timer end time 
const timerButtons = document.querySelectorAll('.timerButton'); // Quick select preset timer buttons 
const timerModifierButtons = document.querySelectorAll('.timerModifiers'); // Pause/Stop Buttons below countdown on screen
const timerSound = document.querySelector(".timer-sound");

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
            timerDisplay.textContent = 'Time\'s Up!';
            endTimeDisplay.textContent = "";
            timerModifierButtons.forEach(button => button.textContent !== ' Stop ' && (button.style.display = 'none'));
            document.title = 'Time\'s Up!';

            timerExpired = setInterval(() => {
                timerSound.play();
                timerDisplay.classList.toggle('paused');
            }, 600);            
            return;
        };
        displayTimeLeft(secondsLeft);
    }, 1000);

}

// Displays timer duration on screen and browser tab
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`

    timerDisplay.textContent = display;
    document.title = display;
}

// Displays timer's end time on the screen
function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTimeDisplay.textContent = `Arrive back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes} ${hour > 12 ? "PM" : "AM"}`;
}

// Runs timer with preset value buttons (5 min, 20 min, lunch break)
function runButton(e){
    endTimer();
    const timeValue = e.target.dataset.time;
    timerDisplay.classList.remove("paused");
    timer(timeValue);
}

// Takes in custom time duration within input field
function customTime(e){
    e.preventDefault();
    endTimer();
    timerDisplay.classList.remove("paused");

    if (Number.isInteger(+this.minutes.value)) {
        const timeValue = this.minutes.value * 60;
        timer(timeValue);
        this.minutes.value = '';
    } else {
        clearInterval(countdown);
        timerDisplay.textContent = '';
        timerModifierButtons.forEach(button => button.style.display = 'none');
        endTimeDisplay.textContent = "Please input a valid time value."
    }
}

let timeLeft;

// Pause/Stop button functionality
function adjustTimer(e){
    // If 'Stop' button is pressed, clear timer, timer displays, and hide Pause/Stop buttons
    if (this.textContent == ' Stop ') {
        endTimer();
        clearInterval(countdown);
        timerDisplay.classList.remove("paused");
        timerDisplay.textContent = '';
        endTimeDisplay.textContent = '';
        timerModifierButtons.forEach(button => button.style.display = 'none');
        document.title = 'Voice Recognition Timer';
    }

    if (this.textContent == ' Pause ') {
        clearInterval(countdown);
        timeLeft = timerDisplay.textContent;

        timerDisplay.classList.add("paused");
        endTimeDisplay.textContent = `The timer is currently paused...`;
        document.title = `${timeLeft} (Paused)`;
    }

    if (this.textContent == ' Play ') {
        const splitTime = timeLeft.split(":");
        const resumeTime = +(splitTime[0] * 60) + +splitTime[1];
        timerDisplay.classList.remove("paused");
        timer(resumeTime);
        endTimeDisplay.textContent = `Arrive back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes} ${hour > 12 ? "PM" : "AM"}.`;
    }
}

function endTimer(){
    clearInterval(timerExpired);
    timerSound.pause();
    timerSound.currentTime = 0;
};

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
        let timeValues = transcript.split(' ').filter(value => Number.isInteger(+value));
        
        // If the user speaks more than one number value, such as, 2 minutes AND 30 seconds, 
        // then do math to convert all values into a total of seconds for timer
        if (timeValues.length > 1) {
            let stringValues = transcript.split(' ').filter(value =>  (/minute/i).test(value) || (/second/i).test(value));
            let timeFormat = [...timeValues, ...stringValues]

            console.log((/minute/i).test(timeFormat[2]))

            if ((/minute/i).test(timeFormat[2]) && (/second/i).test(timeFormat[3])) {
                let valueInSeconds = (+timeFormat[0] * 60) + +timeFormat[1];
                timer(valueInSeconds);
            } else if ((/second/i).test(timeFormat[2]) && (/minute/i).test(timeFormat[3])) {
                let valueInSeconds = (+timeValues[1] * 60) + +timeValues[0];
                timer(valueInSeconds);
            } else if ((/second/i).test(timeFormat[2]) && (/second/i).test(timeFormat[3])) {
                let valueInSeconds = +timeValues[1] + +timeValues[0];
                timer(valueInSeconds);
            } else if ((/minute/i).test(timeFormat[2]) && (/minute/i).test(timeFormat[3])) {
                let valueInSeconds = (+timeValues[1] * 60) + (+timeValues[0] * 60);
                timer(valueInSeconds);
            }

        } else {
            let timeValueSpokenInMic = transcript.split('').filter(letter => (/\d/).test(letter)).join('');
    
            (/minute/i).test(lastWordSpoken) && timer(timeValueSpokenInMic * 60);
            (/second/i).test(lastWordSpoken) && timer(timeValueSpokenInMic);
        }
    }
});
    
// When 'Voice Recognition' button is clicked - Clear timer and timer display - Display "listening..." notification - Begin listening to user
document.querySelector(".voiceRecognitionButton").onclick = () => {
    clearInterval(countdown);
    timerModifierButtons.forEach(button => button.style.display = 'none');
    endTimeDisplay.textContent = '';
    timerDisplay.textContent = 'Listening for a time duration...'
    timerDisplay.style.fontSize = '60px';
    document.title = 'Listening...'

    recognition.start();
    // If voice recognition duration expires, display error message
    errorMessage = setTimeout(() => {
        timerDisplay.textContent = "Woops! \r\n You waited too long to speak. \r\n Click 'Voice Control' to restart.";
        document.title = "Voice Recognition Failed"
    }, 8000);
};

