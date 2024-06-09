//스캐너 버튼, 사용 설명 등
let cardFront;
let cardBack;

function setup_scannerUI() {
    cardFront = loadImage('Asset/UI/CharacterCard/warrior_card_front_bg.png');

}

function draw_scannerUI() {
    background(255);
    fill(0);
    textSize(35);
    text("캐릭터를 다시 생성하기 위해서는 z를 누르세요.", width/2, height - 100);
    text("캐릭터가 생성되었습니다!", width/2, height - 50);

    //캐릭터 생성 화면
    image(cardFront, width/2 - cardFront.width/2, height/2 - cardFront.height/2);

}

function keyPressed_scannerUI() {
    if (key === 'z') {
        ChangeScene('Scanner');
    }
}

