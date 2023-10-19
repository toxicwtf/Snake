const bgame = document.getElementById('Bgame');
const ctx = bgame.getContext('2d');
const upbtn = document.querySelector('.up')
const leftbtn = document.querySelector('.left')
const rightbtn = document.querySelector('.right')
const downbtn = document.querySelector('.down')
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 5;

let tileCount = 20;
let tileSize = bgame.width / tileCount - 2;
let headX = 10;
let headY = 10;

let appleX = 5;
let appleY = 5;

let XVelocity = 0;
let YVelocity = 0;

const snakeParts = [];
let tailLength = 2;
let score = 0;

let eat = new Audio("sound.mp3")
let losing3 = [new Audio("lose.wav"), new Audio("lose2.wav"), new Audio("lose3.wav")]

function drawGame() {
    changeSnakePos();
    let result = isGameOver();
    if (result) {
        return;
    }
    clearScreen();
    checkAppleCollision();
    UpdateSpeed();
    drawSnake();
    drawApple();
    drawscore();
    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let GameOver = false;

    if (YVelocity === 0 && XVelocity === 0) {
        return false;
    }

    if (headX < 0) {
        GameOver = true;
    } else if (headX === tileCount) {
        GameOver = true;
    }
    else if (headY < 0) {
        GameOver = true;
    } else if (headY === tileCount) {
        GameOver = true;
    }

    for (let i = 0; i < snakeParts.length - 1; i++) {
        if (snakeParts[i].x === headX && snakeParts[i].y === headY) {
            GameOver = true;
            break;
        }
    }
    if (GameOver) {
        ctx.fillStyle = 'White'
        ctx.font = "50px verdona";
        ctx.fillText('Game over!', bgame.width / 5, bgame.height / 2)
        const randome = Math.floor(Math.random() * 3)
        losing3[randome].play();
    }
    return GameOver;
}
drawGame();

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, bgame.width, bgame.height);
}

function drawSnake() {
    ctx.fillStyle = 'purple';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }
    ctx.fillStyle = 'deeppink';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        eat.play()
    }
}

function UpdateSpeed() {
    if (score > 4) {
        speed = 6;
    }
    if (score > 10) {
        speed = 7;
    }
}

function drawscore() {
    ctx.fillStyle = 'white'
    ctx.font = '15px cursiv'
    ctx.fillText("score " + score, bgame.width - 80, 30)
}

document.body.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        if (YVelocity === 1)
            return;
        YVelocity = -1;
        XVelocity = 0;
    }
    else if (event.key === 'ArrowDown') {
        if (YVelocity === -1)
            return;
        YVelocity = 1;
        XVelocity = 0;
    }
    else if (event.key === 'ArrowLeft') {
        if (XVelocity === 1)
            return;
        YVelocity = 0;
        XVelocity = -1;
    }
    else if (event.key === 'ArrowRight') {
        if (XVelocity === -1)
            return;
        YVelocity = 0;
        XVelocity = 1;
    }
});

function changeSnakePos() {
    headX += XVelocity;
    headY += YVelocity;
}

upbtn.addEventListener('click', () => {
    if (YVelocity === 1)
        return;
    YVelocity = -1;
    XVelocity = 0;
})
downbtn.addEventListener('click', () => {
    if (XVelocity === 1)
        return;
    YVelocity = 0;
    XVelocity = -1;
})
leftbtn.addEventListener('click', () => {
    if (YVelocity === -1)
        return;
    YVelocity = 1;
    XVelocity = 0;
})
rightbtn.addEventListener('click', () => {
    if (XVelocity === -1)
        return;
    YVelocity = 0;
    XVelocity = 1;
})