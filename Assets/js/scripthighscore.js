var divHighScore = document.querySelector("#div-high-score");
var listHighScore = document.querySelector("#high-score-list");
var buttonBack = document.querySelector("#button-back");
var buttonClearHighScore = document.querySelector("#button-clear-high-scores");

var highScores=[];

function init(){
    listHighScores();
}

// FUNCTION TO DISPLAY SCORES BY ADDING LIST ITEMS IN UNORDERED LIST AND CREATING ELEMENTS AS MUCH AS NEEDED.
function listHighScores(){
    var localHighScores = JSON.parse(localStorage.getItem("highScores"));
        
    if (localHighScores!==null){
        highScores = localHighScores;
        
        for (var i=0; i< highScores.length; i++){
            var li = document.createElement("li");

            li.setAttribute("data-index",i);
            li.textContent= (i+1) + ". " + highScores[i][1] + " ==>  " + highScores[i][0] ;
            
            listHighScore.appendChild(li);
        }
    }    
    else{
        buttonClearHighScore.disabled = true;   //IF THERE IS NOR SCORE THEN CLEAR HIGH SCORE BUTTON IS DISABLED.
    }

}

// FUNCTION TO JUST REMOVE THE HIGHSCORES KEY FROM LOCALSTORAGE AND RELOADING THE PAGE.
function clearHighScore(){
    localStorage.removeItem("highScores");
    location.href="highscore.html";
}

// ADDING EVENT LISTENER ON BUTTON CLICK, CLEARHIGHSCORE.
buttonClearHighScore.addEventListener("click", clearHighScore);

// ADDING EVENT LISTENER ON BUTTON CLICK, BACK, TO TAKE THE LOCATION BACK TO MAIN QUIZ INDEX.HTML PAGE.
buttonBack.addEventListener("click", function () {
    window.location.href = "index.html";
   });

init();