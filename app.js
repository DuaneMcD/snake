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
        moveSnake(arrow);
        drawGame();
    }, 66.666);
}

function moveSnake(arrow) {
    snakeDirection(arrow);
    killSnake();
    eatApple();
}

function killSnake() {
    if (snake.X < 0 | snake.X > 295) {
        deadSnake();
    }else if (snake.Y < 0 | snake.Y > 137){
        deadSnake();
    }
}

function deadSnake() {
    console.log("dead");
    clearInterval(interval);
    snake.X = 50;
    snake.Y = 50;
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

function randomApple() {
    apple.X = Math.floor(Math.random() * canvas.width);
    apple.Y = Math.floor(Math.random() * canvas.height);
}

function drawGame() {
    ctx.fillStyle = '#f7d13a';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height); 
    ctx.fillStyle = 'green';
    ctx.fillRect(snake.X,snake.Y,5,15); 
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.X,apple.Y,5,5);
}

function eatApple() {
    if ((snake.X >= apple || snake.X <= apple + apple.width) && (snake.Y >= apple || snake.Y <= apple + apple.height)) {
    score ++;
    document.querySelector('.scoreDisplay').textContent = addLeadingZeros(score);
    randomApple();
    console.log("yummy apple")
    }
}

const addLeadingZeros = (number) => {
    return number < 10 ? '00' + number : (number < 100 ? '0' + number : number);
};

document.addEventListener('DOMContentLoaded', randomApple);
document.addEventListener('DOMContentLoaded', drawGame);