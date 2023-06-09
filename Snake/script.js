let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

let box = 20;
let playGround = 20;

let colors = ["#ff0000aa", "#ff8800aa", "#ffff00aa", "#00ff00aa", "#0000ffaa", "#440099aa", "#ff77ffaa"];


// Snake
let snake = [];
snake[0] = { x: playGround / 2 * box, y: playGround / 2 * box };

// Food
let food = {
    x: Math.floor(Math.random() * playGround) * box,
    y: Math.floor(Math.random() * playGround) * box
};

// Score
let score = 0;

// Direction
let direction;

// Event Listener
document.addEventListener("keydown", directionHandler);

function directionHandler(event) {
    let key = event.keyCode;

    switch (key) {
        case 37:
            if (direction == "LEFT") { return; }
            if (direction != "RIGHT") {
                direction = "LEFT";
            }
            break;
        case 38:
            if (direction == "UP") { return; }
            if (direction != "DOWN") {
                direction = "UP";
            }
            break;
        case 39:
            if (direction == "RIGHT") { return; }
            if (direction != "LEFT") {
                direction = "RIGHT";
            }
            break;
        case 40:
            if (direction == "DOWN") { return; }
            if (direction != "UP") {
                direction = "DOWN";
            }
            break;
    }

    moveSnake();
    draw();
}

// Collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Snake Movement
function moveSnake() {
    // Old Head Position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // New Head Position
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * playGround) * box,
            y: Math.floor(Math.random() * playGround) * box
        }
    } else {
        snake.pop();
    }

    // New Head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Game Over
    if (snakeX < 0 || snakeX > canvas.width - box || snakeY < 0 || snakeY > canvas.height - box || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over");
    }

    snake.unshift(newHead);

    draw();
}

// Draw
function draw() {
    // Background
    ctx.fillStyle = "#011016";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rainbow Snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'white';
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // ! Old Code
    // Snake
    // for (let i = 0; i < snake.length; i++) {
    //     ctx.fillStyle = "white";
    //     ctx.fillRect(snake[i].x, snake[i].y, box, box);
    // }

    // Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);

    // Border
    ctx.strokeStyle = "white";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Direction
    ctx.fillStyle = "white";
    ctx.font = "20px Changa one";
    ctx.fillText(direction, 2 * box, 3 * box);

}

// Game
let game = setInterval(moveSnake, 500);

