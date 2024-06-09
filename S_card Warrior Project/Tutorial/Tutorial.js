let tutorial_images = [];
let tutorial_index = 0;

let img;

let dataLoaded = false;

setup_tutorial = function () {
    if (!dataLoaded) {
        preload_tutorial();
    }
}

draw_tutorial = function () {

    background(0);

    if (tutorial_index < tutorial_images.length) {
        imageCenter(tutorial_images[tutorial_index], width / 2, height / 2, width * 0.9, height * 0.9);

        // 스페이스바를 눌러 넘기기 텍스트
        fill(255);
        textSize(20);
        noStroke();
        textAlign(RIGHT, BOTTOM);
        if (tutorial_index == tutorial_images.length - 1) {
            text('SPACE를 눌러 타이틀로 돌아가기', width - 10, height - 15);
        } else {
            text('SPACE를 눌러 넘기기', width - 10, height - 15);
        }

        // 화면 밑에 페이지 수 출력
        fill(255);
        textSize(20);
        noStroke();
        textAlign(CENTER, BOTTOM);
        text(`${tutorial_index + 1}/${tutorial_images.length}`, width / 2, height - 20);


    } else {
        ChangeScene("Title");

        // 변수 초기화
        tutorial_index = 0;
    }
}

keyPressed_tutorial = function () {
    if (key === ' ') {
        tutorial_index++;
    }
}

preload_tutorial = function () {
    for (let i = 1; i <= 10; i++) {
        tutorial_images.push(loadImage(`Asset/Tutorial/${i}.png`));
        print_log(`Loaded: Asset/Tutorial/${i}.png`);
    }
}
