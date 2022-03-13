// DECLARING VARIBALES
var startQuizButton = document.querySelector("#start-quiz");
var secondsDisplay = document.querySelector("#timer-display");
var initialMessage = document.querySelector("#initial-message");
var afterQuizInput  = document.querySelector("#after-quiz-input")
var initialSubmitButton =  document.querySelector("#button-submit")
var afterQuizButtons  = document.querySelector("#after-quiz-button")

var quizOptions = document.querySelector("#quiz-options");
var initials =  document.querySelector("#text-initials");
var divCorrectWrong =  document.querySelector("#div-correct-wrong");
var optionAlert =  document.querySelector("#option-alert");


var divShowScore =  document.querySelector("#div-show-score");
var showScore =  document.querySelector("#show-score");

var timeInterval;
var secondsLeft = 60;   //TIMER FOR THE QUIZ
var timecheck=""        //THIS VARIBALE WILL CHECK IF QUIZ TIMER REACHED 0
var score=0;            //VARIABLE TO KEEP SCORE
var questionNo=0;       //VARIBALE TO KEEP TRACK OF QUESTION NO.
var highScores = [];    //ARRAY VARIBALE TO STORE HIGHSCORE VALUES
var displayAlert="";    //VARIBLE TO STORE IF A OPTION SELECTED IS CORRECT OR WRONG AND WILL DISPLAY FOR FEW SECONDS BEFORE GOING AWAY.
var correctAnswers=0;   //KEEP COUNT OF CORRECT ANSWERS
var wrongAnswers=0;     //KEEP COUNT OF INCORRECT ANSWERS

// QUESTION ARRAY
var questions = [{
    question: "Commonly used data types DO NOT include:",
    options: ["strings","booleans","alerts","numbers"],
    correctAnswer: "alerts"
},
{
    question: "The condition in an if / else statement is enclosed witin ______.",
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

// EVENT LISTENER ON QUIZSTART BUTTON ON CLICK EVENT.
startQuizButton.addEventListener("click", startQuiz);

//EVEN LISTENER WITH FUNCTION WHICH WILL STORE SCORE AND INITIAL TO LOCAL STORAGE
initialSubmitButton.addEventListener("click", function(){
    if (initials.value!==""){
        afterQuizInput.setAttribute("style","display: none");
        //afterQuizButtons.setAttribute("style", "display: block");
        if (timecheck==="timeup")
        {
            initialMessage.textContent="";   
        }
        
        // GETTING VALUES FROM LOCALSTORAGE USING KEY
        var localHighScores = JSON.parse(localStorage.getItem("highScores"));
        
        if (localHighScores!==null){
            highScores = localHighScores;   //STORING VALUES TO LOCAL ARRAY VARIABLE
        }
        highScores.push([score,initials.value]);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        divShowScore.setAttribute("style","display: none");
        window.location.href = "highscore.html";    //CHANGING THE LOCATION OF WINDOW TO HIGHSCORE.HTML PAGE
    }
    else{
        initials.setAttribute("placeholder","initials");    //IF NO INITIALS ARE ENTERED IT WILL SHOW PLACEHOLDER TO LET USER KNOW WHAT AND WHERE THEY HAVE TO ENTER VALUE
    }
});


// THIS FUNCTION IS CALLED WHEN START QUIZ BUTTON IS CLICKED
function startQuiz(){
    // start Timer
    startTimer();

    //  display question and hide the initial message and start quiz button
    initialMessage.textContent="";
    startQuizButton.setAttribute("style","display: none");

    // calling function
    renderQuestion();

}

// KEEP TRACK OF TIME DURING THE QUIZ
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

// THIS TIMER IS FOR DISPLAY ALERT AFTER AN OPTION IS SELECTED, TO DISPLAY CORRECT OR WRONG
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

// FUNCTION TO RENDER NEW QUESTIONS AND IF ALL QUESTIONS ARE FINISHED THEN IT WILL CALL STOPQUIZ FUNCTION
function renderQuestion(){
    if (questionNo< questions.length){
        initialMessage.textContent = "Ques # " + (questionNo+1) +  ".   " +  questions[questionNo].question;

        for (var x=0; x<questions[questionNo].options.length; x++){
            var li = document.createElement("li");
            var button = document.createElement("button");

            button.textContent = questions[questionNo].options[x];
            button.setAttribute("style","width: 200px; height: 50px; margin-bottom: 10px");
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

// EVENT LISTENER, ON CLICK OF ANY OPTION SELECTED
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

        // REMOVING ALL OLD LIST ITEMS
        while(quizOptions.hasChildNodes())
        {
            quizOptions.removeChild(quizOptions.firstChild);
        }
        startTimerOptionAlert();    
        questionNo++
        renderQuestion();
        
    }
})

// WHEN TIMER REACHES 0 OR BELOW OR ALL QUESTIONS ARE FINISHED THIS FUNCTION WILL PERFORM ITS FUCNTIONALITY
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
    
    showScore.textContent = "Score: " + score + ", with " + correctAnswers + " correct answers and " + wrongAnswers + " wrong answers";
    if (questionNo!==questions.length)
    {
        showScore.textContent += " and " + (questions.length - questionNo) + " unanswered";
    }
}   

