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
        vx: 5,
        vy: 5,
        color: "black",
        draw() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, 20, 100);
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
        vx: 5,
        vy: 5,
        color: "red",
        draw() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, 20, 100);
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

function drawBall() {
    return {
        x: 40,
        y: 40,
        vx: 5,
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
        colision() {
            if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
                ball.vy = -ball.vy;
            }
            if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
                ball.vx = -ball.vx;
            }
        }
    };
};

var paddleOne = drawPaddleOne('K_w', 'K_s');
var paddleTwo = drawPaddleTwo('K_Up', 'K_Down');
var ball = drawBall();

//Draw Phase

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddleOne.update();
    paddleOne.draw();
    paddleTwo.update();
    paddleTwo.draw();
    ball.draw();
    ball.update();
    ball.colision();
    // window.requestAnimationFrame(draw);
};