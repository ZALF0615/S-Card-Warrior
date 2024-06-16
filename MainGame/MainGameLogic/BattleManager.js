// BattleManager.js
// 전투 진행 시 전체 흐름을 메인으로 관리

let isGameStart = false;
let isGameOver = 0; // 1이면 진행중, 1이면 1P 승리, 2이면 2P 승리

let player1, player2;
let turnNum = 0;

let isCPUmode = false;

function InitGame() {

    isSkillAvailable_1p = false;
    isSkillAvailable_2p = false;

    isGameStart = true;
    isGameOver = 0;

    turnNum = 0;

    ChangeAnimation(1, '준비');
    ChangeAnimation(-1, '준비');

    player1.hp = player1.hpMax;
    player2.hp = player2.hpMax;

    player1.skillPoint = 0;
    player2.skillPoint = 0;

    selectedAction_1p = 0;
    selectedAction_2p = 0;

    continueFlag = false;
    clearFlag = false;

    currentBGImg = random(bgList);

    TurnTaker();
}

function TurnTaker() {

    if (player1.hp <= 0) {
        GameOver(-1);
        return;
    } else if (player2.hp <= 0) {
        GameOver(1);
        return;
    }

    actionsInProgress = false;
    showActions = true;

    selectedAction_1p = 0;
    selectedAction_2p = 0;

    turnNum++;
    print_log(`turnNum : ${turnNum}`);

    if (player1.skillPoint == 100) {
        isSkillAvailable_1p = true;
    }

    if (player2.skillPoint == 100) {
        isSkillAvailable_2p = true;
    }

    // 랜덤한 시간 뒤(2~5초)에 CPU 플레이어가 선택(player2)
    if (isCPUmode) { // 1P vs CPU
        let randomTime = random(1, 3);
        setTimeout(() => {
            processCPUAction();
        }, randomTime * 1000);
    }

}

function GameOver(winside) {

    isGameOver = winside;

    if (isCPUmode) {
        if (winside == 1) {
            print_log("YOU WIN");

            ChangeAnimation(1, '승리');
            ChangeAnimation(-1, '패배');

            // 5초 뒤에 클리어 프래그 온
            setTimeout(() => {
                clearFlag = true;
            }, 5000);

        } else if (winside == -1) {
            print_log("YOU LOSE");

            ChangeAnimation(1, '패배');
            ChangeAnimation(-1, '승리');

            // 5초 뒤에 컨티뉴 카운트 시작
            setTimeout(() => {
                currentContinueCount = 10;
                continueFlag = true;

                continueCount();
            }, 5000);
        }
    } else {
        if (winside == 1) {
            print_log("1P WIN");

            ChangeAnimation(1, '승리');
            ChangeAnimation(-1, '패배');

            // 5초 뒤에 클리어 프래그 온
            setTimeout(() => {
                clearFlag = true;
            }, 5000);
        } else if (winside == -1) {
            print_log("2P WIN");

            ChangeAnimation(1, '패배');
            ChangeAnimation(-1, '승리');

            // 5초 뒤에 클리어 프래그 온
            setTimeout(() => {
                clearFlag = true;
            }, 5000);
        }
    }
}

let FloatUIs = [];

// 런타임
setup_battle = function () { InitGame(); }
draw_battle = function () {

    // UI 출력
    displayBG();
    displayPlayerInfo(player1, player2);
    displayStatus(player1, player2);

    draw_gameLogic();

    if (FloatUIs.length > 0) {
        for (fu of FloatUIs) {
            fu.show();
            if (fu.isEnd()) {
                FloatUIs.splice(fu, 1);
            }
        }
    }


    if (isGameOver != 0) {
        GameOverUI();
    }
}

function continueCount() {

    if (isGameOver == 0) { return; } // 컨티뉴 눌림

    // 1초마다 재귀적으로 카운트
    setTimeout(() => {
        currentContinueCount--;
        if (currentContinueCount != 0) {
            continueCount();
        } else {
            // 카운트 종료, 게임오버
            // 5초 뒤 타이틀로 돌아가기
            setTimeout(() => {
                ChangeScene("Title");
            }, 5000);
        }
    }, 1000);
}
