let capture1;
let img1;
let isProcessing1 = false;

let OCR_pressed1;

let p1;

let player1Name = "이름 없음";
let player1Id = "";
let player1Major = "";
let player1Dept = "";
let player1College = "";

let oldID1;
let newID1;
let mobileID1;

let oldIDicon1;
let newIDicon1;
let mobileIDicon1;

let oldIDphoto1;
let newIDphoto1;
let mobileIDphoto1;

let pressStartIcon1;

let selectedCard1 = 1;

let smallKeyIcon1;
let smallArrowIcon1;

let ellapsedTime1;

//2인 플레이어가 진행할 때 오는 스캐너 중 첫 번째입니다.

function setup_scanner1() {

isProcessing1 = false;
player1Name = "이름 없음";
player1Id = null
player1Major = null
player1Dept = null
player1College = "";
OCR_pressed1 = 0;

oldID1 = false;
newID1 = true;
mobileID1 = false;


oldIDphoto1 = loadImage('Asset/UI/CharacterCard/s_card_guide_old.png');
newIDphoto1 = loadImage('Asset/UI/CharacterCard/s_card_guide_new.png');
mobileIDphoto1 = loadImage('Asset/UI/CharacterCard/s_card_guide_mobile.png');

oldIDicon1 = loadImage('Asset/UI/ScannerCards/old_student_icon.png');
newIDicon1 = loadImage('Asset/UI/ScannerCards/new_student_icon.png');
mobileIDicon1 = loadImage('Asset/UI/CharacterCard/s_card_guide_mobile.png');

pressStartIcon1 = loadImage('Asset/UI/ScannerCards/warrior_generation_s_card_scan_1P.png');

smallKeyIcon1 = loadImage('Asset/UI/ScannerCards/button_short_bg.png');
smallArrowIcon1 = loadImage('Asset/UI/ScannerCards/button_short_bg.png');

capture1 = createCapture(VIDEO);
capture1.size(1200, 730);
capture1.hide();
}

function draw_scanner1() {
    background(220);

     //스캐너 타이틀
     ellapsedTime1 = millis() / 1000;

    if (isProcessing1) {
        noTint();
        fill(113, 161, 202);
        textSize(100);
        noStroke();
        textAlign(CENTER);
        text('학생증 스캔중...', width / 2, height /2 - 60);
        text('SCANNING...', width / 2, height /2 + 60);
    } else {
        noTint();
        image(capture1, width / 2 - 600, height / 2 - 475);
        noStroke();
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
 
        //S 카드 정보
       noStroke();
       noFill();
       smallKeyIcon1.resize(70, 40);
       noTint();
       image(smallKeyIcon1, 90, 450);
       textSize(23);
       fill(0);
       textAlign(CENTER, CENTER);
       text("S-Card가 인식되지 않을 경우,", 190, 435);
       text("왼쪽  Ctrl  키를 눌러 랜덤한", 190, 470);
       text("카드를 뽑을 수 있습니다.", 190, 505);
       textSize(27);
       fill(227, 66, 86);
       text("학생증이 화면의 가이드에", width - 180, 350);
       text("최대한 정확히", width - 180, 400);
       text("맞게 조절해주세요!", width - 180, 450);
       noFill();
       smallArrowIcon1.resize(40, 40);
       noTint();
       image(smallArrowIcon1, width - 320, 550 - smallArrowIcon1.height/2);
       noTint();
       image(smallArrowIcon1, width - 270, 550 - smallArrowIcon1.height/2);
       fill(0);
       text("←  → 키를 이용하여", width - 180, 550);
       text("학생증을 선택해주세요.", width - 180, 600);
      

        //Q를 눌러 스캐닝 시작 버튼
        pressStartIcon1.resize(322, 72)
        image(pressStartIcon1, 20, height/2 - 265);
       

        //학생증 전환 버튼
        
        fill(113, 161, 202);
        rect(width/2 - 500 + 120, height-170, 250, 80);
        rect(width/2 + 100, height-170, 250, 80);
        rect(width/2 + 120 + 500, height-170, 350, 80);

        textSize(50);
        fill(0);
        text("구 학생증", width/2 - 500 + 120, height-170);
        text("신 학생증", width/2 + 100, height-170);
        text("모바일 학생증", width/2 + 500 + 120, height-170);

        oldIDicon1.resize(200, 120);
        newIDicon1.resize(120, 185);
        mobileIDicon1.resize(120, 175);

        image(oldIDicon1, width/2 - 750, height-170 - oldIDicon1.height/2);
        image(newIDicon1, width/2 - 180, height-170 - newIDicon1.height/2);
        image(mobileIDicon1, width/2 + 290, height-170 - mobileIDicon1.height/2);
        
        
//투명 학생증 가이드
            if(selectedCard1 == 1){
                //구 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 - 500 + 120, height-170, 250, 80);
                oldIDphoto1.resize(1200, 640);
                tint(255, 90);
                image(oldIDphoto1, width/2 - oldIDphoto1.width/2, height/2 - 430);
            } else if(selectedCard1 == 2) {
                //신 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 + 100, height-170, 250, 80);
                newIDphoto1.resize(550, 730);
                tint(255, 70);
                image(newIDphoto1, width/2 - newIDphoto1.width/2, height/2 - newIDphoto1.height/2 - 110);   
            } else if(selectedCard1 == 3) {
                //모바일 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 + 120 + 500, height-170, 350, 80);
                mobileIDphoto1.resize(630, 730);
                tint(255, 70);
                image(mobileIDphoto1, width/2 - mobileIDphoto1.width/2, height/2 - mobileIDphoto1.height/2 - 110);   
            }

        if((OCR_pressed1 > 0 && player1Id === null) || (OCR_pressed1 > 1 && player1Dept === null) || (OCR_pressed1 > 1 && player1Id === null && player1Dept === null)) {

            fill(227, 66, 86);
            textSize(45);
            noStroke();
            text('캐릭터 생성에 실패했습니다. 다시 시도해주십시오.', width/2, 100);
    
        }
       
        
    }
   

    // 스캐너가 깜빡이게 하는 코드
    let blinkColor1 = (floor(ellapsedTime1) % 2 === 0) ? color(227, 66, 86) : color(113, 161, 202);

    textSize(40);
    textAlign(CENTER);
    noStroke();
    fill(blinkColor1);
    text("F I R S T S C A N N E R", width / 2, 30);

    if (player1Id !== null && player1Dept !== null) {
        createCharacter1();
        if(p1){
        ChangeScene('ScannerUI1'); 
        }
    }
    
}

function processOCR1() {
    Tesseract.recognize(
        img1.canvas,
        'kor',
        {
            logger: m => console.log(m) // Progress logger
        }
    ).then(({ data: { text } }) => {
        console.log(text);
        const extractedIDs1 = extractIDs1(text);
        const extractedColleges1 = extractColleges1(text);
        const extractedMajors1 = extractMajors1(text);

        extractedIDs1.forEach(id => console.log(`학번: ${id}`));
        extractedColleges1.forEach(college => console.log(`대학: ${college}`));
        extractedMajors1.forEach(major => console.log(`학과: ${major}`));

        const extractedName1 = extractName1(text);
        console.log(`이름: ${extractedName1}`);
        player1Name = extractedName1;
        player1Id = extractedIDs1.length > 0 ? extractedIDs1[0] : ""; // Choose the first ID if available

        let detectedColleges1 = [];
        extractedColleges1.forEach(college => {
            GetCollegeList().forEach(knownCollege => {
                if (college.includes(knownCollege)) {
                    console.log(`감지된 대학: ${knownCollege}`);
                    detectedColleges1.push(knownCollege);
                    player1College = knownCollege;
                }
            });
        });

        let detectedMajors1 = [];
        extractedMajors1.forEach(major => {
            GetMajorList().forEach(knownMajor => {
                if (major.includes(knownMajor)) {
                    console.log(`감지된 학과: ${knownMajor}`);
                    detectedMajors1.push(knownMajor);
                    player1Major = knownMajor;
                }
            });
        });

        detectedColleges1.forEach(college => {
            detectedMajors1.forEach(major => {
                GetDepartmentList().forEach(department => {
                    if (department.includes(college) && department.includes(major)) {
                        console.log(`감지된 전공: ${department}`);
                        player1Dept = department;
                    }
                });
            });
        });

        isProcessing1 = false;
    }).catch(err => {
        console.error(err);
        isProcessing1 = false;
    });
}   

function extractIDs1(text) {
    const regex = /\b\d{4}-\d{5}\b/g;
    return text.match(regex) || [];
}

function extractColleges1(text) {
    const regex = /[가-힣\s]*대\s*학/g;
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace(/\s+/g, '')); // 공백 제거
}

function extractMajors1(text) {
    const regex = /[가-힣\s]*\s*(학\s*과|과)/g;
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace(/\s+/g, '')); // 공백 제거
}

function extractName1(text) {
    let name = "";
    for (let char of text) {
        if (char.match(/[가-힣]/)) {
            name += char;
            if (name.length === 3) {
                break;
            }
        }
    }
    return name || "이름 없음";
}

function keyPressed_scanner1() {
    if (key === 'q') {
        
        if (!isProcessing1) {
            isProcessing1 = true;
            if (selectedCard1 == 1) {
                // Capture only the red rectangle area
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 260;
                let h = 300;
                img1 = capture1.get(x - (width / 2 - 480) - 10, y - (height / 2 - 360) - 260, w + 90, h + 20);
               // img.save('test', 'png');
            } else if(selectedCard1 == 3) {
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 400;
                let h = 400;
                img1 = capture1.get(x - (width / 2 - 480) - 100, y - (height / 2 - 360) + 100, w, h - 145);
               // img.save('test', 'png');
            } else if(selectedCard1 == 2) {
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 300;
                let h = 350;
                img1 = capture1.get(x - (width / 2 - 480) - 200, y - (height / 2 - 360) - 180, w - 80, h - 80);
              //  img.save('test', 'png');
            }
            processOCR1();
        }
        OCR_pressed1 = OCR_pressed1 + 1;
    }

    // 랜덤한 카드 뽑기(왼쪽 컨트롤)
    if (keyCode === CONTROL) {

        // 랜덤한 네 자리 수
        let r = random(1000, 10000);

        let randomCharacter_1 = new Character("노르", `2019-1${r}`, "인문대학 언어학과");
        let randomCharacter_2 = new Character("테이", `2020-1${r}`, "사회과학대학 사회학과");
        let randomCharacter_3 = new Character("피아", `2021-1${r}`, "인문대학 미학과");
        let randomCharacter_4 = new Character("마르", `2022-1${r}`, "자연과학대학 화학부");
        let randomCharacter_5 = new Character("이브", `2023-1${r}`, "연합전공 정보문화학");

        let c = random([randomCharacter_1, randomCharacter_2, randomCharacter_3, randomCharacter_4, randomCharacter_5]);

        player1Name = c.name;
        player1Id = c.id;
        player1Dept = c.major;

        createCharacter1();

        ChangeScene('ScannerUI1'); 
    }

    if (keyCode == LEFT_ARROW || key == 'a') {
        selectedCard1 = max(1, selectedCard1 - 1);
    } else if (keyCode == RIGHT_ARROW || key == 'd') {
        selectedCard1 = min(3, selectedCard1 + 1);
    }
}

function createCharacter1() {
    console.log("This is name: "+player1Name);
    console.log("This is major: "+player1Dept);
    console.log("This is id: "+player1Id);
if (player1Id !== null && player1Dept !== null) {
    p1 = new Character(player1Name, player1Id, player1Dept);
    
    //글로벌 변수인 캐릭터에 생성된 캐릭터를 assign
    globalPlayer1 = p1;
} else {
    console.log("Try again");
}
}
