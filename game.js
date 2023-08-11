var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressed = false;
var level = 0;

// variable is also a way to identify your file path, instead of listing every mp3 file you had in sounds
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }

// remember when selecting class need to put . 
$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
  
$("#startButton").click(function () {
  if (!keyPressed) {
    $("#level-title").text("Level " + level);
    nextSequence();
    keyPressed = true;
  }
});

function checkAnswer(currentLevel) {
  if (!keyPressed) return; // Add this check to prevent checking the answer before the game starts

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press start button to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = []; // Correct the variable name here
  userClickedPattern = []; // Reset the user's clicked pattern as well
  keyPressed = false;
}