function imageCenter(img, x, y, w = img.width, h = img.height, sx = 0, sy = 0, sWidth = img.width, sHeight = img.height) {
    image(img, x - w / 2, y - h / 2, w, h, sx, sy, sWidth, sHeight);
}

function imageButtom(img, x, y, mode = CENTER, w = img.width, h = img.height) {
    if (mode == CENTER) {
        image(img, x - img.width / 2, y - img.height, w, h);
    } else if (mode == LEFT) {
        image(img, x, y - img.height, w, h);
    } else if (mode == RIGHT) {
        image(img, x - img.width, y - img.height, w, h);
    }
}

let messages = [];
let isDebugMode = true;

function print_log(msg) {
    console.log(msg);
    // 화면 왼쪽 아래에 메시지 출력(디버깅용)
    // message에 추가 (앞에서부터 추가, 15개 넘어가면 버리고 새로 추가)
    messages.unshift(msg);
    if (messages.length > 15) {
        messages.pop();
    }
}

class FloatUI {
    // 지정된 위치에 나타났다가, 투명도가 낮아지며 위로 떠오르다가 사라지는 UI
    constructor(x, y, msg, r, g, b) {
        this.x = x;
        this.y = y;
        this.msg = msg;
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = 255;
    }

    show() {

        fill(this.r, this.g, this.b, this.alpha);
        noStroke();
        textFont(font_galmuri7);
        textSize(50);
        textAlign(CENTER, CENTER);
        text(this.msg, this.x, this.y);

        this.y -= 1;
        this.alpha -= 2;
    }

    isEnd() {
        return this.alpha <= 0;
    }
}