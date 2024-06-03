let sketch, sketch2;
let currentSketch;
let stage = 0;
let starterPage;
let tutorialPage;
let scannerWindow1;
let scannerWindow2;
let scannerPage1;
let scannerPage2;
let charaResult1 = 0;
let charaResult2 = 0;
let charaReady1 = false;
let charaReady2 = false;
//GameLogic.js variables
let isGameStart = false;

let player1, player2;
let turn;  // 1P의 턴인지 2P의 턴인지 구분 (1 : 1P, -1 : 2P)

let actionSelected_1P = -1, actionSelected_2P = -1;  // 1P, 2P의 행동 선택

let actionset_1p = [];  // 1P의 액션 선택
let actionset_2p = [];  // 2P의 액션 선택

let currenthp_1P, currenthp_2P;
let charaImg_1p, charaImg_2p;

let animation_done_1P, animation_done_2P = false;


let FloatUIs = [];


let BGM;
let BG;

let charaImgSet_1P = [];
let charaImgSet_2P = [];

let sage_images = [];
let mage_images = [];

let prosessingaction = false;


function preload() {
  loadScript('sketch.js', () => {
    sketch = { setup: window.sketchSetup, draw: window.sketchDraw, keyPressed: window.sketchKeyPressed };
    currentSketch = sketch;
    setupSketch(currentSketch);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    if (currentSketch && currentSketch.draw) {
      currentSketch.draw();
    }
  }

  function keyPressed() {
    if (currentSketch && currentSketch.keyPressed) {
      currentSketch.keyPressed();
    }
    // Example to switch stages
    if (stage == 2 && charaReady1 == true && charaReady2 == true && key === ' ') {
      stage = 3;
      if (!window.gameLogic) {
        loadScript('MainGame/MainGameLogic/GameLogic.js', () => {
          currentSketch = window.gameLogic;
          setupSketch(currentSketch);
        });
      } else {
        currentSketch = window.gameLogic;
        setupSketch(currentSketch);
      }
    }
  }

function displayPlayerInfo() {
if (currentSketch && currentSketch.displayPlayerInfo) {
    currentSketch.displayPlayerInfo();
    }
}

function displayStatus() {
if (currentSketch && currentSketch.displayStatus) {
    currentSketch.displayStatus();
    }
}

function displayaction() {
if (currentSketch && currentSketch.displayaction) {
    currentSketch.displayaction();
    }
}

function displaySelectedaction() {
if (currentSketch && currentSketch.displaySelectedaction) {
    currentSketch.displaySelectedaction();
    }
}

function drawCharacters() {
if (currentSketch && currentSketch.drawCharacters) {
    currentSketch.drawCharacters();
    }
}

function GameStart() {
if (currentSketch && currentSketch.GameStart) {
    currentSketch.GameStart();
    }
}

function displayTurn() {
if (currentSketch && currentSketch.displayTurn) {
    currentSketch.displayTurn();
    }
}

function Processaction() {
if (currentSketch && currentSketch.Processaction) {
    currentSketch.Processaction();
    }
}

function AttackVSCounter(playerNum) {
if (currentSketch && currentSketch.AttackVSCounter) {
    currentSketch.AttackVSCounter(playerNum);
    }
}

function AttackVSBlock(playerNum) {
if (currentSketch && currentSketch.AttackVSBlock) {
    currentSketch.AttackVSBlock(playerNum);
    }
}

function SpecialVSCounter(playerNum) {
if (currentSketch && currentSketch.SpecialVSCounter) {
    currentSketch.SpecialVSCounter(playerNum);
    }
}

function SpecialVSBlock(playerNum) {
if (currentSketch && currentSketch.SpecialVSBlock) {
    currentSketch.SpecialVSBlock(playerNum);
    }
}

function getActionImage(action, playerNum) {
if (currentSketch && currentSketch.getActionImage) {
    currentSketch.getActionImage(action, playerNum);
    }
}

function Effect(playerNum, animIdx, duration, damage = null) {
    if (currentSketch && currentSketch.Effect) {
        currentSketch.Effect(playerNum, animIdx, duration, damage = null);
    }
}

function TurnTaker() {
if (currentSketch && currentSketch.TurnTaker) {
    currentSketch.TurnTaker();
    }
}

function actionSelected() {
if (currentSketch && currentSketch.actionSelected) {
    currentSketch.actionSelected();
    }
}

function imageCenter() {
if (currentSketch && currentSketch.imageCenter) {
    currentSketch.imageCenter();
    }
}
function imageButtom() {
if (currentSketch && currentSketch.imageButtom) {
    currentSketch.imageButtom();
    }
}

function setupSketch(sketch) {
    if (sketch.setup) {
        sketch.setup();
      }
}

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}
