function setup() {
  createCanvas(1920, 1080);
}


function draw() {

  if (currentSceneName == 'Title') { draw_title(); }
  else if (currentSceneName == 'Scanner') { draw_scanner(); }
  else if (currentSceneName == 'MainGame') { draw_battle(); }

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
}


let debugSequence = ['+', '+', '+', '+', '+', '+', '+', '+'];
let currentSequenceIndex = 0;

function keyPressed() {

  if (currentSceneName == 'Title') { presskey_title() };
  if (currentSceneName == 'Scanner') { keyPressed_scanner(); }
  if (currentSceneName == 'MainGame') { keyPressed_gamelogic() };


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