// Paddle and Ball Elements
const playerPaddle = document.getElementById('player-paddle');
const opponentPaddle = document.getElementById('opponent-paddle');
const ball = document.getElementById('ball');

// Game Container Dimensions
const gameContainerWidth = 600;
const gameContainerHeight = 400;

// Paddle Dimensions and Movement Speed
const paddleWidth = 10;
const paddleHeight = 60;
const paddleSpeed = 4;

// Ball Dimensions and Movement Speed
const ballSize = 10;
const ballSpeed = 3;
let ballX = gameContainerWidth / 2 - ballSize / 2;
let ballY = gameContainerHeight / 2 - ballSize / 2;
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

// Player Paddle Position
let playerPaddleY = gameContainerHeight / 2 - paddleHeight / 2;

// Opponent Paddle Position
let opponentPaddleY = gameContainerHeight / 2 - paddleHeight / 2;

// Player Score
let playerScore = 0;

// Game State
let isGameRunning = false;

// Update Player Paddle Position
function updatePlayerPaddle() {
  playerPaddle.style.top = playerPaddleY + 'px';
}

// Update Opponent Paddle Position
function updateOpponentPaddle() {
  opponentPaddle.style.top = opponentPaddleY + 'px';
}

// Move Player Paddle Up
function movePlayerPaddleUp() {
  if (playerPaddleY > 0) {
    playerPaddleY -= paddleSpeed;
    updatePlayerPaddle();
  }
}

// Move Player Paddle Down
function movePlayerPaddleDown() {
  if (playerPaddleY < gameContainerHeight - paddleHeight) {
    playerPaddleY += paddleSpeed;
    updatePlayerPaddle();
  }
}

// Update Ball Position
function updateBall() {
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

// Move Ball
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball and Paddle Collision Detection
  if (
    ballX <= paddleWidth &&
    ballY + ballSize >= playerPaddleY &&
    ballY <= playerPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  } else if (
    ballX + ballSize >= gameContainerWidth - paddleWidth &&
    ballY + ballSize >= opponentPaddleY &&
    ballY <= opponentPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball and Wall Collision Detection
  if (ballY <= 0 || ballY + ballSize >= gameContainerHeight) {
    ballSpeedY = -ballSpeedY;
  }

  // Player Score Update
  if (ballX <= 0) {
    playerScore++;
    document.getElementById('score-value').textContent = playerScore;
    resetBall();
  }

  // Opponent Paddle AI
  if (ballX > gameContainerWidth / 2 && ballSpeedX > 0) {
    if (opponentPaddleY + paddleHeight / 2 < ballY + ballSize / 2) {
      moveOpponentPaddleDown();
    } else if (opponentPaddleY + paddleHeight / 2 > ballY + ballSize / 2) {
      moveOpponentPaddleUp();
    }
  }

  updateBall();
}

// Reset Ball Position
function resetBall() {
  ballX = gameContainerWidth / 2 - ballSize / 2;
  ballY = gameContainerHeight / 2 - ballSize / 2;
  ballSpeedX = ballSpeed;
  ballSpeedY = ballSpeed;
}

// Move Opponent Paddle Up
function moveOpponentPaddleUp() {
  if (opponentPaddleY > 0) {
    opponentPaddleY -= paddleSpeed;
    updateOpponentPaddle();
  }
}

// Move Opponent Paddle Down
function moveOpponentPaddleDown() {
  if (opponentPaddleY < gameContainerHeight - paddleHeight) {
    opponentPaddleY += paddleSpeed;
    updateOpponentPaddle();
  }
}

// Event Listeners for Player Paddle Movement
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp') {
    movePlayerPaddleUp();
  } else if (event.key === 'ArrowDown') {
    movePlayerPaddleDown();
  }
});

// Start Game Function
function startGame() {
  isGameRunning = true;
  document.getElementById('start-button').style.display = 'none';
  document.getElementById('restart-button').style.display = 'block';
  resetBall();
  gameLoop();
}

// Restart Game Function
function restartGame() {
  playerScore = 0;
  document.getElementById('score-value').textContent = playerScore;
  resetBall();
  gameLoop();
}

// Start Button Event Listener
document.getElementById('start-button').addEventListener('click', startGame);

// Restart Button Event Listener
document.getElementById('restart-button').addEventListener('click', restartGame);

// Game Loop
function gameLoop() {
  if (isGameRunning) {
    moveBall();
    requestAnimationFrame(gameLoop);
  }
}

// Call the functions to update the paddle positions initially
updatePlayerPaddle();
updateOpponentPaddle();
