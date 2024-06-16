let charaAnimations = {};
let skillSEs = {};

let currentFrame_1p = 0;
let currentFrame_2p = 0;
let currentAnimation_1p = '준비';
let currentAnimation_2p = '준비';

let animSpeed_1p = 7; // 5프레임에 한번씩 움직임 (커질수록 느려짐)
let animSpeed_2p = 7; // 5프레임에 한번씩 움직임 (커질수록 느려짐)

const jobs = { 1: '현자', 2: '마법사', 3: '메카파일럿', 4: '힐러', 5: '음유시인', 6: '탐험가', 7: '드루이드', 8: '정보대마왕' }; // 직업 리스트
const animations = ['준비', '데미지', '승리', '패배', '공격', '바위_성공', '바위_실패', '가위_성공', '가위_실패', '보_성공', '보_실패', '특수스킬'];

function drawCharacters() {
    // 플레이어 1, 2의 캐릭터를 화면에 그림
    // 플레이어 1은 왼쪽, 플레이어 2는 오른쪽에 위치
    // 플레이어 1은 오른쪽을 바라보고, 플레이어 2는 왼쪽을 바라봄

    let x1 = 450;
    let x2 = width - 450;

    let y = height / 2 + 300;

    // 플레이어 1
    // print_log(`charaAnimations[${job_1p}][${currentAnimation_1p}][${currentFrame_1p}] : ${charaAnimations[job_1p][currentAnimation_1p][currentFrame_1p]}`);

    imageButtom(charaAnimations[jobs[player1.jobIdx]][currentAnimation_1p][currentFrame_1p], x1, y, LEFT);

    // 플레이어 2 (좌우반전)
    push();
    translate(x2, y);
    scale(-1, 1);
    imageButtom(charaAnimations[jobs[player2.jobIdx]][currentAnimation_2p][currentFrame_2p], 0, 0, LEFT);
    pop();

    if (frameCount % animSpeed_1p === 0) {
        currentFrame_1p = (currentFrame_1p + 1) % charaAnimations[jobs[player1.jobIdx]][currentAnimation_1p].length;
    }

    if (frameCount % animSpeed_2p === 0) {
        currentFrame_2p = (currentFrame_2p + 1) % charaAnimations[jobs[player2.jobIdx]][currentAnimation_2p].length;
    }

}

let imagesToLoad = 0;
let imagesLoaded = 0;
let onLoadCompleteCallback = null;

let isLoadedCharaAnim = [];

function preload_charaAnim(jobIdx) {

    if (!isLoadedCharaAnim[jobIdx]) {

        const jobName = jobs[jobIdx];
        charaAnimations[jobName] = {};
        animations.forEach(anim => {
            charaAnimations[jobName][anim] = [];
            loadFrames(jobName, anim, 0);
        });

        // Skill SE
        skillSEs[jobIdx] = loadSound(`Asset/Audio/SE/skillSE_${jobName}.wav`);

        isLoadedCharaAnim[jobIdx] = true;
        return true;
    }else{
        return false;
    }
}

function loadFrames(job, anim, i) {
    let filePath = `Asset/Character/${job}/${job}_${anim}/F${i.toString()}.png`;
    imagesToLoad++; // 로드할 이미지의 수 증가
    loadImage(filePath, img => {
        // 이미지 로드 성공
        charaAnimations[job][anim].push(img);
        imagesLoaded++; // 로드된 이미지의 수 증가
        if (imagesLoaded === imagesToLoad && onLoadCompleteCallback) {
            onLoadCompleteCallback();
        }
        // 다음 프레임 로드
        loadFrames(job, anim, i + 1);
    }, err => {
        // 이미지 로드 실패
        imagesToLoad--; // 실패 시 로드할 이미지 수 감소
        if (imagesLoaded === imagesToLoad && onLoadCompleteCallback) {
            onLoadCompleteCallback();
        }
    });
}


let animationTimeout_1p;
let animationTimeout_2p;

function ChangeAnimation(player, anim, duration = 0) {
    print_log(`ChangeAnimation(${player}, ${anim}, ${duration})`);

    if (player === 1) {
        currentAnimation_1p = anim;
        currentFrame_1p = 0;

        animSpeed_1p = GetAnimSpeed(anim);

        if (animationTimeout_1p) {
            clearTimeout(animationTimeout_1p); // 기존 타이머 취소
        }

        if (duration > 0) {
            animationTimeout_1p = setTimeout(() => {
                currentAnimation_1p = '준비';
                currentFrame_1p = 0;
            }, duration * 1000); // duration 초 후에 '준비' 상태로 돌아가게
        }

        if (duration == -1) { // duration이 -1이면 애니메이션 시간을 계산하여 종료 후 준비 상태로 돌아감
            let anim_framecount = charaAnimations[jobs[player1.jobIdx]][anim].length; // 애니메이션 프레임 수
            duration = anim_framecount * animSpeed_1p / 60 * 1000; // 애니메이션 시간 계산
            animationTimeout_1p = setTimeout(() => {
                ChangeAnimation(1, '준비');
            }, duration); // duration (ms) 후에 '준비' 상태로 돌아가게
        }

    } else if (player === -1) {
        currentAnimation_2p = anim;
        currentFrame_2p = 0;

        animSpeed_2p = GetAnimSpeed(anim);

        if (animationTimeout_2p) {
            clearTimeout(animationTimeout_2p); // 기존 타이머 취소
        }

        if (duration > 0) {
            animationTimeout_2p = setTimeout(() => {
                currentAnimation_2p = '준비';
                currentFrame_2p = 0;
            }, duration * 1000); // duration 초 후에 '준비' 상태로 돌아가게
        }

        if (duration == -1) { // duration이 -1이면 애니메이션 시간을 계산하여 종료 후 준비 상태로 돌아감
            let anim_framecount = charaAnimations[jobs[player2.jobIdx]][anim].length; // 애니메이션 프레임 수
            duration = anim_framecount * animSpeed_2p / 60 * 1000; // 애니메이션 시간 계산
            animationTimeout_2p = setTimeout(() => {
                ChangeAnimation(-1, '준비');
            }, duration); // duration (ms) 후에 '준비' 상태로 돌아가게
        }
    }
}

function GetAnimSpeed(anim) {
    switch (anim) {
        case '준비':
            return 7;
        case '데미지':
            return 5;
        case '승리':
            return 7;
        case '패배':
            return 7;
        case '가위_성공':
            return 5;
        case '바위_성공':
            return 5;
        case '보_성공':
            return 5;
        case '가위_실패':
            return 5;
        case '바위_실패':
            return 5;
        case '보_실패':
            return 5;
        case '특수스킬':
            return 5;
    }
}