const canva_size = 900
const lat_size = 150
var pattern = 16
const groupNames = ["p1", "p2", "pm", "pg", "cm", "pmm", "pmg", "pgg", "cmm", "p4", "p4m", "p4g", "p3", "p3m1", "p31m", "p6", "p6m"]
var currName = groupNames[pattern]

function setup() {
    createCanvas(canva_size, canva_size)
    background(250);
    // lattice1()
    // lattice2()
    strokeWeight(3)
}

function cleared() {
    background(250)
}

function draw() {
    document.getElementById("pattern").innerHTML = pattern;
    document.getElementById("currName").innerHTML = currName;
    if (mouseIsPressed) {
        //issue 1: this is slow
        let mouseCurr = createVector(pmouseX, pmouseY)
        if (pmouseX < canva_size && pmouseY < canva_size && pmouseX > 0 && pmouseY > 0) {
            if (pattern < 12) {
                let points = patterned2(mouseCurr)
                duplicate2(points)
            }
            else {
                let points = patterned(mouseCurr)
                duplicate(points)
            }
            
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
    // let minInd = 1
    // rotPoint = createVector(mouseCurr.x, mouseCurr.y - mouseCurr.y % changeVal)
    // points.push(rotPoint)
    // if (rotPoint)
    if (pattern == 12) {
        let initLeng = points.length
        for (let i = 0; i < initLeng; i++) {
            points = rot(rotPoint, 120, points[i], points)
        }
    }
    else if (pattern == 13) {
        //reflect through vert line at closest point
        let reflVec = createVector(rotPoint.x, 0)
        let newVec = createVector(points[0].x, points[0].y)
        newVec = newVec.reflect(reflVec)
        points.push(newVec)

        let initLeng = points.length
        for (let i = 0; i < initLeng; i++) {
            points = rot(rotPoint, 120, points[i], points)
        }
    
    }
    else if (pattern == 14) {
        let reflVec = createVector(0, rotPoint.y)
        let newVec = createVector(points[0].x, points[0].y)
        newVec = newVec.reflect(reflVec)
        points.push(newVec)

        let initLeng = points.length
        for (let i = 0; i < initLeng; i++) {
            points = rot(rotPoint, 120, points[i], points)
        }
    
    }
    else if (pattern == 15) {

        let initLeng = points.length
        for (let i = 0; i < initLeng; i++) {
            points = rot(rotPoint, 60, points[i], points)
        }
    
    }
    else if (pattern == 16) {
        let reflVec = createVector(rotPoint.x, 0)
        let newVec = createVector(points[0].x, points[0].y)
        newVec = newVec.reflect(reflVec)
        points.push(newVec)

        let initLeng = points.length
        for (let i = 0; i < initLeng; i++) {
            points = rot(rotPoint, 60, points[i], points)
        }
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

function lattice1() {
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
            j += lat_size
        }
        i+= (lat_size/2) * sqrt(3)
        j = 0
        row += 1
    }
}

function lattice2() {
    strokeWeight(5)
    stroke('pink')
    for (let i = 0; i < canva_size; i+= 100) {
        for (let j = 0; j < canva_size; j+= 100) {
            let k = createVector(i, j)
            point(i, j)
        }
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

function increment() {
    pattern += 1;
    pattern %= 17
    currName = groupNames[pattern]
    console.log(pattern)
}



function patterned2(vec) {
    let points = [vec]
    let changeV = createVector(vec.x % lat_size, vec.y % lat_size)
    let changeV2 = createVector(vec.x % lat_size, vec.y % lat_size)
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


function duplicate2(points) {
    for (let p = 0; p < points.length; p++) {
        let currP = createVector(points[p].x % lat_size, points[p].y % lat_size)
        for (let i = 0; i <= canva_size; i+= lat_size) {
            for (let j = 0; j <= canva_size; j+= lat_size) {
                point(currP.x + i, currP.y + j)
            }
        }
    }
}

