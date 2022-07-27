//wait, so I got a lattice. 
//This is not helpful at the moment: maybe instead
//first simulate the reflection, glide reflection, translation, rotation code?
//maybe instead matrix multiplication?? to get new points
//that should be done in python

const canva_size = 400
const lattice = 4

function setup() {
  // put setup code here
  createCanvas(canva_size, canva_size);
  background(250);
}

function draw() {
  latticeBase()
  noLoop()
}

function latticeBase() {
  let i = createVector(0, 0)
  let j = createVector(0, 0)
  if (lattice == 0) {
    //oblique
    i = createVector(50, 0)
    j = createVector(10, 50)
  }
  else if (lattice == 1) {
    //rect
    i = createVector(50, 0)
    j = createVector(0, 30)
  }
  else if (lattice == 2) {
    //sq
    i = createVector(50, 0)
    j = createVector(0, 50)
  }
  else if (lattice == 3) {
    //rhombic
    i = createVector(43.3, -25)
    j = createVector(0, 50)
  }
  else if (lattice == 4) {
    //hexagonal
    i = createVector(50, 0)
    j = createVector(28.9, 50)
    
  }

  grid(i, j)
}

function grid(i, j) {
  stroke('purple')
  strokeWeight(5)
  let i2 = createVector(-100, 100)

  let j2 = createVector(-1 * j.x, -1 * j.y)
  while (i2.x <= canva_size) {

    console.log(i2.x) 

    while (i2.y <= canva_size) {
      i2 = i2.add(j)
      point(i2.x, i2.y)
    }

    i2 = i2.add(i)

    while (i2.y >= 0) {
      i2 = i2.add(j2)
      point(i2.x, i2.y)
    }

    i2 = i2.add(i)

  }
}

function translate(x=createVector(0,0), a=createVector(50, 0)) {
  return x.add(a)
}

function rotate(a=0, p = Math.matrix[0, 0]) {
  const rotateMatri = Math.matrix([Math.cos(a), -1 * Math.sin(a)], [Math.sin(a), Math.cos(a)])
  return Math.multiply(p, rotateMatri)
}

function reflect(a=0, p = Math.matrix[0, 0]) {
  a *= 2;
  const rotateMatri = Math.matrix([Math.cos(a), -1 * Math.sin(a)], [Math.sin(a), Math.cos(a)])
  return Math.multiply(p, rotateMatri)
}

function glideRefl(angle, init_vec) {
  init_vec = reflect(angle, init_vec)
  a = createVector(Math.sin(angle) * 50, Math.sin(angle) * 50)
  
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
