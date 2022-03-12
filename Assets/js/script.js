var startQuizButton = document.querySelector("#start-quiz");
var secondsDisplay = document.querySelector("#timer-display");
var initialMessage = document.querySelector("#initial-message");
var afterQuizInput  = document.querySelector("#after-quiz-input")
var initialSubmitButton =  document.querySelector("#after-quiz-input")
var afterQuizButtons  = document.querySelector("#after-quiz-button")
var secondsLeft = 8;

startQuizButton.addEventListener("click", startQuiz);

function startQuiz(){
    // start Timer
    startTimer();

    //  display question and hide the initial message and start quiz button
    initialMessage.textContent="";
    startQuizButton.setAttribute("style","display: none");
}

function startTimer(){
    var timeInterval = setInterval(function (){

        secondsDisplay.textContent = secondsLeft + " seconds";
        secondsLeft--
        if(secondsLeft<0){
            clearInterval(timeInterval);
            stopQuiz();
            return;
        }

    },1000);

}

function stopQuiz(){
    initialMessage.textContent="Sorry Times-up ";
    afterQuizInput.setAttribute("style","display: block");
}