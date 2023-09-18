const checkBtn = document.querySelector(".btn .check-btn");
const seconContainer = document.querySelector(".second-container");
const exitBtn = document.querySelector(".two-btn .exit-btn");
const containueBtn = document.querySelector(".two-btn .containue-btn");
const thirdContainer = document.querySelector(".third-container");
const questionOption = document.querySelector(".question-option");
const timeCount = document.querySelector(".box .second"); //for time count down
const resultBox = document.querySelector(".result-box");
const playAgain = document.querySelector(".button .play-again");
const quitQuiz = document.querySelector(".button .quit-quiz");

checkBtn.onclick = () =>{
    seconContainer.classList.add("active");
}
exitBtn.onclick = () =>{
    seconContainer.classList.remove("active");
}
containueBtn.onclick = () =>{
    seconContainer.classList.remove("active");
    thirdContainer.classList.add("active");
    showQuestion(0);
    startTimer(30);
}

// for time function
let counter;
let timeValue = 30;
//work for contunue quiz
const startsBtn = document.querySelector(".footer .starts-btn");

let questionCount = 0;

startsBtn.onclick = () =>{
    if(questionCount < (questions.length-1)){
        questionCount++;
        showQuestion(questionCount);
        console.log("done");
        clearInterval(counter);
        startTimer(timeValue);
    }
    else
    {
        console.log("complete");
        showResultBox();
    }
    startsBtn.style.display = "none";
}

function showQuestion(index){
    const allContent = document.querySelector(".all-content .question-header");
    const questionTag = "<h3>" + questions[index].number + ". " + questions[index].question + "</h3>";
    let questionOptions = document.querySelector(".question-option");
    let optionTag = '<div class="option-section">' + questions[index].options[0] + "</div>"
                    +'<div class="option-section">' + questions[index].options[1] + "</div>"
                    +'<div class="option-section">' + questions[index].options[2] + "</div>"
                    +'<div class="option-section">' + questions[index].options[3] + "</div>";
    allContent.innerHTML = questionTag;
    questionOptions.innerHTML = optionTag;

    const serial = document.querySelector(".footer .new-footer");
    let questionCountFooter = '<p>' + questions[index].number + " of " + questions.length + "questions " + '</p>';
    serial.innerHTML = questionCountFooter;

    //for options
    let choiceOption = questionOptions.querySelectorAll(".option-section");
    
    for(var i = 0; i <choiceOption.length; i++ ){
        choiceOption[i].setAttribute("onclick", "seletedOption(this)");//parametter onclick and function
    }
}

///seletedOption function
let rightIcon = `<div class="right icon"><i class="fas fa-check"></i></div>`;
let wrongIcon = `<div class="cross icon"><i class="fas fa-times"></i></i></div>`;
function seletedOption(answer){
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = questionOption.children.length;
    if(userAns == correctAnswer){
        userScore +=1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("You are right");
        answer.insertAdjacentHTML("beforeend",rightIcon);//adjust in html page
    }
    else{
        answer.classList.add("inCorrect");
        console.log("You are wrong");
        for(var i = 0; i < allOptions; i++ ){
            if(questionOption.children[i].textContent == correctAnswer){
                questionOption.children[i].setAttribute("class", "option-section correct");
                questionOption.children[i].insertAdjacentHTML("beforeend",rightIcon);
            }
        }
        answer.insertAdjacentHTML("beforeend",wrongIcon);//adjust in html page
    }
    //loop for disable option
    for(var i = 0; i < allOptions; i++ ){
        questionOption.children[i].classList.add("disable");
    }
    startsBtn.style.display = "block";
}


//result-page section
let userScore = 0;
function showResultBox(){
    seconContainer.classList.remove("active");
    thirdContainer.classList.remove("active");
    resultBox.classList.add("active");
    const scoreText = document.querySelector(".result-content");
    if(userScore > 3){
        let scoreTag = '<span>Congratulation you got<p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 2){
        let scoreTag = '<span>Carry on you got<p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>You Are Fail You got<p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
//time count down function
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = 0 + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
         
    }
}

//for quit quiz button
quitQuiz.onclick = ()=>{
    window.location.reload();
}
//for playAgain button
playAgain.onclick = () =>{
    seconContainer.classList.add("active");
    resultBox.classList.remove("active");
    let counter;
    let timeValue = 30;
    let questionCount = 0;
    startsBtn.onclick = () =>{
        if(questionCount < (questions.length-1)){
            questionCount++;
            showQuestion(questionCount);
            console.log("done");
            clearInterval(counter);
            startTimer(timeValue);
        }
        else
        {
            console.log("complete");
            showResultBox();
        }
        startsBtn.style.display = "none";
    }
}