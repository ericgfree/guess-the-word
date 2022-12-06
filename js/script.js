// unordered list for guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");

// guess letter button
const guessLetterButton = document.querySelector(".guess");

// input where letters are guessed
const letterInput = document.querySelector(".letter");

// paragraph for word in progress
const wordInProgress = document.querySelector(".word-in-progress");

// paragraph for remaining guesses
const remainingGuessesElement = document.querySelector(".remaining");

// remaining guesses span
const remainingGuessesSpan = document.querySelector(".remaining span");

// paragraph for guessed letters messages
const message = document.querySelector(".message");

// hide button play again
const playAgain = document.querySelector(".play-again hide");

// words list
let word = "magnolia";

// guessed letters array 
const guessedLetters = []

// Number of guesses
let remainingGuesses = 8

// Word List
const getWord = async function () {
    response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    // console.log(words)
    const wordArray = words.split("\n");
    // console.log(wordArray)
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolder(word);
};

getWord();

// Display characters as placeholders for chosen word's letters
const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

// event listener for guess button
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // Grab what was entered in th input
    const guess = letterInput.value;
    // Validate it is a single letter
    // console.log(guess);
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // Character validated, make guess
        makeGuess(guess);
    }
    letterInput.value = "";
    
});

// validate player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        // Is the input empty?
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        // Did type more than one letter?
        message.innerText = "Please enter a single letter";
    } else if (!input.match(acceptedLetter)) {
        // Did you enter a special character or number?
        message.innerText = "Please enter a letter from A-Z";
    } else {
        // Now we have a single letter
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Letter already guessed please try again";        
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        numRemainingGuesses(guess);
        updateWordInProgress(guessedLetters);
    }
};
// Display guessed letters on page
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li)
    }  
};

// Display word in progress correct guesses
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
     if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●")
    }
  }
    wordInProgress.innerText = revealWord.join("")
    checkIfWin()
}

const numRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Correct! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}.</span>`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


// Did you win?
const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};