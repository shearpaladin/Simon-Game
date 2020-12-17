
var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []
var level = 0;
var started = false;


// Start Game upon clicking "a"
$(document).on("keydown", function (event){
  if (event.key === "a" && !started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Handle User Clicks
$(".btn").on("click", function(){

  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){

  // Reset userClicked Pattern array so the player must type the whole memorized sequence again
  userClickedPattern = []

  // Increment Level
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour)

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name){
  // Play Audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    // Check if user finished sequence
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
}
  else {
    console.log("wrong");
    // Play incorrect Sound when user gets one wrong
    playSound("wrong")

    // Flash background red when to show its wrong
    $("body").addClass("game-over");

    setTimeout(function (){
      $("body").removeClass("game-over");

    }, 200);
    // Change Text to Game Over
    $("#level-title").text("Game Over, Press A key to Restart");
    // Start the game over
    startOver();
  }

}


function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 500);

}

function startOver(){
  // Set Level to 0
  level = 0;
  // Set Game Pattern to empty
  gamePattern = []
  // Set Started to False
  started = false;
}
