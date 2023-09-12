//shared

const canvas = document.getElementById("squareCanvas");
const ctx = canvas.getContext("2d");
setInterval(main, 16)

var keys = {
    K_w: false,
    K_a: false,
    K_s: false,
    K_d: false,
    K_Up: false,
    K_Down: false,
    K_Right: false,
    K_Left: false,
};

function draw_square(up_key_name, left_key_name, down_key_name, right_key_name) {
    return {
        x: 0,
        y: 0,
        vx: 1,
        vy: 1,
        draw() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, 100, 100);
            ctx.stroke();
        },
        update() {
            if (keys[up_key_name]) {
                this.y -= this.vy;
            };
            if (keys[down_key_name]) {
                this.y += this.vy;
            };
            if (keys[right_key_name]) {
                this.x += this.vx;
            };
            if (keys[left_key_name]) {
                this.x -= this.vx;
            };
        }
    };
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

var square = draw_square('K_w', 'K_a', 'K_s', 'K_d');
var square2 = draw_square('K_Up', 'K_Left', 'K_Down', 'K_Right');

//Draw Phase

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    square.update();
    square.draw();
    square2.update();
    square2.draw();
    // window.requestAnimationFrame(draw);
};