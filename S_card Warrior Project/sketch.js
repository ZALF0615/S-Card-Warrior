
function sketchSetup() {
  createCanvas(windowWidth, windowHeight);
  starterPage = new StartMenu();
  tutorialPage = new Tutorial(); 
  scannerWindow1 = new Scanner((windowWidth - 720) / 2 - windowWidth / 5, (windowHeight - 400) / 2, "Q");
  scannerPage1 = new ScannerPage((windowWidth - 720) / 2 - windowWidth / 5, (windowHeight - 400) / 2, "Q", 1);
  scannerWindow2 = new Scanner((windowWidth + 720) / 2 - windowWidth / 5, (windowHeight - 400) / 2, "U");
  scannerPage2 = new ScannerPage((windowWidth + 720) / 2 - windowWidth / 5, (windowHeight - 400) / 2, "U", 2);


}

function sketchDraw() {
  background(255);
  switch(stage) {
    case 0:
      //starting menu
      background(255);
      starterPage.display();
      break;
    case 1:
      //tutorial page
      tutorialPage.display();
      break;
    case 2:
      //scanning page
      fill(0);
      textSize(50);
      textAlign(CENTER, CENTER);
      text("모두 준비가 완료되었으면 space를 누르세요!",width/2, height/2 - 360);
      if(charaResult1 == 0) {
        scannerWindow1.display();
        scannerPage1.display();
      } else if(charaResult1 == 1) {
        player1 = new Character("고수렐리우스", "2019-16794", 1);
        scannerPage1.showCharacter(player1);
        scannerPage1.showReady(charaReady1);
      }
      if(charaResult2 == 0) {
        scannerWindow2.display(); 
        scannerPage2.display();
      }
      else if(charaResult2 == 1) {
        player2 = new Character("아게니아", "2024-14593", 2);
        scannerPage2.showCharacter(player2);
        scannerPage2.showReady(charaReady2);
      }
      break;
    default:
      break; 
  }
}


function sketchKeyPressed() {
  /*if(stage == 2 && key === ' ') {
    stage = 3;
    
    if (key === ' ') {
      if (!scannerWindow.isCapturing) {
        scannerWindow.isCapturing = true;
        scannerWindow.img = scannerWindow.capture.get();
        scannerWindow.processImage();
      } else {
        scannerWindow.isCapturing = false;
        scannerWindow.dataLoaded = false;
      }
    }
  
  }
  */
 if(stage == 1 && key === 'Enter') {
    //튜토리얼 스테이지로 넘어가는 조건
    stage = 0;
  }
  else if(stage == 2 && charaResult1 == 0 && key === 'q') {
    //임시로 그냥 생성키를 누르면 자동으로 캐릭터가 나오게 함. 
    //스캐너가 완벽히 구현되면 scannerWindow.dataLoaded = true일 때만 플래그의 값을 바꾸게 하여 생성 결과 화면으로 넘어가게 할 예정
    charaResult1 = 1;
  }
  else if(stage == 2 && charaResult2 == 0 && key === 'u') {
    //임시로 그냥 생성키를 누르면 자동으로 캐릭터가 나오게 함. 
    //스캐너가 완벽히 구현되면 scannerWindow.dataLoaded = true일 때만 플래그의 값을 바꾸게 하여 생성 결과 화면으로 넘어가게 할 예정
    charaResult2 = 1;
  }
  else if(stage == 2 && charaResult1 == 1 && key === 'q') {
    //ready 화면 생성
    charaReady1 = !charaReady1;
  }
  else if(stage == 2 && charaResult2 == 1 && key === 'u') {
    //ready 화면 생성
    charaReady2 = !charaReady2;
  }
  //else if(stage == 2 && charaReady1 == true && charaReady2 == true && key === ' ') {
    //게임 화면으로 넘어갈 조건. 두 캐릭터 모두 ready + 스페이스
  //  stage = 3;
  //}
  else if(stage == 2 && charaResult1 == 1 && key === 's') {
    //게임 화면으로 넘어갈 조건. 두 캐릭터 모두 ready + 스페이스
    scannerPage1.flip = !scannerPage1.flip;
  }
  else if(stage == 2 && charaResult2 == true && key === 'w') {
    //게임 화면으로 넘어갈 조건. 두 캐릭터 모두 ready + 스페이스
    scannerPage2.flip = !scannerPage2.flip;
  }
  else if(stage == 0 && key === ' ') {
    stage = 2;
  }
  else if(stage == 0 && key === 'Enter') {
    //튜토리얼 스테이지로 넘어가는 조건
    stage = 1;
  }
  
}

window.sketchSetup = sketchSetup;
window.sketchDraw = sketchDraw;
window.sketchKeyPressed = sketchKeyPressed;
