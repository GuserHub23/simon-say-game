const buttonColours = ["red","blue","green","yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let experience = 0;

let highestExp = 0;

let highestLevel = 0;

let started = false;

$(".exp").hide()

$(".reset-btn").hide()

$("#start-btn").click(function() {
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  $(".exp").show()
  $(".reset-btn").show()
});

$(".reset-btn").click(function() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
  $(".reset-btn").hide();
  $(".exp").hide();
  $("#start-btn").show();
  $("#level-title").text("Press 'start' button to play");
  $(".exp").text("exp: 0");
});


$(".btn").click(function(){
  const userChosenColour =  $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})


// try to retrieve the value of highestExp from localStorage
if (localStorage.getItem("highestExp")) {
  
  highestExp = parseInt(localStorage.getItem("highestExp"));
  $(".highestExp").text(`EXP record: ${highestExp}`);
}


function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function(){
        nextSequence();
      },1000);

      // Add experience points
      experience += 23;
      // check if the current level is higher than the highest level
      if (experience > highestExp) {
        highestExp = experience;
        $(".highestExp").text(`EXP record: ${highestExp}`);
        // store the new value of highestLevel in localStorage
        localStorage.setItem("highestExp", highestExp.toString());
      }
    }
    
  } else {

    experience = 0
        
    playSound("wrong");
    
    $("body").addClass("game-over");
    
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    
    $("#level-title").text('Game Over, Press "start" button to Restart');
    startOver();
    $("#start-btn").show();
    $(".reset-btn").hide()
  }
  
  $(".exp").text(`exp: ${experience}`);
}

function startOver(){
  level = 0;
  gamePattern =[];
  started = false;
}

// try to retrieve the value of highestLevel from localStorage
if (localStorage.getItem("highestLevel")) {
  highestLevel = parseInt(localStorage.getItem("highestLevel"));
  $(".highestLevel").text(`Level record: ${highestLevel}`);
}

function nextSequence() {
  
  userClickedPattern = [];
  
  //increment after each level
  level++;
  $("#level-title").text("Level " + level);
  
  // check if the current level is higher than the highest level
  if (level > highestLevel) {
    highestLevel = level;
    $(".highestLevel").text(`Level record: ${highestLevel}`);
    // store the new value of highestLevel in localStorage
    localStorage.setItem("highestLevel", highestLevel.toString());
  }

  //generates a random sequence of colours based on the level
  gamePattern = [];
  for (var i = 0; i < level; i++) {
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomColourChosen = buttonColours[randomNumber];
    gamePattern.push(randomColourChosen);
  }

  //show the new sequence
  showSequence();

  $("#start-btn").hide();

}


function showSequence() {
  for (var i = 0; i < gamePattern.length; i++) {
    (function(index) {
      setTimeout(function() {
        $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[index]);
      }, i * 500);
    })(i);
  }
}


function playSound(name){

  const audio = new Audio ("sounds\\" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}
