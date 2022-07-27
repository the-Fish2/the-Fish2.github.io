function setup() {
  // put setup code here
  createCanvas(400, 400);
  background(250);
}

function draw() {
  // put drawing code here
  if (mouseIsPressed){
    reflection(mouseX, mouseY)
    //ellipse(mouseX, mouseY, 10, 10)
  }
}

function reflection(x, y) {
  if (x > 200) {
    x -= 200;
  }
  ellipse(x, y, 10, 10)
  ellipse(x + 200, y, 10, 10)
}