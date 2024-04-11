const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const cardTitle = document.querySelector('.card-content h2');
let lastHole;
let timeUp = false;
let score = 0;
let gameInterval; // Variable to store the game interval

const chineseMonths = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(750, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    gameInterval = setInterval(() => {
        timeUp = true;
        clearInterval(gameInterval);
    }, 30000);
    updateMonthName(); // Update month name when starting the game
}

function pauseGame() {
    clearInterval(gameInterval);
    timeUp = true;
}

function resumeGame() {
    timeUp = false;
    peep();
    gameInterval = setInterval(() => {
        timeUp = true;
        clearInterval(gameInterval);
    }, 30000);
}

function wack(e) {
    if (!e.isTrusted) return;
    const moleMonth = this.parentNode.querySelector('.card-content h2').textContent.trim();
    if (moleMonth === cardTitle.textContent) {
        score++;
        scoreBoard.textContent = score;
    }
    this.parentNode.classList.remove('up');
    updateMonthName(); // Update month name after a successful hit
}

function updateMonthName() {
    const randomIndex = Math.floor(Math.random() * chineseMonths.length);
    const randomMonth = chineseMonths[randomIndex];
    cardTitle.textContent = randomMonth; // Update card title with a random month name
    playAudio(); // Play audio when the month changes
}

function playAudio() {
    const audio = document.getElementById('audio');
    audio.currentTime = 0; // Reset audio to start
    audio.play(); // Play the audio
}

moles.forEach((mole) => mole.addEventListener('click', wack));

