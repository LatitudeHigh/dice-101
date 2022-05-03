var rect1;
var rect2;
var rect3;
var rect4;
var rect5;
var rect6;
var rect7;

function start(){
    
    instructions();
    mouseClickMethod(gameBackground);
   
}
var hitLine = [];


function gameBackground() {
   //this creates the background 
    //  var background = new WebImage("https://images.app.goo.gl/WTmGUdnKDvCVMj7r6");
    // background.setSize(500, 500);
    // background.setPosition(0,0);
    // add(background);
  var background = new Rectangle(500,500);
  // background.setColor(color.black);
  // background.setPosition(0,0);
  add(background);
    
    rect = new Rectangle(50,20);
    rect.setPosition(330,18);
    rect.setColor(Color.white);
    add(rect);
    
    //this variable puts the words start and finish on the screen
      var txt = new Text("End", "15pt Roboto Mono");
    txt.setPosition(338, 35);
    txt.setColor(Color.white);
    add(txt);
     var txt = new Text("Start", "15pt Roboto Mono");
    txt.setPosition(13, 385);
    txt.setColor(Color.white);
    add(txt);
    
   //these rectangles are the obstacles the penguin is not allowed to touch
    rect1 = new Rectangle(300, 7);
    rect1.setPosition(0, 350);
    rect1.setColor(Color.blue);
    add(rect1);
    
    
     rect2 = new Rectangle(300, 7);
    rect2.setPosition(100, 300);
     rect2.setColor(Color.blue);
    add(rect2);
    
    
    rect3 = new Rectangle(300, 7);
    rect3.setPosition(0, 250);
    rect3.setColor(Color.blue);
    add(rect3);
    
    
    rect4  = new Rectangle(300, 7);
    rect4.setPosition(100, 200);
    rect4.setColor(Color.blue);
    add(rect4);
    
    
    rect5 = new Rectangle(300, 7);
    rect5.setPosition(0, 150);
    rect5.setColor(Color.blue);
    add(rect5);
    
    
    rect6 = new Rectangle(300, 7);
    rect6.setPosition(100, 100);
    rect6.setColor(Color.blue);
    add(rect6);
    
    
    rect7 = new Rectangle(300, 7);
    rect7.setPosition(0, 50);
    rect7.setColor(Color.blue);
    add(rect7);
    
    
    
  //this creates the penguin  
    var penguin = new WebImage("https://codehs.com/uploads/90e8137c7491dce1814ee9d1daf618d3"); 
  penguin.setSize(25, 33);
    penguin.setPosition(20,361);
    add(penguin);
   
   
   
    keyDownMethod(keyDown);
    
    
    
  
 // this function makes the penguin move when the arrow keys are pressed  
    function keyDown(e){
     if (e.keyCode == Keyboard.LEFT){
        penguin.move (-5, 0);
      
     }
     if (e.keyCode == Keyboard.RIGHT){
        penguin.move (5, 0);
     }
     if (e.keyCode == Keyboard.UP){
        penguin.move (0, -5);
     }
     if (e.keyCode == Keyboard.DOWN){
        penguin.move (0, 5);
     }
      
    
     //covers 1st line from bottom. If it is touced penguin goes back to start
	
	//Covers second line from bottom. If touched, penguin goes back to start.
      var penguinX = penguin.getX();
      var penguinY = penguin.getY();

      //4 points check
      var top = getElementAt(penguinY - 16.5);
      var left = getElementAt(penguinX - 12.5);
      var right = getElementAt(penguinX + 12.5);
      var bottom = getElementAt(penguinY + 16.5);

      println(top);
      println(left);
      println(right);
      println(bottom);
      //top collison
      if(top != null){
        penguin.setPosition(50, 50);
      }
      if(right != null){
        penguin.setPosition(50, 50);
      }
      if(left != null){
        penguin.setPosition(50, 50);
      }
      if(bottom != null){
        penguin.setPosition(50, 50);
      }
    
    }
        
}   






//this function puts the game instructions on the screen

function instructions(){
    var rect = new Rectangle(500,500);
    rect.setPosition(0, 0);
    rect.setColor(Color.white);
    add(rect);

     var txt = new Text("Your mission is to navigate PacMan through", "15pt Roboto Mono");
    txt.setPosition(7, 200);
    txt.setColor(Color.black);
    add(txt);
     var txt = new Text("the maze, without letting it touch the maze.", "15pt Roboto Mono");
    txt.setPosition(7, 230);
    txt.setColor(Color.black);
    add(txt);
     var txt = new Text("Click start to Begin, then use the arrow", "15pt Roboto Mono");
    txt.setPosition(7, 260);
    txt.setColor(Color.black);
    add(txt);
     var txt = new Text("keys until you reach the white rectangle! ", "15pt Roboto Mono");
    txt.setPosition(7, 290);
    txt.setColor(Color.black);
    add(txt);
}