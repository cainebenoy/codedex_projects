const wordBank = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];
let word = wordBank[Math.floor(Math.random() * wordBank.length)];
let guessedWord = Array(word.length).fill("_");
let attempts = 10;

const wordDisplay = document.getElementById("word-display");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");

function updateDisplay() {
  wordDisplay.textContent = guessedWord.join(" ");
  attemptsDisplay.textContent = `Attempts left: ${attempts}`;
}

function handleGuess() {
  const guess = letterInput.value.toLowerCase();
  letterInput.value = "";
  message.textContent = "";

  if (guess.length !== 1 || !/[a-z]/.test(guess)) {
    message.textContent = "Please enter a valid single letter.";
    return;
  }

  if (guess in guessedWord) {
    message.textContent = "You already guessed that letter.";
    return;
  }

  if (word.includes(guess)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        guessedWord[i] = guess;
      }
    }
    message.textContent = "Great guess!";
  } else {
    attempts--;
    message.textContent = "Wrong guess! Attempts left: " + attempts;
  }

  updateDisplay();

  if (!guessedWord.includes("_")) {
    message.textContent = "Congratulations!! You guessed the word: " + word;
    guessButton.disabled = true;
    restartButton.style.display = "block";
  } else if (attempts === 0) {
    message.textContent = "You've run out of attempts! The word was: " + word;
    guessButton.disabled = true;
    restartButton.style.display = "block";
  }
}

function restartGame() {
  word = wordBank[Math.floor(Math.random() * wordBank.length)];
  guessedWord = Array(word.length).fill("_");
  attempts = 10;
  guessButton.disabled = false;
  restartButton.style.display = "none";
  message.textContent = "";
  updateDisplay();
}

guessButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", restartGame);
updateDisplay();