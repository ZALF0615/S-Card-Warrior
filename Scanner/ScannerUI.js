//스캐너 버튼, 사용 설명 등
let cardFront;
let cardBack;

let cardSage;
let cardWizard;
let cardExplorer;
let cardBard;
let cardLucifer;

let cardFlip;
let gameReady = false;
let flipIcon;
let values = [3,4,3,3,3]; // 시계방향으로 radar chart의 값이 들어감
let centerX;
let centerY;

let radarChartColor;
let radarLineColor;

function setup_scannerUI() {
    cardFront = loadImage('Asset/UI/CharacterCard/warrior_card_front_bg.png');
    cardBack = loadImage('Asset/UI/CharacterCard/warrior_card_back_bg.png');
    cardSage = loadImage('Asset/Character/현자/현자_기본/F0.png');
    cardExplorer = loadImage('Asset/Character/탐험가/탐험가_기본/F0.png');
    cardWizard = loadImage('Asset/Character/마법사/마법사_기본/F0.png');
    cardBard = loadImage('Asset/Character/음유시인/음유시인_기본/F0.png');
    cardLucifer = loadImage('Asset/Character/정보대마왕/정보대마왕_기본/F0.png');
    cardDruid = loadImage('Asset/Character/드루이드/드루이드_기본/F0.png');
    flipIcon = loadImage('Asset/UI/ScannerCards/warrior_generation_flip_card_icon (2).png');

    cardFlip = false;

    centerX = width / 2 - 2;
    centerY = height / 2 - cardFront.height / 4 - 148;

    radarChartColor = color(220, 100, 100);
    radarLineColor = color(100,100,100,100);
    
}

function draw_scannerUI() {
    background(255);
    fill(51, 133, 255);
    textSize(40);
    noStroke();
    text("게임 진행을 위해서는 Enter!", width/2, 100);
    textSize(35);
    fill(0);
    text("캐릭터를 다시 생성하기 위해서는 z를 누르세요.", width/2, height - 50);
    text("캐릭터가 생성되었습니다!", width/2, height - 100);
    noTint();
    //캐릭터 생성 화면
    if(cardFlip == false) {
    //캐릭터 카드 프레임 및 뒤집기 아이콘
    image(cardFront, width/2 - cardFront.width/2, height/2 - cardFront.height/2);
    textSize(25);
    text("뒤집으려면 F를 누르세요!", width/2 - cardFront.width, height - cardFront.height/2);
    image(cardFront, width/2 - cardFront.width/2, height/2 - cardFront.height/2);
    image(flipIcon, width/2 - cardFront.width + flipIcon.width + 40, height - cardFront.height/2 - flipIcon.height/2);
        
    //가위 바위 보 HP 스탯 보여주는 텍스트
    textSize(40);
    stroke(255, 26, 117);
    strokeWeight(5);
    text(globalPlayer.rock, width/2 - cardFront.width/3 + 28, height - cardFront.height - 120);
    text(globalPlayer.scissors, width/2, height - cardFront.height - 120);
    text(globalPlayer.paper, width/2 + cardFront.width/3 - 28, height - cardFront.height - 120);
    stroke(255);
    textSize(36);
    text(globalPlayer.hpMax, width/2 + cardFront.width/3 - 13, height - cardFront.height - 10);
    noStroke();
    textSize(40);
    text(globalPlayer.name, width/2, height - cardFront.height/2 - 60);
    fill(80);
    textSize(35);
    text(globalPlayer.subtitle, width/2, height - cardFront.height/2);

    //학번에 따라 달라지는 이미지

    if(globalPlayer.majorIdx >= 1 && globalPlayer.majorIdx <= 29) {
        //고대의 현자
        image(cardSage, width/2 - cardFront.width/2 + 50, height/2 - cardFront.height/2 + 120);
    } else if (globalPlayer.majorIdx >= 30 && globalPlayer.majorIdx <= 35) {
        //위자드
        image(cardWizard, width/2 - cardFront.width/2 + 50, height/2 - cardFront.height/2 + 120);
    } else if (globalPlayer.majorIdx >= 36 && globalPlayer.majorIdx <= 47) {
        //메카 파일럿, 임시로 루시퍼
        image(cardLucifer,  width/2 - cardFront.width/2 + 50, height/2 - cardFront.height/2 + 120); 
    } else if (globalPlayer.majorIdx >= 48 && globalPlayer.majorIdx <= 53) {
        //힐러, 임시로 루시퍼
        image(cardLucifer,  width/2 - cardFront.width/2 + 50, height/2 - cardFront.height/2 + 120);    
    } else if (globalPlayer.majorIdx >= 54 && globalPlayer.majorIdx <= 65) {
        //음유시인
        image(cardBard, width/2 - cardFront.width/2 + 50, height/2 - cardFront.height/2 + 120);
    } else if (globalPlayer.majorIdx >= 66 && globalPlayer.majorIdx <= 78) {
        //탐험가
        image(cardExplorer, width/2 - cardFront.width/2 + 50, height/2 - cardFront.height/2 + 120);
    } else if (globalPlayer.majorIdx >= 78 && globalPlayer.majorIdx <= 85) {
        //드루이드
      //image(cardDruid,  width/2 - cardFront.width/2 + 140, height/2 - cardFront.height/2 + 140, cardFront.width - 280, cardFront.height - 350);
      imageCenter(cardDruid, width/2 - cardFront.width/2 + 50, height/2 - cardFront.height/2 + 120, cardDruid.width, cardDruid.height, 0, 0, cardDruid.width, cardDruid.height) 
    } else if (globalPlayer.majorIdx == 86) {
        //루시퍼
        image(cardLucifer,  width/2 - cardFront.width/2 + 50, height/2 - cardFront.height/2 + 120); 
    } 

    
    } else {
        image(cardBack, width/2 - cardFront.width/2, height/2 - cardFront.height/2);
        textSize(25);
        text("뒤집으려면 F를 누르세요!", width/2 - cardFront.width, height - cardFront.height/2);
        image(flipIcon, width/2 - cardFront.width + flipIcon.width + 40, height - cardFront.height/2 - flipIcon.height/2);
        
        
        //line(width/2-2, height/2 - cardFront.height/4 + 12, width/2 - 2, height/2 - cardFront.height/4 - 68);

        //Radar chart 오각 차트
            //직업별 오각 차트 내부 색
        if(globalPlayer.majorIdx >= 1 && globalPlayer.majorIdx <= 29) {
            //현자
            radarChartColor = color(188, 133, 50, 150);
            radarLineColor = color(188, 133, 50);
        } else if (globalPlayer.majorIdx >= 30 && globalPlayer.majorIdx <= 35) {
            //위자드
            radarChartColor = color(115, 50, 188, 150);
            radarLineColor = color(115, 50, 188);
        } else if (globalPlayer.majorIdx >= 36 && globalPlayer.majorIdx <= 47) {
            //메카 파일럿
            radarChartColor = color(50, 150, 188, 150); 
            radarLineColor = color(50, 150, 188); 
        } else if (globalPlayer.majorIdx >= 48 && globalPlayer.majorIdx <= 53) {
            //힐러
            radarChartColor = color(115, 194, 163, 150);
            radarLineColor = color(115, 194, 163);
        } else if (globalPlayer.majorIdx >= 54 && globalPlayer.majorIdx <= 65) {
            //음유시인
            radarChartColor = color(194, 115, 156, 150);
            radarLineColor = color(194, 115, 156);
        } else if (globalPlayer.majorIdx >= 66 && globalPlayer.majorIdx <= 78) {
            //탐험가
            radarChartColor = color(181, 103, 113, 150); 
            radarLineColor = color(181, 103, 113); 
        } else if (globalPlayer.majorIdx >= 78 && globalPlayer.majorIdx <= 85) {
            //드루이드
            radarChartColor = color(141, 159, 102, 150); 
            radarLineColor = color(141, 159, 102); 
        } else if (globalPlayer.majorIdx == 86) {
            //루시퍼
            radarChartColor = color(103, 103, 103, 150); 
            radarLineColor = color(103, 103, 103); 
        } 

        fill(radarChartColor);
        stroke( radarLineColor);
        strokeWeight(3);
        values = [globalPlayer.grade, globalPlayer.hpMax, globalPlayer.rock, globalPlayer.scissors, globalPlayer.paper];
        drawRadarChart(centerX, centerY, 80, values);
        textSize(12);
        fill(radarChartColor);
        noStroke();
        text(globalPlayer.id, centerX + 70, centerY + cardFront.height/5 - 10);

        noStroke();
        //각 캐릭터 스킬, 캐릭터 카드 뒷면 글자. 
        if(globalPlayer.majorIdx >= 1 && globalPlayer.majorIdx <= 29) {
            //현자
            fill(0);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("지식의 폭풍", width/2, height - cardFront.height/2 - 120);
            textSize(20);
            text("데미지를 5만큼 입히고,", width/2, height - cardFront.height/2 - 60);
            text("본인 HP가 5만큼 회복됨.", width/2, height - cardFront.height/2 - 20);
        } else if (globalPlayer.majorIdx >= 30 && globalPlayer.majorIdx <= 35) {
            //위자드
            fill(0);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("원소 폭발", width/2, height - cardFront.height/2 - 120);
            textSize(20);
            text("상대의 손 +3만큼 데미지를 입히고", width/2, height - cardFront.height/2 - 60);
            text("본인 HP가 3만큼 회복됨.", width/2, height - cardFront.height/2 - 20);
        } else if (globalPlayer.majorIdx >= 36 && globalPlayer.majorIdx <= 47) {
            //메카 파일럿
            fill(0);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("잔고장", width/2, height - cardFront.height/2 - 120);
            textSize(20);
            text("데미지를 상대의 손 2배만큼 입힘", width/2, height - cardFront.height/2 - 60);
            
        } else if (globalPlayer.majorIdx >= 48 && globalPlayer.majorIdx <= 53) {
            //힐러
            fill(0);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("회복의 빛", width/2, height - cardFront.height/2 - 120);
            textSize(20);
            text("데미지를 5만큼 입히고,", width/2, height - cardFront.height/2 - 60);
            text("본인 HP가 상대의 손만큼 회복됨.", width/2, height - cardFront.height/2 - 20);
            
        } else if (globalPlayer.majorIdx >= 54 && globalPlayer.majorIdx <= 65) {
            //음유시인
            fill(0);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("예술의 선율", width/2, height - cardFront.height/2 - 120);
            textSize(20);
            text("데미지를 상대의 잔여 HP 절반만큼 입힘.", width/2, height - cardFront.height/2 - 60);
        
        } else if (globalPlayer.majorIdx >= 66 && globalPlayer.majorIdx <= 78) {
            //탐험가
            fill(0);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("탐험의 지혜", width/2, height - cardFront.height/2 - 120);
            textSize(20);
            text("데미지를 본인 모든 손의 합만큼 입힘.", width/2, height - cardFront.height/2 - 60);
        } else if (globalPlayer.majorIdx >= 78 && globalPlayer.majorIdx <= 85) {
            //드루이드
            fill(0);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("자연의 분노", width/2, height - cardFront.height/2 - 120);
            textSize(20);
            text("데미지를 상대의 손 +6만큼 입힘", width/2, height - cardFront.height/2 - 60);
        } else if (globalPlayer.majorIdx == 86) {
            //루시퍼
            fill(0);
            textSize(30);
            textAlign(CENTER, CENTER);
            text("디지털 혼돈", width/2, height - cardFront.height/2 - 120);
            textSize(20);
            text("데미지를 8~15 사이 랜덤 값을 입힘.", width/2, height - cardFront.height/2 - 60);
        } 

    }
 
}

function keyPressed_scannerUI() {
    if (key === 'z') {
        ChangeScene('Scanner');
    }
    if (key === 'f') {
        cardFlip = !cardFlip;
    }

    if (gameReady == true && key === 'Enter') {
        ChangeScene('MainGame');
    }
}

function drawRadarChart(centerX, centerY, maxDistance, values) {
    let angle = TWO_PI / 5; // There are five points in the pentagon
  
    beginShape();
    for (let i = 0; i < 5; i++) {
      let value = constrain(values[i], 0, 9); // Ensure values are between 0 and 9
      let distance = map(value, 0, 9, 0, maxDistance);
      let x = centerX + cos(angle * i - HALF_PI) * distance;
      let y = centerY + sin(angle * i - HALF_PI) * distance;
      vertex(x, y);
    }
    endShape(CLOSE);
  
    // 오각형 모양 아웃라인
    /*
    stroke(0);
    noFill();
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < 5; i++) {
      let x = centerX + cos(angle * i - HALF_PI) * maxDistance;
      let y = centerY + sin(angle * i - HALF_PI) * maxDistance;
      vertex(x, y);
    }
      */
    endShape(CLOSE);
  }
  
 