let selectedAction_1p = 0; //  1: 가위, 2: 바위, 3: 보 4: 특수 스킬
let selectedAction_2p = 0; //  1: 가위, 2: 바위, 3: 보 4: 특수 스킬

let prevSelectedAction_1p = 0;
let prevSelectedAction_2p = 0;

let isSkillAvailable_1p = false;
let isSkillAvailable_2p = false;

let actionsInProgress = false;

let temporal_winside = 0;

function draw_gameLogic() {

    drawCharacters();

    if ((selectedAction_1p != 0 && prevSelectedAction_1p == 0) || (selectedAction_2p != 0 && prevSelectedAction_2p == 0)) {
        PlaySEOneShot(command_select, 0.1);
    }

    prevSelectedAction_1p = selectedAction_1p;
    prevSelectedAction_2p = selectedAction_2p;

    if (selectedAction_1p != 0 && selectedAction_2p != 0 && !actionsInProgress) {
        actionsInProgress = true;
        // 승패 판정
        temporal_winside = GetWinSide(selectedAction_1p, selectedAction_2p);

        setTimeout(() => {
            showActions = false; // 액션 선택지 숨기기 & 낸 손 모양 밝히기
            setTimeout(() => {
                processActions(); // 애니메이션 처리
            }, 700);
        }, 1000); // 1초 후에 액션 처리

    }

    if (showActions) {
        displayAction(300, height - 200, 1);
        displayAction(width - 300, height - 200, -1);
    }

    if (selectedAction_1p != 0) {
        displaySelectedAction(1);
    }

    if (selectedAction_2p != 0) {
        displaySelectedAction(-1);
    }
}


function processActions() {
    if (selectedAction_1p == 4 && selectedAction_2p == 4) {
        // 둘 다 특수 스킬
        print_log("둘 다 특수 스킬: 비김");

        player1.skillPoint = min(100, player1.skillPoint + 10);
        player2.skillPoint = min(100, player2.skillPoint + 10);

        setTimeout(TurnTaker, 1000);
    } else {
        // 가위 바위 보 처리

        let damage_1p = 0;
        switch (selectedAction_1p) {
            case 1:
                damage_1p = player1.scissors;
                break;
            case 2:
                damage_1p = player1.rock;
                break;
            case 3:
                damage_1p = player1.paper;
                break;
            case 4:
                damage_1p = 10; // 특수 스킬 데미지
                break;
        }

        let damage_2p = 0;
        switch (selectedAction_2p) {
            case 1:
                damage_2p = player2.scissors;
                break;
            case 2:
                damage_2p = player2.rock;
                break;
            case 3:
                damage_2p = player2.paper;
                break;
            case 4:
                damage_2p = 10; // 특수 스킬 데미지
                break;
        }

        let damage = damage_1p + damage_2p;

        if (selectedAction_1p == 4 || selectedAction_2p == 4) {
            damage = 10;
        }

        print_log(`damage : ${damage_1p} + ${damage_2p} = ${damage}`);

        let winSide = GetWinSide(selectedAction_1p, selectedAction_2p);

        if (winSide == 0) {
            // 비김
            print_log("비김");

            Attack(1, -selectedAction_1p);   // 1p 실패 애니메이션
            Attack(-1, -selectedAction_2p); // 2p 실패 애니메이션

            let damage_timing = 22 * animSpeed_1p / 60 * 1000;
            setTimeout(() => {
                Damage(1, 1);
                Damage(1, -1);
                player1.skillPoint = min(100, player1.skillPoint + 10);
                player2.skillPoint = min(100, player2.skillPoint + 10);
                setTimeout(TurnTaker, 12 * animSpeed_2p / 60 * 1000);
            }, damage_timing);
        } else if (winSide == 1) {
            // 1p 승리
            print_log("1p 승리");
            Attack(1, selectedAction_1p);   // 성공 애니메이션
            if (selectedAction_1p != 4) { Attack(-1, -selectedAction_2p); } // 실패 애니메이션

            let damage_timing = 22 * animSpeed_1p / 60 * 1000;
            setTimeout(() => {
                Damage(damage, -1, selectedAction_1p == 4);
                setTimeout(TurnTaker, 12 * animSpeed_1p / 60 * 1000);
            }, damage_timing);
        } else if (winSide == -1) {
            // 2p 승리
            print_log("2p 승리");
            Attack(-1, selectedAction_2p);   // 성공 애니메이션
            if (selectedAction_2p != 4) { Attack(1, -selectedAction_1p); } // 실패 애니메이션

            let damage_timing = 22 * animSpeed_2p / 60 * 1000;
            setTimeout(() => {
                Damage(damage, 1, selectedAction_2p == 4);
                setTimeout(TurnTaker, 12 * animSpeed_2p / 60 * 1000);
            }, damage_timing);
        }

    }
}


function Damage(damage, playerNum, hasEffect = false) {
    if (playerNum == 1) {
        player1.hp = max(0, player1.hp - damage);
        player1.skillPoint = min(100, player1.skillPoint + damage * 3);

        let du = new FloatUI(630, height / 2, `-${damage}`, 255, 0, 0);
        FloatUIs.push(du);

        if (hasEffect) { ChangeAnimation(1, '데미지', -1); }

        PlaySEOneShot(damageSE, 0.1);

        print_log(`player1.skillPoint : ${player1.skillPoint}`);
    } else {
        player2.hp = max(0, player2.hp - damage);
        player2.skillPoint = min(100, player2.skillPoint + damage * 3);

        let du = new FloatUI(width - 630, height / 2, `-${damage}`, 255, 0, 0);
        FloatUIs.push(du);

        if (hasEffect) { ChangeAnimation(-1, '데미지', -1); }

        PlaySEOneShot(damageSE, 0.1);

        print_log(`player2.skillPoint : ${player2.skillPoint}`);
    }

}

function Attack(playerNum, hand) {

    switch (hand) {
        case 1: // 가위
            ChangeAnimation(playerNum, '가위_성공', -1);
            break;
        case 2: // 바위
            ChangeAnimation(playerNum, '바위_성공', -1);
            break;
        case 3: // 보
            ChangeAnimation(playerNum, '보_성공', -1);
            break;
        case 4: // 특수 스킬
            ChangeAnimation(playerNum, '특수스킬', -1);
            break;
        case -1: // 가위 실패
            ChangeAnimation(playerNum, '가위_실패', -1);
            break;
        case -2: // 바위 실패
            ChangeAnimation(playerNum, '바위_실패', -1);
            break;
        case -3: // 보 실패
            ChangeAnimation(playerNum, '보_실패', -1);
            break;
    }
}


function keyPressed_gamelogic() {

    if (isGameOver) { return; }

    if (selectedAction_1p == 0) {
        if (key === 'a') {
            selectedAction_1p = 1;
        } else if (key === 'w') {
            selectedAction_1p = 2;
        } else if (key === 'd') {
            selectedAction_1p = 3;
        } else if (key === 's') {

            if(isSkillAvailable_1p){
                selectedAction_1p = 4;
            }else{
                print_log("system : 스킬 포인트가 부족합니다.");
                PlaySEOneShot(cancelSE, 0.1);
            }
        }
    }

    if (selectedAction_2p == 0 & !isCPUmode) {
        if (keyCode === LEFT_ARROW) {
            selectedAction_2p = 1;
        } else if (keyCode === UP_ARROW) {
            selectedAction_2p = 2;
        }
        else if (keyCode === RIGHT_ARROW) {
            selectedAction_2p = 3;
        }
        else if (keyCode === DOWN_ARROW) {
            if(isSkillAvailable_2p){
                selectedAction_2p = 4;
            }else{
                print_log("system : 스킬 포인트가 부족합니다.");
                PlaySEOneShot(cancelSE, 0.1);
            }
        }
    }

    if (isDebugMode) {
        if (key === '0') {
            processCPUAction();
        }

        if (key === 'Enter') {
            print_log("system : set HP to 1");
            player1.hp = 1;
            player2.hp = 1;
        }

        if (key === ' ') {
            //  각 에니메이션 상태와 속도 출력
            print_log(`currentAnimation_1p : ${currentAnimation_1p}`);
            print_log(`animSpeed_1p : ${animSpeed_1p}`);
            print_log(`currentAnimation_2p : ${currentAnimation_2p}`);
            print_log(`animSpeed_2p : ${animSpeed_2p}`);
        }
    }

}

function GetWinSide(action_1P, action_2P) {

    if (action_1P == 4 && action_2P == 4) {
        return 0; // 둘 다 특수 스킬일 때 비김
    } else if (action_1P == 4) {
        return 1; // 1P 특수 스킬일 때 1P 승리
    } else if (action_2P == 4) {
        return -1; // 2P 특수 스킬일 때 2P 승리
    }

    if (action_1P == 1) {
        if (action_2P == 1) {
            return 0;
        } else if (action_2P == 2) {
            return -1;
        } else if (action_2P == 3) {
            return 1;
        }
    } else if (action_1P == 2) {
        if (action_2P == 1) {
            return 1;
        } else if (action_2P == 2) {
            return 0;
        } else if (action_2P == 3) {
            return -1;
        }
    } else if (action_1P == 3) {
        if (action_2P == 1) {
            return -1;
        } else if (action_2P == 2) {
            return 1;
        } else if (action_2P == 3) {
            return 0;
        }
    }

    return -1;
}