// BattleManager.js
// 전투 진행 시 전체 흐름을 메인으로 관리

let isGameStart = false;
let isGameOver = 0; // 1이면 진행중, 1이면 1P 승리, 2이면 2P 승리

let player1, player2;
let turnNum = 0;

let isCPUmode = false;

function InitGame() {

    // PlayBGM(bgm, 0.1);

    player1 = new Character("멘디", "2019-16798", "자연과학대학 통계학과");

    // 랜덤한 4자리 숫자 생성
    let randomID = random(1000, 9999);

    player2 = new Character("", `9999-9${randomID}`, "?????");

    isSkillAvailable_1p = false;
    isSkillAvailable_2p = false;

    TurnTaker();

    isGameStart = true;
    isGameOver = 0;

    ChangeAnimation(1, '준비');
    ChangeAnimation(-1, '준비');
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

    if(selectedAction_1p == 4){
        player1.skillPoint = 0;
        isSkillAvailable_1p = false;
    }

    if(selectedAction_2p == 4){
        player2.skillPoint = 0;
        isSkillAvailable_2p = false;
    }

    selectedAction_1p = 0;
    selectedAction_2p = 0;
    
    turnNum++;
    print_log(`turnNum : ${turnNum}`);

    if(player1.skillPoint ==  100) {
        isSkillAvailable_1p = true;
    }

    if(player2.skillPoint ==  100) {
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

    if (winside == 1) {
        print_log("1P WIN");

        ChangeAnimation(1, '승리');
        ChangeAnimation(-1, '패배');
    } else if (winside == -1) {
        print_log("2P WIN");

        ChangeAnimation(1, '패배');
        ChangeAnimation(-1, '승리');
    }

    setTimeout(() => {
        ChangeScene("Title");
    }, 5000);
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
        // 화면 전체 어둡게
        fill(0, 150);
        noStroke();
        rect(0, 0, width, height);

        fill(255);
        textSize(100);
        textAlign(CENTER, CENTER);
        text(isGameOver == 1 ? "1P WIN" : "2P WIN", width / 2, height / 2);
    }
}