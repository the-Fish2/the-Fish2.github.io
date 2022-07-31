const canva_size = 500
const lat_size = 100
var pattern = 11
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
            //let points = patterned(mouseCurr)
            duplicate([mouseCurr])
        }
    }
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
    for (let p = 0; p < points.length; p++) {

        let changeVal = (lat_size/2) * sqrt(3)

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
