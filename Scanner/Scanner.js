let capture;
let img;
let isProcessing = false;

let singleP;

let playerName = "이름 없음";
let playerId = "";
let playerMajor = "";
let playerDept = "";
let playerCollege = "";


//1인 플레이어가 진행할 때 오는 스캐너입니다.

function setup_scanner() {

    isProcessing = false;
    playerName = "이름 없음";
    playerId = "";
    playerMajor = "";
    playerDept = "";
    playerCollege = "";

    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();
}

function draw_scanner() {
    background(220);

    if (isProcessing) {
        fill(0);
        textSize(50);
        noStroke();
        text('OCR 처리중...', width / 2, height - 50);
    } else {
        image(capture, width / 2 - 320, height / 2 - 250);
        noStroke();
        fill(0);
        textSize(50);
        textAlign(CENTER, CENTER);

        text('스페이스바를 눌러 캐릭터를 생성해주세요!', width / 2, height - 200);
        textSize(30);
        fill(255, 102, 102);
        text('모바일 혹은 카드 학생증의 학생 정보 부분이 네모 칸에 맞게 조절해주세요.', width / 2, height - 150)
        stroke(255, 102, 102);
        strokeWeight(5);
        rectMode(CENTER);
        noFill();
        rect(width / 2, height / 2 - 20, 250, 360);

    }


    if (playerName !== "이름 없음") {
        createCharacter();
        if (singleP && singleP.majorIdx !== null) {
            ChangeScene('ScannerUI');
        }
    }

    // S-Card가 잘 인식되지 않을 경우, 왼쪽 컨트롤 키를 눌러 랜덤한 카드를 뽑을 수 있습니다. 라고 텍스트 안내 (좌측 상단)
    fill(0);
    textSize(20);
    noStroke();

    text("S-Card가 잘 인식되지 않을 경우, 왼쪽 컨트롤 키를 눌러 랜덤한 카드를 뽑을 수 있습니다.", width / 2, 10);

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
    if (key === ' ') {
        if (!isProcessing) {
            isProcessing = true;
            img = capture.get();
            processOCR();
        }
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
    }
}
function createCharacter() {
    if (playerName !== "이름 없음") {
        singleP = new Character(playerName, playerId, playerDept);
        console.log(singleP.name);
        console.log(singleP.major);
        console.log(singleP.id);
        //글로벌 변수인 캐릭터에 생성된 캐릭터를 assign
        globalPlayer = singleP;
    } else {
        console.log("Try again");
    }
}
