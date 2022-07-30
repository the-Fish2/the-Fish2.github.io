const canva_size = 500
const lat_size = 100
var pattern = 11
var vectors = []

//make faster by cutting points already drawn

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
    let changeV = createVector(vec.x % 100, vec.y % 100)
    let changeV2 = createVector(vec.x % 100, vec.y % 100)
    let v1 = createVector(lat_size/2, 0)
    let v2 = createVector(0, lat_size/2)  
    //p1 - nothing
    if (pattern == 1) {
        //p2
        changeV.reflect(v1)
        changeV.reflect(v2)
        points.push(changeV)
    }
    else if (pattern == 2) {
        //pm
        changeV.reflect(v1)
        points.push(changeV)
    }
    else if (pattern == 3) {
        //pg
        changeV.reflect(v2)
        changeV.x += lat_size/2
        points.push(changeV)
    }
    else if (pattern == 4) {
        //cm
        points.push(createVector(changeV.x - lat_size/2, changeV.y - lat_size/2))
        changeV.x = (lat_size/2) - changeV.x
        pushIn(points, changeV)
        points.push(createVector(changeV.x - lat_size/2, changeV.y - lat_size/2))
    }
    else if (pattern == 5) {
        //pmm      
        quads(v1, v2, points, changeV)
    }
    else if (pattern == 6) {
        //pmg
        changeV.x = (lat_size/2) - changeV.x
        pushIn(points, changeV)
        changeV.reflect(v2)
        points.push(createVector(changeV.x+lat_size/2, changeV.y))
        changeV2.reflect(v2)
        points.push(createVector(changeV2.x+lat_size/2, changeV2.y))
    }
    else if (pattern == 7) {
        //pgg
        changeV.x = (lat_size/2) - changeV.x
        changeV.y = (lat_size/2) - changeV.y
        pushIn(points, changeV)
        changeV.reflect(v2)
        changeV.x += lat_size/2
        changeV2.reflect(v2)
        changeV2.x += lat_size/2
        points.push(changeV)
        points.push(changeV2)
    }
    else if (pattern == 8) {
        //cmm
        changeV.x = (lat_size/2) - changeV.x
        changeV.y = (lat_size/2) - changeV.y
        pushIn(points, changeV)
        quads(v1, v2, points, changeV)
        quads(v1, v2, points, changeV2)
    }
    else if (pattern == 9) {
        //p4
        changeV.reflect(v2)
        changeV.reflect(v1)
        pushIn(points, changeV)

        changeV2.reflect(v2)
        //coord swap for rot
        points.push(createVector(changeV.y, changeV.x))
        changeV2.reflect(v2)
        changeV2.reflect(v1)
        points.push(createVector(changeV.y, changeV.x))
    }
    else if (pattern == 10) {
        //p4m
        changeV.reflect(v1.add(v2))
        pushIn(points, changeV)

        quads(v1, v2, points, changeV)
        quads(v1, v2, points, changeV2)         
    }
    else if (pattern == 11) {
        //p4g
        rots(changeV, changeV2, points, lat_size/2)
        //rot coord swap
        let throwaway = changeV.x
        changeV.x = changeV.y
        changeV.y = throwaway
        throwaway = changeV2.x
        changeV2.x = changeV2.y
        changeV2.y = throwaway
        //movement
        changeV.x -= lat_size/2
        changeV2.x -= lat_size/2
        //finish rot
        pushIn(points, changeV2)
        rots(changeV, changeV2, points, lat_size/2)

        //reflec
    }
    else if (pattern == 12) {
        
    }
    
    return points
}

//strangely outsourcing not working :(
//first outsource. life = easier.
function quads(v1, v2, points, changeV) {
    changeV.reflect(v2)
    pushIn(points, changeV)
    changeV.reflect(v1)
    pushIn(points, changeV)
    changeV.reflect(v2)
    pushIn(points, changeV)
}

function rots(changeV, changeV2, points, diff) {
    moveQuad(changeV2, points)

    changeV.x = diff - changeV.x
    pushIn(points, changeV)

    moveQuad(changeV, points)

    changeV.y = diff - changeV.y
    pushIn(points, changeV)

    moveQuad(changeV, points) 

    changeV2.y = diff - changeV2.y
    pushIn(points, changeV2)

    moveQuad(changeV2, points)
}

function moveQuad(changeV, points) {
    changeV.x += lat_size/2
    changeV.y -= lat_size/2
    pushIn(points, changeV)
    changeV.x -= lat_size/2
    changeV.y += lat_size/2

}

function pushIn(points, changeV) {
    points.push(createVector(changeV.x, changeV.y))
}


function duplicate(points) {
    for (let p = 0; p < points.length; p++) {
        let currP = createVector(points[p].x % lat_size, points[p].y % lat_size)
        for (let i = 0; i < canva_size+100; i+= lat_size) {
            for (let j = 0; j < canva_size+100; j+= lat_size) {
                point(currP.x + i, currP.y + j)
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
