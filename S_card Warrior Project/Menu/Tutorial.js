//게임 방법 투토리얼 관련 영상 재생 및 스킵 기능
class Tutorial{
    constructor() {
        this.x = 30;
        this.y = 30;

    }
    display() {
        rectMode(CENTER);
        noFill();
        stroke(0);
        rect(width/2, height/2, width/2, height/2);
        noStroke();
        fill(0);
        textSize(25);
        text("Enter 타이틀로 돌아가기", width-220, 50);
        text("튜토리얼 영상 제공 예정!!", width/2, height/2);
    }
}