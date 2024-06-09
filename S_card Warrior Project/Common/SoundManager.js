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

    bgm = loadSound('Asset/Audio/BGM/wakuwaku_arikui.mp3');
}