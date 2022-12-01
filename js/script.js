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
const word = "magnolia";

// guessed letters array 
const guessedLetters = []

// Display characters as placeholders for chosen word's letters
const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

placeHolder(word);

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
        console.log(guessedLetters)
    }
}