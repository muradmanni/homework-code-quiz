var startQuizButton = document.querySelector("#start-quiz");
var secondsDisplay = document.querySelector("#timer-display");
var initialMessage = document.querySelector("#initial-message");
var afterQuizInput  = document.querySelector("#after-quiz-input")
var initialSubmitButton =  document.querySelector("#button-submit")
var afterQuizButtons  = document.querySelector("#after-quiz-button")
var buttonBack = document.querySelector("#button-back");
var quizOptions = document.querySelector("#quiz-options");
var initials =  document.querySelector("#text-initials");

var timeInterval;
var secondsLeft = 13;
var timecheck=""
var score=0;
var questionNo=0;
var highScores = [];

var questions = [{
    question: "What is my name?",
    options: ["Murad","Ali","Noor","Ali"],
    correctAnswer: "Murad"
},
{
    question: "What is your name?",
    options: ["My","Name","Noor","Ali"],
    correctAnswer: "Ali"
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
            alert("correct");
        }
        else{
            secondsLeft =secondsLeft - 5;
        }

        while(quizOptions.hasChildNodes())
        {
            quizOptions.removeChild(quizOptions.firstChild);
        }
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
        clearInterval(timeInterval);
    }
    quizOptions.setAttribute("style","display: none");
    afterQuizInput.setAttribute("style","display: block");
}

