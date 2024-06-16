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

    capture = createCapture(VIDEO);
    capture.size(800, 540);
    capture.hide();
}

function draw_scanner() {
    background(220);

    if (isProcessing) {
        noTint();
        fill(0);
        textSize(50);
        noStroke();
        text('학생증 스캔중...', width / 2, height /2);
    } else {
        noTint();
        image(capture, width / 2 - 400, height / 2 - 240);
        noStroke();
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);

        //text('스페이스바를 눌러 캐릭터를 생성해주세요!', width / 2, height - 100);
        image(pressStartIcon, width / 2 - pressStartIcon.width/2, height - 100 - pressStartIcon.height/2);
        textSize(30);
        fill(255, 102, 102);
        text('모바일 혹은 카드 학생증의 학생 정보 부분이 네모 칸에 맞게 조절해주세요.', width / 2, 150)

        //학생증 전환 버튼
        
        fill(113, 161, 202);
        rect(width/8, height/2 - 100, 300, 80);

        rect(width/8, height/2 + 100, 300, 80);
        
        rect(width - width/8, height/2 + 20, 320, 120);
        textSize(50);
        fill(0);
        text("구 학생증", width/8, height/2-100);
        text("신 학생증", width/8, height/2+100);
        text("모바일 학생증", width - width/8, height/2 + 20);

        oldIDicon.resize(200, 120);
        newIDicon.resize(120, 200);
        mobileIDicon.resize(120, 200);

        image(oldIDicon, width/8 - oldIDicon.width/2, height/2 - 160 - oldIDicon.height);
        image(newIDicon, width/8 - newIDicon.width/2, height/2 + 160);
        image(mobileIDicon, width - width/8 - mobileIDicon.width/2, height/2 - 60 - mobileIDicon.height);
        
        

            if(oldID){
            //투명한 학생증
            noTint();
            noFill();
            stroke(227, 66, 86);
            strokeWeight(10);
            rect(width/8, height/2 - 100, 310, 90);
            oldIDphoto.resize(708, 400);
            tint(255, 90);
            image(oldIDphoto, width/2 - oldIDphoto.width/2, height/2 - 210);
            //stroke(227, 66, 86);
            //strokeWeight(10);
            //rect(width/2 + 75, height/2 - 25, 200, 220);
            } else if(newID) {
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width/8, height/2 + 100, 310, 90);
                newIDphoto.resize(380, 540);
                tint(255, 70);
                image(newIDphoto, width/2 - newIDphoto.width/2, height/2 - newIDphoto.height/2 + 27);
                //stroke(227, 66, 86);
                //strokeWeight(10);
                //rect(width/2 - 115, height/2 + 50, 315, 280);    
            } else if(mobileID) {
                noTint();
                noFill();
                stroke(227, 66, 86);
                strokeWeight(10);
                rect(width - width/8, height/2 + 20, 330, 130);
                mobileIDphoto.resize(420, 520);
                tint(255, 70);
                image(mobileIDphoto, width/2 - mobileIDphoto.width/2, height/2 - mobileIDphoto.height/2 + 25);
                //stroke(227, 66, 86);
                //strokeWeight(10);
                //rect(width/2 + 75, height/2 + 65, 320, 180);
                
            }

        if((OCR_pressed > 0 && playerId === null) || (OCR_pressed > 1 && playerDept === null) || (OCR_pressed > 1 && playerId === null && playerDept === null)) {

            fill(0);
            textSize(45);
            noStroke();
            text('캐릭터 생성에 실패했습니다. 다시 시도해주십시오.', width/2, 100);
    
        }
       

    }

   

    if (playerId !== null && playerDept !== null) {
        createCharacter();
        if(singleP){
        ChangeScene('ScannerUI'); 
        }
    }
   
  

    // S-Card가 잘 인식되지 않을 경우, 왼쪽 컨트롤 키를 눌러 랜덤한 카드를 뽑을 수 있습니다. 라고 텍스트 안내 (좌측 상단)
    fill(0);
    textSize(30);
    noStroke();

    text("S-Card가 잘 인식되지 않을 경우, 왼쪽 컨트롤 키를 눌러 랜덤한 카드를 뽑을 수 있습니다.", width / 2, 20);


    //S-Card 별로 UI바꾸기

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
            if (oldID) {
                // Capture only the red rectangle area
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 200;
                let h = 220;
                img = capture.get(x - (width / 2 - 480) - 190, y - (height / 2 - 360) - 250, w, h - 40);
                img.save('test', 'png');
            } else if(mobileID) {
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 200;
                let h = 220;
                img = capture.get(x - (width / 2 - 480) - 230, y - (height / 2 - 360) + 50, w, h - 145);
                img.save('test', 'png');
            } else if(newID) {
                let x = width / 2 + 75;
                let y = height / 2 - 25;
                let w = 200;
                let h = 180;
                img = capture.get(x - (width / 2 - 480) - 345, y - (height / 2 - 360) - 220, w, h);
                img.save('test', 'png');
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

function mouseClicked_scanner(){

    if(width/8 <= mouseX && mouseX <= width/8+300 && height/2 - 100 <= mouseY && mouseY <= height/2 - 20){
        oldID = true;
        newID = false;
        mobileID = false;
        }
    if(width/8 <= mouseX && mouseX <= width/8+300 && height/2 + 100 <= mouseY && mouseY <= height/2 + 180){
        oldID = false;
        newID = true;
        mobileID = false;
    }
     if(width - width/8 <= mouseX && mouseX <= width - width/8+320 && height/2 + 20 <= mouseY && mouseY <= height/2 + 140){
        oldID = false;
        newID = false;
        mobileID = true;
    }
}