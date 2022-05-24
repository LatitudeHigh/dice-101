 const restartBtn = document.getElementById("restartBtn");
//defining global variables
var rollRectangle;
var leftRectangle;
var rightRectangle;
var dieOne = 0;
var dieTwo = 0;
var dieOneLabel = null;
var dieTwoLabel = null;
var totaltext = null;
var total = 0;            
var goal;                                               
var homescreen = true;
var gameOver = false;
var wins = 0;

restartBtn.addEventListener("click", ()=> {
  total = 0;
  homescreen = true;
  gameOver = false;
  removeAll();
  start();
});

class Button {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.rect = new Rectangle(100, 50);
    this.rect.setPosition(x, y);
    this.rect.setColor(Color.purple);
    this.label = new Text(text, "16pt Arial");
    this.setText(text)            
  }

  setText(text) {
    this.label.setText(text);
    this.label.setPosition(
      this.x + this.rect.getWidth()/2 - this.label.getWidth()/2,
      this.y + this.label.getHeight()
    );
  }

  add() {
    add(this.rect);
    add(this.label)
  }
}

var hoverElem = null;
function hover(e) {
    if(hoverElem && !hoverElem.containsPoint(e.getX(), e.getY())) {
      console.log("hi")
      hoverElem.setColor(Color.PURPLE);
    }
    var hoverElem = getElementAt(e.getX(), e.getY());
    if(hoverElem.type == "Rectangle") {
        console.log("hello")
        hoverElem.setColor(Color.RED);
    }
}

function start() {
  displayInstructions()
  mouseClickMethod(startgame);
  mouseMoveMethod(hover);
}

function addRectangles() {
    rollButton = new Button(getWidth()/2 - 50, 350, "Roll Dice")
    rollButton.add();

    leftButton = new Button((getWidth()/2) - 50 - 150, 350, "Left");
    leftButton.add();

    rightButton = new Button((getWidth()/2) - 50 + 150, 350, "Right");
    rightButton.add();
}

function startgame(e){
  //defining roll rectangle
  if(homescreen) {
      homescreen = false;
      removeAll();
      createBackground();
      addRectangles();
      //defines and adds goal text
      goal = new Text("Try to get to 101 without going over!", "16pt Arial");
      goal.setPosition(0, goal.getHeight());
      goal.setColor(Color.green)
      add(goal);

      winStreak = new Text("Wins in a row: " + wins);
      winStreak.setPosition((getWidth() - winStreak.getWidth()) / 2, getHeight());
      add(winStreak)
  } else {
      roll(e);
  }
}

function dieLabel(value, xOff) {
  var label = new Text(value, "16pt Arial");
  label.setPosition((getWidth()-label.getWidth())/2 + xOff, (getHeight()-label.getHeight())/2);
  label.setColor(Color.black);
  return label;
}

function rollDice() {
  if(dieOneLabel)
    remove(dieOneLabel);
  if(dieTwoLabel)
    remove(dieTwoLabel)
  
  //This is saying to randomize a number for the 1st "die" between 1 and 6 and it is also positioning it.
  dieOne = Randomizer.nextInt(1, 6); 
  dieOneLabel = dieLabel(dieOne, -50)
  
  dieTwo = Randomizer.nextInt(1, 6);
  dieTwoLabel = dieLabel(dieTwo, 50);

  add(dieTwoLabel);
  add(dieOneLabel);

}

function updateTotal(left, right) {
    //This is adding the last most recent roll to the last roll and is setting the position of the number on the screen.
  if(totaltext)
    remove(totaltext);
  if(dieOneLabel == null || dieTwoLabel == null) {
    totaltext = new Text(0, "16pt Arial");
  } else {
    if(left){
      total += dieOne;
    } else if (right) {
      total += dieTwo;
    } else {
      total += dieOne + dieTwo;
    }
     totaltext = new Text(total, "16pt Arial");
  }
  totaltext.setPosition(
    getWidth() - totaltext.getWidth(),
    totaltext.getHeight()
  );
  totaltext.setColor(Color.red);
  add(totaltext);
}

function myGame(left, right){
  updateTotal(left, right);
  rollDice();
  
  //if you reach over 101 the game will end and new text displaying you lost will show up.
  if((total > 101) && (!gameOver)){
    remove(totaltext);
    remove(dieOneLabel);
    remove(dieTwoLabel);
    remove(goal);
    gameOver = true;
    var lose = new Text("You Lose!", "16pt Arial");
    lose.setPosition(getWidth()/2 - lose.getWidth() / 2, getHeight()/2);
    lose.setColor(Color.red);
    add(lose);
    wins = 0;
  }
  if(total == 101) {
    remove(totaltext);
    remove(dieOneLabel);
    remove(dieTwoLabel);    
    remove(goal);
    gameOver = true;
    var win = new Text("You Win!", "16pt Arial");
    win.setPosition(getWidth()/2 - win.getWidth()/2, getHeight()/2);
    add(win);
    wins++;
  }
}

function roll(e){
  var x = e.getX();
  var y = e.getY();
  if(rollButton.rect.containsPoint(x,y) && !gameOver){
    myGame(false, false);
    var mySong = new Audio("https://codehs.com/uploads/d098e4e491aa7c4b375cd6302613fb66")
    mySong.play();
  } else if(leftButton.rect.containsPoint(x, y) && !gameOver) {
    myGame(true, false);
    var mySong = new Audio("https://codehs.com/uploads/d098e4e491aa7c4b375cd6302613fb66")
    mySong.play();
  } else if(rightButton.rect.containsPoint(x, y) && !gameOver) {
    myGame(false, true);
    var mySong = new Audio("https://codehs.com/uploads/d098e4e491aa7c4b375cd6302613fb66")
    mySong.play();
  }
}

function createBackground() {
  var no = new WebImage("bluemoon.png");
  no.setSize(getWidth(),getHeight());
  no.setPosition(0,0);
  add(no);
}
function displayInstructions() {
  var instructions = new Text("Try to get to 101 by rolling a Dice")
  instructions.setPosition(
    (getWidth() - instructions.getWidth())/2,
    getHeight()/2
  );
  add(instructions);
}