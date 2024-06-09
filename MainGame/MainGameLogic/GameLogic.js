let selectedAction_1p = 0; //  1: 가위, 2: 바위, 3: 보 4: 특수 스킬
let selectedAction_2p = 0; //  1: 가위, 2: 바위, 3: 보 4: 특수 스킬

let prevSelectedAction_1p = 0;
let prevSelectedAction_2p = 0;

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
            showActions = false;

            setTimeout(() => {
                // 낸 손 밝히기
                setTimeout(() => {
                    processActions();
                }, 1000);
            }, 1000); // 

        }, 1000); // 1초 후에 액션 처리

    }

    if (showActions) {
        displayAction(350, height - 200, 1);
        displayAction(width - 350, height - 200, 2);
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
        // 특수 스킬 처리
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
        }

        let damage = damage_1p + damage_2p;
        //print_log(`damage : ${damage_1p} + ${damage_2p} = ${damage}`);

        let winSide = GetWinSide(selectedAction_1p, selectedAction_2p);

        if (winSide == 0) {
            // 비김
           // print_log("비김");
        } else if (winSide == 1) {
            // 1p 승리
          //  print_log("1p 승리");
            Damage(damage, 2);
        } else if (winSide == -1) {
            // 2p 승리
          //  print_log("2p 승리");
            Damage(damage, 1);
        }

    }
    selectedAction_1p = 0;
    selectedAction_2p = 0;

    TurnTaker();
}

function Damage(damage, playerNum) {
    if (playerNum == 1) {
        player1.hp = max(0, player1.hp - damage);
        player1.skillPoint = min(100, player1.skillPoint + damage * 3);

        let du = new FloatUI(630, height / 2, `-${damage}`, 255, 0, 0);
        FloatUIs.push(du);

        ChangeAnimation(1, '데미지', 1);
        PlaySEOneShot(damageSE, 0.1);

      //  print_log(`player1.skillPoint : ${player1.skillPoint}`);
    } else {
        player2.hp = max(0, player2.hp - damage);
        player2.skillPoint = min(100, player2.skillPoint + damage * 3);

        let du = new FloatUI(width - 630, height / 2, `-${damage}`, 255, 0, 0);
        FloatUIs.push(du);

        ChangeAnimation(2, '데미지', 1);
        PlaySEOneShot(damageSE, 0.1);

       // print_log(`player2.skillPoint : ${player2.skillPoint}`);
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
            selectedAction_1p = 4;
        }
    }

    if (selectedAction_2p == 0 & selected_mode == 2) {
        if (keyCode === LEFT_ARROW) {
            selectedAction_2p = 1;
        } else if (keyCode === UP_ARROW) {
            selectedAction_2p = 2;
        }
        else if (keyCode === RIGHT_ARROW) {
            selectedAction_2p = 3;
        }
        else if (keyCode === DOWN_ARROW) {
            selectedAction_2p = 4;
        }
    }

    if (isDebugMode) {
        if (key === '0') {
            processCPUAction();
        }

        if (key === 'Enter') {
            player1.hp = 1;
            player2.hp = 1;
        }
    }

}

function GetWinSide(action_1P, action_2P) {
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