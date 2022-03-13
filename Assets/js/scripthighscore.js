var divHighScore = document.querySelector("#div-high-score");
var listHighScore = document.querySelector("#high-score-list");
var buttonBack = document.querySelector("#button-back");
var buttonClearHighScore = document.querySelector("#button-clear-high-scores");

var highScores=[];

function init(){
    listHighScores();
}

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
        buttonClearHighScore.disabled = true;
    }

}

function clearHighScore(){
    localStorage.removeItem("highScores");
    location.href="highscore.html";
}

buttonClearHighScore.addEventListener("click", clearHighScore);

buttonBack.addEventListener("click", function () {
    window.location.href = "index.html";
   });

init();