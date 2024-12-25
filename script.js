const wordBank = [
  { word: "apple", hint: "A fruit that keeps the doctor away." },
  { word: "banana", hint: "A yellow fruit that monkeys love." },
  { word: "cherry", hint: "A small, round, red fruit often used in desserts." },
  { word: "date", hint: "A sweet fruit from the date palm tree." },
  { word: "elderberry", hint: "A dark purple berry used in syrups and jams." },
  { word: "fig", hint: "A fruit that is often dried and used in cookies." },
  { word: "grape", hint: "A small, round fruit used to make wine." }
];

let selectedWordObj = wordBank[Math.floor(Math.random() * wordBank.length)];
let word = selectedWordObj.word;
let hint = selectedWordObj.hint;
let guessedWord = Array(word.length).fill("_");
let attempts = 6; // Equal to the number of hangman parts

const wordDisplay = document.getElementById("word-display");
const hintDisplay = document.getElementById("hint");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const hintButton = document.getElementById("hint-button");
const restartButton = document.getElementById("restart-button");

const hangmanParts = [
  document.getElementById("left-leg"),
  document.getElementById("right-leg"),
  document.getElementById("left-arm"),
  document.getElementById("right-arm"),
  document.getElementById("body"),
  document.getElementById("head"),
];

// Ensure all parts are visible at the start
function initializeHangman() {
  hangmanParts.forEach(part => (part.style.display = "block"));
}

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

  if (guessedWord.includes(guess)) {
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
    if (attempts >= 0) {
      hangmanParts[6 - attempts - 1].style.display = "none"; // Hide the next part
    }
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

function showHint() {
  hintDisplay.textContent = `Hint: ${hint}`;
  hintDisplay.style.display = "block";
}

function restartGame() {
  selectedWordObj = wordBank[Math.floor(Math.random() * wordBank.length)];
  word = selectedWordObj.word;
  hint = selectedWordObj.hint;
  guessedWord = Array(word.length).fill("_");
  attempts = 6;
  guessButton.disabled = false;
  restartButton.style.display = "none";
  hintDisplay.style.display = "none";
  message.textContent = "";
  hangmanParts.forEach(part => part.style.display = "block");
  updateDisplay();
}

guessButton.addEventListener("click", handleGuess);
hintButton.addEventListener("click", showHint);
restartButton.addEventListener("click", restartGame);
updateDisplay();
initializeHangman();