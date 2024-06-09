

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

    // 튜토리얼 보기 버튼
    fill(255);
    if (selected_button == 1) { fill('red'); }
    stroke(0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(width / 2 - 500, height - 200, 370, 100);

    fill(0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('튜토리얼 보기', width / 2 - 500, height - 150 - 50);

    // 1인용 모드 버튼
    fill(255);
    if (selected_button == 2) { fill('red'); }
    stroke(0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(width / 2, height - 200, 300, 100);

    fill(0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('1인용 모드', width / 2, height - 150 - 50);

    // 2인용 모드 버튼
    fill(255);
    if (selected_button == 3) { fill('red'); }
    stroke(0);
    strokeWeight(5);
    rectMode(CENTER);
    rect(width / 2 + 500, height - 200, 300, 100);

    fill(0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('2인용 모드', width / 2 + 500, height - 150 - 50);

    // 버튼 선택 안내
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('← A, D → 로 이동   SPACE 로 결정', width / 2, height - 50);

}

let title_logo;
let selected_button = 0;

function preload_title() {
    title_logo = loadImage('Asset/UI/title_logo.png');
}

function presskey_title() {
    if ((key == 'Enter' || key == ' ') && selected_button != 0) {
        PlaySEOneShot(selectSE, 0.2);

        if (selected_button == 1) { // 튜토리얼
            ChangeScene('Tutorial');
        } else if (selected_button == 2) { // 1인용 모드
            isCPUmode = true;
            ChangeScene('MainGame');
        } else if (selected_button == 3) { // 2인용 모드
            isCPUmode = false;
            ChangeScene('MainGame');
        }
    }

    // 좌우 또는 A, D 키로 버튼 선택
    if (keyCode == LEFT_ARROW || key == 'a') {
        selected_button = max(1, selected_button - 1);
        PlaySEOneShot(piSE, 0.2);
    } else if (keyCode == RIGHT_ARROW || key == 'd') {
        selected_button = min(3, selected_button + 1);
        PlaySEOneShot(piSE, 0.2);
    }
}