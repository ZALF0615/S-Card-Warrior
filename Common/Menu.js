function displayMenu() {
    // 검은 반투명 화면
    fill(0, 200);
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height / 2, width, height);

    // 메뉴 버튼
    for (let i = 0; i < buttons.length; i++) {
        let b = buttons[i];

        fill(255);

        stroke(0);
        if (selectedButtonIndex == i) { stroke('blue'); strokeWeight(20); }
        else { stroke(0); strokeWeight(5); }

        rectMode(CENTER);
        rect(b.x, b.y, b.w, b.h);

        fill(0);
        noStroke();
        textSize(50);
        textAlign(CENTER, CENTER);
        text(b.text, b.x, b.y);
    }

    // 버튼 선택 안내
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('↑ W, S ↓ 로 이동   SPACE 로 결정', width / 2, height - 50);

    // 왼쪽 위에 "SHIFT를 눌러 배경음 켜고 끄기" 텍스트 출력
    fill(255);
    textSize(30);
    textAlign(LEFT, TOP);
    text('SHIFT를 눌러 배경음 켜고 끄기', 10, 10);

}

let buttons = [];
let selectedButtonIndex = -1;

function setup_menu() {
    buttons = [
        { x: width / 2, y: height / 2 - 150, w: 600, h: 100, text: '타이틀로 돌아가기', action: () => { isGamePaused = false; ChangeScene('Title'); } },
        { x: width / 2, y: height / 2 + 150, w: 600, h: 100, text: '게임으로 돌아가기', action: () => { isGamePaused = false; } }
    ];
}

function keyPressed_menu() {

    if (selectedButtonIndex == -1) { selectedButtonIndex = 0; }

    if (keyCode === UP_ARROW || key === 'w') {
        selectedButtonIndex = (selectedButtonIndex - 1 + buttons.length) % buttons.length;
        PlaySEOneShot(piSE, 0.2);
    } else if (keyCode === DOWN_ARROW || key === 's') {
        selectedButtonIndex = (selectedButtonIndex + 1) % buttons.length;
        PlaySEOneShot(piSE, 0.2);
    } else if (key === ' ') {
        PlaySEOneShot(selectSE, 0.2);
        buttons[selectedButtonIndex].action();
    }
}
