// unordered list for guessed letters
const guessedLettersElement = document.querySelector("guessed-letters");

// guess letter button
const guessLetterButton = document.querySelector(".guess");

// input where letters are guessed
const guessInput = document.querySelector(".letter");

// paragraph for word in progress
const wordProgress = document.querySelector(".word-in-progress");

// paragraph for remaining guesses
const remainingGuesses = document.querySelector(".remaining");

// remaining guesses span
const guessesSpan = document.querySelector(".remaining span");

// paragraph for guessed letters messages
const message = document.querySelector(".message");

// hide button play again
const playAgain = document.querySelector(".play-again hide");

// words list
const word = "magnolia";

// placeholders function for letters
const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    }
    wordProgress.innerText = placeHolderLetters.join("");
}
placeHolder(word);

// event listener for guess button
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    const letterGrab = guessInput.value;
    console.log(letterGrab);
    guessInput.value = "";
});