const canvas = document.querySelector('.field');
const ctx = canvas.getContext('2d');
let snakeX = 50;
let snakeY = 50;
let snakeRight = 5;
let snakeLeft = -5;
let snakeUp = -5;
let snakeDown = 5;
let appleX = 0;
let appleY = 0;
let score = 0;

document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case "ArrowLeft":
            return input("left");
        case "ArrowUp":
            return input("up");
        case "ArrowDown":
            return input("down");
        case "ArrowRight":
            return input("right");
    }
})

function input(arrow) {
    setInterval(function() {
        snakeMove(arrow);
        drawGame();
    }, 133.333);
}

function snakeMove(arrow) {
    snakeX = snakeX;
    snakeY = snakeY;
    switch(arrow) {
    case "left":
        return snakeX = snakeLeft;
    case "right":
        return snakeX = snakeRight;
    case "up":
        return snakeY = snakeUp;    
    case "down":
        return snakeY = snakeDown;    
    }
}

function randomApple() {
    appleX = Math.floor(Math.random() * canvas.width);
    appleY = Math.floor(Math.random() * canvas.height);
}

function drawGame() {
    ctx.fillStyle = '#f7d13a';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height); 
    ctx.fillStyle = 'green';
    ctx.fillRect(snakeX , snakeY,5,15); 
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX,appleY,5,5);
}

function eatApple() {
    score ++;
    document.querySelector('.scoreDisplay').textContent = addLeadingZeros(score);
    randomApple();
}

const addLeadingZeros = (number) => {
    return number < 10 ? '00' + number : (number < 100 ? '0' + number : number);
};

document.addEventListener('DOMContentLoaded', randomApple);
document.addEventListener('DOMContentLoaded', drawGame);