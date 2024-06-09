let charaAnimations = {};

let currentFrame_1p = 0;
let currentFrame_2p = 0;
let currentAnimation_1p = '준비';
let currentAnimation_2p = '준비';

const jobs = { 1: '현자', 2: '마법사', 8: '현자' }; // 직업 리스트
const animations = ['준비', '데미지', '승리', '패배']; // 애니메이션 이름 리스트

function drawCharacters() {
    // 플레이어 1, 2의 캐릭터를 화면에 그림
    // 플레이어 1은 왼쪽, 플레이어 2는 오른쪽에 위치
    // 플레이어 1은 오른쪽을 바라보고, 플레이어 2는 왼쪽을 바라봄

    let x1 = 460;
    let x2 = width - 460;

    let y = height / 2 + 270;

    // 플레이어 1
    // print_log(`charaAnimations[${job_1p}][${currentAnimation_1p}][${currentFrame_1p}] : ${charaAnimations[job_1p][currentAnimation_1p][currentFrame_1p]}`);

    imageButtom(charaAnimations[jobs[player1.jobIdx]][currentAnimation_1p][currentFrame_1p], x1, y, LEFT);

    // 플레이어 2 (좌우반전)
    push();
    translate(x2, y);
    scale(-1, 1);
    imageButtom(charaAnimations[jobs[player2.jobIdx]][currentAnimation_2p][currentFrame_2p], 0, 0, LEFT);
    pop();

    if (frameCount % 5 === 0) { // 프레임 속도 조절
        currentFrame_1p = (currentFrame_1p + 1) % charaAnimations[jobs[player1.jobIdx]][currentAnimation_1p].length;
        currentFrame_2p = (currentFrame_2p + 1) % charaAnimations[jobs[player1.jobIdx]][currentAnimation_2p].length;
    }

}

function preload_charaAnim() {
    Object.entries(jobs).forEach(([jobIdx, jobName]) => {
        charaAnimations[jobName] = {};
        animations.forEach(anim => {
            charaAnimations[jobName][anim] = [];
            loadFrames(jobName, anim, 0);
        });
    });
}

function loadFrames(job, anim, i) {
    let filePath = `Asset/Character/${job}/${job}_${anim}/${job}_${anim}_${i.toString().padStart(3, '0')}.png`;
    loadImage(filePath, img => {
        // 이미지 로드 성공
        charaAnimations[job][anim].push(img);
        // 다음 프레임 로드
        loadFrames(job, anim, i + 1);
    }, err => {
        // 이미지 로드 실패
        // print_log(`Failed to load: ${filePath}`);
    });
}

let animationTimeout_1p;
let animationTimeout_2p;

function ChangeAnimation(player, anim, duration = 0) {

    if (player === 1) {
        currentAnimation_1p = anim;
        currentFrame_1p = 0;

        if (animationTimeout_1p) {
            clearTimeout(animationTimeout_1p); // 기존 타이머 취소
        }

        if (duration > 0) {
            animationTimeout_1p = setTimeout(() => {
                currentAnimation_1p = '준비';
                currentFrame_1p = 0;
            }, duration * 1000); // duration 초 후에 '준비' 상태로 돌아가게
        }

    } else if (player === 2) {
        currentAnimation_2p = anim;
        currentFrame_2p = 0;

        if (animationTimeout_2p) {
            clearTimeout(animationTimeout_2p); // 기존 타이머 취소
        }

        if (duration > 0) {
            animationTimeout_2p = setTimeout(() => {
                currentAnimation_2p = '준비';
                currentFrame_2p = 0;
            }, duration * 1000); // duration 초 후에 '준비' 상태로 돌아가게
        }
    }
}