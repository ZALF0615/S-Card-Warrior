function processCPUAction() {
    // 크게 이기고 있을 때에는 coward, 크게 지고 있을 때에는 brave, 그 외에는 wise로 행동합니다.
    // 그거와 별개로 10%의 확률로 random 행동을 합니다.

    let winRate = (player2.hp - player1.hp) / (player1.hp + player2.hp);
    print_log(`winRate : ${winRate.toFixed(2)}`);

    let randomValue = random(0, 1);
    print_log(`randomValue : ${randomValue.toFixed(2)}`);

    if (randomValue < 0.1) {
        CPU_random();
    }
    else if (winRate > 0.3) {
        CPU_coward();
    } else if (winRate < -0.3) {
        CPU_brave();
    } else {
        CPU_wise();
    }
}

let previousAction_2p = 0;

function CPU_wise() {
    // 기대치가 최대가 되는 수를 선택합니다.
    print_log("CPU_wise");

    let exp_scissors = 0.5 * ((player1.paper + player2.scissors) - (player1.rock + player2.scissors));
    let exp_rock = 0.5 * ((player1.scissors + player2.rock) - (player1.paper + player2.rock));
    let exp_paper = 0.5 * ((player1.rock + player2.paper) - (player1.scissors + player2.paper));

    print_log(`exp_scissors : ${exp_scissors}`);
    print_log(`exp_rock : ${exp_rock}`);
    print_log(`exp_paper : ${exp_paper}`);

    let choices = [exp_scissors, exp_rock, exp_paper];
    if(previousAction_2p !== 0) {
        choices[previousAction_2p - 1] -= 10; // 이전 선택의 가중치를 줄임
    }

    let maxExp = max(...choices);
    let possibleChoices = choices.map((exp, index) => exp === maxExp ? index + 1 : null).filter(choice => choice !== null);
    
    selectedAction_2p = random(possibleChoices);
    previousAction_2p = selectedAction_2p;

    if (selectedAction_2p == 1) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (scissors)`);
    } else if (selectedAction_2p == 2) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (rock)`);
    } else if (selectedAction_2p == 3) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (paper)`);
    }
}

function CPU_random() {
    // 무작위로 선택합니다.
    print_log("CPU_random");
    let actionOptions = [1, 2, 3].filter(action => action !== previousAction_2p);
    selectedAction_2p = random(actionOptions);
    previousAction_2p = selectedAction_2p;

    if (selectedAction_2p == 1) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (scissors)`);
    } else if (selectedAction_2p == 2) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (rock)`);
    } else if (selectedAction_2p == 3) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (paper)`);
    }
}

function CPU_brave() {
    // 이겼을 때 가장 데미지가 큰 수를 선택합니다.
    print_log("CPU_brave");

    let exp_scissors = player1.paper + player2.scissors;
    let exp_rock = player1.scissors + player2.rock;
    let exp_paper = player1.rock + player2.paper;

    let choices = [exp_scissors, exp_rock, exp_paper];
    if(previousAction_2p !== 0) {
        choices[previousAction_2p - 1] -= 10; // 이전 선택의 가중치를 줄임
    }

    print_log(`exp_scissors : ${exp_scissors}`);
    print_log(`exp_rock : ${exp_rock}`);
    print_log(`exp_paper : ${exp_paper}`);

    let maxExp = max(...choices);
    let possibleChoices = choices.map((exp, index) => exp === maxExp ? index + 1 : null).filter(choice => choice !== null);

    selectedAction_2p = random(possibleChoices);
    previousAction_2p = selectedAction_2p;

    if (selectedAction_2p == 1) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (scissors)`);
    } else if (selectedAction_2p == 2) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (rock)`);
    } else if (selectedAction_2p == 3) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (paper)`);
    }
}

function CPU_coward() {
    // 졌을 때 가장 데미지가 적은 수를 선택합니다.
    print_log("CPU_coward");

    let exp_scissors = -(player1.rock + player2.scissors);
    let exp_rock = -(player1.paper + player2.rock);
    let exp_paper = -(player1.scissors + player2.paper);

    let choices = [exp_scissors, exp_rock, exp_paper];
    if(previousAction_2p !== 0) {
        choices[previousAction_2p - 1] -= 10; // 이전 선택의 가중치를 줄임
    }

    print_log(`exp_scissors : ${exp_scissors}`);
    print_log(`exp_rock : ${exp_rock}`);
    print_log(`exp_paper : ${exp_paper}`);

    let minExp = max(...choices);
    let possibleChoices = choices.map((exp, index) => exp === minExp ? index + 1 : null).filter(choice => choice !== null);

    selectedAction_2p = random(possibleChoices);
    previousAction_2p = selectedAction_2p;

    if (selectedAction_2p == 1) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (scissors)`);
    } else if (selectedAction_2p == 2) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (rock)`);
    } else if (selectedAction_2p == 3) {
        print_log(`selectedAction_2p : ${selectedAction_2p} (paper)`);
    }
}
