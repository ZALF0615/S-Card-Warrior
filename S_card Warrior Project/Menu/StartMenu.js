//시작 화면 및 메뉴 오브젝트
class StartMenu {
    constructor() {
        this.x = 100;
        this.y = 100;
    }
    display() {
        noStroke();
        //Title Card
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(90);
        text("S-Card Warriors", width/2, height/2-150);
        //Start
        textSize(50);
        text("PRESS SPACE TO START", width/2, height - 300);
        //See tutorial
        textSize(25);
        text("Enter 길게 눌러 투토리얼 영상 보기", width-220, 50);

    }
  
}