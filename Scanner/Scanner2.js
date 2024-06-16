let capture2;
let img2;
let isProcessing2 = false;

let OCR_pressed2;

let p2;

let player2Name = "이름 없음";
let player2Id = "";
let player2Major = "";
let player2Dept = "";
let player2College = "";

let oldID2;
let newID2;
let mobileID2;

let oldIDicon2;
let newIDicon2;
let mobileIDicon2;

let oldIDphoto2;
let newIDphoto2;
let mobileIDphoto2;

let pressStartIcon2;

let selectedCard2 = 1;

let smallKeyIcon2;
let smallArrowIcon2;

let ellapsedTime2;

//2인 플레이어가 진행할 때 오는 스캐너 중 첫 번째입니다.

function setup_scanner2() {

isProcessing2 = false;
player2Name = "이름 없음";
player2Id = null
player2Major = null
player2Dept = null
player2College = "";
OCR_pressed2 = 0;

oldID2 = false;
newID2 = true;
mobileID2 = false;


oldIDphoto2 = loadImage('Asset/UI/CharacterCard/s_card_guide_old.png');
newIDphoto2 = loadImage('Asset/UI/CharacterCard/s_card_guide_new.png');
mobileIDphoto2 = loadImage('Asset/UI/CharacterCard/s_card_guide_mobile.png');

oldIDicon2 = loadImage('Asset/UI/ScannerCards/old_student_icon.png');
newIDicon2 = loadImage('Asset/UI/ScannerCards/new_student_icon.png');
mobileIDicon2 = loadImage('Asset/UI/CharacterCard/s_card_guide_mobile.png');

pressStartIcon2 = loadImage('Asset/UI/ScannerCards/warrior_generation_s_card_scan_1P.png');

smallKeyIcon2 = loadImage('Asset/UI/ScannerCards/button_short_bg.png');
smallArrowIcon2 = loadImage('Asset/UI/ScannerCards/button_short_bg.png');

capture2 = createCapture(VIDEO);
capture2.size(1200, 730);
capture2.hide();
}

function draw_scanner2() {
    background(220);

     //스캐너 타이틀
     ellapsedTime2 = millis() / 1000;

    if (isProcessing2) {
        noTint();
        fill(113, 161, 202);
        textSize(100);
        noStroke();
        textAlign(CENTER);
        text('학생증 스캔중...', width / 2, height /2 - 60);
        text('SCANNING...', width / 2, height /2 + 60);
    } else {
        noTint();
        image(capture2, width / 2 - 600, height / 2 - 475);
        noStroke();
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
 
        //S 카드 정보
       noStroke();
       noFill();
       smallKeyIcon2.resize(70, 40);
       noTint();
       image(smallKeyIcon2, 90, 450);
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
       smallArrowIcon2.resize(40, 40);
       noTint();
       image(smallArrowIcon2, width - 320, 550 - smallArrowIcon2.height/2);
       noTint();
       image(smallArrowIcon2, width - 270, 550 - smallArrowIcon2.height/2);
       fill(0);
       text("←  → 키를 이용하여", width - 180, 550);
       text("학생증을 선택해주세요.", width - 180, 600);
      

        //Q를 눌러 스캐닝 시작 버튼
        pressStartIcon2.resize(322, 72)
        image(pressStartIcon2, 20, height/2 - 265);
       

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

        oldIDicon2.resize(200, 120);
        newIDicon2.resize(120, 185);
        mobileIDicon2.resize(120, 175);

        image(oldIDicon2, width/2 - 750, height-170 - oldIDicon2.height/2);
        image(newIDicon2, width/2 - 180, height-170 - newIDicon2.height/2);
        image(mobileIDicon2, width/2 + 290, height-170 - mobileIDicon2.height/2);
        
        
//투명 학생증 가이드
            if(selectedCard2 == 1){
                //구 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 - 500 + 120, height-170, 250, 80);
                oldIDphoto2.resize(1200, 640);
                tint(255, 90);
                image(oldIDphoto2, width/2 - oldIDphoto2.width/2, height/2 - 430);
            } else if(selectedCard2 == 2) {
                //신 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 + 100, height-170, 250, 80);
                newIDphoto2.resize(550, 730);
                tint(255, 70);
                image(newIDphoto2, width/2 - newIDphoto2.width/2, height/2 - newIDphoto2.height/2 - 110);   
            } else if(selectedCard2 == 3) {
                //모바일 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 + 120 + 500, height-170, 350, 80);
                mobileIDphoto2.resize(630, 730);
                tint(255, 70);
                image(mobileIDphoto2, width/2 - mobileIDphoto2.width/2, height/2 - mobileIDphoto2.height/2 - 110);   
            }

        if((OCR_pressed2 > 0 && player2Id === null) || (OCR_pressed2 > 1 && player2Dept === null) || (OCR_pressed2 > 1 && player2Id === null && player2Dept === null)) {

            fill(227, 66, 86);
            textSize(45);
            noStroke();
            text('캐릭터 생성에 실패했습니다. 다시 시도해주십시오.', width/2, 100);
    
        }
       
        
    }
   

    // 스캐너가 깜빡이게 하는 코드
    let blinkColor2 = (floor(ellapsedTime2) % 2 === 0) ? color(227, 66, 86) : color(113, 161, 202);

    textSize(40);
    textAlign(CENTER);
    noStroke();
    fill(blinkColor2);
    text("S E C O N D S C A N N E R", width / 2, 30);

    if (player2Id !== null && player2Dept !== null) {
        createCharacter2();
        if(p2){
        ChangeScene('ScannerUI2'); 
        }
    }
    
}

function processOCR2() {
    Tesseract.recognize(
        img2.canvas,
        'kor',
        {
            logger: m => console.log(m) // Progress logger
        }
    ).then(({ data: { text } }) => {
        console.log(text);
        const extractedIDs2 = extractIDs2(text);
        const extractedColleges2 = extractColleges2(text);
        const extractedMajors2 = extractMajors2(text);

        extractedIDs2.forEach(id => console.log(`학번: ${id}`));
        extractedColleges2.forEach(college => console.log(`대학: ${college}`));
        extractedMajors2.forEach(major => console.log(`학과: ${major}`));

        const extractedName2 = extractName2(text);
        console.log(`이름: ${extractedName2}`);
        player2Name = extractedName2;
        player2Id = extractedIDs2.length > 0 ? extractedIDs2[0] : ""; // Choose the first ID if available

        let detectedColleges2 = [];
        extractedColleges2.forEach(college => {
            GetCollegeList().forEach(knownCollege => {
                if (college.includes(knownCollege)) {
                    console.log(`감지된 대학: ${knownCollege}`);
                    detectedColleges2.push(knownCollege);
                    player2College = knownCollege;
                }
            });
        });

        let detectedMajors2 = [];
        extractedMajors2.forEach(major => {
            GetMajorList().forEach(knownMajor => {
                if (major.includes(knownMajor)) {
                    console.log(`감지된 학과: ${knownMajor}`);
                    detectedMajors2.push(knownMajor);
                    player2Major = knownMajor;
                }
            });
        });

        detectedColleges2.forEach(college => {
            detectedMajors2.forEach(major => {
                GetDepartmentList().forEach(department => {
                    if (department.includes(college) && department.includes(major)) {
                        console.log(`감지된 전공: ${department}`);
                        player2Dept = department;
                    }
                });
            });
        });

        isProcessing2 = false;
    }).catch(err => {
        console.error(err);
        isProcessing2 = false;
    });
}   

function extractIDs2(text) {
    const regex = /\b\d{4}-\d{5}\b/g;
    return text.match(regex) || [];
}

function extractColleges2(text) {
    const regex = /[가-힣\s]*대\s*학/g;
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace(/\s+/g, '')); // 공백 제거
}

function extractMajors2(text) {
    const regex = /[가-힣\s]*\s*(학\s*과|과)/g;
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace(/\s+/g, '')); // 공백 제거
}

function extractName2(text) {
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

function keyPressed_scanner2() {
    if (key === 'q') {
        
        if (!isProcessing2) {
            isProcessing2 = true;
            if (selectedCard2 == 1) {
                // Capture only the red rectangle area
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 260;
                let h = 300;
                img2 = capture2.get(x - (width / 2 - 480) - 10, y - (height / 2 - 360) - 260, w + 90, h + 20);
               // img.save('test', 'png');
            } else if(selectedCard2 == 3) {
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 400;
                let h = 400;
                img2 = capture2.get(x - (width / 2 - 480) - 100, y - (height / 2 - 360) + 100, w, h - 145);
               // img.save('test', 'png');
            } else if(selectedCard2 == 2) {
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 300;
                let h = 350;
                img2 = capture2.get(x - (width / 2 - 480) - 200, y - (height / 2 - 360) - 180, w - 80, h - 80);
              //  img.save('test', 'png');
            }
            processOCR2();
        }
        OCR_pressed2 = OCR_pressed2 + 1;
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

        player2Name = c.name;
        player2Id = c.id;
        player2Dept = c.major;

        createCharacter2();

        ChangeScene('ScannerUI2'); 
    }

    if (keyCode == LEFT_ARROW || key == 'a') {
        selectedCard2 = max(1, selectedCard2 - 1);
    } else if (keyCode == RIGHT_ARROW || key == 'd') {
        selectedCard2 = min(3, selectedCard2 + 1);
    }
}

function createCharacter2() {
    console.log("This is name: "+player2Name);
    console.log("This is major: "+player2Dept);
    console.log("This is id: "+player2Id);
if (player2Id !== null && player2Dept !== null) {
    p2 = new Character(player2Name, player2Id, player2Dept);
    
    //글로벌 변수인 캐릭터에 생성된 캐릭터를 assign
    globalPlayer2 = p2;
} else {
    console.log("Try again");
}
}
