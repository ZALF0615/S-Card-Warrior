//스캐너 버튼, 사용 설명 등
//let scannerWindow;
class ScannerPage {
    constructor(posX, posY, button, turn) {
        this.title = "당신의 s-card를 스캔하세요!";
        this.posX = posX;
        this.posY = posY;
        this.button = button;
        this.turn = turn;
        this.flip = true;
    

    }
    setName(name) {
        this.title = name;

    }
    display() {
        noStroke();
        //title
        textAlign(CENTER, CENTER);
        fill(0);
        textSize(50);
        text(this.title, this.posX, this.posY-windowHeight/3);
    }

    showCharacter(player) {
        //캐릭터 생성 결과를 보여줍니다.
        if(this.flip == true){
        fill(200, 120, 120);
        rect(this.posX+320, this.posY+200, 640, 400);
        } else {
        fill(120, 200, 120);
        rect(this.posX+320, this.posY+200, 640, 400);
        fill(0);
        textSize(20);
        text("이름: " + player.name, this.posX+100, this.posY+20);
        text("직업: " + player.name, this.posX+100, this.posY+45);
        text("이름: " + player.name, this.posX+100, this.posY+70);
        text("이름: " + player.name, this.posX+100, this.posY+95);
        text("이름: " + player.name, this.posX+100, this.posY+120);
        }
    
    }

    showReady(ready) {
        textSize(60);
        fill(0);
        text("캐릭터가 생성됐어요!", this.posX + 320, this.posY+windowHeight/2);
        fill(0);
        text(this.turn+"P", this.posX+320, this.posY-50);
        textSize(30);
        //뒤집는 버튼
        let letter;
        letter = this.button;
        text(String.fromCharCode((letter.charCodeAt(0))+2)+" to flip", this.posX+50, this.posY-30);

        

        if(ready == 0) {
        textSize(30);
        fill(0);
        text(this.button+"을 눌러 준비하세요", this.posX + 320, this.posY+windowHeight/2 + 100);
        }
        else if(ready == 1) {
        textSize(30);
        fill(0);
        text(this.button+"을 눌러 준비 취소하세요", this.posX + 320, this.posY+windowHeight/2 + 100);
        fill(0, 100);
        rect(this.posX+320, this.posY + 200, 640, 100);
        fill(255);
        textSize(30)
        text("READY", this.posX + 320, this.posY+ 200);
        }

    }


}