const canvas = document.querySelector('.field');
const ctx = canvas.getContext('2d');
let interval = "";
let snake = {
    X: 50,
    Y: 50,
    width: 6,
    height: 5,
}
let body = [
    [45, 50],
    [40, 50],
    [35, 50]
]

let apple = {
    X: 0,
    Y: 0,
    width:8,
    height:5,
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
        moveSnake(arrow);
        drawGame();
    }, 66.666);
}

function moveSnake(arrow) {
    snakeDirection(arrow);
    collision();
    killSnake();
}

function drawGame() {
    ctx.fillStyle = '#f7d13a';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height); 
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.X,apple.Y,apple.width,apple.height);
    drawSnake();
}
 
function drawSnake() {

    ctx.fillStyle = 'blue';
    for(let i = 0; i < body.length; i++) {
        let section = body[i];
        ctx.fillRect(section[0], section[1], 10, 5)
    }

    ctx.fillStyle = 'green';
    ctx.fillRect(snake.X,snake.Y,snake.width,snake.height);
}

function snakeDirection(arrow) {
    switch(arrow) {
    case "left":
        return snake.X -= 5;
    case "right":
        return snake.X += 5;
    case "up":
        return snake.Y -= 5;    
    case "down":
        return snake.Y += 5;    
    }
}
function bodyDirection(arrow) {
    switch(arrow) {
    case "left":
        return snake.X -= 5;
    case "right":
        return snake.X += 5;
    case "up":
        return snake.Y -= 5;    
    case "down":
        return snake.Y += 5;    
    }
}

function collision() {
    if (snake.X + snake.width > apple.X  &&
        snake.X < apple.X + apple.width &&
        snake.Y + snake.height > apple.Y &&
        snake.Y < apple.Y + apple.height 
        ){ eatApple();
    }
}

function eatApple() {
    score ++;
    document.querySelector('.scoreDisplay').textContent = addLeadingZeros(score);
    randomApple();
    console.log("yummy apple")
}

function addLeadingZeros (number) {
    return number < 10 ? '00' + number : (number < 100 ? '0' + number : number);
}

function killSnake() {
    if (snake.X < 0 || snake.X + snake.width > 300) {
        deadSnake();
    }else if (snake.Y < 0 || snake.Y + snake.height > 152){
        deadSnake();
    }
}

function deadSnake() {
    console.log("dead");
    clearInterval(interval);
    snake.X = 50;
    snake.Y = 50;
}

function randomApple() {
    apple.X = Math.floor(Math.random() * canvas.width);
    apple.Y = Math.floor(Math.random() * canvas.height);
}

document.addEventListener('DOMContentLoaded', randomApple);
document.addEventListener('DOMContentLoaded', drawGame);