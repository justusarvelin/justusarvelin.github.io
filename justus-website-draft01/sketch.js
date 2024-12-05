let penSize = 10;
let penState = 0;


function setup() {
  createCanvas(600, 600);
  background(255);
  (1) var canvas = createCanvas(window.innerWidth, window.innerHeight);
  (2) canvas.parent('container');
  frameRate(conf.FRAME_RATE)
  pos = {x: Math.random() * window.innerWidth + 1, y:Math.random() * window.innerHeight + 1}
}

function draw() {
  if (mouseIsPressed) {
    if (penState == 0) {
	    line(mouseX, mouseY, pmouseX, pmouseY);
    } 
    
    if (penState == 1) {
	    ellipse(mouseX, mouseY, 10, 10);
    }
    
    if (penState == 2) {
      line(mouseX-5, mouseY-5, mouseX+5, mouseY+5);
      line(mouseX+5, mouseY-5, mouseX-5, mouseY+5);
    }
  }
}

function keyTyped() {
  if (key == 'c') {
    background(255);
  }

  if (key == 'r') {
    stroke(255, 0, 0);
  }

  if (key == 'b') {
    stroke(0, 0, 255);
  }
  
  if (key == 'x') {
    // x style pen
    penState = 2;
  }
  
  if (key == 'e') {
    // circle pen
    penState = 1;
  }
  
  if (key == 'l') {
    // connected lines
    penState = 0;
  }
}

function keyPressed() {
	if (keyCode == LEFT_ARROW && penSize > 1) {
    penSize -= 1;
  }
  
  if (keyCode == RIGHT_ARROW) {
		penSize += 1;
  }
    
  strokeWeight(penSize);
}
      

      
      
      
      
      