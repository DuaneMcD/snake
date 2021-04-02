const tile = 10;
const canvas = document.querySelector('.field');
const ctx = canvas.getContext('2d');
let interval = "";
let head = {
    X: tile * 5,
    Y: tile * 5,
    width: tile,
    height: (tile)/2,
}
let body = 3;
let history = [
    {X:40, Y: 50},
    {X:30, Y: 50},
    {X:20, Y: 50},
]
let apple = {
    X: 0,
    Y: 0,
    width: tile*1.3,
    height: tile,
}
let score = 0;
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
        return head.Y -= tile/2;    
    case "down":
        return head.Y += tile/2;    
    }
}

function randomApple() {
    apple.X = Math.floor(Math.random() * 287);
    apple.Y = Math.floor(Math.random() * 140);
}

function drawGame() {
    ctx.fillStyle = '#f7d13a';
    ctx.fillRect(0,0,tile * 30, (tile/2) * 30); 
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
        ctx.fillRect(history[i].X, history[i].Y, tile * .925 , (tile/2) * .925)
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
    ctx.fillRect(70,30,160,30);

    ctx.font = "italic 21px Unknown Font, sans-serif";
    ctx.strokeStyle = "black";
    ctx.lineWidth = "1.75";
    ctx.textAlign = "center";
    ctx.strokeText("DEAD!!!", 150, 52);
}

function drawPaused() {
    stopInterval();

    ctx.font = "italic 21px Unknown Font, sans-serif";
    ctx.strokeStyle = "black";
    ctx.lineWidth = "1.5";
    ctx.textAlign = "center";
    ctx.strokeText("PAUSED", 150, 52);
}

function collisionWall() {
    if (head.X < 0 || head.X + head.width > 300) {
        return drawDead();
    }else if (head.Y < 0 || head.Y + head.height > 152){
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
    score = 0;
    updateScore();
    clearInterval(interval);
    head.X = 50;
    head.Y = 50;
    body = 3;
    i = 0;
    history = [
        {X:40, Y: 50},
        {X:30, Y: 50},
        {X:20, Y: 50},
    ]
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