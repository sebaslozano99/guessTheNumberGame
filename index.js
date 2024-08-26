const formEl = document.querySelector("form");
const inputEl = document.getElementById("guess");
const strongEl = document.querySelector("strong");
const spanEl = document.querySelector("span");

let attempts = 0; //
spanEl.innerText = `Attempts: ${attempts}`;
let min;
let max;

while(!min){
    min = window.prompt("Enter the minimum value!");
}

while(!max) {
    max = window.prompt("Enter the maximum number!");
}

const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    attempts = attempts + 1;
    spanEl.innerText = `Attempts: ${attempts}`;

    const inputValue = Number(inputEl.value);
    if(!inputValue) return;

    if(inputValue > max) {
        alert(`You can't enter a value greater than ${max}`);
        inputEl.value = "";
        return;
    }
    else if(inputValue < min) {
        alert(`You can't enter a value lower than ${min}`);
        inputEl.value = "";
        return;
    }

    if(inputValue > randomNumber) {
        alert("You entered a greater number! Keep trying!");
    }
    else if(inputValue < randomNumber){
        alert("You entered a lower number! Keep trying!");
    }
    else if(inputValue === randomNumber) {

        strongEl.innerText = randomNumber;
        spanEl.innerText = `Attempts: ${attempts}`;
        alert("You won!");

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    inputEl.value = "";
    
})
