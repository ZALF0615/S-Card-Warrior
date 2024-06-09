let actionSelected_1P = -1, actionSelected_2P = -1;  // 1P, 2P의 행동 선택

let actionset_1p = [];  // 1P의 액션 선택
let actionset_2p = [];  // 2P의 액션 선택

let charaImg_1p, charaImg_2p;

let animation_done_1P, animation_done_2P = false;

function displayaction() {
    if (!isGameStart) return;

    textFont(font_galmuri11);

    let x1 = width / 4;
    let x2 = width / 4 * 3;
    let y = height - 80;

    let rectWidth = 280;
    let rectHeight = 60;

    let padding = 260;

    // 1P의 액션 선택지 출력

    // 인풋 버튼 UI 출력
    imageCenter(input_button_BG_1P, x1, y - 20);

    fill(0);
    textSize(25);
    textAlign(CENTER, LEFT);

    // 왼쪽 액션 선택지 (공격시 : 필살, 수비시 : 카운터)
    imageCenter(turn == 1 ? action_SPECIAL_1P : action_COUNTER_1P, x1 - padding, y);
    let left_text = turn == 1 ? `데미지 +${player1.attack + 2}` : `데미지 반사`;
    text(left_text, x1 - padding, y - 40);

    // 위 액션 선택지 (특수 스킬)
    imageCenter(action_DEFAULT, x1, y - 120);
    text("스킬", x1, y - 120 - 4);

    // 오른쪽 액션 선택지 (공격시 : 공격, 수비시 : 막기)
    imageCenter(turn == 1 ? action_ATTACK_1P : action_BLOCK_1P, x1 + padding, y);
    let right_text = turn == 1 ? `데미지 +${player1.attack}` : `데미지 -${player1.defense}`;
    text(right_text, x1 + padding, y - 40);

    // 2P의 액션 선택지 출력

    // 인풋 버튼 UI 출력
    imageCenter(input_button_BG_2P, x2, y - 20);

    fill(0);
    textSize(25);
    textAlign(CENTER, LEFT);

    // 왼쪽 액션 선택지 (공격시 : 공격, 수비시 : 막기)
    imageCenter(turn == -1 ? action_ATTACK_2P : action_BLOCK_2P, x2 - padding, y);
    left_text = turn == -1 ? `데미지 +${player2.attack}` : `데미지 -${player2.defense}`;
    text(left_text, x2 - padding, y - 40);

    // 위 액션 선택지 (특수 스킬)
    imageCenter(action_DEFAULT, x2, y - 120);
    text("스킬", x2, y - 120 - 4);

    // 오른쪽 액션 선택지 (공격시 : 필살, 수비시 : 카운터)
    imageCenter(turn == -1 ? action_SPECIAL_2P : action_COUNTER_2P, x2 + padding, y);
    right_text = turn == -1 ? `데미지 +${player2.attack + 2}` : `카운터 (반사)`;
    text(right_text, x2 + padding, y - 40);

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

    let x1 = width / 2 - action_ATTACK_1P.width / 2;
    let x2 = width / 2 + action_ATTACK_1P.width / 2;

    let y = 350;

    // 1P의 선택된 액션 출력
    if (actionSelected_1P != -1 && actionSelected_2P == -1) {
        imageCenter(action_DEFAULT, x1, y);
        textSize(30);
        fill(255);
        textAlign(CENTER, CENTER);
        text("???", x1, y);
    }

    // 2P의 선택된 액션 출력
    if (actionSelected_2P != -1 && actionSelected_1P == -1) {
        imageCenter(action_DEFAULT, x2, y);
        textSize(30);
        fill(255);
        textAlign(CENTER, CENTER);
        text("???", x2, y);
    }

    // 둘다 선택한 후

    if (actionSelected_1P != -1 && actionSelected_2P != -1) {
        imageCenter(getActionImage(actionset_1p[actionSelected_1P], 1), x1, y);
        imageCenter(getActionImage(actionset_2p[actionSelected_2P], 2), x2, y);
        // textSize(30);
        // fill(0);
        // textAlign(CENTER, CENTER);
        // text(actionset_1p[actionSelected_1P], x1, y);
        // text(actionset_2p[actionSelected_2P], x2, y);
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
        let du = new FloatUI(playerNum == 1 ? width / 4 + 50 : width / 4 * 3 - 50, height / 2, `-${damage}`, 255, 0, 0);
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
            isGameOver = -1

            charaImg_1p = charaImgSet_1P[9];    // 1P 패배 이미지
            charaImg_2p = charaImgSet_2P[8];    // 2P 승리 이미지
        } else {
            print("1P WIN");
            isGameOver = 1

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


function setup() {
    createCanvas(1920, 1080);
    player1 = new Character("고수렐리우스", "2023-16798", 1);
    player2 = new Character("이게니아", "2000-14567", 2);

    charaImgSet_1P = sage_images;
    charaImgSet_2P = mage_images;

    GameStart();
}


function draw() {
    background(255);
    tint(150, 100);
    image(BG, 0, 0, width, height);
    tint(255);

    displayPlayerInfo(player1, player2);   // 플레이어 정보 출력


    drawCharacters();

    if (isGameOver != 0) {
        fill(0);
        textSize(100);
        textAlign(CENTER, CENTER);
        text(isGameOver == 1 ? "1P WIN" : "2P WIN", width / 2, height / 2);
    }

    if (!isGameStart) { return; }

    displayStatus(player1, player2);    // 플레이어 스테이터스 출력
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
    if (player == player1 && actionSelected_1P != -1) return; // 이미 선택된 경우
    if (player == player2 && actionSelected_2P != -1) return; // 이미 선택된 경우

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

    // 엔터키 누르면 양쪽 hp 1로 설정
    if (keyCode === ENTER) {
        player1.hp = 1;
        player2.hp = 1;
    }
}

