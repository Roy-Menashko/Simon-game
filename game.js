var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// random color chosing func
function nextSequence(){
    level += 1;
    userClickedPattern = [];
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    for (i=0; i<gamePattern.length; i++){}
    $("#" + randomChosenColour).animate({opacity: 0.3}, 100)
    .animate({opacity: 1}, 100, function(){
    });
    playSound(randomChosenColour);   
}

// chosen color func
function handler(userChosenColour){
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
}

// play sound func
function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();   
}

// animate after press
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// checking the result func
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if (currentLevel === gamePattern.length - 1){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }    
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// start new game
$(document).keydown(function(event) {
    nextSequence();
});

// click on buttom
$(document).click(function(event) {
    if (buttonColours.includes(event.target.id)){
        handler(event.target.id);
    }
});

// start over func
function startOver(){
    level = 0
    gamePattern = [];
    userClickedPattern = [];
}