const formEl = document.querySelector("form"); //*** */
const inputEl = document.getElementById("guess"); //*** */
const hintEl = document.querySelector(".hint"); //*** */
const attemptsEl = document.querySelector(".attempts"); //*** */
const highScoreEl = document.querySelector(".highscore"); //*** */
const difficultyEl = document.querySelector("#difficulty");//*** */
const betweenEl = document.querySelector(".between");//*** */
const submitEl = document.querySelector(".submitBtn"); //*** */
const againBtnEl = document.querySelector(".againBtn"); //*** */
const hiddenEl = document.querySelector(".hidden");




let difficulty = "easy";
let score = [0,0,0]; // index[0] it is SCORE in "easy" mode, index[1] it is SCORE in "medium" mode, index[2] it is SCORE in "hard" mode
let min = 1;
let max = 50;
let attempts = 10;
let randomNumber = Math.floor(Math.random() * (max - min) + min);





//FUNC --  Select difficulty 

difficultyEl.addEventListener("change", (e) => {

    difficulty = e.target.value;
    console.log(difficulty);

    if(difficulty === "easy") {
        max = 50;
        betweenEl.textContent = "between 1 - 50";
        attempts = 10;
        attemptsEl.textContent = attempts;
        highScoreEl.textContent = score[0];
    }
    else if(difficulty === "medium"){
        max = 200;
        betweenEl.textContent = "between 1 - 200";
        attempts = 15;
        attemptsEl.textContent = attempts;
        inputEl.max = max;
        highScoreEl.textContent = score[1];
    }
    else if(difficulty === "hard") {
        max = 1000;
        betweenEl.textContent = "between 1 - 1000";
        attempts = 20;
        attemptsEl.textContent = attempts;
        inputEl.max = max;
        highScoreEl.textContent = score[2];
    }

    randomNumber = Math.floor(Math.random() * (max - min) + min);
})


console.log(attempts);


// FUNC -- submit answer --

formEl.addEventListener("submit", formSubmit);

function formSubmit(e) {

    e.preventDefault();

    const inputElValue = Number(inputEl.value);
    attempts--;

    if(!inputElValue) return;

    difficultyEl.disabled = true;

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
        hintEl.textContent = "You won!";
        hintEl.style.color = "green";
        inputEl.disabled = true;
        submitEl.disabled = true;
        hiddenEl.textContent = randomNumber;
        

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
    }
}



againBtnEl.addEventListener("click", () => {
    randomNumber =  Math.floor(Math.random() * (max - min) + min);
    difficultyEl.disabled = false;
    difficultyEl.value = "easy";
    inputEl.disabled = false;
    submitEl.disabled = false;
    hiddenEl.textContent = "?";
    inputEl.value = "";
    hintEl.textContent = "Start guessing...";
    hintEl.style.color = "white";

    attempts = 10;
    attemptsEl.textContent = attempts;
    betweenEl.textContent = "between 1 - 50";
})