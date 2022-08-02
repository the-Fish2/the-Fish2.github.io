function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let currRGB = 155
  frameRate(10)
  let initP = createVector(pmouseX, pmouseY)
 
  for (let i = 0; i < 10; i++) {
    
    let newP = random(100)/100
    newP *= newP
    if (random(2) < 1) {
      newP.x *= -1
    }
    if (random(2) < 1) {
      newP.y *= -1
    }
    newP = createVector(initP.x + newP, initP.y + (1 - newP))
    
    stroke(currRGB)
    fill(currRGB)
    
    let randval = 100*(1/(mouseX-pmouseX+1))
    
    let val = [initP.x, initP.y, initP.x + random(randval) - randval/2, initP.y + random(randval) - randval/2, newP.x, newP.y, newP.x + random(randval) - randval/2, newP.y + random(randval) - randval/2]
    
    bezier(val[0], val[1], val[2], val[3], val[4], val[5], val[6], val[7]);
    val[2]+= 1
    val[3] += 1
    val[6] += 1
    val[7] += 1
    
    //bkgnd
    stroke(220)
    fill(220)
    
    bezier(val[0], val[1], val[2], val[3], val[4], val[5], val[6], val[7]);
    
    currRGB += 10
  }
    
  
}