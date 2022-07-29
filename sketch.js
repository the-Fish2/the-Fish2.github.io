const canva_size = 500
const lat_size = 100
var pattern = 4
var vectors = []

function setup() {
    createCanvas(canva_size, canva_size)
    background(250);
    vectors = lattice()
    strokeWeight(3)
}

function draw() {
    if (mouseIsPressed) {
        //issue 1: this is slow
        let mouseCurr = createVector(pmouseX, pmouseY)
        if (pmouseX < canva_size && pmouseY < canva_size && pmouseX > 0 && pmouseY > 0) {
            let points = patterned(mouseCurr)
            duplicate(points)
        }
    }
}

function patterned(vec) {
    let points = [vec]
    let changeV = createVector(vec.x, vec.y)
    if (pattern == 1) {
        let v1 = createVector(lat_size/2, 0)
        changeV.reflect(v1)
        let v2 = createVector(0, lat_size/2)  
        changeV.reflect(v2)
        points.push(changeV)
    }
    else if (pattern == 2) {
        let v1 = createVector(lat_size/2, 0)
        changeV.reflect(v1)
        points.push(changeV)
    }
    else if (pattern == 3) {
        let v1 = createVector(0, lat_size/2)
        changeV.reflect(v1)
        changeV.x += lat_size/2
        points.push(changeV)
    }
    else if (pattern == 4) {
        let v1 = createVector(lat_size/2, 0)
        changeV.reflect(v1)
        points.push(changeV)
    }
    return points
}


function duplicate(points) {
    let alt = 0
    if (((points[0].y - (points[0].y % lat_size))/lat_size) % 2 == 1) {
        alt =1
    }cd 
    console.log(alt)
    for (let p = 0; p < points.length; p++) {
        let currP = createVector(points[p].x % lat_size, points[p].y % lat_size)
        for (let i = 0; i < canva_size+100; i+= lat_size) {
            for (let j = 0; j < canva_size+100; j+= lat_size) {
                if (pattern == 4) {
                    if (i/100 % 2 == 0 && j/100 % 2 == alt) {
                        point(currP.x + i, currP.y + j)
                    }
                    if (i/100 % 2 == 1 && (j/100 % 2) == (alt + 1)) {
                        point(currP.x + i, currP.y + j)
                    }
                }
                else {
                    point(currP.x + i, currP.y + j)
                }
            }
        }
    }
}

function increment() {
    pattern += 1;
    pattern %= 17
    console.log(pattern)
}

function lattice() {
    strokeWeight(5)
    stroke('pink')
    let vectorsCurr = []
    for (let i = 0; i < canva_size; i+= 100) {
        for (let j = 0; j < canva_size; j+= 100) {
            let k = createVector(i, j)
            point(i, j)
            vectorsCurr.push(k)
        }
    }
    return vectorsCurr
}

//use pop and push to store the ACTUAL drawing, and later, the reflection - so that if someone changes the wallpaper pattern, this is ok
