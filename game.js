var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function (e) {
  //   console.log(e.key);
  if (!started) {
    // When the variable has a falsy value the condition is true then EXECUTE the following.
    // Else the variable has truthy value the condition is false - DON'T EXECUTE.
    $("h1").text("Level " + level); // $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++; // increase the level by 1 every time nextSequence() is called.
  $("h1").text("Level " + level); // update the h1 with this change in the value of level.
  var randomNumber = Math.floor(Math.random() * 4); // 0-0.9999 * 4 > 0-3.9999 // 0 - 3
  //   console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber]; // random number based in the array 'buttinColours'
  gamePattern.push(randomChosenColour); // push the color to the end of the array 'gamePattern'
  //   console.log(randomChosenColour);
  $("#" + randomChosenColour) // Use jQuery to select the button with the same id as the randomChosenColour
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  // play the sound for the button colour selected
  //   var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
  //   audio.play();
  playSound(randomChosenColour);
}

// Start the Game
// detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
// debugger;

// detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", function () {
  // Option - 2 >> $(".btn").click(function() {
  // new variable called userChosenColour to store the id of the button that got clicked.
  // console.log(this);
  var userChosenColour = this.id;
  // Option - 2 >> $(this).attr("id");!!!
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //   console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // Step 8
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // Check the index num of the array
    // check if the most recent user answer is the same as the game pattern
    // console.log("Success!");
    if (userClickedPattern.length === gamePattern.length) {
      // Check the array length
      // check that the user have finished their sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over"); // $(document.body)
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart"); // $("h1").text("...");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
