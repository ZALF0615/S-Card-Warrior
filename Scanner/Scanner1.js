let capture1;
let img1;
let isProcessing1 = false;

let p1;

let player1Name = "이름 없음";
let player1Id = "";
let player1Major = "";
let player1Dept = "";
let player1College = "";

//2인 플레이어가 진행할 때 오는 스캐너 중 첫 번째입니다.

function setup_scanner1() {

isProcessing1 = false;
player1Name = "이름 없음";
player1Id = "";
player1Major = "";
player1Dept = "";
player1College = "";

capture1 = createCapture(VIDEO);
capture1.size(640, 480);
capture1.hide();
}

function draw_scanner1() {
    background(220);

    if (isProcessing1) {
        fill(0);
        textSize(50);
        noStroke();
        text('OCR 처리중...', width / 2, height - 50);
    } else {
        image(capture1, width / 2 - 320, height / 2 - 250);
        noStroke();
        fill(0);
        textSize(50);
        text('스페이스바를 눌러 캐릭터를 생성해주세요!', width / 2, height - 200);
        textSize(30);
        text('모바일 혹은 카드 학생증의 학생 정보 부분이 네모 칸에 맞게 조절해주세요.', width / 2, height - 150)
        stroke(120,150,200);
        strokeWeight(5);
        rectMode(CENTER);
        noFill();
        rect(width / 2, height / 2 - 20, 250, 360);
        
    }
   

    if (player1Name !== "이름 없음") {
        createCharacter();
        if (p1 && p1.majorIdx !== null) {
        ChangeScene('ScannerUI');  
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
        const extractedIDs = extractIDs(text);
        const extractedColleges = extractColleges(text);
        const extractedMajors = extractMajors(text);

        extractedIDs.forEach(id => console.log(`학번: ${id}`));
        extractedColleges.forEach(college => console.log(`대학: ${college}`));
        extractedMajors.forEach(major => console.log(`학과: ${major}`));

        const extractedName = extractName(text);
        console.log(`이름: ${extractedName}`);
        player1Name = extractedName;
        player1Id = extractedIDs.length > 0 ? extractedIDs[0] : ""; // Choose the first ID if available

        let detectedColleges = [];
        extractedColleges.forEach(college => {
            GetCollegeList().forEach(knownCollege => {
                if (college.includes(knownCollege)) {
                    console.log(`감지된 대학: ${knownCollege}`);
                    detectedColleges.push(knownCollege);
                    player1College = knownCollege;
                }
            });
        });

        let detectedMajors = [];
        extractedMajors.forEach(major => {
            GetMajorList().forEach(knownMajor => {
                if (major.includes(knownMajor)) {
                    console.log(`감지된 학과: ${knownMajor}`);
                    detectedMajors.push(knownMajor);
                    player1Major = knownMajor;
                }
            });
        });

        detectedColleges.forEach(college => {
            detectedMajors.forEach(major => {
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
    if (key === ' ') {
        if (!isProcessing1) {
            isProcessing1 = true;
            img1 = capture1.get();
            processOCR();
        }
    }
}

function createCharacter1() {
    if (player1Name !== "이름 없음") {
        p1 = new Character(player1Name, player1Id, player1Dept);
        console.log(p1.name);
        console.log(p1.major);
        console.log(p1.id);
    } else {
        console.log("Try again");
    }
}
