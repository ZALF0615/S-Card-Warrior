let command_select;

function PlaySEOneShot(sound, volume = 1.0){
    sound.setVolume(volume);
    sound.play();
}

function preload_Sound(){
    command_select = loadSound('Asset/Audio/SE/command_select.mp3');
    damageSE = loadSound('Asset/Audio/SE/damage.mp3');
}