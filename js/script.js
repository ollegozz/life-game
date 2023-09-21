const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let mas = []
let count = 0
let timer = 0

let randArr = []

let cellHoriz = 60 
let cellVert = 40 

const startBtn = document.getElementById('start')
const clearBtn = document.getElementById('clear')
const randomBtn = document.getElementById('random')

const cellHorizInput = document.getElementById('cellHoriz')
const cellVertInput = document.getElementById('cellVert')


randomBtn.addEventListener('click', () => { 
    for (let i = 0; i < cellVert; i++) {        
        randArr[i] = [];        
        for (let j = 0; j < cellHoriz; j++) {            
            randArr[i][j] = Math.floor(Math.random() * 2)             
        }
    } 
    mas = randArr
    clearTimeout(timer)
    startLife()
})

cellHorizInput.addEventListener('change', (e) => {
    cellHoriz = Number(e.target.value)
})
cellVertInput.addEventListener('change', (e) => {
    cellVert = Number(e.target.value)
})

canvas.addEventListener('click', function (e) {
    let x = e.offsetX
    let y = e.offsetY
    x = Math.floor(x / 10)
    y = Math.floor(y / 10)
    mas[y][x] = 1
    drawField()
})

function goLife() {
    for (let i = 0; i < cellVert; i++) {
        mas[i] = []
        for (let j = 0; j < cellHoriz; j++) {
            mas[i][j] = 0
        }
    }
}

goLife()

function drawField() {
    ctx.clearRect(0, 0, cellHoriz * 10, cellVert * 10)
    for (let i = 0; i < cellVert; i++) {

        for (let j = 0; j < cellHoriz; j++) {
            if (mas[i][j] == 1) {
                ctx.fillRect(j * 10, i * 10, 10, 10)
            }
        }
    }
}

function startLife() {
    const mas2 = []
    for (let i = 0; i < cellVert; i++) {
        mas2[i] = []
        for (let j = 0; j < cellHoriz; j++) {
            let neighbors = 0
            if (mas[fpm(i) - 1][j] == 1) neighbors++ //top                
            if (mas[i][fpp(j) + 1] == 1) neighbors++ //right
            if (mas[fpp(i) + 1][j] == 1) neighbors++ //bottom            
            if (mas[i][fpm(j) - 1] == 1) neighbors++ //left
            if (mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++
            if (mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++
            if (mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++
            if (mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++

            if (mas[i][j] == 1 && neighbors > 3) {
                mas2[i][j] = 0
            } else if (mas[i][j] == 1 && neighbors == 3) {
                mas2[i][j] = 1
            } else if (mas[i][j] == 1 && neighbors == 2) {
                mas2[i][j] = 1
            } else if (mas[i][j] == 1 && neighbors == 1) {
                mas2[i][j] = 0
            } else if (mas[i][j] == 0 && neighbors == 3) {
                mas2[i][j] = 1
            } else if (mas[i][j] == 0 && neighbors == 2) {
                mas2[i][j] = 0
            }            
        }
    }

    mas = mas2
    drawField()
    count++
    document.getElementById('count').innerHTML = count
    timer = setTimeout(startLife, 500)
    startBtn.innerText = 'Pause'
}

function fpm(i) {
    if (i == 0) {
        return cellVert
    } else return i
}

function fpp(i) {
    if (i == cellVert - 1) {
        return -1
    } else return i
}

function pouseLife() {
    clearTimeout(timer)
}

function clearLife() {
    location.reload()
}

function randomLife() {
    
}



startBtn.addEventListener('click', () => {
    if (startBtn.textContent === 'Start') {
        startLife()
    } else {
        pouseLife()
        startBtn.innerText = 'Start'
    }
})


clearBtn.addEventListener('click', clearLife)