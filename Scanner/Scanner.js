let capture;
let img;
let isProcessing = false;

let OCR_pressed;

let singleP;

let playerName = "이름 없음";
let playerId = "";
let playerMajor = "";
let playerDept = "";
let playerCollege = "";

let oldID;
let newID;
let mobileID;

let oldIDicon;
let newIDicon;
let mobileIDicon;

let oldIDphoto;
let newIDphoto;
let mobileIDphoto;

let pressStartIcon;

let selectedCard = 1;

let smallKeyIcon;
let smallArrowIcon;

let ellapsedTime;


//1인 플레이어가 진행할 때 오는 스캐너입니다.

function setup_scanner() {

    isProcessing = false;
    playerName = "이름 없음";
    playerId = null;
    playerMajor = null;
    playerDept = null;
    playerCollege = "";
    OCR_pressed = 0;

    oldID = false;
    newID = true;
    mobileID = false;


    oldIDphoto = loadImage('Asset/UI/CharacterCard/s_card_guide_old.png');
    newIDphoto = loadImage('Asset/UI/CharacterCard/s_card_guide_new.png');
    mobileIDphoto = loadImage('Asset/UI/CharacterCard/s_card_guide_mobile.png');

    oldIDicon = loadImage('Asset/UI/ScannerCards/old_student_icon.png');
    newIDicon = loadImage('Asset/UI/ScannerCards/new_student_icon.png');
    mobileIDicon = loadImage('Asset/UI/CharacterCard/s_card_guide_mobile.png');

    pressStartIcon = loadImage('Asset/UI/ScannerCards/warrior_generation_s_card_scan_1P.png');

    smallKeyIcon = loadImage('Asset/UI/ScannerCards/button_short_bg.png');
    smallArrowIcon = loadImage('Asset/UI/ScannerCards/button_short_bg.png');

    capture = createCapture(VIDEO);
    capture.size(1200, 730);
    capture.hide();
}

function draw_scanner() {
    background(220);

    //스캐너 타이틀
    elapsedTime = millis() / 1000;

    

    if (isProcessing) {
        noTint();
        fill(113, 161, 202);
        textSize(100);
        noStroke();
        textAlign(CENTER);
        text('학생증 스캔중...', width / 2, height /2 - 60);
        text('SCANNING...', width / 2, height /2 + 60);
    } else {
        noTint();
        image(capture, width / 2 - 600, height / 2 - 475);
        noStroke();
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);
 
        //S 카드 정보
       noStroke();
       noFill();
       smallKeyIcon.resize(70, 40);
       noTint();
       image(smallKeyIcon, 90, 450);
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
       smallArrowIcon.resize(40, 40);
       noTint();
       image(smallArrowIcon, width - 320, 550 - smallArrowIcon.height/2);
       noTint();
       image(smallArrowIcon, width - 270, 550 - smallArrowIcon.height/2);
       fill(0);
       text("←  → 키를 이용하여", width - 180, 550);
       text("학생증을 선택해주세요.", width - 180, 600);
      

        //Q를 눌러 스캐닝 시작 버튼
        pressStartIcon.resize(322, 72)
        image(pressStartIcon, 20, height/2 - 265);
       

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

        oldIDicon.resize(200, 120);
        newIDicon.resize(120, 185);
        mobileIDicon.resize(120, 175);

        image(oldIDicon, width/2 - 750, height-170 - oldIDicon.height/2);
        image(newIDicon, width/2 - 180, height-170 - newIDicon.height/2);
        image(mobileIDicon, width/2 + 290, height-170 - mobileIDicon.height/2);
        
        
//투명 학생증 가이드
            if(selectedCard == 1){
                //구 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 - 500 + 120, height-170, 250, 80);
                oldIDphoto.resize(1200, 640);
                tint(255, 90);
                image(oldIDphoto, width/2 - oldIDphoto.width/2, height/2 - 430);
            } else if(selectedCard == 2) {
                //신 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 + 100, height-170, 250, 80);
                newIDphoto.resize(550, 730);
                tint(255, 70);
                image(newIDphoto, width/2 - newIDphoto.width/2, height/2 - newIDphoto.height/2 - 110);   
            } else if(selectedCard == 3) {
                //모바일 학생증
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/2 + 120 + 500, height-170, 350, 80);
                mobileIDphoto.resize(630, 730);
                tint(255, 70);
                image(mobileIDphoto, width/2 - mobileIDphoto.width/2, height/2 - mobileIDphoto.height/2 - 110);   
            }

        if((OCR_pressed > 0 && playerId === null) || (OCR_pressed > 1 && playerDept === null) || (OCR_pressed > 1 && playerId === null && playerDept === null)) {

            fill(227, 66, 86);
            textSize(45);
            noStroke();
            text('캐릭터 생성에 실패했습니다. 다시 시도해주십시오.', width/2, 100);
    
        }
       

    }
// 스캐너가 깜빡이게 하는 코드
    let blinkColor = (floor(elapsedTime) % 2 === 0) ? color(227, 66, 86) : color(113, 161, 202);

    textSize(40);
    textAlign(CENTER);
    noStroke();
    fill(blinkColor);
    text("S C A N N E R", width / 2, 30);

    if (playerId !== null && playerDept !== null) {
        createCharacter();
        if(singleP){
        ChangeScene('ScannerUI'); 
        }
    }



}


function processOCR() {
    Tesseract.recognize(
        img.canvas,
        'kor',
        {
            logger: m => console.log(m) // Progress logger
        }
    ).then(({ data: { text } }) => {
        console.log(text);
        const extractedIDs = extractIDs(text);
        const extractedColleges = extractColleges(text);
        const extractedMajors = extractMajors(text);

        extractedIDs.forEach(id => console.log(`학번: ${id}`));
        extractedColleges.forEach(college => console.log(`대학: ${college}`));
        extractedMajors.forEach(major => console.log(`학과: ${major}`));

        const extractedName = extractName(text);
        console.log(`이름: ${extractedName}`);
        playerName = extractedName;
        playerId = extractedIDs.length > 0 ? extractedIDs[0] : ""; // Choose the first ID if available

        let detectedColleges = [];
        extractedColleges.forEach(college => {
            GetCollegeList().forEach(knownCollege => {
                if (college.includes(knownCollege)) {
                    console.log(`감지된 대학: ${knownCollege}`);
                    detectedColleges.push(knownCollege);
                    playerCollege = knownCollege;
                }
            });
        });

        let detectedMajors = [];
        extractedMajors.forEach(major => {
            GetMajorList().forEach(knownMajor => {
                if (major.includes(knownMajor)) {
                    console.log(`감지된 학과: ${knownMajor}`);
                    detectedMajors.push(knownMajor);
                    playerMajor = knownMajor;
                }
            });
        });

        detectedColleges.forEach(college => {
            detectedMajors.forEach(major => {
                GetDepartmentList().forEach(department => {
                    if (department.includes(college) && department.includes(major)) {
                        console.log(`감지된 전공: ${department}`);
                        playerDept = department;
                    }
                });
            });
        });

        isProcessing = false;
    }).catch(err => {
        console.error(err);
        isProcessing = false;
    });
}

function extractIDs(text) {
    const regex = /\b\d{4}-\d{5}\b/g;
    return text.match(regex) || [];
}

function extractColleges(text) {
    const regex = /[가-힣\s]*대\s*학/g;
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace(/\s+/g, '')); // 공백 제거
}

function extractMajors(text) {
    const regex = /[가-힣\s]*\s*(학\s*과|과)/g;
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace(/\s+/g, '')); // 공백 제거
}

function extractName(text) {
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

function keyPressed_scanner() {
    if (key === 'q') {
        
        if (!isProcessing) {
            isProcessing = true;
            if (selectedCard == 1) {
                // Capture only the red rectangle area
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 260;
                let h = 300;
                img = capture.get(x - (width / 2 - 480) - 10, y - (height / 2 - 360) - 260, w + 90, h + 20);
               // img.save('test', 'png');
            } else if(selectedCard == 3) {
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 400;
                let h = 400;
                img = capture.get(x - (width / 2 - 480) - 100, y - (height / 2 - 360) + 100, w, h - 145);
               // img.save('test', 'png');
            } else if(selectedCard == 2) {
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 300;
                let h = 350;
                img = capture.get(x - (width / 2 - 480) - 200, y - (height / 2 - 360) - 180, w - 80, h - 80);
              //  img.save('test', 'png');
            }
            processOCR();
        }
        OCR_pressed = OCR_pressed + 1;
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

        playerName = c.name;
        playerId = c.id;
        playerDept = c.major;

        createCharacter();

        ChangeScene('ScannerUI'); 
    }

    if (keyCode == LEFT_ARROW || key == 'a') {
        selectedCard = max(1, selectedCard - 1);
        //PlaySEOneShot(piSE, 0.2);
    } else if (keyCode == RIGHT_ARROW || key == 'd') {
        selectedCard = min(3, selectedCard + 1);
        //PlaySEOneShot(piSE, 0.2);
    }
}
function createCharacter() {
        console.log("This is name: "+playerName);
        console.log("This is major: "+playerDept);
        console.log("This is id: "+playerId);
    if (playerId !== null && playerDept !== null) {
        singleP = new Character(playerName, playerId, playerDept);
        
        //글로벌 변수인 캐릭터에 생성된 캐릭터를 assign
        globalPlayer = singleP;
    } else {
        console.log("Try again");
    }
}
