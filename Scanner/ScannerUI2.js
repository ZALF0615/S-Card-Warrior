//스캐너 버튼, 사용 설명 등
let cardFront2;
let cardBack2;

let cardSage2;
let cardWizard2;
let cardExplorer2;
let cardBard2;
let cardLucifer2;
let cardMech2;
let cardDruid2;
let cardHealer2;

let cardFlip2;
let gameReady2 = true;
let flipIcon2;
let values2 = [3,4,3,3,3]; // 시계방향으로 radar chart의 값이 들어감
let centerX2;
let centerY2;

let radarChartColor2;
let radarLineColor2;

let smallZbutton2;
let longButton2;

let playerIDtext2;

function setup_scannerUI2() {
    cardFront2 = loadImage('Asset/UI/CharacterCard/warrior_card_front_bg.png');
    cardBack2 = loadImage('Asset/UI/CharacterCard/warrior_card_back_bg.png');
    cardSage2 = loadImage('Asset/Character/현자/현자_기본/F0.png');
    cardExplorer2 = loadImage('Asset/Character/탐험가/탐험가_기본/F0.png');
    cardWizard2 = loadImage('Asset/Character/마법사/마법사_기본/F0.png');
    cardBard2 = loadImage('Asset/Character/음유시인/음유시인_기본/F0.png');
    cardLucifer2 = loadImage('Asset/Character/정보대마왕/정보대마왕_기본/F0.png');
    cardDruid2 = loadImage('Asset/Character/드루이드/드루이드_기본/F0.png');
    cardMech2 = loadImage('Asset/Character/메카파일럿/메카 파일럿_기본/F0.png');
    cardHealer2 = loadImage('Asset/Character/힐러/힐러_기본/F0.png');
    flipIcon2 = loadImage('Asset/UI/ScannerCards/warrior_generation_flip_card_icon (2).png');
    smallZbutton2 = loadImage('Asset/UI/ScannerCards/button_short_bg.png');
    longButton2 = loadImage('Asset/UI/ScannerCards/button_long_bg.png');

    cardFlip2 = false;

    centerX2 = width / 2 - 2;
    centerY2 = height / 2 - cardFront2.height / 4 - 148;

    radarChartColor2 = color(220, 100, 100);
    radarLineColor2 = color(100,100,100,100);
}

function draw_scannerUI2() {
    background(255);
    fill(51, 133, 255);
    textSize(75);
    noStroke();
    longButton2.resize(220, 100);
    image(longButton2, width/2 + 240, 110 - longButton2.height/2);
    text("게임 진행을 위해서는           !", width/2, 100);
    fill(255);
    textSize(60);
    text("Enter", width/2 + 355, 100);
    textSize(40);
    fill(0);
    //z 뒤 작은 버튼
    image(smallZbutton2, width/2 + 120 + smallZbutton2.width, height - 95 - smallZbutton2.height/2 );
    text("캐릭터를 다시 생성하기 위해서는  Z 를 누르세요.", width/2, height - 100);
    fill(51, 133, 255);
    textSize(70);
    text("2P가 생성되었습니다!", width/2, height - 170);
    noTint();
    //캐릭터 생성 화면
    fill(0);
    if(cardFlip2 == false) {
    //캐릭터 카드 프레임 및 뒤집기 아이콘
    image(cardFront2, width/2 - cardFront2.width/2, height/2 - cardFront2.height/2);
    textSize(30);
    image(smallZbutton2, width/2 - cardFront2.width - 140, height/2 - smallZbutton2.height/2);
    text(" F   를 눌러 뒤집기", width/2 - cardFront2.width, height/2);
    image(cardFront2, width/2 - cardFront2.width/2, height/2 - cardFront2.height/2);
    flipIcon2.resize(107, 103);
    image(flipIcon2, width/2 - cardFront2.width + flipIcon2.width, height/2 - flipIcon2.height/2);
        
    //가위 바위 보 HP 스탯 보여주는 텍스트
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

    //학번에 따라 달라지는 이미지

    if(globalPlayer2.majorIdx >= 1 && globalPlayer2.majorIdx <= 29) {
        //고대의 현자
        image(cardSage2, width/2 - cardFront2.width/2 + 50, height/2 - cardFront2.height/2 + 120);
    } else if (globalPlayer2.majorIdx >= 30 && globalPlayer2.majorIdx <= 35) {
        //위자드
        image(cardWizard2, width/2 - cardFront2.width/2 + 50, height/2 - cardFront2.height/2 + 120);
    } else if (globalPlayer2.majorIdx >= 36 && globalPlayer2.majorIdx <= 47) {
        //메카 파일럿
        image(cardMech2,  width/2 - cardFront2.width/2 + 50, height/2 - cardFront2.height/2 + 120); 
    } else if (globalPlayer2.majorIdx >= 48 && globalPlayer2.majorIdx <= 53) {
        //힐러
        image(cardHealer2,  width/2 - cardFront2.width/2 + 50, height/2 - cardFront2.height/2 + 120);    
    } else if (globalPlayer2.majorIdx >= 54 && globalPlayer2.majorIdx <= 65) {
        //음유시인
        image(cardBard2, width/2 - cardFront2.width/2 + 50, height/2 - cardFront2.height/2 + 120);
    } else if (globalPlayer2.majorIdx >= 66 && globalPlayer2.majorIdx <= 78) {
        //탐험가
        image(cardExplorer2, width/2 - cardFront2.width/2 + 50, height/2 - cardFront2.height/2 + 120);
    } else if (globalPlayer2.majorIdx >= 79 && globalPlayer2.majorIdx <= 85) {
        //드루이드
      //image(cardDruid,  width/2 - cardFront.width/2 + 140, height/2 - cardFront.height/2 + 140, cardFront.width - 280, cardFront.height - 350);
      image(cardDruid2, width/2 - cardFront2.width/2 + 50, height/2 - cardFront2.height/2 + 120); 
    } else if (globalPlayer2.majorIdx == 86) {
        //루시퍼
        image(cardLucifer2,  width/2 - cardFront2.width/2 + 50, height/2 - cardFront2.height/2 + 120); 
    } 

    
    } else {
        image(cardBack2, width/2 - cardFront2.width/2, height/2 - cardFront2.height/2);
        textSize(30);
        image(smallZbutton2, width/2 - cardFront2.width - 140, height/2 - smallZbutton2.height/2);
        text(" F   를 눌러 뒤집기", width/2 - cardFront2.width, height/2);
        flipIcon2.resize(107, 103);
        image(flipIcon2, width/2 - cardFront2.width + flipIcon2.width, height/2 - flipIcon2.height/2);
        //line(width/2-2, height/2 - cardFront.height/4 + 12, width/2 - 2, height/2 - cardFront.height/4 - 68);

        //Radar chart 오각 차트
            //직업별 오각 차트 내부 색
        if(globalPlayer2.majorIdx >= 1 && globalPlayer2.majorIdx <= 29) {
            //현자
            radarChartColor2 = color(117, 251, 96, 150);
            radarLineColor2 = color(117, 251, 96);
        } else if (globalPlayer2.majorIdx >= 30 && globalPlayer2.majorIdx <= 35) {
            //위자드
            radarChartColor2 = color(142, 251, 245, 150);
            radarLineColor2 = color(142, 251, 245);
        } else if (globalPlayer2.majorIdx >= 36 && globalPlayer2.majorIdx <= 47) {
            //메카 파일럿
            radarChartColor2 = color(252, 243, 81, 150); 
            radarLineColor2 = color( 252, 243, 81); 
        } else if (globalPlayer2.majorIdx >= 48 && globalPlayer2.majorIdx <= 53) {
            //힐러
            radarChartColor2 = color(63, 7, 244, 150);
            radarLineColor2 = color(63, 7, 244);
        } else if (globalPlayer2.majorIdx >= 54 && globalPlayer2.majorIdx <= 65) {
            //음유시인
            radarChartColor2 = color(233, 51, 181, 150);
            radarLineColor2 = color(233, 51, 181);
        } else if (globalPlayer2.majorIdx >= 66 && globalPlayer2.majorIdx <= 78) {
            //탐험가
            radarChartColor2 = color(13, 41, 244, 150); 
            radarLineColor2 = color(13, 41, 244); 
        } else if (globalPlayer2.majorIdx >= 79 && globalPlayer2.majorIdx <= 85) {
            //드루이드
            radarChartColor2 = color(235, 254, 83, 150); 
            radarLineColor2 = color(235, 254, 83); 
        } else if (globalPlayer2.majorIdx == 86) {
            //루시퍼
            radarChartColor2 = color(148, 28, 245, 150); 
            radarLineColor2 = color(148, 28, 245); 
        } 

        fill(radarChartColor2);
        stroke(radarLineColor2);
        strokeWeight(3);
        values2 = [globalPlayer2.grade, globalPlayer2.id.charAt(6), globalPlayer2.rock, globalPlayer2.scissors, globalPlayer2.paper];
        drawRadarChart2(centerX2, centerY2, 80, values2);
        textSize(20);
        fill(radarLineColor2);
        noStroke();
        //플레이어 ID
        //text(globalPlayer.id.slice(0, 10), centerX + 70, centerY + cardFront.height/5 - 10);
        playerIDtext2 = globalPlayer2.id.slice(0, 10);

        console.log("before initiating drawColoredText2");

        drawColoredText2(playerIDtext2, centerX2 - 11, centerY2 + cardFront2.height / 5 - 10);

        noStroke();

        console.log("before the card explanations");
        //각 캐릭터 스킬, 캐릭터 카드 뒷면 글자. 
        if(globalPlayer2.majorIdx >= 1 && globalPlayer2.majorIdx <= 29) {
            //현자
            fill(radarLineColor2);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("지식의 폭풍", width/2, height - cardFront2.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 5만큼 입히고,", width/2, height - cardFront2.height/2 - 60);
            text("본인 HP가 5만큼 회복됨.", width/2, height - cardFront2.height/2 - 20);
        } else if (globalPlayer2.majorIdx >= 30 && globalPlayer2.majorIdx <= 35) {
            //위자드
            fill(radarLineColor2);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("원소 폭발", width/2, height - cardFront2.height/2 - 120);
            textSize(20);
            fill(0);
            text("상대의 손 +3만큼 데미지를 입히고", width/2, height - cardFront2.height/2 - 60);
            text("본인 HP가 3만큼 회복됨.", width/2, height - cardFront2.height/2 - 20);
        } else if (globalPlayer2.majorIdx >= 36 && globalPlayer2.majorIdx <= 47) {
            //메카 파일럿
            fill(radarLineColor2);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("잔고장", width/2, height - cardFront2.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 상대의 손 2배만큼 입힘", width/2, height - cardFront2.height/2 - 60);
            
        } else if (globalPlayer2.majorIdx >= 48 && globalPlayer2.majorIdx <= 53) {
            //힐러
            fill(radarLineColor2);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("회복의 빛", width/2, height - cardFront2.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 5만큼 입히고,", width/2, height - cardFront2.height/2 - 60);
            text("본인 HP가 상대의 손만큼 회복됨.", width/2, height - cardFront2.height/2 - 20);  
        } else if (globalPlayer2.majorIdx >= 54 && globalPlayer2.majorIdx <= 65) {
            //음유시인
            fill(radarLineColor2);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("예술의 선율", width/2, height - cardFront2.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 상대의 잔여 HP 절반만큼 입힘.", width/2, height - cardFront2.height/2 - 60);
        } else if (globalPlayer2.majorIdx >= 66 && globalPlayer2.majorIdx <= 78) {
            //탐험가
            fill(radarLineColor2);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("탐험의 지혜", width/2, height - cardFront2.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 본인 모든 손의 합만큼 입힘.", width/2, height - cardFront2.height/2 - 60);
        } else if (globalPlayer2.majorIdx >= 79 && globalPlayer2.majorIdx <= 85) {
            //드루이드
            fill(radarLineColor2);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("자연의 분노", width/2, height - cardFront2.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 상대의 손 +6만큼 입힘", width/2, height - cardFront2.height/2 - 60);
        } else if (globalPlayer2.majorIdx == 86) {
            //루시퍼
            fill(radarLineColor2);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("디지털 혼돈", width/2, height - cardFront2.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 8~15 사이 랜덤 값을 입힘.", width/2, height - cardFront2.height/2 - 60);
        } 

    }
}

function keyPressed_scannerUI2() {
    if (key === 'z') {
        ChangeScene('Scanner2');
    }
    if (key === 'f') {
        cardFlip2 = !cardFlip2;
    }
    if (gameReady2 == true && keyCode === ENTER) {
        ChangeScene('MainGame');
    }
}

function drawRadarChart2(centerX2, centerY2, maxDistance2, values2) {
    let angle2 = TWO_PI / 5; // There are five points in the pentagon
  
    beginShape();
    for (let i = 0; i < 5; i++) {
      let value2 = constrain(values2[i], 0, 9); // Ensure values are between 0 and 9
      let distance2 = map(value2, 0, 9, 0, maxDistance2);
      let x2 = centerX2 + cos(angle2 * i - HALF_PI) * distance2;
      let y2 = centerY2 + sin(angle2 * i - HALF_PI) * distance2;
      vertex(x2, y2);
    }
    endShape(CLOSE);
  
    endShape(CLOSE);
  }

  //Warrior Id의 각 문자 색 바꾸는 용도
  function drawColoredText2(txt2, x2, y2) {
    let colors2 = [
        color(254, 174, 17),  // for characters 1 to 5
        color(242, 69, 64),   // for character 6
        color(25, 117, 255),  // for character 7
        color(8, 168, 52),    // for character 8
        color(112, 19, 226)   // for character 9
    ];

    // Ensure we only use the first 10 characters of the text
    fronttxt2 = txt2.slice(0, 4);
    backtxt2 = txt2.slice(5, 10);

    console.log("inside drawColoredText2 function");

    for (let i = 0; i < 10; i++) {
        console.log("number of loops: " + i);
        if (i < 6) {
            fill(colors2[0]);
        } else if (i === 6) {
            fill(colors2[1]);
        } else if (i === 7) {
            fill(colors2[2]);
        } else if (i === 8) {
            fill(colors2[3]);
        } else if (i === 9) {
            fill(colors2[4]);
        } else {
            fill(0); // Default color for any remaining characters
        }
        text(txt2.charAt(i), x2 + i * 12, y2);
    }

    console.log("inside drawColoredText2 function 2");
}
  
 