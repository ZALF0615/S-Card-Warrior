function setup_title() {
    isSelected = false;
    selected_button = 2;
}

function draw_title() {
    // 타이틀 출력
    imageCenter(title_BG, width / 2, height / 2, width, height);

    textFont(font_galmuri7);

    // 튜토리얼 보기 버튼
    fill(255);
    stroke(0);
    if (selected_button == 1) {
        stroke(getJobSkillColor(6));
        strokeWeight(20);
    } else {
        stroke(0);
        strokeWeight(5);
    }
    rectMode(CENTER);
    rect(width / 2 - 500, height - 450, 370, 100);

    fill(0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('튜토리얼 보기', width / 2 - 500, height - 450);

    // 1인용 모드 버튼
    fill(255);
    stroke(0);
    if (selected_button == 2) {
        stroke(getJobSkillColor(6));
        strokeWeight(20);
    } else {
        stroke(0);
        strokeWeight(5);
    }
    rectMode(CENTER);
    rect(width / 2, height - 450, 300, 100);

    fill(0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('1인용 모드', width / 2, height - 450);

    // 2인용 모드 버튼
    fill(255);
    stroke(0);
    if (selected_button == 3) {
        stroke(getJobSkillColor(6));
        strokeWeight(20);
    } else {
        stroke(0);
        strokeWeight(5);
    }
    rectMode(CENTER);
    rect(width / 2 + 500, height - 450, 300, 100);

    fill(0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('2인용 모드', width / 2 + 500, height - 450);

    
    // 버튼 선택 안내

    fill(0, 220);
    rectMode(CENTER);
    rect(width / 2, height - 15, width, 100);

    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('← A, D → 키로 이동   SPACE 로 결정', width / 2, height - 35);
}

let title_BG;
let selected_button = 2;
let isSelected = false;

function preload_title() {
    // 타이틀 이미지 로드
    title_BG = loadImage('Asset/UI/title.png');
    print_log('Loaded: Asset/UI/title.png');
}

function presskey_title() {
    if (isSelected) { return; }

    if (key == ' ' && selected_button != 0) {
        isSelected = true;
        PlaySEOneShot(selectSE, 0.2);

        if (selected_button == 1) { // 튜토리얼
            ChangeScene('Tutorial');
        } else if (selected_button == 2) { // 1인용 모드
            isCPUmode = true;
            playerNumber = 1;
            ChangeScene('MainGame');
        } else if (selected_button == 3) { // 2인용 모드
            isCPUmode = false;
            playerNumber = 2;
            ChangeScene('MainGame');
        }
    }

    // 좌우 또는 A, D 키로 버튼 선택
    if (keyCode == LEFT_ARROW || key === 'a') {
        selected_button = max(1, selected_button - 1);
        PlaySEOneShot(piSE, 0.2);
    } else if (keyCode == RIGHT_ARROW || key === 'd') {
        selected_button = min(3, selected_button + 1);
        PlaySEOneShot(piSE, 0.2);
    }
}
