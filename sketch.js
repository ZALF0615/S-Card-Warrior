let globalPlayer = null;
let globalPlayer1 = null;
let globalPlayer2 = null;
let playerNumber = 0;



function setup() {
  createCanvas(1920, 1080);
  globalPlayer = null;
  globalPlayer1 = null;
  globalPlayer2 = null;
  playerNumber = 0;
}


function draw() {

  if (currentSceneName == 'Title') { draw_title(); }
  else if (currentSceneName == 'Scanner') { draw_scanner(); }
  else if (currentSceneName == 'MainGame') { draw_battle(); }
  else if (currentSceneName == 'ScannerUI') { draw_scannerUI(); }
  else if (currentSceneName == 'Scanner1') { draw_scanner1(); }
  else if (currentSceneName == 'ScannerUI1') { draw_scannerUI1(); }
  else if (currentSceneName == 'Scanner2') { draw_scanner2(); }
  else if (currentSceneName == 'ScannerUI2') { draw_scannerUI2(); }
 

  if (isDebugMode) {
    for (let i = 0; i < messages.length; i++) {
      // 화면 왼쪽 밑에 메시지 출력(디버깅용)
      // 글자 색 검은색, 배경 투명도 있는 검은색
      // 가장 최근 메시지는 노란색으로 출력
      let m = messages[i];

      fill(0, 100);
      noStroke();
      rectMode(CORNER);
      rect(0, height - 30 * (i + 1), m.length * 30, 30);
      if (i == 0) {
        fill(255, 255, 0);
      } else {
        fill(255);
      }
      textSize(20);
      textAlign(LEFT, CENTER);
      text(m, 7, height - 30 * (i + 1) + 15);
    }
  }

}

let currentSceneName = 'Title';

function ChangeScene(sceneName) {
  currentSceneName = sceneName;

  if (sceneName == 'Title') { setup_title(); }
  else if (sceneName == 'Scanner') { setup_scanner(); }
  else if (sceneName == 'MainGame') { setup_battle(); }
  else if (sceneName == 'ScannerUI') { setup_scannerUI(); }
  else if (sceneName == 'Scanner1') { setup_scanner1(); }
  else if (sceneName == 'ScannerUI1') { setup_scannerUI1(); }
  else if (sceneName == 'Scanner2') { setup_scanner2(); }
  else if (sceneName == 'ScannerUI2') { setup_scannerUI2(); }
}


let debugSequence = ['+', '+', '+', '+', '+', '+', '+', '+'];
let currentSequenceIndex = 0;

function keyPressed() {

  if (currentSceneName == 'Title') { presskey_title(); }
  else if (currentSceneName == 'Scanner') { keyPressed_scanner(); }
  else if (currentSceneName == 'MainGame') { keyPressed_gamelogic(); }
  else if (currentSceneName == 'ScannerUI') { keyPressed_scannerUI(); }
  else if (currentSceneName == 'Scanner1') { keyPressed_scanner1(); }
  else if (currentSceneName == 'ScannerUI1') { keyPressed_scannerUI1(); }
  else if (currentSceneName == 'Scanner2') { keyPressed_scanner2(); }
  else if (currentSceneName == 'ScannerUI2') { keyPressed_scannerUI2(); }
  


  // 디버그 모드 진입
  const keyName = key.toUpperCase();
  const expectedKey = debugSequence[currentSequenceIndex];

  if (keyName === expectedKey) {
    currentSequenceIndex++;
    if (currentSequenceIndex === debugSequence.length) {
      isDebugMode = !isDebugMode;
      print_log("디버그 모드 " + (isDebugMode ? "ON" : "OFF"));
      currentSequenceIndex = 0;
    }
  } else {
    currentSequenceIndex = 0;
  }

}