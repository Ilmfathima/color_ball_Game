const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 300;

let paddle = { x: 150, y: 250, width: 100, height: 10 };
let balls = [];
let colors = ["red", "blue", "green", "yellow"];
let targetColor = colors[Math.floor(Math.random() * colors.length)];
let score = 0;

document.getElementById("targetColor").textContent = targetColor;
document.getElementById("targetColor").style.background = targetColor;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && paddle.x > 0) {
        paddle.x -= 20;
    } else if (e.key === "ArrowRight" && paddle.x < canvas.width - paddle.width) {
        paddle.x += 20;
    }
});

function createBall() {
    let color = colors[Math.floor(Math.random() * colors.length)];
    let ball = { x: Math.random() * canvas.width, y: 0, radius: 10, color };
    balls.push(ball);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        ball.y += 2; 

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();

        if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            if (ball.color === targetColor) {
                score += 10;
            } else {
                score -= 5;
            }
            balls.splice(i, 1);
            i--;
            document.getElementById("score").textContent = score;
        }

        if (ball.y > canvas.height) {
            balls.splice(i, 1);
            i--;
        }
    }
}

function changeTargetColor() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("targetColor").textContent = targetColor;
    document.getElementById("targetColor").style.background = targetColor;
}

setInterval(createBall, 1000);
setInterval(changeTargetColor, 10000);
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
