//스캐너 버튼, 사용 설명 등
let cardFront2;
let cardBack2;

let cardSage2;
let cardWizard2;
let cardExplorer2;
let cardBard2;
let cardLucifer2;

let cardFlip2 = false;
let gameReady2 = false;

function setup_scannerUI2() {
    cardFront2 = loadImage('Asset/UI/CharacterCard/warrior_card_front_bg.png');
    cardBack2 = loadImage('Asset/UI/CharacterCard/warrior_card_back_bg.png');
    cardSage2 = loadImage('Asset/Character/현자/현자_기본/F0.png');
    cardExplorer2 = loadImage('Asset/Character/탐험가/탐험가_기본/F0.png');
    cardWizard2 = loadImage('Asset/Character/마법사/마법사_기본/F0.png');
    cardBard2 = loadImage('Asset/Character/음유시인/음유시인_기본/F0.png');
    cardLucifer2 = loadImage('Asset/Character/정보대마왕/정보대마왕_기본/F0.png');
}

function draw_scannerUI2() {
    background(255);
    fill(51, 133, 255);
    textSize(40);
    noStroke();
    text("게임 플레이를 위해서는 R을 누른 후 Enter!", width/2, 100);
    textSize(35);
    fill(0);
    text("캐릭터를 다시 생성하기 위해서는 z를 누르세요.", width/2, height - 50);
    text("두 번째 캐릭터가 생성되었습니다!", width/2, height - 100);

    //캐릭터 생성 화면
    if(cardFlip2 == false) {
    image(cardFront2, width/2 - cardFront2.width/2, height/2 - cardFront2.height/2);
    textSize(25);
    text("뒤집으려면 F를 누르세요!", width/2 - cardFront2.width, height - cardFront2.height/2);
    image(cardFront2, width/2 - cardFront2.width/2, height/2 - cardFront2.height/2);
    
    textSize(40);
    stroke(255, 26, 117);
    strokeWeight(5);
    text(globalPlayer2.rock, width/2 - cardFront2.width/3 + 28, height - cardFront2.height - 120);
    text(globalPlayer2.scissors, width/2, height - cardFront2.height - 120);
    text(globalPlayer2.paper, width/2 + cardFront2.width/3 - 28, height - cardFront2.height - 120);
    stroke(255);
    textSize(36);
    text(globalPlayer2.hpMax, width/2 + cardFront2.width/3 - 13, height - cardFront2.height - 10);
    noStroke();
    textSize(40);
    text(globalPlayer2.name, width/2, height - cardFront2.height/2 - 60);
    fill(80);
    textSize(35);
    text(globalPlayer2.subtitle, width/2, height - cardFront2.height/2);
    switch(globalPlayer2.majorIdx) {
        case 1:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 2:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 3:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 4:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 5:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 6:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 7:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 8:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 9:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 10:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 11:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 12:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 13:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 14:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 15:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 16:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 17:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 18:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 19:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 20:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 21:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 22:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 23:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 24:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 25:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 26:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 27:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 28:
            image(cardSage2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 29:
            image(cardSage, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 30:
            image(cardWizard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 31:
            image(cardWizard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 32:
            image(cardWizard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 33:
            image(cardWizard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 34:
            image(cardWizard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 35:
            image(cardWizard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 36:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 37:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 38:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 39:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 40:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 41:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 42:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 43:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 44:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 45:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 46:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 47:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 48:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 49:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 50:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 51:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 52:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 53:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 54:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 55:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 56:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 57:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 58:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 59:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 60:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 61:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 62:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 63:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 64:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 65:
            image(cardBard2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 66:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 67:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 68:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 69:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 70:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 71:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 72:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 73:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 74:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 75:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 76:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 77:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 78:
            image(cardExplorer2, width/2 - cardFront2.width/2 + 60, height/2 - cardFront2.height/2 + 120);
            break;
        case 79:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 80:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 81:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 82:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 83:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 84:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 85:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        case 86:
            image(cardLucifer2,  width/2 - cardFront2.width/2 + 140, height/2 - cardFront2.height/2 + 140, cardFront2.width - 280, cardFront2.height - 350);
            break;
        default:
            break;

    }
    
    } else {
        image(cardBack2, width/2 - cardFront2.width/2, height/2 - cardFront2.height/2);
        textSize(25);
        text("뒤집으려면 F를 누르세요!", width/2 - cardFront2.width, height - cardFront2.height/2);
        
        fill('red');
        ellipse(width/2-2, height/2 - cardFront2.height/4 + 12, 5, 5);

        switch(globalPlayer2.majorIdx) {
            case 1:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 2:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 3:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 4:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 5:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 6:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 7:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 8:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 9:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 10:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 11:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 12:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 13:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 14:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 15:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 16:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 17:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 18:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 19:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 20:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 21:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 22:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 23:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 24:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 25:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 26:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 27:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 28:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 29:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("지혜의 눈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("이번 라운드에 상대방이 선택한 액션", width/2, height - cardFront2.height/2 - 60);
                break;
            case 30:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("원소 폭발", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("상대의 손과 상관 없이 이번 라운드 승리", width/2, height - cardFront2.height/2 - 60);
                text("이때 대미지는 상대가 낸 손 +5", width/2, height - cardFront2.height/2 - 20);
                break;
            case 31:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("원소 폭발", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("상대의 손과 상관 없이 이번 라운드 승리", width/2, height - cardFront2.height/2 - 60);
                text("이때 대미지는 상대가 낸 손 +5", width/2, height - cardFront2.height/2 - 20);
                break;
            case 32:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("원소 폭발", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("상대의 손과 상관 없이 이번 라운드 승리", width/2, height - cardFront2.height/2 - 60);
                text("이때 대미지는 상대가 낸 손 +5", width/2, height - cardFront2.height/2 - 20);
                break;
            case 33:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("원소 폭발", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("상대의 손과 상관 없이 이번 라운드 승리", width/2, height - cardFront2.height/2 - 60);
                text("이때 대미지는 상대가 낸 손 +5", width/2, height - cardFront2.height/2 - 20);
                break;
            case 34:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("원소 폭발", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("상대의 손과 상관 없이 이번 라운드 승리", width/2, height - cardFront2.height/2 - 60);
                text("이때 대미지는 상대가 낸 손 +5", width/2, height - cardFront2.height/2 - 20);
                break;
            case 35:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("원소 폭발", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("상대의 손과 상관 없이 이번 라운드 승리", width/2, height - cardFront2.height/2 - 60);
                text("이때 대미지는 상대가 낸 손 +5", width/2, height - cardFront2.height/2 - 20);
                break;
            case 36:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 37:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 38:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 39:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 40:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 41:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 42:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 43:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 44:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 45:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 46:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 47:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 48:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 49:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 50:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 51:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 52:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 53:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 54:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 55:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 56:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 57:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 58:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 59:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 60:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 61:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 62:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 63:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 64:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 65:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("포르티시모", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 승리 시 상대에게", width/2, height - cardFront2.height/2 - 60);
                text("들어가는 대미지가 2배가 됩니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 66:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 67:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 68:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 69:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 70:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 71:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 72:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 73:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 74:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 75:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 76:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 77:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 78:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 비겼을 경우", width/2, height - cardFront2.height/2 - 60);
                text("자신의 승리로 간주합니다.", width/2, height - cardFront2.height/2 - 20); 
                break;
            case 79:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 80:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 81:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 82:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 83:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 84:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 85:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            case 86:
                fill(0);
                textSize(30);
                textAlign(CENTER, CENTER);
                text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
                textSize(20);
                text("3라운드 동안 두 플레이어의 모든 손의", width/2, height - cardFront2.height/2 - 60);
                text("대미지가 랜덤한 값으로 바뀝니다.", width/2, height - cardFront2.height/2 - 20);
                break;
            default:
                break;
    
        }

    }

    if(gameReady2 == true) {
        fill(0, 100);
        rectMode(CORNER);
        rect(width/2 - cardFront2.width/2, height/2 - cardFront2.height/2, cardFront2.width, cardFront2.height);
        fill(255);
        textSize(60);
        text("READY", width/2, height/2);

    } 
}

function keyPressed_scannerUI2() {
    if (key === 'z') {
        ChangeScene('Scanner2');
    }
    if (key === 'f') {
        cardFlip2 = !cardFlip2;
    }
    if (key === 'r') {
        gameReady2 = !gameReady2;
    }
    if (gameReady2 == true && key === 'Enter') {
        ChangeScene('MainGame');
    }
}

