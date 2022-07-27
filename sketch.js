//wait, so I got a lattice. 
//This is not helpful at the moment: maybe instead
//first simulate the reflection, glide reflection, translation, rotation code?
//maybe instead matrix multiplication?? to get new points
//that should be done in python

const tiling = "rhomb"
const canva_size = 400
const add_size = 50

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function setup() {
  // put setup code here
  createCanvas(canva_size, canva_size);
  background(250);
}

function draw() {
  // put drawing code here
  //grid tiling
  if (tiling == "rect") {
    toDraw = newPoints(0, 0, 80)

  }
  else if (tiling == "rhomb") {
    toDraw = newPoints(25, 0)
  }
  else if (tiling == "pgram") {
    toDraw = newPoints(15, 0)
  }
  else {
    //tiling == square
    toDraw=newPoints()
  }
  drawPoints(toDraw)
  // if (mouseIsPressed){
  //   reflection(mouseX, mouseY)
  // }
}

function newPoints(x=0, y=0, change=50) {
  const points = []    
  const init_x = x
  let p = new Point(x, y)
  points.push(p)
  let row = 0

  while (y <= canva_size) {
    row += 1;
    while (x <= canva_size) {
      let p = new Point(x, y)
      points.push(p)
      x += change
    }
    y += 50

    if (row % 2 == 0) {
      x = init_x
    }
    else {
      x = 0
    }
  }

  return points
}

function drawPoints(points=[]) {
  for(let i = 0; i < points.length; i++) {
    stroke('purple')
    strokeWeight(5)
    //point(points[i].x, [points[i].y])
    let x = points[i].x
    let y = points[i].y
    triangle(x, y, x+1, y, x, y-1)
    //changing the minus is the same as reflectioning
  }
}

//maybe define vector space

    //ellipse(mouseX, mouseY, 10, 10)
    //reflect, rotate, translate - exist
    //glide reflec - does not 
    //maybe first code with triangles

// function reflection(x, y) {
//   if (x > 200) {
//     x -= 200;
//   }
//   ellipse(x, y, 10, 10)
//   ellipse(x + 200, y, 10, 10)
// }

//use vectors
