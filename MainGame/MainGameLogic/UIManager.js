// 화면 상에 UI를 출력하는 함수들을 정의한 파일

function displayPlayerInfo(player1, player2) {

    // 1P
    // 기준점 좌표
    x = 10;
    y = 10;

    // 사각형 너비, 높이 정의
    let rectWidth = 700;
    let rectHeight = 170;

    // 1P배경 사각형 그리기
    image(player_Info_BG, x, y, rectWidth, rectHeight);

    textFont(font_galmuri7);

    // 이름
    fill(0);
    textSize(40);
    textAlign(LEFT, CENTER);
    text(player1.name, x + 70, y + 110);

    // 직업명
    textSize(30);
    text(player1.subtitle, x + 70, y + 60);

    let barwidth = 250;
    let barheight = 60;
    let upperpadding = 35;
    let leftpadding = 380;

    // 체력바 그리기
    image(hp_bar_total_image, x + leftpadding, y + upperpadding, barwidth, barheight);
    if (player1.hp > 0) { image(hp_bar_remain_image, x + leftpadding, y + upperpadding, barwidth * (player1.hp / player1.hpMax), barheight); }


    // 체력 텍스트
    fill(0);
    textSize(30);
    text(`HP : ${player1.hp} / ${player1.hpMax}`, x + 380, y + upperpadding + 85); // 체력 텍스트 출력 

    // 2P (배치 좌우반전, 오른쪽 배열)

    x = width - 710;
    y = 10;

    // 2P배경 사각형 그리기
    image(player_Info_BG, x, y, rectWidth, rectHeight);

    // 이름
    fill(0);
    textSize(40);
    textAlign(RIGHT, CENTER);
    text(player2.name, x + 630, y + 110);

    // 직업명
    textSize(30);
    text(player2.subtitle, x + 630, y + 60);

    // 체력바 그리기
    image(hp_bar_total_image, x + 70, y + upperpadding, barwidth, barheight);
    if (player2.hp > 0) { image(hp_bar_remain_image, x + 70, y + upperpadding, barwidth * (player2.hp / player2.hpMax), barheight); }

    // 체력 텍스트
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(30);
    text(`HP : ${player2.hp} / ${player2.hpMax}`, x + 70, y + upperpadding + 85); // 체력 텍스트 출력

    // vs 아이콘 표시
    imageCenter(vs_icon, width / 2, 105);

}
function displayStatus(player1, player2) {

    if (isGameOver) { return; }

    // 1P
    // 기준점 좌표
    x = 20;
    y = 190;

    // 각 플레이어 스탯
    let player1Stat = [player1.id.slice(0, 6), player1.id.charAt(6), player1.rock, player1.scissors, player1.paper];
    let player2Stat = [player2.id.slice(0, 6), player1.id.charAt(6), player2.rock, player2.scissors, player2.paper];

    rectMode(CORNER);

    // 1P 
    fill(0, 0, 0, 150);
    noStroke();
    rect(x, y, 350, 270);

    textFont(font_galmuri7);
    fill(255);
    textSize(30);
    textAlign(LEFT, CENTER);

    text("GD", x + 70, y + 30);
    text("HP", x + 70, y + 80);
    text("RO", x + 70, y + 130);
    text("SC", x + 70, y + 180);
    text("PA", x + 70, y + 230);

    // 각 항목의 값 출력
    for (let i = 0; i < player1Stat.length; i++) {
        player1Stat[i] = player1Stat[i] == 10 ? "0 (10)" : player1Stat[i];
        text(player1Stat[i], x + 180, y + 30 + 50 * i);
    }

    // 2P
    x = width - 370;
    y = 190;

    // 2P

    fill(0, 0, 0, 150);
    noStroke();
    rect(x, y, 350, 270);

    fill(255);
    textSize(30);
    textAlign(LEFT, CENTER);

    text("GD", x + 70, y + 30);
    text("HP", x + 70, y + 80);
    text("RO", x + 70, y + 130);
    text("SC", x + 70, y + 180);
    text("PA", x + 70, y + 230);

    // 각 항목의 값 출력
    for (let i = 0; i < player2Stat.length; i++) {
        player2Stat[i] = player2Stat[i] == 10 ? "0 (10)" : player2Stat[i];
        text(player2Stat[i], x + 180, y + 30 + 50 * i);
    }
}

let showActions = true;

function displayAction(x, y, playerNum) {

    if (isGameOver) { return; }
    if (!showActions) { return; }

    if ((playerNum == 1 && isSkillAvailable_1p) || (playerNum == -1 && isSkillAvailable_2p)) { // 스킬 사용 가능한 경우
        imageCenter(skillcommnadList[playerNum == 1 ? player1.jobIdx : player2.jobIdx], x, y, 170, 170); // 스킬
    } else {
        tint(255, 100);
        imageCenter(command_skill_BG, x, y, 170, 170); // 스킬

        let ratio = 1 - (playerNum == 1 ? player1.skillPoint / 100.0 : player2.skillPoint / 100.0);

        if (playerNum == 1) {
            let col = getJobSkillColor(player1.jobIdx, true);
            tint(col);

        } else {
            let col = getJobSkillColor(player2.jobIdx, true);
            tint(col);
        }
        imageCenter(command_skill_fill, x, y + 170 * ratio, 170, 170, 0, command_skill_fill.height * ratio);
        tint(255, 100);
        imageCenter(playerNum == 1 ? skillIconList[player1.jobIdx] : skillIconList[player2.jobIdx], x, y, 100, 100);
    }
    tint(255);
    if (playerNum == 1 || (playerNum == 2 && !isCPUmode)) { imageCenter(playerNum == 1 ? input_button_S : input_button_DOWN, x, y + 75); }
    textAlign(CENTER, CENTER);
    textSize(40);

    stroke(0);
    strokeWeight(15);

    imageCenter(command_scissors, x - 135, y + 100); // 가위
    if (playerNum == 1 || (playerNum == 2 && !isCPUmode)) { imageCenter(playerNum == 1 ? input_button_A : input_button_LEFT, x - 135, y + 100 - 75); }

    fill('green');
    text(playerNum == 1 ? player1.scissors : player2.scissors, x - 135 + 50, y + 100 + 30);

    imageCenter(command_rock, x, y - 160); // 바위
    if (playerNum == 1 || (playerNum == 2 && !isCPUmode)) { imageCenter(playerNum == 1 ? input_button_W : input_button_UP, x, y - 160 - 75); }
    fill('red');
    text(playerNum == 1 ? player1.rock : player2.rock, x + 50, y - 160 + 30);

    imageCenter(command_paper, x + 135, y + 100); // 보
    if (playerNum == 1 || (playerNum == 2 && !isCPUmode)) { imageCenter(playerNum == 1 ? input_button_D : input_button_RIGHT, x + 135, y + 100 - 75); }
    fill('blue');
    text(playerNum == 1 ? player1.paper : player2.paper, x + 135 + 50, y + 100 + 30);

    imageCenter(command_arrow_upper_left, x - 135, y - 75, 75, 85); // 왼쪽 위
    imageCenter(command_arrow_upper_right, x + 135, y - 75, 75, 85); // 오른쪽 위
    imageCenter(command_arrow_buttom, x, y + 150, 100, 40); // 아래

    noStroke();

    if (playerNum == 1 ? selectedAction_1p != 0 : selectedAction_2p != 0) {
        imageCenter(command_selected_cover, x, y - 45, command_selected_cover.width * 0.85, command_selected_cover.height * 0.85);
    } else {

        if (playerNum == 1 || (playerNum == -1 && !isCPUmode)) {
            fill(255);
            stroke(0);
            strokeWeight(10);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("낼 손을 선택하세요", x, y - 300);

            noStroke();
        }
    }
}

function displaySelectedAction(playerNum) {

    if (showActions) { // 액션 숨기기
        imageCenter(command_skill_BG, playerNum == 1 ? 630 : width - 630, 380, 130, 130);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(60);
        text("?", playerNum == 1 ? 630 + 5 : width - 630 + 5, 380);
    } else { // 액션 보이기

        if (selectedAction_1p == 4 || selectedAction_2p == 4) {// 누군가가 스킬을 사용한 경우

            textSize(70);
            textAlign(CENTER, CENTER);
            let x = playerNum == 1 ? 630 : width - 630;
            let y = 380;

            stroke(0);
            strokeWeight(10);

            if (selectedAction_1p == 4 && selectedAction_2p == 4) { // 둘 다 스킬을 사용한 경우
                // 비김
                imageCenter(skillcommnadList[playerNum == 1 ? player1.jobIdx : player2.jobIdx], playerNum == 1 ? 630 : width - 630, 380, 130, 130);

                let result_padding = 120;

                fill('gray');
                text("DRAW", x, y - result_padding);

            } else if ((playerNum == 1 && selectedAction_1p) == 4 || (playerNum == -1 && selectedAction_2p) == 4) { // 내가 스킬을 사용한 경우
                imageCenter(skillcommnadList[playerNum == 1 ? player1.jobIdx : player2.jobIdx], playerNum == 1 ? 630 : width - 630, 380, 130, 130);

                let result_padding = 120;

                fill(getJobSkillColor(playerNum == 1 ? player1.jobIdx : player2.jobIdx));
                text('10', playerNum == 1 ? x + 200 : x - 200, y);

                text("WIN", x, y - result_padding);
            } else { // 상대가 스킬을 사용한 경우
                textSize(70);
                textAlign(CENTER, CENTER);
                let x = playerNum == 1 ? 630 : width - 630;
                let y = 380;
                let action = playerNum == 1 ? selectedAction_1p : selectedAction_2p;

                stroke(0);
                strokeWeight(10);

                let result_padding = 120;

                switch (action) {
                    case 1: // 가위
                        imageCenter(command_scissors, x, y, 130, 130);
                    case 2: // 바위
                        imageCenter(command_rock, x, y, 130, 130);
                    case 3: // 보
                        imageCenter(command_paper, x, y, 130, 130);
                }

                fill('gray');
                text("LOSE", x, y - result_padding);

            }


            noStroke();

        } else {
            textSize(70);
            textAlign(CENTER, CENTER);
            let x = playerNum == 1 ? 630 : width - 630;
            let y = 380;
            let action = playerNum == 1 ? selectedAction_1p : selectedAction_2p;

            stroke(0);
            strokeWeight(10);

            let winSide = GetWinSide(selectedAction_1p, selectedAction_2p);
            let result_padding = 120;
            switch (action) {
                case 1: // 가위
                    imageCenter(command_scissors, x, y, 130, 130);
                    fill('green');
                    text(playerNum == 1 ? player1.scissors : player2.scissors, playerNum == 1 ? x + 200 : x - 200, y);

                    if (winSide == playerNum) {

                        fill('green');
                        text("WIN", x, y - result_padding);
                    } else if (winSide == -1 * playerNum) {
                        fill('gray');
                        text("LOSE", x, y - result_padding);
                    } else {
                        fill('gray');
                        text("DRAW", x, y - result_padding);
                    }
                    break;
                case 2: // 바위
                    imageCenter(command_rock, x, y, 130, 130);
                    fill('red');
                    text(playerNum == 1 ? player1.rock : player2.rock, playerNum == 1 ? x + 200 : x - 200, y);
                    if (winSide == playerNum) {
                        fill('red');
                        text("WIN", x, y - result_padding);
                    } else if (winSide == -1 * playerNum) {
                        fill('gray');
                        text("LOSE", x, y - result_padding);
                    } else {
                        fill('gray');
                        text("DRAW", x, y - result_padding);
                    }
                    break;
                case 3: // 보
                    imageCenter(command_paper, x, y, 130, 130);
                    fill('blue');
                    text(playerNum == 1 ? player1.paper : player2.paper, playerNum == 1 ? x + 200 : x - 200, y);
                    if (winSide == playerNum) {
                        fill('blue');
                        text("WIN", x, y - result_padding);
                    }
                    else if (winSide == -1 * playerNum) {
                        fill('gray');
                        text("LOSE", x, y - result_padding);
                    } else {
                        fill('gray');
                        text("DRAW", x, y - result_padding);
                    }
                    break;
                case 4: // 스킬
                    imageCenter(command_skill_BG, x, y, 130, 130);
                    fill(0);
                    textAlign(CENTER, CENTER);
                    textSize(60);
                    text("S", x + 5, y);
                    break;
            }

            // 화면 가운데에 + 표시
            textSize(60);
            textAlign(CENTER, CENTER);
            fill(255);
            stroke(0);
            strokeWeight(10);
            text("+", width / 2, 380);

            noStroke();
        }

    }


}


function displayBG() {
    // 배경 리스트 중 랜덤 배경 출력
    let bg = random(bgList);

    background(255);
    tint(150, 100);
    image(bg, 0, 0, width, height);
    tint(255);

}

function getJobSkillColor(jobIdx, trans = false) {
    // 1: SAGE : green
    // 2: WIZARD : skyblue
    // 3: MECHA_PILOT : gray
    // 4: HEALER : gray
    // 5: BARD : pink
    // 6: EXPLORER : blue
    // 7: DRUID : gray
    // 8: LUCIFER : purple
    // all color alpha 100

    switch (jobIdx) {
        case 1:
            return color(0, 255, 0, trans ? 100 : 255); // green
        case 2:
            return color(0, 255, 255, trans ? 100 : 255); // skyblue
        case 5:
            return color(255, 0, 255, trans ? 100 : 255); // pink
        case 6:
            return color(0, 0, 255, trans ? 100 : 255); // blue
        case 8:
            return color(255, 0, 255, trans ? 100 : 255);  // purple
        default:
            return color(255, 255, 255, trans ? 100 : 255);     // white
    }
}

let skillIconList = [];
let skillcommnadList = [];

let bgList = [];

let player_Info_BG; // 플레이어 정보 배경 이미지
let hp_bar_total_image; // 체력바 이미지
let hp_bar_remain_image; // 체력바 이미지

let vs_icon; // VS 아이콘

let font_galmuri7;

function preload_UI() {

    player_Info_BG = loadImage('Asset/UI/battle_player_info_bg.png');

    hp_bar_total_image = loadImage('Asset/UI/battle_hp_bar_total.png');
    hp_bar_remain_image = loadImage('Asset/UI/battle_hp_bar_remain.png');

    vs_icon = loadImage('Asset/UI/battle_vs_icon.png');

    command_rock = loadImage('Asset/UI/battle_command_rock.png');
    command_scissors = loadImage('Asset/UI/battle_command_scissors.png');
    command_paper = loadImage('Asset/UI/battle_command_paper.png');

    command_arrow_buttom = loadImage('Asset/UI/battle_command_arrow_buttom.png');
    command_arrow_upper_right = loadImage('Asset/UI/battle_command_arrow_upper_right.png');
    command_arrow_upper_left = loadImage('Asset/UI/battle_command_arrow_upper_left.png');

    input_button_A = loadImage('Asset/UI/battle_input_button_A.png');
    input_button_W = loadImage('Asset/UI/battle_input_button_W.png');
    input_button_S = loadImage('Asset/UI/battle_input_button_S.png');
    input_button_D = loadImage('Asset/UI/battle_input_button_D.png');

    input_button_UP = loadImage('Asset/UI/battle_input_button_up.png');
    input_button_DOWN = loadImage('Asset/UI/battle_input_button_down.png');
    input_button_LEFT = loadImage('Asset/UI/battle_input_button_left.png');
    input_button_RIGHT = loadImage('Asset/UI/battle_input_button_right.png');

    command_selected_cover = loadImage('Asset/UI/battle_command_selected_cover.png');

    skill_icon_SAGE = loadImage('Asset/UI/skill_icon_SAGE.png');
    skill_icon_WIZARD = loadImage('Asset/UI/skill_icon_WIZARD.png');
    skill_icon_MECHA_PILOT = loadImage('Asset/UI/skill_icon_MECHA_PILOT.png');
    skill_icon_HEALER = loadImage('Asset/UI/skill_icon_HEALER.png');
    skill_icon_BARD = loadImage('Asset/UI/skill_icon_BARD.png');
    skill_icon_EXPLORER = loadImage('Asset/UI/skill_icon_EXPLORER.png');
    skill_icon_DRUID = loadImage('Asset/UI/skill_icon_DRUID.png');
    skill_icon_LUCIFER = loadImage('Asset/UI/skill_icon_LUCIFER.png');

    skillIconList.push(null);
    skillIconList.push(skill_icon_SAGE);
    skillIconList.push(skill_icon_WIZARD);
    skillIconList.push(skill_icon_MECHA_PILOT);
    skillIconList.push(skill_icon_HEALER);
    skillIconList.push(skill_icon_BARD);
    skillIconList.push(skill_icon_EXPLORER);
    skillIconList.push(skill_icon_DRUID);
    skillIconList.push(skill_icon_LUCIFER);

    command_skill_BG = loadImage('Asset/UI/command_skill_BG.png');
    command_skill_fill = loadImage('Asset/UI/command_skill_fill.png');

    command_skill_SAGE = loadImage('Asset/UI/command_skill_SAGE.png');
    command_skill_WIZARD = loadImage('Asset/UI/command_skill_WIZARD.png');
    command_skill_MECHA_PILOT = loadImage('Asset/UI/command_skill_MECHA_PILOT.png');
    command_skill_HEALER = loadImage('Asset/UI/command_skill_HEALER.png');
    command_skill_BARD = loadImage('Asset/UI/command_skill_BARD.png');
    command_skill_EXPLORER = loadImage('Asset/UI/command_skill_EXPLORER.png');
    command_skill_DRUID = loadImage('Asset/UI/command_skill_DRUID.png');
    command_skill_LUCIFER = loadImage('Asset/UI/command_skill_LUCIFER.png');

    skillcommnadList.push(null);
    skillcommnadList.push(command_skill_SAGE);
    skillcommnadList.push(command_skill_WIZARD);
    skillcommnadList.push(command_skill_MECHA_PILOT);
    skillcommnadList.push(command_skill_HEALER);
    skillcommnadList.push(command_skill_BARD);
    skillcommnadList.push(command_skill_EXPLORER);
    skillcommnadList.push(command_skill_DRUID);
    skillcommnadList.push(command_skill_LUCIFER);

    font_galmuri7 = loadFont('Asset/Font/Galmuri7.ttf');

    bg_1 = loadImage('Asset/BG/IBK_1.png');
    bgList.push(bg_1);
}