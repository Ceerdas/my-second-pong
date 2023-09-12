//shared

const canvas = document.getElementById("squareCanvas");
const ctx = canvas.getContext("2d");
setInterval(main, 16)

//shared by the paddles

var keys = {
    K_w: false,
    K_s: false,
    K_Up: false,
    K_Down: false,
};

var keyDict = {
    'w': 'K_w',
    'a': 'K_a',
    's': 'K_s',
    'd': 'K_d',
    'ArrowUp': 'K_Up',
    'ArrowLeft': 'K_Left',
    'ArrowDown': 'K_Down',
    'ArrowRight': 'K_Right',
};

window.onkeydown = function (e) {
    keys[keyDict[e.key]] = true;
};

window.onkeyup = function (e) {
    keys[keyDict[e.key]] = false;
}

function drawPaddleOne(up_key_name, down_key_name) {
    return {
        x: 0,
        y: 0,
        width: 20,
        height: 100,
        vx: 5,
        vy: 5,
        color: "black",
        draw() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            ctx.fillStyle = this.color;
            ctx.fill();
        },
        update() {
            if (keys[up_key_name]) {
                this.y -= this.vy;
            };
            if (keys[down_key_name]) {
                this.y += this.vy;
            };
        }
    };
};

function drawPaddleTwo(up_key_name, down_key_name) {
    return {
        x: 780,
        y: 0,
        width: 20,
        height: 100,
        vx: 5,
        vy: 5,
        color: "red",
        draw() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.stroke();
            ctx.fill();
        },
        update() {
            if (keys[up_key_name]) {
                this.y -= this.vy;
            };
            if (keys[down_key_name]) {
                this.y += this.vy;
            };
        }
    };
};
var paddleOne = drawPaddleOne('K_w', 'K_s');
var paddleTwo = drawPaddleTwo('K_Up', 'K_Down');

function drawBall() {
    return {
        x: 200,
        y: 100,
        vx: 10,
        vy: 2,
        radius: 8,
        color: "gray",
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.stroke();
        },
        update() {
            ball.x += ball.vx;
            ball.y += ball.vy;
        },
    };
};

var ball = drawBall();

function collision() {
    if (paddleOne.x < ball.x + ball.radius && paddleOne.x + paddleOne.width > ball.x - ball.radius && paddleOne.y < ball.y + ball.radius && paddleOne.y + paddleOne.height > ball.y) {
        ball.vx = -ball.vx;
    };
    if (paddleTwo.x < ball.x + ball.radius && paddleTwo.x + paddleTwo.width > ball.x - ball.radius && paddleTwo.y < ball.y + ball.radius && paddleTwo.y + paddleTwo.height > ball.y) {
        ball.vx = -ball.vx;
    };
};

function canvasCollision() {
    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
    };
};

var homeScore = 0;
var awayScore = 0;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Home Score: ${homeScore}`, 100, 20);
    ctx.fillText(`Away Score: ${awayScore}`, 600, 20);
};

function scoreCount() {
    if (ball.x > canvas.width) {
        homeScore += 1;
    }
    if (ball.x < 0) {
        awayScore += 1;
    }
}
function resetBall() {
    if (ball.x > canvas.width) {
        ball.x = 200;
    }
    if (ball.x < 0) {
        ball.x = 400;
    }
}

function gameOver() {

    if (homeScore === 15) {
        alert("YOU WON, CONGRATULATIONS!");
    }
    if (awayScore === 15) {
        alert("YOU LOST, TRY AGAIN NEXT TIME!");
    };
};

//Draw Phase

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddleOne.update();
    paddleOne.draw();
    paddleTwo.update();
    paddleTwo.draw();
    ball.draw();
    ball.update();
    canvasCollision();
    drawScore();
    scoreCount();
    collision();
    resetBall();
    gameOver();
    // window.requestAnimationFrame(draw);
};