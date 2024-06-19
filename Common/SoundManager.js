let command_select;

function PlaySEOneShot(sound, volume = 1.0) {
    sound.setVolume(volume);
    sound.play();
}

let currentBGM = null;

function PlayBGM(sound, volume = 1.0) {
    if (currentBGM) {
        currentBGM.stop();
    }

    currentBGM = sound;
    currentBGM.setVolume(volume);
    currentBGM.loop();
}
function StopBGM() {
    if (currentBGM) {
        currentBGM.stop();
    }
}

let battleBGMList = [];

let currentBattleBGM;

function PlayBallteBGM() {

    let idx = Math.floor(random(battleBGMList.length));
    currentBattleBGM = battleBGMList[idx];
    // 재생중일 경우 종료 후 다시 재생

    currentBattleBGM.stop();
    currentBattleBGM.setVolume(0.2);
    currentBattleBGM.loop();

    print_log("PlayBallteBGM : " + idx);
}

function StopBattleBGM() {

    print_log("StopBattleBGM");

    if (currentBattleBGM) {
        currentBattleBGM.stop();
    }
}

function preload_Sound() {
    command_select = loadSound('Asset/Audio/SE/command_select.mp3');
    damageSE = loadSound('Asset/Audio/SE/damage.mp3');
    selectSE = loadSound('Asset/Audio/SE/select.mp3');
    piSE = loadSound('Asset/Audio/SE/pi.mp3');
    cancelSE = loadSound('Asset/Audio/SE/cancel.mp3');
    healSE = loadSound('Asset/Audio/SE/heal.mp3');

    scissorsSE = loadSound('Asset/Audio/SE/wind.wav');
    rockSE = loadSound('Asset/Audio/SE/fire.wav');
    paperSE = loadSound('Asset/Audio/SE/water.wav');

    victorySE = loadSound('Asset/Audio/SE/victory.wav');
    defeatSE = loadSound('Asset/Audio/SE/defeat.wav');
    clearSE = loadSound('Asset/Audio/SE/clear.wav');

    titleBGM = loadSound('Asset/Audio/BGM/wakuwaku_arikui.mp3');

    battleBGMList.push(loadSound('Asset/Audio/BGM/BGM_1.mp3'));
    battleBGMList.push(loadSound('Asset/Audio/BGM/BGM_2.mp3'));
    battleBGMList.push(loadSound('Asset/Audio/BGM/BGM_3.mp3'));
    battleBGMList.push(loadSound('Asset/Audio/BGM/BGM_4.mp3'));
}

let isMutingBGM = false;

function MuteBGM() {

    if (currentSceneName == "MainGame") {
        if (currentBattleBGM) {
            if (!isMutingBGM) {
                currentBattleBGM.stop();
            } else {
                currentBattleBGM.play();
            }

        } else {
            PlayBallteBGM();
        }
    } else {
        if (currentBGM) {
            if (!isMutingBGM) {
                currentBGM.stop();
            } else {
                currentBGM.play();
            }
        }
    }
    isMutingBGM = !isMutingBGM;
}