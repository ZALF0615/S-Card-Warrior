let isGameStart = false;

let player1, player2;
let turn;  // 1P의 턴인지 2P의 턴인지 구분 (1 : 1P, -1 : 2P)

let actionSelected_1P = -1, actionSelected_2P = -1;  // 1P, 2P의 행동 선택

let actionset_1p = [];  // 1P의 액션 선택
let actionset_2p = [];  // 2P의 액션 선택

let currenthp_1P, currenthp_2P;
let charaImg_1p, charaImg_2p;

let animation_done_1P, animation_done_2P = false;


function displayPlayerInfo() {

    // 1P
    // 기준점 좌표
    x = 10;
    y = 10;

    // 사각형 너비, 높이 정의
    let rectWidth = 700;
    let rectHeight = 170;

    // 1P배경 사각형 그리기
    image(player_Info_BG, x, y, rectWidth, rectHeight);

    // 이름
    fill(0);
    textSize(40);
    textAlign(LEFT, CENTER);
    text(player1.name, x + 70, y + 110);

    // 직업명
    textSize(30);
    text("고대의 현자", x + 70, y + 60);

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
    text("고대의 현자", x + 630, y + 60);

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
function displayStatus() {
    // 화면 가운데에 캐릭터 스테이터스 출력
    // 5개의 네모를 띄움
    // 1번 사각형 : 플레이어 1의 학년 | "GD" | 플레이어 2의 학년
    // 2번 사각형 : 플레이어 1의 공격력 | "AT" | 플레이어 2의 공격력
    // 3번 사각형 : 플레이어 1의 방어력 | "DF" | 플레이어 2의 방어력
    // 4번 사각형 : 플레이어 1의 체력 | "HP" | 플레이어 2의 체력
    // 5번 사각형 : 플레이어 1의 스킬턴 | "SK" | 플레이어 2의 스킬턴

    let x = width / 2;
    let y = height / 2;
    let rectWidth = 300;
    let rectHeight = 50;

    let player1Stat = [player1.id.slice(0, 6), player1.attack, player1.defense, player1.id.charAt(8), player1.skillTurnMax];
    let player2Stat = [player2.id.slice(0, 6), player2.attack, player2.defense, player1.id.charAt(8), player2.skillTurnMax];

    for (let i = 0; i < 5; i++) {
        fill(255);
        stroke(0);
        rectMode(CENTER);

        rect(x, y + i * 60, rectWidth, rectHeight);

        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(`${player1Stat[i]}`, x - 80, y + i * 60);
        text(`${player2Stat[i]}`, x + 80, y + i * 60);

        textSize(30);

        switch (i) {
            case 0:
                text("GD", x, y + i * 60);
                break;
            case 1:
                text("AT", x, y + i * 60);
                break;
            case 2:
                text("DF", x, y + i * 60);
                break;
            case 3:
                text("HP", x, y + i * 60);
                break;
            case 4:
                text("SK", x, y + i * 60);
                break;
        }
    }
}

function displayaction() {
    if (!isGameStart) return;

    let x1 = width / 4;
    let x2 = width / 4 * 3;
    let y = height - 80;

    let rectWidth = 280;
    let rectHeight = 60;

    let padding = 260;

    // 1P의 액션 선택지 출력

    // 인풋 버튼 UI 출력
    imageCenter(input_button_BG_1P, x1, y - 30);

    fill(0);
    textSize(25);
    textAlign(CENTER, LEFT);

    // 왼쪽 액션 선택지 (공격시 : 필살, 수비시 : 카운터)
    imageCenter(turn == 1 ? action_SPECIAL_1P : action_COUNTER_1P, x1 - padding, y, rectWidth, rectHeight);
    let left_text = turn == 1 ? `필살기 (+${player1.attack + 2})` : `카운터 (반사)`;
    text(left_text, x1 - padding, y - 4);

    // 위 액션 선택지 (특수 스킬)
    imageCenter(action_DEFAULT, x1, y - 120, rectWidth, rectHeight);
    text("스킬", x1, y - 120 - 4);

    // 오른쪽 액션 선택지 (공격시 : 공격, 수비시 : 막기)
    imageCenter(turn == 1 ? action_ATTACK_1P : action_BLOCK_1P, x1 + padding + 20, y, rectWidth, rectHeight);
    let right_text = turn == 1 ? `공격 (+${player1.attack})` : `막기 (-${player1.defense})`;
    text(right_text, x1 + padding, y - 4);

    // 2P의 액션 선택지 출력

    // 인풋 버튼 UI 출력
    imageCenter(input_button_BG_2P, x2, y - 30);

    fill(0);
    textSize(25);
    textAlign(CENTER, LEFT);

    // 왼쪽 액션 선택지 (공격시 : 공격, 수비시 : 막기)
    imageCenter(turn == -1 ? action_ATTACK_2P : action_BLOCK_2P, x2 - padding, y, rectWidth, rectHeight);
    left_text = turn == -1 ? `공격 (+${player2.attack})` : `막기 (-${player2.defense})`;
    text(left_text, x2 - padding, y - 4);

    // 위 액션 선택지 (특수 스킬)
    imageCenter(action_DEFAULT, x2, y - 120, rectWidth, rectHeight);
    text("스킬", x2, y - 120 - 4);

    // 오른쪽 액션 선택지 (공격시 : 필살, 수비시 : 카운터)
    imageCenter(turn == -1 ? action_SPECIAL_2P : action_COUNTER_2P, x2 + padding + 20, y, rectWidth, rectHeight);
    right_text = turn == -1 ? `필살기 (+${player2.attack + 2})` : `카운터 (반사)`;
    text(right_text, x2 + padding + 20, y - 4);

    // 커맨드 선택 완료 시
    // 1P 선택 완료, 2P 선택 미완료 시
    if (actionSelected_1P != -1 && actionSelected_2P == -1) {
        fill(0, 0, 0, 200);
        noStroke();
        rectMode(CORNER)
        rect(0, height - 260, width / 2, 260);

        fill(255);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("액션 선택 완료", width / 4, height - 130);
    }

    // 2P 선택 완료, 1P 선택 미완료 시
    if (actionSelected_2P != -1 && actionSelected_1P == -1) {
        fill(0, 0, 0, 200);
        noStroke();
        rectMode(CORNER)
        rect(width / 2, height - 260, width / 2, 260);

        fill(255);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("액션 선택 완료", width / 4 * 3, height - 130);
    }

}

function displaySelectedaction() {
    // 선택된 액션를 화면에 출력
    // 1P의 액션는 왼쪽, 2P의 액션는 오른쪽에 출력

    let x1 = width / 2 - action_DEFAULT.width / 2;
    let x2 = width / 2 + action_DEFAULT.width / 2;

    let y = 350;

    // 1P의 선택된 액션 출력
    if (actionSelected_1P != -1 && actionSelected_2P == -1) {
        imageCenter(action_DEFAULT, x1, y);
        textSize(30);
        fill(0);
        textAlign(CENTER, CENTER);
        text("???", x1, y);
    }

    // 2P의 선택된 액션 출력
    if (actionSelected_2P != -1 && actionSelected_1P == -1) {
        imageCenter(action_DEFAULT, x2, y);
        textSize(30);
        fill(0);
        textAlign(CENTER, CENTER);
        text("???", x2, y);
    }

    // 둘다 선택한 후

    if (actionSelected_1P != -1 && actionSelected_2P != -1) {
        imageCenter(getActionImage(actionset_1p[actionSelected_1P], 1), x1, y);
        imageCenter(getActionImage(actionset_2p[actionSelected_2P], 2), x2, y);
        textSize(30);
        fill(0);
        textAlign(CENTER, CENTER);
        text(actionset_1p[actionSelected_1P], x1, y);
        text(actionset_2p[actionSelected_2P], x2, y);
    }

}

function drawCharacters() {
    // 플레이어 1, 2의 캐릭터를 화면에 그림
    // 플레이어 1은 왼쪽, 플레이어 2는 오른쪽에 위치
    // 플레이어 1은 오른쪽을 바라보고, 플레이어 2는 왼쪽을 바라봄

    let x1 = 460;
    let x2 = width - 460;

    let y = height / 2 + 270;

    // 플레이어 1
    imageButtom(charaImg_1p, x1, y, LEFT);

    // 플레이어 2 (좌우반전)
    push();
    translate(x2, y);
    scale(-1, 1);
    imageButtom(charaImg_2p, 0, 0, LEFT);
    pop();

}

function GameStart() {
    // 게임 시작
    // 플레이어 1, 2의 체력을 초기화
    player1.hp = player1.hpMax;
    player2.hp = player2.hpMax;

    // 플레이어 1, 2의 스킬턴을 초기화
    player1.skillTurn = player1.skillTurnMax;
    player2.skillTurn = player2.skillTurnMax;

    currenthp_1P = player1.hp;
    currenthp_2P = player2.hp;

    // 학년이 높은 쪽이 선공(공격측)
    if (player1.grage > player2.grade) { turn = 1; }
    else if (player1.grade < player2.grade) { turn = -1; }
    else {
        // 학년이 같으면 핸덤하게 선공 결정 (1 또는 -1)
        turn = random([-1, 1]);
    }

    turn *= -1;
    TurnTaker();

    print(`선공 : ${turn}`)
    isGameStart = true;
}

function displayTurn() {
    // 턴을 화면에 출력 (1P의 턴인지 2P의 턴인지)
    // 1P일 경우 화면 왼쪽 밑에 "공격측", 오른 쪽 밑에 "수비측" 출력
    // 2P일 경우 화면 왼쪽 밑에 "수비측", 오른 쪽 밑에 "공격측" 출력

    let x1 = 150;
    let x2 = width - 150;
    let y = height - 400;

    fill(255);
    stroke(0);

    if (turn == 1) {

        // 1P 위치에 공격측, 2P 위치에 수비측 출력
        imageCenter(turn_ATTACK_icon, x1, y);
        imageCenter(turn_DEFENSE_icon, x2, y);

    } else {
        // 1P 위치에 수비측, 2P 위치에 공격측 출력
        imageCenter(turn_DEFENSE_icon, x1, y);
        imageCenter(turn_ATTACK_icon, x2, y);
    }
}

function Processaction() {
    // 액션 처리
    // 플레이어 1, 2의 액션를 확인하고, 각 액션에 따라 플레이어 1, 2의 상태를 변경
    // 공격 - 방어 : 방어 성공. 공격력 - 방어력 만큼의 데미지.
    // 공격 - 카운터 : 공격 성공. 공격력 만큼의 데미지.
    // 필살 - 방어 : 필살 성공. 공격력 +2 만큼의 데미지.
    // 필살 - 카운터 : 카운터 성공. 상대 공격력 +2 만큼 반사.

    // 플레이어 1, 2의 액션를 확인
    // 액션가 선택되지 않았을 경우 함수 종료

    if (actionSelected_1P == -1 || actionSelected_2P == -1 || prosessingaction) {
        return;
    }

    print('process action');

    let action_1P = actionset_1p[actionSelected_1P];
    print(`action_1P : ${action_1P}`);

    let action_2P = actionset_2p[actionSelected_2P];
    print(`action_2P : ${action_2P}`);

    let attacker_action = turn == 1 ? action_1P : action_2P;
    let defender_action = turn == 1 ? action_2P : action_1P;

    setTimeout(() => {
        // 플레이어 1, 2의 액션에 따라 상태 변경
        if (attacker_action == "공격" && defender_action == "막기") {
            AttackVSBlock(turn);
        } else if (attacker_action == "공격" && defender_action == "카운터") {
            AttackVSCounter(turn);
        } else if (attacker_action == "필살기" && defender_action == "막기") {
            SpecialVSBlock(turn);
        } else if (attacker_action == "필살기" && defender_action == "카운터") {
            SpecialVSCounter(turn);
        }
    }, 1000);
}

// 액션 결과 처리

function AttackVSCounter(playerNum) {
    // 공격 성공 (공격 - 카운터)
    // playerNum : 1 or 2
    print(`AttackVSCounter : ` + playerNum);
    let attack = playerNum == 1 ? player1.attack : player2.attack;

    let attack_duration = 3000;

    // 데미지 이펙트  (수행자 : 공격, 대상 : 데미지)
    Effect(playerNum, 3, attack_duration);
    setTimeout(() => {
        // 데미지 이펙트
        Effect(-1 * playerNum, 2, 1000, attack);
        if (playerNum == 1) {
            player2.hp = max(0, player2.hp - attack);
        } else {
            player1.hp = max(0, player1.hp - attack);
        }
    }, attack_duration);


}
function AttackVSBlock(playerNum) {
    // 공격 실패 (공격 - 막기)
    // 공격력 - 방어력 만큼의 데미지
    // playerNum : 1 or 2
    print(`AttackVSBlock : ` + playerNum);
    let attack = playerNum == 1 ? player1.attack : player2.attack;
    let defense = playerNum == 1 ? player2.defense : player1.defense;

    let damage = max(0, attack - defense);

    let attack_duration = 3000;

    // 공격 이펙트
    Effect(playerNum, 3, attack_duration);
    Effect(-1 * playerNum, 4, 4000);

    setTimeout(() => {
        // 데미지 이펙트
        Effect(-1 * playerNum, 2, 1000, damage);
        if (playerNum == 1) {
            player2.hp = max(0, player2.hp - damage);
        }
        else {
            player1.hp = max(0, player1.hp - damage);
        }
    }, attack_duration);
}
function SpecialVSCounter(playerNum) {
    // 필살기 실패 (필살기 - 카운터)
    // 카운터 성공. 상대 공격력 +2 만큼 반사
    // playerNum : 1 or 2
    print(`SpecialVSCounter : ` + playerNum);
    let attack = playerNum == 1 ? player1.attack : player2.attack;

    let damage = max(0, attack + 2);

    let special_duration = 4000;
    let counter_duration = 4000;

    // 플레이어 공격 ->  상대 카운터 -> 플레이어 데미지

    Effect(playerNum, 6, special_duration);  // 필살기 이펙트
    Effect(-1 * playerNum, 5, counter_duration);  // 카운터 이펙트

    setTimeout(() => {
        Effect(playerNum, 2, 1000, damage); // 데미지 이펙트
        if (playerNum == 1) {
            player1.hp = max(0, player1.hp - damage);
        }
        else {
            player2.hp = max(0, player2.hp - damage);
        }
    }, counter_duration);

}
function SpecialVSBlock(playerNum) {
    // 필살기 성공 (필살기 - 막기)
    // 공격력 +2 만큼의 데미지
    // playerNum : 1 or 2
    print(`SpecialVSBlock : ` + playerNum);
    let attack = playerNum == 1 ? player1.attack : player2.attack;

    let damage = max(0, attack + 2);

    let special_duration = 4000;

    Effect(playerNum, 6, special_duration);  // 필살기 이펙트
    setTimeout(() => {
        // 데미지 이펙트
        Effect(-1 * playerNum, 2, 1000, damage);
        if (playerNum == 1) {
            player2.hp = max(0, player2.hp - damage);
        }
        else {
            player1.hp = max(0, player1.hp - damage);
        }
    }, special_duration);

    print(`필살기 성공 : ${damage} 데미지`);
}

function getActionImage(action, playerNum) {
    // 액션에 따른 이미지를 반환
    // action : "공격", "막기", "카운터", "필살기"
    // playerNum : 1 or 2

    let img;
    if (action == "공격") {
        img = playerNum == 1 ? action_ATTACK_1P : action_ATTACK_2P;
    } else if (action == "막기") {
        img = playerNum == 1 ? action_BLOCK_1P : action_BLOCK_2P;
    } else if (action == "카운터") {
        img = playerNum == 1 ? action_COUNTER_1P : action_COUNTER_2P;
    } else if (action == "필살기") {
        img = playerNum == 1 ? action_SPECIAL_1P : action_SPECIAL_2P;
    }

    return img;

}

// 이펙트 관련
function Effect(playerNum, animIdx, duration, damage = null) {

    if (damage != null) {
        let du = new FloatUI(playerNum == 1 ? width / 4 : width / 4 * 3, height / 2, `-${damage}`, 255, 0, 0);
        FloatUIs.push(du);
    }

    //  캐릭터 이미지 변경
    //  1 : 준비
    //  2 : 데미지
    //  3 : 공격
    //  4 : 방어
    //  5 : 카운터
    //  6 : 필살기
    //  7 : 특수스킬
    //  8 : 승리
    //  9 : 패배

    if (playerNum == 1) {
        charaImg_1p = charaImgSet_1P[animIdx]; // 이미지 변경
        setTimeout(() => {
            charaImg_1p = charaImgSet_1P[1];
            animation_done_1P = true;
        }, duration);
    } else {
        charaImg_2p = charaImgSet_2P[animIdx];
        setTimeout(() => {
            charaImg_2p = charaImgSet_2P[1];
            animation_done_2P = true;
        }, duration);
    }
}

function TurnTaker() {

    // HP가 0 이하 일 경우 게임 종료
    if (player1.hp <= 0 || player2.hp <= 0) {
        isGameStart = false;

        // 1P WIN or 2P WIN 텍스트 띄우기
        if (player1.hp <= 0) {
            print("2P WIN");

            fill(255);
            textSize(100);
            textAlign(CENTER, CENTER);
            text("2P WIN", width / 2, height / 2);

            charaImg_1p = charaImgSet_1P[9];    // 1P 패배 이미지
            charaImg_2p = charaImgSet_2P[8];    // 2P 승리 이미지
        } else {
            print("1P WIN");

            fill(255);
            textSize(100);
            textAlign(CENTER, CENTER);
            text("1P WIN", width / 2, height / 2);

            charaImg_1p = charaImgSet_1P[8];    // 1P 승리 이미지
            charaImg_2p = charaImgSet_2P[9];    // 2P 패배 이미지
        }

        return;
    }

    // 턴 넘기기
    turn *= -1;
    print(`턴 넘김 : ${turn}`)
    // 턴 넘기면서 플레이어 스킬턴 추가
    if (turn == 1) {
        player1.skillTurn++;

        actionset_1p = ["스킬", "필살기", "공격"];
        actionset_2p = ["스킬", "막기", "카운터"];
    } else {
        player2.skillTurn++;

        actionset_1p = ["스킬", "카운터", "막기"];
        actionset_2p = ["스킬", "공격", "필살기"];
    }

    actionSelected_1P = -1;
    actionSelected_2P = -1;
    prosessingaction = false;

}

let BGM;
let BG;

let charaImgSet_1P = [];
let charaImgSet_2P = [];

let sage_images = [];
let mage_images = [];

function preload() {

    charaImg_1p = loadImage('Asset/Character/현자/현자_준비.gif');
    charaImg_2p = loadImage('Asset/Character/마법사/마법사_준비.gif');

    // 캐릭터 이미지 로드
    // 현자 (기본, 준비, 데미지, 공격, 방어, 카운터, 필살, 특수스킬, 승리, 패배)
    sage_images.push(loadImage('Asset/Character/현자/현자_기본.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_준비.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_데미지.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_공격.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_방어.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_카운터.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_필살.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_특수스킬.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_승리.gif'));
    sage_images.push(loadImage('Asset/Character/현자/현자_패배.gif'));

    // 마법사 (기본, 준비, 데미지, 공격, 방어, 카운터, 필살, 특수스킬, 승리, 패배)
    mage_images.push(loadImage('Asset/Character/마법사/마법사_기본.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_준비.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_데미지.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_공격.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_방어.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_카운터.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_필살.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_특수스킬.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_승리.gif'));
    mage_images.push(loadImage('Asset/Character/마법사/마법사_패배.gif'));



    // 턴 표시 이미지
    turn_ATTACK_icon = loadImage('Asset/UI/battle_turn_icon_ATTACK.png');
    turn_DEFENSE_icon = loadImage('Asset/UI/battle_turn_icon_DEFENSE.png');

    // 플레이어 정보 배경 이미지
    player_Info_BG = loadImage('Asset/UI/battle_player_info_bg.png');

    // 체력바 이미지
    hp_bar_total_image = loadImage('Asset/UI/battle_hp_bar_total.png');
    hp_bar_remain_image = loadImage('Asset/UI/battle_hp_bar_remain.png');

    // VS 아이콘
    vs_icon = loadImage('Asset/UI/battle_vs_icon.png');

    // 액션 선택지 이미지
    action_DEFAULT = loadImage('Asset/UI/command_DEFAULT.png');

    action_ATTACK_1P = loadImage('Asset/UI/battle_command_ATTACK.png');
    action_BLOCK_1P = loadImage('Asset/UI/battle_command_DEFENSE.png');
    action_COUNTER_1P = loadImage('Asset/UI/battle_command_COUNTER.png');
    action_SPECIAL_1P = loadImage('Asset/UI/battle_command_SPECIAL.png');

    action_ATTACK_2P = loadImage('Asset/UI/battle_command_ATTACK.png');
    action_BLOCK_2P = loadImage('Asset/UI/battle_command_DEFENSE.png');
    action_COUNTER_2P = loadImage('Asset/UI/battle_command_COUNTER.png');
    action_SPECIAL_2P = loadImage('Asset/UI/battle_command_SPECIAL.png');

    // 인풋 버튼 UI 이미지
    input_button_BG_1P = loadImage('Asset/UI/battle_input_button_bg_1P.png');
    input_button_BG_2P = loadImage('Asset/UI/battle_input_button_bg_2P.png');

    // 배경음
    BGM = loadSound('Asset/Audio/BGM/wakuwaku_arikui.mp3');

    // 배경 이미지
    BG = loadImage('Asset/BG/IBK_1.png');

}

function setup() {
    createCanvas(1920, 1080);
    player1 = new Character("고수렐리우스", "2023-16798", 1);
    player2 = new Character("이게니아", "2000-14567", 2);

    charaImgSet_1P = sage_images;
    charaImgSet_2P = mage_images;

    GameStart();
}

let FloatUIs = [];

function draw() {
    background(255);
    tint(150, 100);
    image(BG, 0, 0, width, height);
    tint(255);

    displayPlayerInfo();   // 플레이어 정보 출력
    // displayStatus();    // 플레이어 스테이터스 출력

    drawCharacters();

    if (!isGameStart) { return; }

    displayTurn();

    displayaction();
    displaySelectedaction();

    if (actionSelected_1P != -1 && actionSelected_2P != -1) {
        Processaction();
        prosessingaction = true;
    }

    if (prosessingaction) {
        if (animation_done_1P && animation_done_2P) {

            print("액션 처리 완료");

            animation_done_1P = false;
            animation_done_2P = false;

            TurnTaker();
        }
    }

    if (FloatUIs.length > 0) {
        for (fu of FloatUIs) {
            fu.show();
            if (fu.isEnd()) {
                FloatUIs.splice(fu, 1);
            }
        }
    }
}

let prosessingaction = false;

function actionSelected(player, input) {
    if (!isGameStart) return;
    if (player == player1 && actionSelected_1P != -1) return;
    if (player == player2 && actionSelected_2P != -1) return;

    if (player == player1) {
        actionSelected_1P = input;
        print(`actionSelected : ${player.name} ${input}`);
    } else if (player == player2) {
        actionSelected_2P = input;
        print(`actionSelected : ${player.name} ${input}`);
    }

}
// 키보드 입력
function keyPressed() {
    // ESC 키 누르면 각 플레이어 정보 띄우기
    if (keyCode === ESCAPE) {
        print(player1);
        print(player2);

        BGM.loop();
        BGM.setVolume(0.5);
    }

    // 액션 입력 (키보드 또는 키코드)
    //  1P는 W, A, D로 액션 입력
    //  2P는 ↑, ←, →로 액션 입력

    if (key === 'w') {
        actionSelected(player1, 0);
    } else if (key === 'a') {
        actionSelected(player1, 1);
    } else if (key === 'd') {
        actionSelected(player1, 2);
    }

    if (keyCode === UP_ARROW) {
        actionSelected(player2, 0);
    } else if (keyCode === LEFT_ARROW) {
        actionSelected(player2, 1);
    }
    else if (keyCode === RIGHT_ARROW) {
        actionSelected(player2, 2);
    }

    // 1을 누르면 현자 1번 이미지, 2를 누르면 현자 2번 이미지...
    if (key === '1') {
        charaImg_1p = sage_images[0];
    } else if (key === '2') {
        charaImg_1p = sage_images[1];
    } else if (key === '3') {
        charaImg_1p = sage_images[2];
    } else if (key === '4') {
        charaImg_1p = sage_images[3];
    }
}

function imageCenter(img, x, y, w = img.width, h = img.height) {
    image(img, x - img.width / 2, y - img.height / 2, w, h);
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