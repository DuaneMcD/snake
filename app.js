const canvas = document.querySelector('.field');
const ctx = canvas.getContext('2d');
let interval = "";
let snake= {
    X: 50,
    Y: 50,
}
let apple = {
    X: 0,
    Y: 0,
}
let score = 0;

document.addEventListener('keydown', function (e) {
    if (interval !== undefined){clearInterval(interval)};
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
    interval = setInterval(function() {
        snakeDirection(arrow);
        drawGame();
    }, 66.666);
    // snakeDirection(arrow);
    // drawGame();
}

function snakeDirection(arrow) {
    switch(arrow) {
    case "left":
        console.log(snake.X, snake.Y);
        return snake.X -= 2;
    case "right":
        console.log(snake.X, snake.Y);
        return snake.X += 2;
    case "up":
        console.log(snake.X, snake.Y);
        return snake.Y -= 2;    
    case "down":
        console.log(snake.X, snake.Y);
        return snake.Y += 2;    
    }
}

function snakeMove() {
    setInterval(function() {
        snakeGothatWay
    }, 250);
}

function randomApple() {
    appleX = Math.floor(Math.random() * canvas.width);
    appleY = Math.floor(Math.random() * canvas.height);
}

function drawGame() {
    ctx.fillStyle = '#f7d13a';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height); 
    ctx.fillStyle = 'green';
    ctx.fillRect(snake.X,snake.Y,5,15); 
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