let capture2;
let img2;
let isProcessing2 = false;

let p2;

let player2Name = "이름 없음";
let player2Id = "";
let player2Major = "";
let player2Dept = "";
let player2College = "";

//2인 플레이어가 진행할 때 오는 스캐너 중 첫 번째입니다.

function setup_scanner2() {

isProcessing2 = false;
player2Name = "이름 없음";
player2Id = "";
player2Major = "";
player2Dept = "";
player2College = "";

capture2 = createCapture(VIDEO);
capture2.size(640, 480);
capture2.hide();
}

function draw_scanner2() {
    background(220);

    if (isProcessing2) {
        fill(0);
        textSize(50);
        noStroke();
        text('OCR 처리중...', width / 2, height - 50);
    } else {
        image(capture2, width / 2 - 320, height / 2 - 250);
        noStroke();
        fill(0);
        textSize(50);
        text('스페이스바를 눌러 두 번째 캐릭터를 생성해주세요!', width / 2, height - 200);
        textSize(30);
        fill(255, 102, 102);
        text('모바일 혹은 카드 학생증의 학생 정보 부분이 네모 칸에 맞게 조절해주세요.', width / 2, height - 150)
        stroke(120,150,200);
        strokeWeight(5);
        rectMode(CENTER);
        noFill();
        rect(width / 2, height / 2 - 20, 250, 360);
        
    }
   

    if (player2Name !== "이름 없음") {
        createCharacter2();
        if (p2 && p2.majorIdx !== null) {
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
    if (key === ' ') {
        if (!isProcessing2) {
            isProcessing2 = true;
            img2 = capture2.get();
            processOCR2();
        }
    }
}

function createCharacter2() {
    if (player2Name !== "이름 없음") {
        p2 = new Character(player2Name, player2Id, player2Dept);
        console.log(p2.name);
        console.log(p2.major);
        console.log(p2.id);
        //글로벌 변수인 캐릭터에 생성된 캐릭터를 assign
        globalPlayer2 = p2;
    } else {
        console.log("Try again");
    }
}
