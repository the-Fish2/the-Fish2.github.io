const canva_size = 500
const lat_size = 100
var pattern = 12
var vectors = []

function setup() {
    createCanvas(canva_size, canva_size)
    background(250);
    lattice()
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

function patterned(mouseCurr) {
    let points = [mouseCurr]
    let changeVal = (lat_size/2) * sqrt(3)
    let rotPoint = createVector(0, 0)
    let minDist = mouseCurr.x % lat_size
    if (minDist < lat_size/2) {
        rotPoint.x = mouseCurr.x - minDist
    }
    else {
        rotPoint.x = mouseCurr.x + (lat_size - mouseCurr.x % lat_size)
    }
    minDist = mouseCurr.y % changeVal
    if (minDist < changeVal/2) {
        rotPoint.y = minDist - minDist
    }
    else {
        rotPoint.y = mouseCurr.y + (changeVal - mouseCurr.y % changeVal)
    }

    if ((rotPoint.y/changeVal) % 2 == 1) {
        rotPoint.x += lat_size/2
    }

    stroke('purple')
    point(rotPoint.x, rotPoint.y)

    points = rot(rotPoint, 120, mouseCurr, points)
    // let minInd = 1
    // rotPoint = createVector(mouseCurr.x, mouseCurr.y - mouseCurr.y % changeVal)
    // points.push(rotPoint)
    // if (rotPoint)
    if (pattern == 12) {
        

    }
    return points
}

function rot(rotPoint, angle, p, points) {
    let ans = createVector(p.x, p.y)
    angle = angle * 3.14159263/180
    for (let i = 0; i < 2 * 3.14159263; i+= angle) {
        //does it take radians or degs?
        ans.x = cos(i) * (p.x - rotPoint.x) - sin(i) * (p.y - rotPoint.y) + rotPoint.x
        ans.y = sin(i) * (p.x - rotPoint.x) + cos(i) * (p.y - rotPoint.y) + rotPoint.y
        point(ans.x, ans.y)
        points.push(createVector(ans.x, ans.y))
    }

    return points
}

function lattice() {
    strokeWeight(5)
    stroke('pink')
    let i = 0
    let row = 0
    let j = 0
    let k = 0

    while (i <= canva_size) {
        while (j <= canva_size) {
            if (row % 2 == 0) {
                point(j, i)
                k = createVector(j, i)
            }
            else {
                point(j-lat_size/2, i)
                k = createVector(j - lat_size/2, i)
            }
            vectors.push(k)
            j += lat_size
        }
        i+= (lat_size/2) * sqrt(3)
        j = 0
        row += 1
    }
}

function duplicate(points) {
    let changeVal = (lat_size/2) * sqrt(3)
    for (let p = 0; p < points.length; p++) {

        let row = int(points[p].y/changeVal) % 2

        let currP = createVector(p.x, p.y)

        currP.x = (points[p].x % lat_size) - 8 * lat_size + row * lat_size/2

        currP.y = points[p].y % (changeVal) - 2 * changeVal
        
        point(currP.x, currP.y)

        //nums 8 and all reliant on canva size
        while (currP.y <= canva_size+ 8 * changeVal) {

            while (currP.x <= canva_size+2*lat_size) {
                point(currP.x, currP.y)
                currP.x += lat_size
            }

            currP.y += changeVal
            row += 1
            currP.x = points[p].x % lat_size - 8 * lat_size + row * lat_size/2
        }
    }
}
