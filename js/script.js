const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let mas = []
let count = 0
let timer = 0

const startBtn = document.getElementById('start')
const clearBtn = document.getElementById('clear')

canvas.addEventListener('click', function (e) {
    let x = e.offsetX
    let y = e.offsetY
    x = Math.floor(x / 10)
    y = Math.floor(y / 10)
    mas[y][x] = 1
    drawField()
})

function goLife() {
    let n = 60
    let m = 40
    for (let i = 0; i < m; i++) {
        mas[i] = []
        for (let j = 0; j < n; j++) {
            mas[i][j] = 0
        }
    }
}

goLife()

function drawField() {
    ctx.clearRect(0, 0, 600, 400)
    for (let i = 0; i < 40; i++) {

        for (let j = 0; j < 60; j++) {
            if (mas[i][j] == 1) {
                ctx.fillRect(j * 10, i * 10, 10, 10)
            }
        }
    }
}

function startLife() {
    const mas2 = []
    for (let i = 0; i < 40; i++) {
        mas2[i] = []
        for (let j = 0; j < 60; j++) {
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
        return 40
    } else return i
}

function fpp(i) {
    if (i == 39) {
        return -1
    } else return i
}

function pouseLife() {
    clearTimeout(timer)
}

function clearLife() {
    location.reload()
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