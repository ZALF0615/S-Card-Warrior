let currentSceneName = 'Title';

let globalPlayer = null;
let globalPlayer1 = null;
let globalPlayer2 = null;
let playerNumber = 0;

let isGamePaused;

function setup() {
  createCanvas(1920, 1080);
  globalPlayer = null;
  globalPlayer1 = null;
  globalPlayer2 = null;
  playerNumber = 0;

  // bgm.play();
}

function draw() {

  if (currentSceneName == 'Title') { draw_title(); }
  else if (currentSceneName == 'Tutorial') { draw_tutorial(); }
  else if (currentSceneName == 'MainGame') { draw_battle(); }

  else if (currentSceneName == 'Scanner') { draw_scanner(); }
  else if (currentSceneName == 'ScannerUI') { draw_scannerUI(); }
  else if (currentSceneName == 'Scanner1') { draw_scanner1(); }
  else if (currentSceneName == 'ScannerUI1') { draw_scannerUI1(); }
  else if (currentSceneName == 'Scanner2') { draw_scanner2(); }
  else if (currentSceneName == 'ScannerUI2') { draw_scannerUI2(); }

  if (isGamePaused) {
    displayMenu();
  }

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

      // 화면 왼쪽 위에 현재 프레임레이트 출력 (배경 검은색, 글자 흰색)

      fill(0, 100);
      noStroke();
      rectMode(CORNER);

      rect(0, 0, 100, 30);
      fill(255);
      textSize(20);
      textAlign(LEFT, CENTER);
      text("FPS: " + frameRate().toFixed(0), 7, 15);  
  
    }
  }

}

function ChangeScene(sceneName) {

  if (sceneName !== 'MainGame') {
    currentSceneName = sceneName;
  }

  if (sceneName === 'Title') { setup_title(); }
  else if (sceneName === 'Tutorial') { setup_tutorial(); }
  else if (sceneName === 'Scanner') { setup_scanner(); }
  else if (sceneName === 'MainGame') {
    if (playerNumber === 1) { // 1인용 모드일 경우
      print_log("1인용 모드");
      player1 = globalPlayer;
      player2 = new Character("", "20" + random(17, 25) + "-" + random(1, 3) + random(0, 9) + random(0, 9) + random(0, 9) + random(0, 9), "연합전공 정보문화학");
    } else if (playerNumber === 2) { // 2인용 모드일 경우
      print_log("2인용 모드");
      player1 = globalPlayer1;
      player2 = globalPlayer2;
    }

    imagesToLoad = 0;
    imagesLoaded = 0;
    onLoadCompleteCallback = () => {
      setup_battle();
      currentSceneName = sceneName;
    };

    preload_charaAnim(player1.jobIdx);
    preload_charaAnim(player2.jobIdx);

  } else if (sceneName === 'ScannerUI') { setup_scannerUI(); }
  else if (sceneName === 'Scanner1') { setup_scanner1(); }
  else if (sceneName === 'ScannerUI1') { setup_scannerUI1(); }
  else if (sceneName === 'Scanner2') { setup_scanner2(); }
  else if (sceneName === 'ScannerUI2') { setup_scannerUI2(); }


}



let debugSequence = ['+', '+', '+', '+', '+', '+', '+', '+'];
let currentSequenceIndex = 0;

function keyPressed() {

  if (currentSceneName == 'Title') { presskey_title(); }
  if (currentSceneName == 'Tutorial') { keyPressed_tutorial(); }
  else if (currentSceneName == 'Scanner') { keyPressed_scanner(); }
  else if (currentSceneName == 'MainGame') { keyPressed_gamelogic(); }
  else if (currentSceneName == 'ScannerUI') { keyPressed_scannerUI(); }
  else if (currentSceneName == 'Scanner1') { keyPressed_scanner1(); }
  else if (currentSceneName == 'ScannerUI1') { keyPressed_scannerUI1(); }
  else if (currentSceneName == 'Scanner2') { keyPressed_scanner2(); }
  else if (currentSceneName == 'ScannerUI2') { keyPressed_scannerUI2(); }

  // 쉬프트 키를 누르면 배경음악 꺼져 있으면 켜고 있으면 꺼짐
  if (keyCode === SHIFT) {
    if (bgm.isPlaying()) { bgm.pause(); }
    else { bgm.play(); }
  }

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