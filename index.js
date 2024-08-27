const formEl = document.querySelector("form"); 
const inputEl = document.getElementById("guess"); 
const hintEl = document.querySelector(".hint"); 
const attemptsEl = document.querySelector(".attempts"); 
const highScoreEl = document.querySelector(".highscore"); 
const difficultyEl = document.querySelector("#difficulty");
const betweenEl = document.querySelector(".between");
const submitEl = document.querySelector(".submitBtn"); 
const againBtnEl = document.querySelector(".againBtn"); 
const hiddenEl = document.querySelector(".hidden");



let difficulty = "easy";
let score = JSON.parse(localStorage.getItem("score")) || [0,0,0]; // index[0] it is SCORE in "easy" mode, index[1] it is SCORE in "medium" mode, index[2] it is SCORE in "hard" mode

highScoreEl.textContent = score[0];// first render, the "highScore" element will display the element in the index 0 of the score array
let min = 1;
let max = 100;
let attempts = 10;
let randomNumber = Math.floor(Math.random() * (max - min) + min);



//FUNC --  Select difficulty 

difficultyEl.addEventListener("change", (e) => {

    difficulty = e.target.value;

    if(difficulty === "easy") {
        max = 100;
        attempts = 10;
        betweenEl.textContent = `between ${min} - ${max}`;
        attemptsEl.textContent = attempts;
        inputEl.max = max;
        highScoreEl.textContent = score[0];
    }
    else if(difficulty === "medium"){
        max = 500;
        attempts = 15;
        betweenEl.textContent = `between ${min} - ${max}`;
        attemptsEl.textContent = attempts;
        inputEl.max = max;
        highScoreEl.textContent = score[1];
    }
    else if(difficulty === "hard") {
        max = 10000;
        attempts = 20;
        betweenEl.textContent = `between ${min} - ${max}`;
        attemptsEl.textContent = attempts;
        inputEl.max = max;
        highScoreEl.textContent = score[2];
    }

    randomNumber = Math.floor(Math.random() * (max - min) + min);
})




// FUNC -- submit answer --

formEl.addEventListener("submit", formSubmit);

function formSubmit(e) {

    e.preventDefault();

    const inputElValue = Number(inputEl.value);
    if(!inputElValue) return;

    attempts--;
    difficultyEl.disabled = true; // once They submit the 1st answer, disable the difficulty button - no changes of diff halfway through the game


    if(attempts > 0 && inputElValue !== randomNumber){
        againBtnEl.disabled = true; //We permit the usage of the "againBtn" once user guessed number or depleted attempts
    }
    else {
        againBtnEl.disabled = false;
    }

    if(attempts === 0) {
        hintEl.textContent = "You Lose!";
        hintEl.style.color = "red";
        inputEl.disabled = true;
        submitEl.disabled = true;
        hiddenEl.textContent = randomNumber;
    }

    if(inputElValue > randomNumber) {
        hintEl.textContent = "Too high!";
        inputEl.value = "";
        attemptsEl.textContent = attempts;

    }

    if(inputElValue < randomNumber && attempts > 0){
        hintEl.textContent = "Too low!";
        inputEl.value = "";
        attemptsEl.textContent = attempts;
    }

    if(inputElValue === randomNumber) {
        hintEl.textContent = "Congratulations! You won the game!";
        hintEl.style.color = "green";
        inputEl.disabled = true;
        submitEl.disabled = true;
        hiddenEl.textContent = randomNumber;
        attemptsEl.textContent = attempts;

        

        if(difficulty === "easy" && attempts > score[0]){
            score[0] = attempts;
            highScoreEl.textContent = score[0];
        }
        else if(difficulty === "medium" && attempts > score[1]){
            score[1] = attempts;
            highScoreEl.textContent = score[1];
        }
        else if(difficulty === "hard" && attempts > score[2]){
            score[2] = attempts;
            highScoreEl.textContent = score[2];
        }

        localStorage.setItem("score", JSON.stringify(score));
    }
}



againBtnEl.addEventListener("click", () => {
    randomNumber =  Math.floor(Math.random() * (max - min) + min);
    difficultyEl.disabled = false;
    difficultyEl.value = "easy";
    highScoreEl.textContent = score[0];
    inputEl.disabled = false;
    submitEl.disabled = false;
    hiddenEl.textContent = "?";
    inputEl.value = "";
    hintEl.textContent = "Start guessing...";
    hintEl.style.color = "white";

    attempts = 10;
    attemptsEl.textContent = attempts;
    max = 100;
    inputEl.max = max;
    betweenEl.textContent = `between ${min} - ${max}`;
})