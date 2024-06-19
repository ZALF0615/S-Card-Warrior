let video;
let videoAspectRatio;
let binaryMode = false; // 흑백 모드를 토글하기 위한 플래그
let thresholdValue = 0.5; // 기본 임계값
let capturedImage; // 캡처된 이미지를 저장할 변수
let showCaptured = false; // 캡처된 이미지를 보여줄지 여부
let captureTime; // 캡처된 시간을 저장할 변수

let videoWidth;
let videoHeight;

let rectWidth;
let rectHeight;
let rectX;
let rectY;

function setup_scannerTest() {
    createCanvas(1920, 1080); // FHD 크기의 캔버스를 생성합니다.
    video = createCapture(VIDEO, videoLoaded);
    video.hide();

    isDebugMode = true;
    print_log("디버그 모드 " + (isDebugMode ? "ON" : "OFF"));
    currentSequenceIndex = 0;
}

function videoLoaded() {
    // 웹캠 영상이 로드된 후에 width와 height를 가져올 수 있습니다.
    videoAspectRatio = video.width / video.height;
    print_log("웹캠 비율:", videoAspectRatio);
}

function draw_scannerTest() {
    background(220);

    videoHeight = height;
    videoWidth = videoHeight * videoAspectRatio;



    // 화면 가운데에 사각형 틀을 그립니다.
    stroke(255, 0, 0); // 빨간색 테두리
    noFill();
    strokeWeight(20);

    // 사각형의 크기 설정
    rectWidth = videoWidth * 0.6;
    rectHeight = videoHeight * 0.6;
    rectX = (videoWidth - rectWidth) / 2;
    rectY = (videoHeight - rectHeight) / 2;

    if (!showCaptured || !capturedImage) {
        image(video, 0, 0, videoWidth, videoHeight);

        if (binaryMode) {
            // 흑백 필터를 적용합니다.
            filter(THRESHOLD, thresholdValue);
        }

        rect(rectX, rectY, rectWidth, rectHeight);
    }

    // 캡처된 이미지를 보여줍니다.
    if (showCaptured && capturedImage) {
        image(capturedImage, 0, 0);

        stroke('blue');
        noFill();

        rect(0, 0, capturedImage.width, capturedImage.height);

        if (millis() - captureTime > 5000) {
            showCaptured = false;
        }
    }
}

function keyPressed_scannerTest() {
    if (key === ' ') { // 스페이스바가 눌리면
        captureAndRecognizeText();
    } else if (keyCode === ENTER) { // 엔터키가 눌리면
        toggleBinaryMode();
    } else if (key === 'ArrowUp') { // 화살표 위 키가 눌리면
        adjustThreshold(0.1);
    } else if (key === 'ArrowDown') { // 화살표 아래 키가 눌리면
        adjustThreshold(-0.1);
    }
}

function mousePressed() {
    print_log('mousePressed : ' + mouseX + ', ' + mouseY);

    // 캡처할 영역 설정
    let sx = rectX;
    let sy = rectY;
    let sw = rectWidth;
    let sh = rectHeight;

    let dx = 0;
    let dy = 0;
    let dw = rectWidth;
    let dh = rectHeight;

    let scaled_video_canvas = createGraphics(width, height);
    scaled_video_canvas.image(video, 0, 0, videoWidth, videoHeight);
    scaled_video_img = scaled_video_canvas.get();

    let canvas = createGraphics(rectWidth, rectHeight);
    canvas.image(scaled_video_img, dx, dy, dw, dh, sx, sy, sw, sh);
    // canvas.filter(THRESHOLD, thresholdValue);

    // 해당 캔버스 내용을 이미지로 저장
    capturedImage = canvas.get();

    showCaptured = true;
    captureTime = millis();

    canvas.loadPixels();
    let image64 = canvas.canvas.toDataURL();

    Tesseract.recognize(
        image64,
        'kor',
        {
            logger: m => console.log(m)
        }
    ).then(({ data: { text } }) => {
        print_log("Result: " + text);
    });
}


function toggleBinaryMode() {
    binaryMode = !binaryMode; // 흑백 모드를 토글합니다.
}

function adjustThreshold(amount) {
    thresholdValue = constrain(thresholdValue + amount, 0.0, 1.0); // 임계값을 조정하고 0.0과 1.0 사이로 제한합니다.
    print_log("현재 임계값:" + thresholdValue);
}