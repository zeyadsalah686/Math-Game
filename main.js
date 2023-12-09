const problemElement = document.getElementById("problem");
const form = document.querySelector(".form");
const input = document.querySelector(".field");
const points = document.querySelector("#points");
const worngs = document.querySelector("#worng");
const progressBar = document.querySelector(".progress-inner");
const endMess = document.querySelector(".end-mess");
const endBtn = document.querySelector(".end-btn");

let operators = ["+", "-", "x", "÷"];
let state = {
    score: 0,
    wrongAnswers: 0,
}

function updateProblem() {
    state.currentProblem = gnerateProblem()
    problemElement.innerHTML = `
    ${state.currentProblem.num1}
    ${state.currentProblem.op}
    ${state.currentProblem.num2}
    `;
    input.value = ""
    input.focus()
}

updateProblem();

function gnerateNumber(max) {
    num = Math.floor(Math.random() * (max + 1));

    if (num != 0) {
        return num;
    } else {
        return 5;
    }
}

function gnerateProblem() {
    return {
        num1: gnerateNumber(10),
        num2: gnerateNumber(10),
        op: operators[(Math.floor(Math.random() * operators.length))],
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let correctAnswer;

    if (state.currentProblem.op == "+") {
        correctAnswer = state.currentProblem.num1 + state.currentProblem.num2;
    }
    if (state.currentProblem.op == "-") {
        correctAnswer = state.currentProblem.num1 - state.currentProblem.num2;
    }
    if (state.currentProblem.op == "x") {
        correctAnswer = state.currentProblem.num1 * state.currentProblem.num2;
    }
    if (state.currentProblem.op == "÷") {
        correctAnswer = state.currentProblem.num1 / state.currentProblem.num2;
    }
    if (parseInt(input.value, 10) === correctAnswer ) {
        state.score += 1;
        points.textContent = 10 - state.score;
        updateProblem()
        renderProgressBar();
    } else {
        state.wrongAnswers += 1;
        worngs.textContent = 2 - state.wrongAnswers;
        problemElement.classList.add("wrong");
        setTimeout(() => {
            problemElement.classList.remove("wrong");
        },451)
        updateProblem();
    }
    checkLogic();
});

endBtn.addEventListener("click", resetGame);

function checkLogic() {
    if (state.score === 10) {
        endMess.textContent = "You Won !!";
        document.body.classList.add("overlay-is-open"); 
        setTimeout(() => {
            endBtn.focus();
        },331); 
    }

    if (state.wrongAnswers === 3) {
        endMess.textContent = "You Lost !!";
        document.body.classList.add("overlay-is-open");
        setTimeout(() => {
            endBtn.focus();
        },331); 
    }
}

endBtn.addEventListener("click", resetGame);

function resetGame() {
    updateProblem()
    state.score = 0;
    state.wrongAnswers = 0;
    points.textContent = 10;
    worngs.textContent = 2;
    document.body.classList.remove("overlay-is-open");   
    renderProgressBar();
}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score / 10})`;    
}