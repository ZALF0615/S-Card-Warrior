//스캐너 버튼, 사용 설명 등
let cardFront1;
let cardBack1;

let cardSage1;
let cardWizard1;
let cardExplorer1;
let cardBard1;
let cardLucifer1;
let cardMech1;
let cardDruid1;
let cardHealer1;

let cardFlip1;
let gameReady1 = true;
let flipIcon1;
let values1 = [3,4,3,3,3]; // 시계방향으로 radar chart의 값이 들어감
let centerX1;
let centerY1;

let radarChartColor1;
let radarLineColor1;

let smallZbutton1;
let longButton1;

let playerIDtext1;

function setup_scannerUI1() {
    cardFront1 = loadImage('Asset/UI/CharacterCard/warrior_card_front_bg.png');
    cardBack1 = loadImage('Asset/UI/CharacterCard/warrior_card_back_bg.png');
    cardSage1 = loadImage('Asset/Character/현자/현자_기본/F0.png');
    cardExplorer1 = loadImage('Asset/Character/탐험가/탐험가_기본/F0.png');
    cardWizard1 = loadImage('Asset/Character/마법사/마법사_기본/F0.png');
    cardBard1 = loadImage('Asset/Character/음유시인/음유시인_기본/F0.png');
    cardLucifer1 = loadImage('Asset/Character/정보대마왕/정보대마왕_기본/F0.png');
    cardDruid1 = loadImage('Asset/Character/드루이드/드루이드_기본/F0.png');
    cardMech1 = loadImage('Asset/Character/메카파일럿/메카파일럿_기본/F0.png');
    cardHealer1 = loadImage('Asset/Character/힐러/힐러_기본/F0.png');
    flipIcon1 = loadImage('Asset/UI/ScannerCards/warrior_generation_flip_card_icon (2).png');
    smallZbutton1 = loadImage('Asset/UI/ScannerCards/button_short_bg.png');
    longButton1 = loadImage('Asset/UI/ScannerCards/button_long_bg.png');

    cardFlip1 = false;

    centerX1 = width / 2 - 2;
    centerY1 = height / 2 - cardFront1.height / 4 - 148;

    radarChartColor1 = color(220, 100, 100);
    radarLineColor1 = color(100,100,100,100);
}

function draw_scannerUI1() {

    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    background(255);
    fill(51, 133, 255);
    textSize(75);
    noStroke();
    longButton1.resize(220, 100);
    image(longButton1, width/2 + 240, 110 - longButton1.height/2);
    text("2P 생성을 위해서는           !", width/2, 100);
    fill(255);
    textSize(60);
    text("Enter", width/2 + 355, 100);
    textSize(40);
    fill(0);
    //z 뒤 작은 버튼
    image(smallZbutton1, width/2 + 120 + smallZbutton1.width, height - 95 - smallZbutton1.height/2 );
    text("캐릭터를 다시 생성하기 위해서는  Z 를 누르세요.", width/2, height - 100);
    fill(51, 133, 255);
    textSize(70);
    text("1P가 생성되었습니다!", width/2, height - 170);
    noTint();
    //캐릭터 생성 화면
    fill(0);
    if(cardFlip1 == false) {
    //캐릭터 카드 프레임 및 뒤집기 아이콘
    image(cardFront1, width/2 - cardFront1.width/2, height/2 - cardFront1.height/2);
    textSize(30);
    image(smallZbutton1, width/2 - cardFront1.width - 140, height/2 - smallZbutton1.height/2);
    text(" F   를 눌러 뒤집기", width/2 - cardFront1.width, height/2);
    image(cardFront1, width/2 - cardFront1.width/2, height/2 - cardFront1.height/2);
    flipIcon1.resize(107, 103);
    image(flipIcon1, width/2 - cardFront1.width + flipIcon1.width, height/2 - flipIcon1.height/2);
        
    //가위 바위 보 HP 스탯 보여주는 텍스트
    textSize(40);
    stroke(255, 26, 117);
    strokeWeight(5);
    text(globalPlayer1.rock, width/2 - cardFront1.width/3 + 28, height - cardFront1.height - 120);
    text(globalPlayer1.scissors, width/2, height - cardFront1.height - 120);
    text(globalPlayer1.paper, width/2 + cardFront1.width/3 - 28, height - cardFront1.height - 120);
    stroke(255);
    textSize(36);
    text(globalPlayer1.hpMax, width/2 + cardFront1.width/3 - 13, height - cardFront1.height - 10);
    noStroke();
    textSize(40);
    text(globalPlayer1.name, width/2, height - cardFront1.height/2 - 60);
    fill(80);
    textSize(35);
    text(globalPlayer1.subtitle, width/2, height - cardFront1.height/2);

    //학번에 따라 달라지는 이미지

    if(globalPlayer1.majorIdx >= 1 && globalPlayer1.majorIdx <= 29) {
        //고대의 현자
        image(cardSage1, width/2 - cardFront1.width/2 + 50, height/2 - cardFront1.height/2 + 120);
    } else if (globalPlayer1.majorIdx >= 30 && globalPlayer1.majorIdx <= 35) {
        //위자드
        image(cardWizard1, width/2 - cardFront1.width/2 + 50, height/2 - cardFront1.height/2 + 120);
    } else if (globalPlayer1.majorIdx >= 36 && globalPlayer1.majorIdx <= 47) {
        //메카파일럿
        image(cardMech1,  width/2 - cardFront1.width/2 + 50, height/2 - cardFront1.height/2 + 120); 
    } else if (globalPlayer1.majorIdx >= 48 && globalPlayer1.majorIdx <= 53) {
        //힐러
        image(cardHealer1,  width/2 - cardFront1.width/2 + 50, height/2 - cardFront1.height/2 + 120);    
    } else if (globalPlayer1.majorIdx >= 54 && globalPlayer1.majorIdx <= 65) {
        //음유시인
        image(cardBard1, width/2 - cardFront1.width/2 + 50, height/2 - cardFront1.height/2 + 120);
    } else if (globalPlayer1.majorIdx >= 66 && globalPlayer1.majorIdx <= 78) {
        //탐험가
        image(cardExplorer1, width/2 - cardFront1.width/2 + 50, height/2 - cardFront1.height/2 + 120);
    } else if (globalPlayer1.majorIdx >= 79 && globalPlayer1.majorIdx <= 85) {
        //드루이드
      //image(cardDruid,  width/2 - cardFront.width/2 + 140, height/2 - cardFront.height/2 + 140, cardFront.width - 280, cardFront.height - 350);
      image(cardDruid1, width/2 - cardFront1.width/2 + 50, height/2 - cardFront1.height/2 + 120); 
    } else if (globalPlayer1.majorIdx == 86) {
        //루시퍼
        image(cardLucifer1,  width/2 - cardFront1.width/2 + 50, height/2 - cardFront1.height/2 + 120); 
    } 

    
    } else {
        image(cardBack1, width/2 - cardFront1.width/2, height/2 - cardFront1.height/2);
        textSize(30);
        image(smallZbutton1, width/2 - cardFront1.width - 140, height/2 - smallZbutton1.height/2);
        text(" F   를 눌러 뒤집기", width/2 - cardFront1.width, height/2);
        flipIcon1.resize(107, 103);
        image(flipIcon1, width/2 - cardFront1.width + flipIcon1.width, height/2 - flipIcon1.height/2);
        //line(width/2-2, height/2 - cardFront.height/4 + 12, width/2 - 2, height/2 - cardFront.height/4 - 68);

        //Radar chart 오각 차트
            //직업별 오각 차트 내부 색
        if(globalPlayer1.majorIdx >= 1 && globalPlayer1.majorIdx <= 29) {
            //현자
            radarChartColor1 = color(117, 251, 96, 150);
            radarLineColor1 = color(117, 251, 96);
        } else if (globalPlayer1.majorIdx >= 30 && globalPlayer1.majorIdx <= 35) {
            //위자드
            radarChartColor1 = color(142, 251, 245, 150);
            radarLineColor1 = color(142, 251, 245);
        } else if (globalPlayer1.majorIdx >= 36 && globalPlayer1.majorIdx <= 47) {
            //메카파일럿
            radarChartColor1 = color(252, 243, 81, 150); 
            radarLineColor1 = color( 252, 243, 81); 
        } else if (globalPlayer1.majorIdx >= 48 && globalPlayer1.majorIdx <= 53) {
            //힐러
            radarChartColor1 = color(63, 7, 244, 150);
            radarLineColor1 = color(63, 7, 244);
        } else if (globalPlayer1.majorIdx >= 54 && globalPlayer1.majorIdx <= 65) {
            //음유시인
            radarChartColor1 = color(233, 51, 181, 150);
            radarLineColor1 = color(233, 51, 181);
        } else if (globalPlayer1.majorIdx >= 66 && globalPlayer1.majorIdx <= 78) {
            //탐험가
            radarChartColor1 = color(13, 41, 244, 150); 
            radarLineColor1 = color(13, 41, 244); 
        } else if (globalPlayer1.majorIdx >= 79 && globalPlayer1.majorIdx <= 85) {
            //드루이드
            radarChartColor1 = color(235, 254, 83, 150); 
            radarLineColor1 = color(235, 254, 83); 
        } else if (globalPlayer1.majorIdx == 86) {
            //루시퍼
            radarChartColor1 = color(148, 28, 245, 150); 
            radarLineColor1 = color(148, 28, 245); 
        } 

        fill(radarChartColor1);
        stroke(radarLineColor1);
        strokeWeight(3);
        values1 = [globalPlayer1.grade, globalPlayer1.id.charAt(6), globalPlayer1.rock, globalPlayer1.scissors, globalPlayer1.paper];
        drawRadarChart1(centerX1, centerY1, 80, values1);
        textSize(20);
        fill(radarLineColor1);
        noStroke();
        //플레이어 ID
        //text(globalPlayer.id.slice(0, 10), centerX + 70, centerY + cardFront.height/5 - 10);
        playerIDtext1 = globalPlayer1.id.slice(0, 10);
        drawColoredText1(playerIDtext1, centerX1 - 11, centerY1 + cardFront1.height / 5 - 10);

        noStroke();
        //각 캐릭터 스킬, 캐릭터 카드 뒷면 글자. 
        if(globalPlayer1.majorIdx >= 1 && globalPlayer1.majorIdx <= 29) {
            //현자
            fill(radarLineColor1);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("지식의 폭풍", width/2, height - cardFront1.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 5만큼 입히고,", width/2, height - cardFront1.height/2 - 60);
            text("본인 HP가 5만큼 회복됨.", width/2, height - cardFront1.height/2 - 20);
        } else if (globalPlayer1.majorIdx >= 30 && globalPlayer1.majorIdx <= 35) {
            //위자드
            fill(radarLineColor1);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("원소 폭발", width/2, height - cardFront1.height/2 - 120);
            textSize(20);
            fill(0);
            text("상대의 손 +3만큼 데미지를 입히고", width/2, height - cardFront1.height/2 - 60);
            text("본인 HP가 3만큼 회복됨.", width/2, height - cardFront1.height/2 - 20);
        } else if (globalPlayer1.majorIdx >= 36 && globalPlayer1.majorIdx <= 47) {
            //메카파일럿
            fill(radarLineColor1);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("메카 변환", width/2, height - cardFront1.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 상대의 손 2배만큼 입힘", width/2, height - cardFront1.height/2 - 60);
            
        } else if (globalPlayer1.majorIdx >= 48 && globalPlayer1.majorIdx <= 53) {
            //힐러
            fill(radarLineColor1);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("회복의 빛", width/2, height - cardFront1.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 5만큼 입히고,", width/2, height - cardFront1.height/2 - 60);
            text("본인 HP가 상대의 손만큼 회복됨.", width/2, height - cardFront1.height/2 - 20);  
        } else if (globalPlayer1.majorIdx >= 54 && globalPlayer1.majorIdx <= 65) {
            //음유시인
            fill(radarLineColor1);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("예술의 선율", width/2, height - cardFront1.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 상대의 잔여 HP 절반만큼 입힘.", width/2, height - cardFront1.height/2 - 60);
        } else if (globalPlayer1.majorIdx >= 66 && globalPlayer1.majorIdx <= 78) {
            //탐험가
            fill(radarLineColor1);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("탐험의 지혜", width/2, height - cardFront1.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 본인 모든 손의 합만큼 입힘.", width/2, height - cardFront1.height/2 - 60);
        } else if (globalPlayer1.majorIdx >= 79 && globalPlayer1.majorIdx <= 85) {
            //드루이드
            fill(radarLineColor1);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("자연의 분노", width/2, height - cardFront1.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 상대의 손 +6만큼 입힘", width/2, height - cardFront1.height/2 - 60);
        } else if (globalPlayer1.majorIdx == 86) {
            //루시퍼
            fill(radarLineColor1);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("디지털 혼돈", width/2, height - cardFront1.height/2 - 120);
            textSize(20);
            fill(0);
            text("데미지를 8~15 사이 랜덤 값을 입힘.", width/2, height - cardFront1.height/2 - 60);
        } 

    }
}

function keyPressed_scannerUI1() {
    if (key === 'z') {
        ChangeScene('Scanner1');
    }
    if (key === 'f') {
        cardFlip1 = !cardFlip1;
    }
    if (gameReady1 == true && keyCode === ENTER) {
        ChangeScene('Scanner2');
    }
}

function drawRadarChart1(centerX1, centerY1, maxDistance1, values1) {
    let angle1 = TWO_PI / 5; // There are five points in the pentagon
  
    beginShape();
    for (let i = 0; i < 5; i++) {
      let value1 = constrain(values1[i], 0, 9); // Ensure values are between 0 and 9
      let distance1 = map(value1, 0, 9, 0, maxDistance1);
      let x1 = centerX1 + cos(angle1 * i - HALF_PI) * distance1;
      let y1 = centerY1 + sin(angle1 * i - HALF_PI) * distance1;
      vertex(x1, y1);
    }
    endShape(CLOSE);
  
    endShape(CLOSE);
  }

  //Warrior Id의 각 문자 색 바꾸는 용도
  function drawColoredText1(txt1, x1, y1) {
    let colors1 = [
        color(254, 174, 17),  // for characters 1 to 5
        color(242, 69, 64),   // for character 6
        color(25, 117, 255),  // for character 7
        color(8, 168, 52),    // for character 8
        color(112, 19, 226)   // for character 9
    ];

    // Ensure we only use the first 10 characters of the text
    fronttxt1 = txt1.slice(0, 4);
    backtxt1 = txt1.slice(5, 10);

    for (let i = 0; i < txt1.length; i++) {
        console.log("number of loops: " + i);
        if (i < 6) {
            fill(colors1[0]);
        } else if (i === 6) {
            fill(colors1[1]);
        } else if (i === 7) {
            fill(colors1[2]);
        } else if (i === 8) {
            fill(colors1[3]);
        } else if (i === 9) {
            fill(colors1[4]);
        } else {
            fill(0); // Default color for any remaining characters
        }
        text(txt1.charAt(i), x1 + i * 12, y1);
    }
}
  
 