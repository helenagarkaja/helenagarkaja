const words = ["javascript", "hangman", "coding", "programming", "challenge"];
const word = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(word.length).fill('_');
let attempts = 6;

const wordDisplay = document.getElementById('wordDisplay');
const lettersContainer = document.getElementById('lettersContainer');
const message = document.getElementById('message');

function updateWordDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
}

function createLetterButtons() {
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('div');
        button.textContent = letter;
        button.classList.add('letter');
        button.onclick = () => guessLetter(letter);
        lettersContainer.appendChild(button);
    }
}

function guessLetter(letter) {
    const buttons = document.querySelectorAll('.letter');
    buttons.forEach(button => {
        if (button.textContent === letter) {
            button.classList.add('used');
            button.onclick = null;
        }
    });

    if (word.includes(letter.toLowerCase())) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter.toLowerCase()) {
                guessedWord[i] = letter;
            }
        }
    } else {
        attempts--;
    }

    updateWordDisplay();
    checkGameStatus();
}

function checkGameStatus() {
    if (guessedWord.join('') === word) {
        message.textContent = 'Congratulations! You won!';
        disableAllButtons();
    } else if (attempts === 0) {
        message.textContent = `Game over! The word was "${word}".`;
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll('.letter');
    buttons.forEach(button => {
        button.classList.add('used');
        button.onclick = null;
    });
}

updateWordDisplay();
createLetterButtons();
