document.addEventListener("DOMContentLoaded", function() {
// Set up the canvas and other variables
const canvas = document.getElementById("snakecanvas");
const context = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const snakeSize = 20;
const foodSize = 20;
const faceSize = 20;

let snakeX = 0;
let snakeY = 0;
let snakeSpeedX = snakeSize;
let snakeSpeedY = 0;

let foodX = 0;
let foodY = 0;

let score = 0;
let topScore = 0;
let tail = [];

let isGameOver = false;

// Generate random position for food
function generateFood() {
  const maxX = canvasWidth / foodSize;
  const maxY = canvasHeight / foodSize;
  foodX = Math.floor(Math.random() * maxX) * foodSize;
  foodY = Math.floor(Math.random() * maxY) * foodSize;

  // Check if the food is generated on the snake's body
  for (let i = 0; i < tail.length; i++) {
    if (foodX === tail[i].x && foodY === tail[i].y) {
      generateFood(); // Regenerate the food
      return;
    }
  }
}

// Check for collision with food
function checkCollision() {
  for (let i = 0; i < tail.length; i++) {
    if (snakeX === tail[i].x && snakeY === tail[i].y) {
      isGameOver = true;
      return;
    }
  }
}

// Handle keydown event for arrow key controls
document.addEventListener("keydown", function (event) {
  const key = event.keyCode;
  if (!isGameOver) {
    if (key === 37 && snakeSpeedX !== snakeSize) {
      // Left arrow key
      snakeSpeedX = -snakeSize;
      snakeSpeedY = 0;
    } else if (key === 38 && snakeSpeedY !== snakeSize) {
      // Up arrow key
      snakeSpeedX = 0;
      snakeSpeedY = -snakeSize;
    } else if (key === 39 && snakeSpeedX !== -snakeSize) {
      // Right arrow key
      snakeSpeedX = snakeSize;
      snakeSpeedY = 0;
    } else if (key === 40 && snakeSpeedY !== -snakeSize) {
      // Down arrow key
      snakeSpeedX = 0;
      snakeSpeedY = snakeSize;
    }
  } else if (key === 13) {
    // Enter key to restart the game
    restartGame();
  }
});

// Restart the game
function restartGame() {
  if (score > topScore) {
    topScore = score;
  }
  snakeX = 0;
  snakeY = 0;
  snakeSpeedX = snakeSize;
  snakeSpeedY = 0;
  score = 0;
  tail = [];
  isGameOver = false;
  generateFood();
}

// Game loop
function gameLoop() {
  setTimeout(function () {
    // Clear the canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Move the snake
    snakeX += snakeSpeedX;
    snakeY += snakeSpeedY;

    // Wrap snake around the canvas
    if (snakeX < 0) snakeX = canvasWidth - snakeSize;
    if (snakeX >= canvasWidth) snakeX = 0;
    if (snakeY < 0) snakeY = canvasHeight - snakeSize;
    if (snakeY >= canvasHeight) snakeY = 0;

    // Check for collision with food
    if (snakeX === foodX && snakeY === foodY) {
      // Check if the food is on the snake's body
      for (let i = 0; i < tail.length; i++) {
        if (snakeX === tail[i].x && snakeY === tail[i].y) {
          isGameOver = true;
          return;
        }
      }

      score++;
      generateFood();

      // Increase the snake's length
      tail.push({ x: snakeX, y: snakeY });
    }

// Check for collision with snake's body
function checkCollision() {
  for (let i = 0; i < tail.length; i++) {
    if (snakeX === tail[i].x && snakeY === tail[i].y) {
      isGameOver = true;
      return;
    }
  }
}

    // Draw the snake's body
    context.fillStyle = "green";
    for (let i = 0; i < tail.length; i++) {
      context.fillRect(tail[i].x, tail[i].y, snakeSize, snakeSize);
    }

    // Draw the snake's head with a face
    context.fillStyle = "darkgreen";
    context.fillRect(snakeX, snakeY, snakeSize, snakeSize);
    context.fillStyle = "white";
    context.fillRect(
      snakeX + snakeSize / 4,
      snakeY + snakeSize / 4,
      faceSize,
      faceSize
    );
    context.fillStyle = "black";
    context.fillRect(
      snakeX + snakeSize / 2 - faceSize / 2,
      snakeY + snakeSize / 2 - faceSize / 2,
      faceSize / 2,
      faceSize / 2
    );

    // Draw the food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, foodSize, foodSize);

    // Display the score and top score
    context.fillStyle = "black";
    context.font = "16px Arial";
    context.fillText("Score: " + score, 10, 20);
    context.fillText("Top Score: " + topScore, 10, 40);

    if (isGameOver) {
      // Display game over message
      context.fillStyle = "black";
      context.font = "30px Arial";
      context.fillText("Game Over", canvasWidth / 2 - 80, canvasHeight / 2);
      context.fillText(
        "Press Enter to Restart",
        canvasWidth / 2 - 130,
        canvasHeight / 2 + 30
      );
    } else {
      // Update the snake's tail
      tail.unshift({ x: snakeX, y: snakeY });
      if (tail.length > score) {
        tail.pop();
      }

      // Call the game loop again
      gameLoop();
    }
  }, 1000 / 10); // Frame delay: 1000ms / 10fps = 100ms
}

// Start the game
generateFood();
gameLoop();

});