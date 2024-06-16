
function setup_result() {
    cardWidth = ending_photo_text.width;
    cardHeight = ending_photo_text.height;

    textFont(font_galmuri7);

    // 5초 뒤에 엔딩 플래그 true로 변경
    setTimeout(() => {
        endingFlag = true;
    }, 5000);

}

let endingFlag = false;
let thankyouFlag = false;

function draw_result() {

    displayBG();

    // 화면 위 텍스트
    imageCenter(ending_photo_text, width / 2, 140);

    if (isCPUmode) {
        // 1P 카드 (중앙에 위치)
        DisplayWarriorCard_Front(player1, width / 2, height / 2 + 50);
    } else {
        // 1P 카드
        DisplayWarriorCard_Front(player1, width / 2 - 250, height / 2 + 50);

        // 2P 카드
        DisplayWarriorCard_Front(player2, width / 2 + 250, height / 2 + 50);
    }

    if (endingFlag) {
        // 화면 하단에 스페이스를 눌러 타이틀로 돌아가기 텍스트 띄움
        fill(0);
        textSize(30);
        noStroke();
        textAlign(RIGHT, BOTTOM);

        text('SPACE를 눌러 타이틀로 돌아가기', width - 10, height - 15);
    }

    if (thankyouFlag) {
        // Thank you for playing 텍스트 띄움
        // 어두운 배경
        fill(0, 200);
        rect(0, 0, width, height);

        // 텍스트
        fill(255);
        textSize(100);
        textAlign(CENTER, CENTER);
        text('Thank you for playing!', width / 2, height / 2 - 300);

        // 승리 애니메이션을 그리는 함수 호출

        drawCharacters();

    }

}

function preload_result() {
    ending_photo_text = loadImage('Asset/UI/ending_photo_text.png');

    preload_charaAnim(1);
    preload_charaAnim(2);

}

function DisplayWarriorCard_Front(player, x, y) {

    noStroke();

    // 카드 배경
    imageCenter(warriorCard_front, x, y);

    // 캐릭터 이미지
    let charaImg = charaAnimations[jobs[player.jobIdx]]['기본'][0]
    let ratio = 1.2;
    imageCenter(charaImg, x + 235, y - 20, charaImg.width * ratio, charaImg.height * ratio);

    // 직업 이름
    let subtitle = player.subtitle;
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(subtitle, x, y + 175);

    // 이름
    let name = player.name;
    fill(0);
    textSize(42);
    textAlign(CENTER, CENTER);
    text(name, x, y + 220);

    // 스테이터스
    let scissors = player.scissors;
    let rock = player.rock;
    let paper = player.paper;

    let hpMax = player.hpMax;

    fill(255);
    textSize(40);
    stroke(0);
    strokeWeight(10);

    text(scissors, x - 125, y - 200);
    text(rock, x + 5, y - 200);
    text(paper, x + 125 + 5, y - 200);

    textSize(35);
    text(hpMax, x + 145 + 5, y - 100);

}

function keyPressed_result() {

    if (key === ' ' && endingFlag) {

        PlaySEOneShot(selectSE, 0.2);

        endingFlag = false;
        thankyouFlag = true;

        ChangeAnimation(1, '승리');
        ChangeAnimation(-1, '승리');
        showActions = false;

        // 5초 후에 타이틀로 돌아가기
        setTimeout(() => {
            ChangeScene("Title");
            thankyouFlag = false;
        }, 5000);
    }
}

