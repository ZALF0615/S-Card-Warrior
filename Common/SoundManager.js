let command_select;

function PlaySEOneShot(sound, volume = 1.0){
    sound.setVolume(volume);
    sound.play();
}

function PlayBGM(sound, volume = 1.0){
    sound.setVolume(volume);
    sound.loop();
}

function preload_Sound(){
    command_select = loadSound('Asset/Audio/SE/command_select.mp3');
    damageSE = loadSound('Asset/Audio/SE/damage.mp3');
    selectSE = loadSound('Asset/Audio/SE/select.mp3');
    piSE = loadSound('Asset/Audio/SE/pi.mp3');
    cancelSE = loadSound('Asset/Audio/SE/cancel.mp3');
    healSE = loadSound('Asset/Audio/SE/heal.mp3');

    scissorsSE = loadSound('Asset/Audio/SE/wind.wav');
    rockSE = loadSound('Asset/Audio/SE/fire.wav');
    paperSE = loadSound('Asset/Audio/SE/water.wav');

    bgm = loadSound('Asset/Audio/BGM/wakuwaku_arikui.mp3');
}