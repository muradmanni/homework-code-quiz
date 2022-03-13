var startQuizButton = document.querySelector("#start-quiz");
var secondsDisplay = document.querySelector("#timer-display");
var initialMessage = document.querySelector("#initial-message");
var afterQuizInput  = document.querySelector("#after-quiz-input")
var initialSubmitButton =  document.querySelector("#button-submit")
var afterQuizButtons  = document.querySelector("#after-quiz-button")
var buttonBack = document.querySelector("#button-back");
var quizOptions = document.querySelector("#quiz-options");
var initials =  document.querySelector("#text-initials");
var divCorrectWrong =  document.querySelector("#div-correct-wrong");
var optionAlert =  document.querySelector("#option-alert");


var divShowScore =  document.querySelector("#div-show-score");
var showScore =  document.querySelector("#show-score");


var timeInterval;
var secondsLeft = 60;
var timecheck=""
var score=0;
var questionNo=0;
var highScores = [];
var displayAlert="";
var correctAnswers=0;
var wrongAnswers=0;

var questions = [{
    question: "Commonly used data types DO NOT include:",
    options: ["strings","booleans","alerts","numbers"],
    correctAnswer: "alerts"
},
{
    question: "The condition in and if / else statement is enclosed witin ______.",
    options: ["quotes","curly brackets","paranthesis","square brackets"],
    correctAnswer: "paranthesis"
},
{
    question: "Arrays in JavaScript can be used to store ________.",
    options: ["numbers and strings","other arrays","booleans","all of the above"],
    correctAnswer: "all of the above"
},
{
    question: "String values must be enclosed within ________ when being assigned to variables.",
    options: ["commas","curly brackets","quotes","paranthesis"],
    correctAnswer: "quotes"
},
{
    question: "A very useful tool used during development and debugging for prng content to the debugger is:",
    options: ["JavaScript","terminal / bash","for loops","console.log"],
    correctAnswer: "console.log"
}
]

// var highScores={
//     initial: "",
//     score: 0
// }

startQuizButton.addEventListener("click", startQuiz);

initialSubmitButton.addEventListener("click", function(){
    if (initials.value!==""){
        afterQuizInput.setAttribute("style","display: none");
        afterQuizButtons.setAttribute("style", "display: block");
        if (timecheck==="timeup")
        {
            initialMessage.textContent="";   
        }
        
        var localHighScores = JSON.parse(localStorage.getItem("highScores"));
        
        if (localHighScores!==null){
            highScores = localHighScores;
        }
        highScores.push([score,initials.value]);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        divShowScore.setAttribute("style","display: none");
    }
    else{
        initials.setAttribute("placeholder","initials");
    }
});

buttonBack.addEventListener("click", function () {
     window.location.href = window.location.href;
    });

function startQuiz(){
    // start Timer
    startTimer();

    //  display question and hide the initial message and start quiz button
    initialMessage.textContent="";
    startQuizButton.setAttribute("style","display: none");

    renderQuestion();

}

function startTimer(){
        timeInterval = setInterval(function (){

        secondsDisplay.textContent = secondsLeft + ( secondsLeft>1 ? " seconds" : " second");
        secondsLeft--
        if(secondsLeft<0){
            clearInterval(timeInterval);
            timecheck="timeup";
            stopQuiz();
            return;
        }

    },1000);
}

function startTimerOptionAlert(){
    var displayTime=8;

    var timerOptionAlert = setInterval(function (){
        if (displayTime>0){
            // show alert display
            divCorrectWrong.setAttribute("style","display: block");
            optionAlert.setAttribute("style","font-style: italic");
            optionAlert.textContent = displayAlert;
        }
        else
        {
            // hide alert display
            divCorrectWrong.setAttribute("style","display: none");
            clearInterval(timerOptionAlert);
        }
        displayTime--;
    },100);
}

function renderQuestion(){
    if (questionNo< questions.length){
        initialMessage.textContent = questions[questionNo].question;

        for (var x=0; x<questions[questionNo].options.length; x++){
            var li = document.createElement("li");
            var button = document.createElement("button");

            button.textContent = questions[questionNo].options[x];
            button.setAttribute("style","width: 100px");
            button.setAttribute("id","button-option");
            li.setAttribute("data-index",x);
            
            li.appendChild(button);

            quizOptions.appendChild(li);

        }
    }
    else{
        stopQuiz();
    }    
}

quizOptions.addEventListener("click",function(event){
    var element = event.target;

    if (element.matches("button"))
    {
        var selectedAnswer= element.parentElement.textContent;
        if (selectedAnswer === questions[questionNo].correctAnswer)
        {
            displayAlert = "Correct";
            score =score +10;
            correctAnswers++;
        }
        else{
            secondsLeft =secondsLeft - 5;
            displayAlert="Wrong";
            score =score -6;
            wrongAnswers++;
        }

        while(quizOptions.hasChildNodes())
        {
            quizOptions.removeChild(quizOptions.firstChild);
        }
        startTimerOptionAlert();
        questionNo++
        renderQuestion();
        
    }
})


function stopQuiz(){
    if (timecheck==="timeup")
    {
        initialMessage.textContent="Sorry Times-up ";
    }
    else{
        initialMessage.textContent="";
        clearInterval(timeInterval);
    }
    quizOptions.setAttribute("style","display: none");
    afterQuizInput.setAttribute("style","display: block");
    divShowScore.setAttribute("style","display: block");
    
    showScore.textContent = "Score: " + score + ", with " + correctAnswers + " correct answers and " + wrongAnswers + " wrong answers.";
}

