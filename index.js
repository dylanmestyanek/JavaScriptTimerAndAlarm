let countdown;
let errorMessage;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButton = document.querySelectorAll('.timer__button');
const timerModifierButtons = document.querySelectorAll('.timerModifiers');

function timer(seconds){
    clearInterval(countdown);
    clearInterval(errorMessage);
    timerModifierButtons.forEach(button => button.style.display = 'inline-block');

    const now = Date.now();
    const then = now + seconds * 1000;
    timerDisplay.style.fontSize = '20rem';
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown); 
            return;
        };
        displayTimeLeft(secondsLeft);
    }, 1000);

}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    const today = new Date();
    const currentTime = `${today.getHours() - 12}:${today.getMinutes()}` 

    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function runButton(e){
    const timeValue = e.target.dataset.time;
    timer(timeValue);
}

function customTime(e){
    e.preventDefault();
    const timeValue = this.minutes.value * 60;
    timer(timeValue);
}

function adjustTimer(e){
    if (this.textContent == ' Stop ') {
        clearInterval(countdown);
        timerDisplay.textContent = '';
        endTime.textContent = '';
        timerModifierButtons.forEach(button => button.style.display = 'none');
    }
}

timerModifierButtons.forEach(button => button.addEventListener('click', adjustTimer))
timerButton.forEach(button => button.addEventListener('click', runButton));
document.customForm.addEventListener('submit', customTime);

// ====================== Speech Recognition Stuff ============================ //

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    let isFinal = e.results[0].isFinal;
    const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
    
    if (isFinal && (transcript.includes("set a timer for") || transcript.includes("set timer for"))){
        let splitTranscript = transcript.split(' ');
        let lastWord = splitTranscript[splitTranscript.length - 1];
        let timeValue = transcript.split('').filter(letter => (/\d/).test(letter)).join('');

        lastWord == 'minutes' && timer(timeValue * 60);
        lastWord == 'seconds' && timer(timeValue);
    }
});
    
document.querySelector(".words").onclick = () => {
    clearInterval(countdown);
    endTime.textContent = '';
    timerDisplay.textContent = 'Listening for time duration...'
    timerDisplay.style.fontSize = '60px';

    recognition.start();
    errorMessage = setTimeout(() => (timerDisplay.textContent = "Woops! \r\n You waited too long to speak. \r\n Click 'Voice Control' to restart."), 8000);
};

