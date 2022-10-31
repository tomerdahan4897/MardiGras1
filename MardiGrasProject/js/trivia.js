// getting all required elements
const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .timer_line");
const timeOff = quiz_box.querySelector("header .time_text");

//if start quiz button clicked 
start_btn.addEventListener('click', () => {
    info_box.classList.add("activeInfo"); //show the info box
});

//if exit quiz button clicked 
exit_btn.addEventListener('click', () => {
    info_box.classList.remove("activeInfo"); //hide the box
});

//if continue quiz button clicked 
continue_btn.addEventListener('click', () => {
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
});

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.addEventListener('click', () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
});

quit_quiz.addEventListener('click', () => {
    window.location.reload();
});

//if next btn clicked
next_btn.addEventListener('click', () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    }
    else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questiones Completed");
        showResultBox();
    }
});

//getting questions and options from array.
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    let que_tag = `<span>${questions[index].numb}. ${questions[index].quesion}</span>`;
    let option_tag = `<div class="option"><span>${questions[index].options[0]}</span></div>`
        + `<div class="option"><span>${questions[index].options[1]}</span></div>`
        + `<div class="option"><span>${questions[index].options[2]}</span></div>`
        + `<div class="option"><span>${questions[index].options[3]}</span></div>`;
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        answer.classList.add("correct");
        console.log("corr");
        userScore += 1;
        console.log(userScore);
    } else {
        answer.classList.add("incorrect");
        console.log("wro");

        //if answers is incorrect then auto selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }
    //once user selected disabled all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (scoreText >= 8) {
        let scoreTag = `<span> WonderFull! You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    } else if (userScore >= 4) {
        let scoreTag = `<span> Nice! You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = `<span> Sorry! You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";
            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 27);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 600) {
            clearInterval(counterLine);
        }
    }
}


function queCounter() {
    const buttom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuestCountTag = `<span><p>${que_numb}</p>of<p>${questions.length}</p>Questions</span>`;
    buttom_ques_counter.innerHTML = totalQuestCountTag;
}
