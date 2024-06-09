

function setup_title() {

}

function draw_title() {
    // 배경 출력
    displayBG();

    // 타이틀 로고
    // imageCenter(title_logo, width / 2, height / 2 - 100);

    // 타이틀 텍스트
    fill(255);
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont(font_galmuri7);
    stroke(0);
    strokeWeight(30);
    text('S-Card\nWarriors', width / 2, height / 2 - 100);


    // 1인용 모드 버튼
    fill(255);
    if (selected_mode == 1) { fill('red'); }
    stroke(0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(width / 2 - 250, height - 200, 300, 100);

    fill(0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('1인용 모드', width / 2 - 250, height - 150 - 50);

    // 2인용 모드 버튼
    fill(255);
    if (selected_mode == 2) { fill('red'); }
    stroke(0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(width / 2 + 250, height - 200, 300, 100);

    fill(0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('2인용 모드', width / 2 + 250, height - 150 - 50);

}

let title_logo;
let selected_mode = 0;

function preload_title() {
    title_logo = loadImage('Asset/UI/title_logo.png');
}

function presskey_title() {
    if (keyCode == ENTER) {
        ChangeScene('MainGame');
    }

    // 좌우 또는 A, D 키로 버튼 선택
    if (keyCode == LEFT_ARROW || keyCode == 65) {
        selected_mode = 1;
    } else if (keyCode == RIGHT_ARROW || keyCode == 68) {
        selected_mode = 2;
    }
}