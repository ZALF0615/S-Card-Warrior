let capture;
let img;
let isProcessing = false;

//2인 플레이어가 진행하는 게임 스캐너 중 두 번째입니다.

function setup_scanner() {
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();
}

function draw_scanner() {
    background(22, 100, 100);

    if (isProcessing) {
        text('OCR 처리중...', width / 2, height - 20);
    } else {
        image(capture, 0, 0);
        text('스페이스바를 눌러 OCR 처리', width / 2, height - 20);
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
        print(text);
        const extractedIDs = extractIDs(text);
        const extractedColleges = extractColleges(text);
        const extractedMajors = extractMajors(text);

        extractedIDs.forEach(id => print(`학번: ${id}`));
        extractedColleges.forEach(college => print(`대학: ${college}`));
        extractedMajors.forEach(major => print(`학과: ${major}`));

        // 텍스트에서 첫 번째 한글 세 글자 단어 추출 (중간에 공백이 있을 가능성 고려)
        const extractedName = extractName(text);
        print(`이름: ${extractedName}`);

        // extractedCollege 문자열 안에 GetCollegeList()안에 있는 요소가 포함되어 있다면 따로 출력
        let detectedColleges = [];
        extractedColleges.forEach(college => {
            GetCollegeList().forEach(knownCollege => {
                if (college.includes(knownCollege)) {
                    print(`감지된 대학: ${knownCollege}`);
                    detectedColleges.push(knownCollege);
                }
            });
        });

        let detectedMajors = [];
        // extractedMajor 문자열 안에 GetMajorList()안에 있는 요소가 포함되어 있다면 따로 출력
        extractedMajors.forEach(major => {
            GetMajorList().forEach(knownMajor => {
                if (major.includes(knownMajor)) {
                    print(`감지된 학과: ${knownMajor}`);
                    detectedMajors.push(knownMajor);
                }
            });
        });

        // 감지된 대학과 학과가 모두 일치하는 전공이 있다면 출력
        // GetDepartmentList()안에 있는 요소와 일치하는지 확인 ex) 대학: '컴퓨터공학', 학과: '컴퓨터공학과' 일 경우, '컴퓨터공학 컴퓨터공학과'가 모두 일치하는지 확인
        detectedColleges.forEach(college => {
            detectedMajors.forEach(major => {
                GetDepartmentList().forEach(department => {
                    if (department.includes(college) && department.includes(major)) {
                        print(`감지된 전공: ${department}`);
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
}