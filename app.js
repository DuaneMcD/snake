const tile = 20;
const canvas = document.querySelector('#field');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let highscore = 0;

document.addEventListener('keydown', function (e) {
    switch (e.key) {
        case "ArrowLeft":
            stopInterval();
            return input("left");
        case "ArrowUp":
            stopInterval();
            return input("up");
        case "ArrowDown":
            stopInterval();
            return input("down");
        case "ArrowRight":
            stopInterval();
            return input("right");
        case " ":
            stopInterval();
            return drawPaused();
    }
})

let interval = "";
let head = {
    X: (canvas.width/3),
    Y: (canvas.height/3),
    width: tile,
    height: tile,
}
let body = 3;
let history = [
    {X: (head.X - (tile * 1)), Y: head.Y},
    {X: (head.X - (tile * 2)), Y: head.Y},
    {X: (head.X - (tile * 3)), Y: head.Y},
]
let apple = {
    X: 0,
    Y: 0,
    width: 30,
    height: 30,
}
let score = 0;

function stopInterval() {
    if (interval !== undefined){clearInterval(interval)};
}

function input(arrow) {
    interval = setInterval(function() {
        moveSnake(arrow);
        drawGame();
        collisionWall(); 
        collisionTail();
        collisionApple();
    }, 133.333);
}

function moveSnake(arrow) {
    history.unshift({
        X: head.X,
        Y: head.Y
    });
    headDirection(arrow);
}

function headDirection(arrow) {
    switch(arrow) {
    case "left":
        return head.X -= tile;
    case "right":
        return head.X += tile;
    case "up":
        return head.Y -= tile;    
    case "down":
        return head.Y += tile;    
    }
}

function randomApple() {
    apple.X = Math.floor(Math.random() * canvas.width);
    apple.Y = Math.floor(Math.random() * canvas.height);
}

function drawGame() {
    ctx.fillStyle = '#f7d13a';
    ctx.fillRect(0,0, canvas.width, canvas.height); 
    drawHead();
    drawBody();
    drawApple();
}
 
function drawHead() {
    ctx.fillStyle = '#a63ad8';
    ctx.fillRect(head.X,head.Y,head.width,head.height);
}

function drawBody() {
    ctx.fillStyle = '#630191';
    for(let i = 0; i < body; i++) {
        ctx.fillRect((history[i].X +1),( history[i].Y +1), tile * .9 , tile * .9)
    }
    while(history.length > body) {history.pop()}
}

function drawApple() {
    const appleImg = document.getElementById('appleImg');
    ctx.drawImage(appleImg, apple.X, apple.Y, apple.width, apple.height);
}

function drawDead() {
    stopInterval();
    resetGame();

    ctx.fillStyle = 'red';
    ctx.align = "center";
    ctx.fillRect(canvas.width/8, canvas.height/4,canvas.width* (6/8),canvas.height/6);

    ctx.font = "italic 55px Unknown Font, sans-serif";
    ctx.strokeStyle = "black";
    ctx.lineWidth = "3.5";
    ctx.textAlign = "center";
    ctx.strokeText("DEAD!!!", canvas.width/2, canvas.height/2.9);
    ctx.font = "italic 25px Unknown Font, sans-serif";
    ctx.strokeStyle = "black";
    ctx.lineWidth = "1";
    ctx.textAlign = "center";
    ctx.strokeText("Press up/down/right to restart", canvas.width/2, canvas.height/2.55);
}

function drawPaused() {
    stopInterval();

    ctx.font = "italic 62px Unknown Font, sans-serif";
    ctx.strokeStyle = " blue";
    ctx.lineWidth = "2";
    ctx.textAlign = "center";
    ctx.strokeText("PAUSED", canvas.width/2, canvas.height/3);
    ctx.font = "italic 25px Unknown Font, sans-serif";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = "1";
    ctx.textAlign = "center";
    ctx.strokeText("Press Arrowkey to resume", canvas.width/2, canvas.height/2.55);
    ctx.strokeText("don't kill your snake!", canvas.width/2, canvas.height/2.25);
}

function collisionWall() {
    if (head.X < 0 || head.X + head.width > canvas.width) {
        return drawDead();
    }else if (head.Y < 0 || head.Y + head.height > canvas.height){
        return drawDead();
    }
}

function collisionTail() {    
    history.forEach(element => {
        if (head.X + head.width > element.X  &&
            head.X < element.X + (tile * .925) &&
            head.Y + head.height > element.Y &&
            head.Y < element.Y + (tile/2 * .925) 
            ){ 
            return drawDead();
        }
    })
}

function collisionApple() {
    if (head.X + head.width > apple.X  &&
        head.X < apple.X + apple.width &&
        head.Y + head.height > apple.Y &&
        head.Y < apple.Y + apple.height 
        ){ eatApple();
    }
}

function eatApple() {
    body++;
    score ++;
    updateScore();
    randomApple();
    console.log("yummy apple")
}

function updateScore() {
    document.querySelector('.scoreDisplay').textContent = addLeadingZeros(score);
}

function addLeadingZeros (number) {
    return number < 10 ? '00' + number : (number < 100 ? '0' + number : number);
}

function resetGame() {
    updateHighScore();
    reset();
    randomApple();
    updateScore();
}

function reset() {
    interval = "";
    head = {
        X: (canvas.width/3),
        Y: (canvas.height/3),
        width: tile,
        height: tile,
    }
    body = 3;
    history = [
        {X: (head.X - (tile * 1)), Y: head.Y},
        {X: (head.X - (tile * 2)), Y: head.Y},
        {X: (head.X - (tile * 3)), Y: head.Y},
    ]
    score = 0;
}

function updateHighScore() {
    if(score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore);
    }
    loadHighscore();
}

function loadHighscore () {
    if (localStorage.highscore) {
    document.querySelector('.highScoreDisplay').textContent = addLeadingZeros(JSON.parse(localStorage.highscore));
    }
}

document.addEventListener('DOMContentLoaded', randomApple);
document.addEventListener('DOMContentLoaded', drawGame);
document.addEventListener('DOMContentLoaded', loadHighscore);