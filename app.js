// snakey snake time
// Deliverables;

// Snake game ends when:
// Snake touches itself
// Snake touches the outside border
// When the game ends, the gameplay should stop and the user should be notified that the game is over

// The snake should grow one length whenever it eats the apple
// The apple should randomly place itself on the board after snake consumes the apple

// The snake should be controlled by the arrow keys on the keyboard
// The game will  show a score of how many apples have been eaten
function init() {
    console.log("snake running");
    const canvas = document.querySelector('.field');
    const canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'green';
    canvasContext.fillRect(60,25,5,15);
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(100,55,5,5);
}
// document.addEventListener(keydown, moveSnake(e));

// function moveSnake() {
//     throw "snakey snake"
// }

// function respawnApple() {

// }

// function killSnake() {

// }

document.addEventListener('DOMContentLoaded', init);