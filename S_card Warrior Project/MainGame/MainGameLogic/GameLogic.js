let isGameStart = false;

let player1, player2;
let turn;  // 1P의 턴인지 2P의 턴인지 구분 (1 or -1)

let actionSelected_1P = -1, actionSelected_2P = -1;  // 1P, 2P의 행동 선택

let commandset_1p = [];  // 1P의 커맨드 선택
let commandset_2p = [];  // 2P의 커맨드 선택

let currenthp_1P, currenthp_2P;
let charaImg_1p, charaImg_2p;


function displayPlayerInfo(player, x, y) {

    // 사각형 너비, 높이 정의
    let rectWidth = 700;
    let rectHeight = 120;

    // 배경 사각형 그리기
    rectMode(CORNER);
    fill(255);
    stroke(0);
    rect(x, y, rectWidth, rectHeight);

    // 이름
    fill(0);
    textSize(30);
    textAlign(LEFT, CENTER);
    text(player.name, x + 10, y + 50);

    // 체력바 그리기
    fill('black');
    rect(x + 10, y + 80, 200, 30);  // 체력바 배경
    fill('red');
    rect(x + 10, y + 80, 200 * (player.hp / player.hpMax), 30);  // 체력바

    // 체력 텍스트
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`HP : ${player.hp} / ${player.hpMax}`, x + 300, y + 95); // 체력 텍스트 출력 


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

function displayCommand() {
    if (!isGameStart) return;

    // 화면 왼쪽 아래에 1P의 커맨드, 오른쪽 아래에 2P의 커맨드를 항상 표시
    // 1P가 공격인 턴과 2P가 공격인 턴을 구분
    // 공격 측의 커맨드 : 위) 특수스킬 | 좌우 중 상대방에서 먼 쪽) 필살기 | 상대방에서 가까운 쪽) 공격
    // 수비 측의 커맨드 : 위) 특수스킬 | 좌우 중 상대방에서 먼 쪽) 카운터 | 상대방에서 가까운 쪽) 막기
    // 각 커맨드의 위치도, 한 점을 중심으로 위, 왼쪽, 오른쪽에 위치

    let x1 = width / 4;
    let x2 = width / 4 * 3;

    let y = height - 70;
    let rectWidth = command_ATACK_BG_1P.width;
    let rectHeight = command_ATACK_BG_1P.height;

    fill(255);
    stroke(0);
    rectMode(CENTER);

    function drawcommands(x, y, upper_text, left_text, right_text, is1P) {

        textSize(20);

        // 위 커맨드
        image(command_DEFAULT, x - rectWidth / 2, y - 150 - rectHeight / 2);

        fill(0);
        textSize(25);
        text(upper_text, x, y - 150);

        // 입력 버튼 UI
        fill(255);
        ellipse(x, y - 70, 50, 50);
        fill(0);
        text(is1P ? "W" : "↑", x, y - 70);


        switch (left_text) {
            case "공격":
                left_text += is1P ? ` (+${player1.attack})` : ` (+${player2.attack})`;
                image(is1P ? command_ATACK_BG_1P : command_ATACK_BG_2P, x - 270 - rectWidth / 2, y - rectHeight / 2);
                break;
            case "필살기":
                left_text += is1P ? ` (+${player1.attack + 2})` : ` (+${player2.attack + 2})`;
                image(is1P ? command_SPECIAL_BG_1P : command_SPECIAL_BG_2P, x - 270 - rectWidth / 2, y - rectHeight / 2);
                break;
            case "막기":
                left_text += is1P ? ` (-${player1.defense})` : ` (-${player2.defense})`;
                image(is1P ? command_BLOCK_BG_1P : command_BLOCK_BG_2P, x - 270 - rectWidth / 2, y - rectHeight / 2);
                break;
            case "카운터":
                left_text += ` (반사)`;
                image(is1P ? command_COUNTER_BG_1P : command_COUNTER_BG_2P, x - 270 - rectWidth / 2, y - rectHeight / 2);
                break;
        }

        fill(0);
        text(left_text, x - 270, y);

        // 입력 버튼 UI
        fill(255);
        ellipse(x - 75, y, 50, 50);
        fill(0);
        text(is1P ? "A" : "←", x - 75, y);

        // 우측 커맨드

        switch (right_text) {
            case "공격":
                right_text += is1P ? ` (+${player1.attack})` : ` (+${player2.attack})`;
                image(is1P ? command_ATACK_BG_1P : command_ATACK_BG_2P, x + 270 - rectWidth / 2, y - rectHeight / 2);
                break;
            case "필살기":
                right_text += is1P ? ` (+${player1.attack + 2})` : ` (+${player2.attack + 2})`;
                image(is1P ? command_SPECIAL_BG_1P : command_SPECIAL_BG_2P, x + 270 - rectWidth / 2, y - rectHeight / 2);
                break;
            case "막기":
                right_text += is1P ? ` (-${player1.defense})` : ` (-${player2.defense})`;
                image(is1P ? command_BLOCK_BG_1P : command_BLOCK_BG_2P, x + 270 - rectWidth / 2, y - rectHeight / 2);
                break;
            case "카운터":
                right_text += ` (반사)`;
                image(is1P ? command_COUNTER_BG_1P : command_COUNTER_BG_2P, x + 270 - rectWidth / 2, y - rectHeight / 2);

                break;
        }

        fill(0);
        text(right_text, x + 270, y);

        // 입력 버튼 UI
        fill(255);
        ellipse(x + 75, y, 50, 50);
        fill(0);
        text(is1P ? "D" : "→", x + 75, y);
    }

    drawcommands(x1, y, commandset_1p[0], commandset_1p[1], commandset_1p[2], true);
    drawcommands(x2, y, commandset_2p[0], commandset_2p[1], commandset_2p[2], false);

    // 커맨드 선택 완료 시 해당 플레이어의 커맨드 위를 덮는 반투명 사각형 그리기
    if (actionSelected_1P != -1) {
        fill(0, 0, 0, 200);
        noStroke();
        rectMode(CORNER);
        rect(0, height - 270, width / 2, 270);

        fill(255);
        textSize(30);
        text("선택완료", width / 4, height - 135);
    }

    if (actionSelected_2P != -1) {
        fill(0, 0, 0, 200);
        noStroke();
        rectMode(CORNER);
        rect(width / 2, height - 270, width / 2, 270);

        fill(255);
        textSize(30);
        text("선택완료", width / 4 * 3, height - 135);
    }

}

function displaySelectedCommand() {
    // 선택된 커맨드를 화면에 출력
    // 1P의 커맨드는 왼쪽, 2P의 커맨드는 오른쪽에 출력
    // print(`displaySelectedCommand`)

    let x1 = width / 2 - command_DEFAULT.width / 2 + 2;
    let x2 = width / 2 + command_DEFAULT.width / 2 - 2;

    let y = 300;

    if (actionSelected_1P != -1 && actionSelected_2P == -1) {
        imageCenter(GetCommandBG("???", 1), x1, y);
        fill(0)
        text("???", x1, y)
    }

    if (actionSelected_2P != -1 && actionSelected_1P == -1) {
        imageCenter(GetCommandBG("???", 2), x2, y);
        fill(0)
        text("???", x2, y)
    }

    if (actionSelected_1P != -1 && actionSelected_2P != -1) {
        imageCenter(GetCommandBG(commandset_1p[actionSelected_1P], 1), x1, y);
        fill(0)
        text(commandset_1p[actionSelected_1P], x1, y)
        imageCenter(GetCommandBG(commandset_2p[actionSelected_2P], 2), x2, y);
        fill(0)
        text(commandset_2p[actionSelected_2P], x2, y)
    }

}

function drawCharacters() {
    // 플레이어 1, 2의 캐릭터를 화면에 그림
    // 플레이어 1은 왼쪽, 플레이어 2는 오른쪽에 위치
    // 플레이어 1은 오른쪽을 바라보고, 플레이어 2는 왼쪽을 바라봄

    let x1 = width / 4 - charaImg_1p.width / 2;
    let x2 = width / 4 * 3 - charaImg_1p.width / 2;

    let y = height / 2 - charaImg_1p.height / 2;

    // 플레이어 1
    image(charaImg_1p, x1, y);
    // 플레이어 2 (좌우반전)
    push();
    translate(x2 + charaImg_2p.width, y);
    scale(-1, 1);
    image(charaImg_2p, 0, 0);
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
    let rectWidth = 200;
    let rectHeight = 200;

    fill(255);
    stroke(0);

    if (turn == 1) {
        // 옅은 빨강
        fill(255, 100, 100);    // 공격측
        ellipse(x1, y, rectWidth, rectHeight);
        fill(100, 100, 255);    // 수비측
        ellipse(x2, y, rectWidth, rectHeight);

        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("공격측", x1, y);
        text("수비측", x2, y);
    } else {
        fill(100, 100, 255);    // 수비측
        ellipse(x1, y, rectWidth, rectHeight);
        fill(255, 100, 100);    // 공격측
        ellipse(x2, y, rectWidth, rectHeight);

        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("수비측", x1, y);
        text("공격측", x2, y);
    }
}

function ProcessCommand() {
    // 커맨드 처리
    // 플레이어 1, 2의 커맨드를 확인하고, 각 커맨드에 따라 플레이어 1, 2의 상태를 변경
    // 공격 - 방어 : 방어 성공. 공격력 - 방어력 만큼의 데미지.
    // 공격 - 카운터 : 공격 성공. 공격력 만큼의 데미지.
    // 필살 - 방어 : 필살 성공. 공격력 +2 만큼의 데미지.
    // 필살 - 카운터 : 카운터 성공. 상대 공격력 +2 만큼 반사.

    // 플레이어 1, 2의 커맨드를 확인
    // 커맨드가 선택되지 않았을 경우 함수 종료
    if (actionSelected_1P == -1 || actionSelected_2P == -1 || prosessingCommand) {
        return;
    }

    let command_1P = commandset_1p[actionSelected_1P];
    print(`command_1P : ${command_1P}`);

    let command_2P = commandset_2p[actionSelected_2P];
    print(`command_2P : ${command_2P}`);

    let attacker_command = turn == 1 ? command_1P : command_2P;
    let defender_command = turn == 1 ? command_2P : command_1P;

    setTimeout(() => {
        // 플레이어 1, 2의 커맨드에 따라 상태 변경
        if (attacker_command == "공격" && defender_command == "막기") {
            AttackVSBlock(turn);
        } else if (attacker_command == "공격" && defender_command == "카운터") {
            AttackVSCounter(turn);
        } else if (attacker_command == "필살기" && defender_command == "막기") {
            SpecialVSBlock(turn);
        } else if (attacker_command == "필살기" && defender_command == "카운터") {
            SpecialVSCounter(turn);
        }

        actionSelected_1P = -1;
        actionSelected_2P = -1;
        prosessingCommand = false;

        TurnTaker();
    }, 1000);



}

// 커맨드 결과 처리

function AttackVSCounter(playerNum) {
    // 공격 성공 (공격 - 카운터)
    // playerNum : 1 or 2
    print(`AttackVSCounter : ` + playerNum);
    let attack = playerNum == 1 ? player1.attack : player2.attack;

    if (playerNum == 1) {
        player2.hp = max(0, player2.hp - attack);
    } else {
        player1.hp = max(0, player1.hp - attack);
    }

    let du = new FloatUI(playerNum == 1 ? width / 4 * 3 : width / 4, height / 2 - 300, `-${attack}`, 255, 0, 0);
    FloatUIs.push(du);

    print(`공격 성공 : ${attack} 데미지`);
}
function AttackVSBlock(playerNum) {
    // 공격 실패 (공격 - 막기)
    // 공격력 - 방어력 만큼의 데미지
    // playerNum : 1 or 2
    print(`AttackVSBlock : ` + playerNum);
    let attack = playerNum == 1 ? player1.attack : player2.attack;
    let defense = playerNum == 1 ? player2.defense : player1.defense;

    let damage = max(0, attack - defense);

    if (playerNum == 1) {
        player2.hp = max(0, player2.hp - damage);
    }
    else {
        player1.hp = max(0, player1.hp - damage);
    }

    let du = new FloatUI(playerNum == 1 ? width / 4 * 3 : width / 4, height / 2 - 300, `-${damage}`, 255, 0, 0);
    FloatUIs.push(du);

    print(`공격 실패 : ${damage} 데미지`);
}
function SpecialVSCounter(playerNum) {
    // 필살기 실패 (필살기 - 카운터)
    // 카운터 성공. 상대 공격력 +2 만큼 반사
    // playerNum : 1 or 2
    print(`SpecialVSCounter : ` + playerNum);
    let attack = playerNum == 1 ? player1.attack : player2.attack;

    let damage = max(0, attack + 2);

    if (playerNum == 1) {
        player1.hp = max(0, player1.hp - damage);
    }
    else {
        player2.hp = max(0, player2.hp - damage);
    }

    let du = new FloatUI(playerNum == 1 ? width / 4 : width / 4 * 3, height / 2 - 300, `-${damage}`, 255, 0, 0);
    FloatUIs.push(du);

    print(`카운터 성공 : ${damage} 데미지`);
}

function SpecialVSBlock(playerNum) {
    // 필살기 성공 (필살기 - 막기)
    // 공격력 +2 만큼의 데미지
    // playerNum : 1 or 2
    print(`SpecialVSBlock : ` + playerNum);
    let attack = playerNum == 1 ? player1.attack : player2.attack;

    let damage = max(0, attack + 2);

    if (playerNum == 1) {
        player2.hp = max(0, player2.hp - damage);
    }
    else {
        player1.hp = max(0, player1.hp - damage);
    }

    let du = new FloatUI(playerNum == 1 ? width / 4 * 3 : width / 4, height / 2 - 300, `-${damage}`, 255, 0, 0);
    FloatUIs.push(du);

    print(`필살기 성공 : ${damage} 데미지`);
}


function TurnTaker() {

    // HP가 0 이하 일 경우 게임 종료
    if (player1.hp <= 0 || player2.hp <= 0) {
        isGameStart = false;
        return;
    }

    // 턴 넘기기
    turn *= -1;
    print(`턴 넘김 : ${turn}`)
    // 턴 넘기면서 플레이어 스킬턴 추가
    if (turn == 1) {
        player1.skillTurn++;

        commandset_1p = ["스킬", "필살기", "공격"];
        commandset_2p = ["스킬", "막기", "카운터"];
    } else {
        player2.skillTurn++;

        commandset_1p = ["스킬", "카운터", "막기"];
        commandset_2p = ["스킬", "공격", "필살기"];
    }

}


let BGM;

function preload() {
    charaImg_1p = loadImage('Asset/Character/현자_준비.gif');
    charaImg_2p = loadImage('Asset/Character/마법사_준비.gif');

    command_ATACK_BG_1P = loadImage('Asset/UI/command_ATTACK_1P.png');
    command_BLOCK_BG_1P = loadImage('Asset/UI/command_BLOCK_1P.png');
    command_COUNTER_BG_1P = loadImage('Asset/UI/command_COUNTER_1P.png');
    command_SPECIAL_BG_1P = loadImage('Asset/UI/command_SPECIAL_1P.png');

    command_ATACK_BG_2P = loadImage('Asset/UI/command_ATTACK_2P.png');
    command_BLOCK_BG_2P = loadImage('Asset/UI/command_BLOCK_2P.png');
    command_COUNTER_BG_2P = loadImage('Asset/UI/command_COUNTER_2P.png');
    command_SPECIAL_BG_2P = loadImage('Asset/UI/command_SPECIAL_2P.png');

    command_DEFAULT = loadImage('Asset/UI/command_DEFAULT.png');

    commandBG = loadImage('Asset/UI/battle_command_bg.png');

    BGM = loadSound('Asset/Audio/BGM/wakuwaku_arikui.mp3');
}

function setup() {
    createCanvas(1920, 1080);
    player1 = new Character("고수렐리우스", "2023-16798", 1);
    player2 = new Character("아게니아", "2000-14567", 2);

    GameStart();
}

let FloatUIs = [];

function draw() {
    background('gray');

    displayPlayerInfo(player1, 10, 10);   // 플레이어 1 정보 출력
    displayPlayerInfo(player2, width - 710, 10);  // 플레이어 2 정보 출력
    displayStatus();    // 플레이어 스테이터스 출력

    drawCharacters();
    displayTurn();

    displayCommand();
    displaySelectedCommand();

    if (actionSelected_1P != -1 && actionSelected_2P != -1) {
        ProcessCommand();
        prosessingCommand = true;
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



let prosessingCommand = false;

function commanSelected(player, input) {
    if (!isGameStart) return;
    if (player == player1 && actionSelected_1P != -1) return;
    if (player == player2 && actionSelected_2P != -1) return;

    if (player == player1) {

        switch (input) {
            case 1:
                // 특수스킬
                break;
            case 2:
                // 왼쪽 커맨드
                break;
            case 3:
                // 오른쪽 커맨드
                break;
        }

        actionSelected_1P = input;
        print(`commanSelected : ${player.name} ${input}`);
    } else if (player == player2) {
        actionSelected_2P = input;
        print(`commanSelected : ${player.name} ${input}`);
    }

}
// 키보드 입력
function keyPressed() {
    // ESC 키 누르면 각 플레이어 정보 띄우기
    if (keyCode === ESCAPE) {
        print(player1);
        print(player2);

        // BGM.loop();
        BGM.setVolume(0.5);
    }

    // 커맨드 입력 (키보드 또는 키코드)
    //  1P는 W, A, D로 커맨드 입력
    //  2P는 ↑, ←, →로 커맨드 입력

    if (key === 'w') {
        commanSelected(player1, 0);
    } else if (key === 'a') {
        commanSelected(player1, 1);
    } else if (key === 'd') {
        commanSelected(player1, 2);
    }

    if (keyCode === UP_ARROW) {
        commanSelected(player2, 0);
    } else if (keyCode === LEFT_ARROW) {
        commanSelected(player2, 1);
    }
    else if (keyCode === RIGHT_ARROW) {
        commanSelected(player2, 2);
    }
}

function GetCommandBG(command, playerNum) {
    switch (command) {
        case "공격":
            return playerNum == 1 ? command_ATACK_BG_1P : command_ATACK_BG_2P;
        case "필살기":
            return playerNum == 1 ? command_SPECIAL_BG_1P : command_SPECIAL_BG_2P;
        case "막기":
            return playerNum == 1 ? command_BLOCK_BG_1P : command_BLOCK_BG_2P;
        case "카운터":
            return playerNum == 1 ? command_COUNTER_BG_1P : command_COUNTER_BG_2P;
        default:
            return command_DEFAULT;
    }
}

function imageCenter(img, x, y) {
    image(img, x - img.width / 2, y - img.height / 2)
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

        print('tete');

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