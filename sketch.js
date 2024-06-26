let currentSceneName = 'Title';

let globalPlayer = null;
let globalPlayer1 = null;
let globalPlayer2 = null;
let playerNumber = 0;

let isGamePaused;

let elapsedFrame = 0; // 경과 프레임
let elapsedTime = 0; // 경과 시간 (실제 시간)
let speedRate = 1; // 속도 배율

function setup() {
  createCanvas(1920, 1080);

  globalPlayer = null;
  globalPlayer1 = null;
  globalPlayer2 = null;
  playerNumber = 0;

  // bgm.play();

  currentBGImg = random(bgList);

  setup_menu();
  setup_title();

}

function draw() {

  // deltaTime을 고려하여 경과 시간 업데이트
  elapsedTime += deltaTime / 1000;
  // FPS가 60이었을 때와 같은 방식으로 경과 프레임 수 계산
  elapsedFrame += deltaTime / (1000 / 60);

  if (currentSceneName == 'Title') { draw_title(); }
  else if (currentSceneName == 'Tutorial') { draw_tutorial(); }
  else if (currentSceneName == 'MainGame') { draw_battle(); }

  else if (currentSceneName == 'Scanner') { draw_scanner(); }
  else if (currentSceneName == 'ScannerUI') { draw_scannerUI(); }
  else if (currentSceneName == 'Scanner1') { draw_scanner1(); }
  else if (currentSceneName == 'ScannerUI1') { draw_scannerUI1(); }
  else if (currentSceneName == 'Scanner2') { draw_scanner2(); }
  else if (currentSceneName == 'ScannerUI2') { draw_scannerUI2(); }
  else if (currentSceneName == 'Result') { draw_result(); }
  else if (currentSceneName == 'ScannerTest') { draw_scannerTest(); }

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
    }

    // 화면 왼쪽 위에 현재 프레임레이트 출력 (배경 검은색, 글자 흰색)
    fill(0, 100);
    noStroke();
    rectMode(CORNER);

    rect(0, 0, 300, 30);
    fill(255);
    textSize(20);
    textAlign(LEFT, CENTER);
    text("FPS: " + frameRate().toFixed(0), 7, 15);

    // deltaTime은 1초에 60번 실행되는 프레임에서 1프레임당 걸리는 시간을 의미 (deltatime = 1 / frameRate)

    fill(255);
    textSize(20);
    textAlign(LEFT, CENTER);
    // text("DeltaTime: " + deltaTime.toFixed(3), 107, 15);
    text("SpeedRate: " + (frameRate() / 60).toFixed(2), 107, 15);

    // 화면 왼쪽 위에 현재 프레임카운트 출력 (배경 검은색, 글자 흰색)
    fill(0, 100);
    noStroke();
    rectMode(CORNER);
    rect(0, 30, 200, 30);

    fill(255);
    textSize(20);
    textAlign(LEFT, CENTER);
    text("FrameCount: " + frameCount, 7, 45);

    // deltaTime을 반영하여, 화면상 실제 경과 시간(s)을 출력

    fill(0, 100);
    noStroke();
    rectMode(CORNER);
    rect(0, 60, 500, 30);

    fill(255);
    textSize(20);
    textAlign(LEFT, CENTER);
    text("Elapsed Time: " + elapsedTime.toFixed(2) + "s", 7, 75);
    text("Elapsed Frame: " + elapsedFrame, 250, 75);
  }

  if (isLoading) {
    displayLoading();
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
      player2 = getRandomCharacter(true);


    } else if (playerNumber === 2) { // 2인용 모드일 경우
      print_log("2인용 모드");
      player1 = globalPlayer1;
      player2 = globalPlayer2;

    }

    imagesToLoad = 0;
    imagesLoaded = 0;

    isLoading = true;

    onLoadCompleteCallback = () => {
      setup_battle();
      currentSceneName = sceneName;
      isLoading = false;
    };

    let res1 = preload_charaAnim(player1.jobIdx);
    let res2 = preload_charaAnim(player2.jobIdx);

    if (!res1 && !res2) { onLoadCompleteCallback(); } // 이미 모든 이미지가 로드됨

  } else if (sceneName === 'ScannerUI') { setup_scannerUI(); }
  else if (sceneName === 'Scanner1') { setup_scanner1(); }
  else if (sceneName === 'ScannerUI1') { setup_scannerUI1(); }
  else if (sceneName === 'Scanner2') { setup_scanner2(); }
  else if (sceneName === 'ScannerUI2') { setup_scannerUI2(); }
  else if (sceneName === 'Result') { setup_result(); }
  else if (sceneName === 'ScannerTest') { setup_scannerTest(); }


}

function setRandomCharacters() {

  function createCharacter(year, department) {
    return new Character("", `20${year}-1${Math.floor(Math.random() * 9000) + 1000}`, department);
  }

  let randomCharacter_1 = createCharacter(19, "인문대학 언어학과");
  let randomCharacter_2 = createCharacter(20, "자연과학대학 통계학과");
  let randomCharacter_3 = createCharacter(21, "공과대학 컴퓨터공학부");
  let randomCharacter_4 = createCharacter(22, "수의과대학 수의학과");
  let randomCharacter_5 = createCharacter(24, "음악대학 관현악과");
  let randomCharacter_6 = createCharacter(23, "사회과학대학 심리학과");
  let randomCharacter_7 = createCharacter(24, "농업생명과학대학 조경·지역시스템공학부");
  let randomCharacter_8 = createCharacter(23, "연합전공 정보문화학");

  let characters = [randomCharacter_1, randomCharacter_2, randomCharacter_3, randomCharacter_4, randomCharacter_5, randomCharacter_6, randomCharacter_7, randomCharacter_8];

  let c1 = JSON.parse(JSON.stringify(random(characters)));
  player1 = new Character(c1.name, c1.id, c1.department);

  let c2 = JSON.parse(JSON.stringify(random(characters)));
  player2 = new Character(c2.name, c2.id, c2.department);
}

function getRandomCharacter(include_lucifer = false) {
  // 랜덤한 네 자리 수
  let r = random(1000, 10000);

  // 1~85 사이의 랜덤한 전공 인덱스
  let majorIdx = floor(random(1, include_lucifer ? 86 : 85));
  let major = GetDepartmentList()[majorIdx];
  print_log(`majorIdx: ${majorIdx}, major: ${major}`);

  if(majorIdx === 86) { // 정보대마왕(Lucifer)
    return new Character("", `9999-99999`, "연합전공 정보문화학");
  }else{
    return new Character("", `2024-1${r}`, major);
  }
}

let debugSequence = ['+', '+', '+', '+', '+', '+', '+', '+'];
let currentSequenceIndex = 0;

function keyPressed() {

  if(isLoading){
    return; // 로딩 중에는 키 입력 무시
  }

  // ESC 키를 누르면 게임 일시정지
  if (keyCode === ESCAPE && currentSceneName !== 'Title') {
    isGamePaused = !isGamePaused;
  }

  if (isGamePaused) { // 게임 일시정지 상태에서는 메뉴에 대한 키 입력만 받음
    keyPressed_menu();
    return;
  }

  if (currentSceneName == 'Title') { presskey_title(); }
  if (currentSceneName == 'Tutorial') { keyPressed_tutorial(); }
  else if (currentSceneName == 'Scanner') { keyPressed_scanner(); }
  else if (currentSceneName == 'MainGame') { keyPressed_gamelogic(); }
  else if (currentSceneName == 'ScannerUI') { keyPressed_scannerUI(); }
  else if (currentSceneName == 'Scanner1') { keyPressed_scanner1(); }
  else if (currentSceneName == 'ScannerUI1') { keyPressed_scannerUI1(); }
  else if (currentSceneName == 'Scanner2') { keyPressed_scanner2(); }
  else if (currentSceneName == 'ScannerUI2') { keyPressed_scannerUI2(); }
  else if (currentSceneName == 'Result') { keyPressed_result(); }
  else if (currentSceneName == 'ScannerTest') { keyPressed_scannerTest(); }

  // 쉬프트 키를 누르면 배경음악 꺼져 있으면 켜고 있으면 꺼짐
  if (keyCode === SHIFT) {
    MuteBGM();
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

  if (isDebugMode) {
    // 6 키 누르면 FPS 60으로 고정
    if (key === '6') {
      print_log("FPS 60으로 고정");
      frameRate(60);
    }

    // 8 키 누르면 화면 캡쳐
    if (key === '8') {
      Capture();

      print_log("화면 캡쳐 완료: capturedCanvas.png");
    }

  }

}