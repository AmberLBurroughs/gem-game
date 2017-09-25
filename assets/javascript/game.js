//starting the game, add values to gems (from gem object) and add to html
var gameState = {
  targetNumber : randomNumberGenerate(19, 120),
  wins : 0,
  losses : 0,
  resultNumber : 0, 

  initializeGame: function() {
    $("#number-to-guess").text(this.targetNumber);
    $("#wins").html("wins: " + this.wins);
    $("#losses").html("losses: " + this.losses);
    $("#result").html("total: " + this.resultNumber);
    gemsValue.assignNumber(); //on ready assign gem value
    gemsValue.assignButtonImage();
    gemsValue.assignValueToHtml(); // give buttons value
  },

  // update resultNumber with clickValue
  updateResult: function(num){
    this.resultNumber += num;
    $("#win-lose").hide().html("");
    // display resultNum on page
    $("#result").html("total: " + this.resultNumber);

    // if targetNumber is  equal to resultNumber
      // user loses game
    // if resultNumber is greater than > targetNumber 
      // user wins game
    if(this.resultNumber > this.targetNumber ){    
      this.markGameLoss();
    } else if(this.resultNumber === this.targetNumber) {
      this.markGameWin();
    } else {
      return;
    }
  },

  // encriment wins by 1 
  // update page with winning data and text
  // reset current agme
  markGameWin: function(){
    this.wins++;
    $("#wins").html("wins: " + this.wins);
    $("#win-lose").hide().html("<h3>You win</h3>" + "<p>You correcting added your score to " + this.targetNumber + "</p>" + "<p>Play again.</p>").fadeIn();
    // console.log("wins " + this.wins);
    this.reset();
  },

   // encriment losses by 1 
   // update page with loosing data and text
   // reset current agme
  markGameLoss: function(){
    this.losses++;
    $("#losses").html("losses: " + this.losses);
    $("#win-lose").hide().html("<h3>Uh Oh</h3>" + "<p>You could not correctly add your score to " + this.targetNumber + "</p>" + "<p>try again.</p>").fadeIn();
    // console.log("losses " + this.losses); 
    this.reset();
  },
  
  // clear gem state 
  reset: function(){
    // generate new num and display new num
    gameState.targetNumber = randomNumberGenerate(19, 120);
    $("#number-to-guess").text(gameState.targetNumber);
    
    // set resultNum to 0, display reset value
    this.resultNumber = 0;
    $("#result").html("total: " + gameState.resultNumber);


    // give buttons new values
    gemsValue.resetRandomValue();
    // gemsValue.assignNumber();
    // gemsValue.assignValueToHtml();
  }
};

// create a random number
function randomNumberGenerate(min, max){
  return Math.floor(Math.random()*(max-min+1)+ min);
}

// create gems 
var gemsValue = {
  gems: [],

  // replace a randon index in gems with a 1. max is gem length (3)
  replaceOne : function(max) {
    //takes the gems array and selects a random index
    var gemNumIndex = Math.floor(Math.random()*(max));
    // console.log("random index: " + gemNumIndex);
    // at random index replace value with 1
    this.gems.splice(gemNumIndex, 1, 1);
  },

  // run randomNumbGenerate function at least 4 times.
  // generate numbers and add to array, if not already in array, push to array.
  assignNumber : function(){
    // run until gems is length of 4
    while(this.gems.length < 4){
      var num = randomNumberGenerate(2,12)
      // gems arrray doesn't aleady have num add num
      if(!this.gems.includes(num)){
        gemsValue.gems.push(num);
      } 
    }
    // console.log("gem array: " + this.gems);
    this.replaceOne(this.gems.length);
  },

  // assign each button a value from gems array
  assignValueToHtml : function(){
    // each  gem item === a button there are 4 buttons and 4 array items.
      // all buttons have btn call and a unique class of btn1-4
    $('.btn1').val(this.gems[0]);
    $('.btn2').val(this.gems[1]);
    $('.btn3').val(this.gems[2]);
    $('.btn4').val(this.gems[3]);
  },

  assignButtonImage: function(){
    // remove all btn# classes
    $('button').each(function(index, value){
      $(value).removeClass('btn1').removeClass('btn2').removeClass('btn3').removeClass('btn4')
    });
    var btnClasses = ['btn1', 'btn2', 'btn3', 'btn4'];
    btnClasses = this.shuffleArray(btnClasses);
    $('button').each(function(index,value){
      $(value).addClass(btnClasses[index]);
    });
  },

  shuffleArray: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },

  //Function to reset data
  resetRandomValue : function() {
    this.gems = [];
    this.assignNumber();
    // console.log(this.gems);
    this.assignButtonImage();
    this.assignValueToHtml();
  },
};

// click to start the game
$(document).ready(function(){
  gameState.initializeGame();
  // if button (this) is clicked the value assigned is add to a counter array
  // bind function to click of buttons
  $(".btn").on("click", function(){ 
    var clickValue = parseInt($(this).val());
    gameState.updateResult(clickValue);
  });
});