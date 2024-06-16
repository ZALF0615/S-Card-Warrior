class Character {
    constructor(name, id, major) {
        this.name = name; // ex) 고수렐리우스
        this.id = id; // ex) 2019-16798
        this.major = major; // ex) 인문대학 국어국문학과
        this.majorIdx = 0;
        this.jobIdx = 0;
        this.subtitle = ""; // ex) 고대의 현자

        this.grade = 0;

        this.hp = 0;
        this.hpMax = 0;

        this.rock = 0;
        this.scissors = 0;
        this.paper = 0;

        this.skillPoint = 0;

        this.initStatus();
    }

    // 규칙에 따라 스탯 분배
    initStatus() {

        this.majorIdx = GetIdxByDepartment(this.major);
        
        if(this.majorIdx === null) {
            console.log("GetIdxByDepartment failed");

            // fill(0);
            // textSize(20);
            // textAlign(CENTER, CENTER);
            // text("캐릭터 생성 실패! 다시 시도해주세요!", width/2, height/2 - 200);

            //this.majorIdx = 86;
        }
     
        
        this.jobIdx = characterData[this.majorIdx].job_idx;
        this.subtitle = characterData[this.majorIdx].title;


        //print_log(`jobIdx : ${this.jobIdx}`);
        //print_log(`subtitle : ${this.subtitle}`);
        

        // 이름의 앞 두글자와 뒤 두글자를 붙여서 직업을 정함
        // 이름에 쓰레기 값이 들어가는 것에 대비해 그냥 학자 이름으로 함
        //this.name = this.name.slice(0, 2) + characterData[this.majorIdx].name;
        this.name = characterData[this.majorIdx].name;

        // 학년
        let degree = parseInt(this.id.charAt(5)); // 학위

        if (degree === 2) {
            this.grade = 5;

        } else if (degree === 3) {
            this.grade = 6;
        }
        else {
            let currentYear = 2024; //현재 연도
            let year = parseInt(this.id.slice(0, 4)); // 입학연도
            this.grade = min(currentYear - year + 1, 4);
        }

        // 체력
        let hp = parseInt(this.id.charAt(9));
        this.hpMax = 30 + 3 * hp;
        this.hp = this.hpMax;

        this.rock = parseInt(this.id.charAt(7));
        this.scissors = parseInt(this.id.charAt(8));
        this.paper = parseInt(this.id.charAt(9));
    }

    describe() {
        console.log(`name : ${this.name}`);
        console.log(`id : ${this.id}`);
        console.log(`majorIdx : ${this.majorIdx}`);
        console.log(`subtitle : ${this.subtitle}`);

        console.log(`grade : ${this.grade}`);
        console.log(`hp : ${this.hp}`);
        console.log(`hpMax : ${this.hpMax}`);
        console.log(`rock : ${this.rock}`);
        console.log(`scissors : ${this.scissors}`);
        console.log(`paper : ${this.paper}`);

        console.log(`skillPoint : ${this.skillPoint}`);
    }
}

// 직업 idx에 따른 스킬 이름과 설명을 반환하는 함수
function getSkillInfo(jobIdx) {
    let skillInfo = {
        name: '',
        description: ''
    };

    switch (jobIdx) {
        case 1: // 현자
            skillInfo.name = "지식의 폭풍";
            skillInfo.description = "데미지를 5만큼 입히고,\n본인 HP가 5만큼 회복됨.";
            break;
        case 2: // 마법사
            skillInfo.name = "원소 폭발";
            skillInfo.description = "상대의 손 +3만큼 \n데미지를 입히고,\n본인 HP가 3만큼 회복됨.";
            break;
        case 3: // 메카파일럿
            skillInfo.name = "메카 변환";
            skillInfo.description = "데미지를 상대의 손\n2배만큼 입힘.";
            break;
        case 4: // 힐러
            skillInfo.name = "회복의 빛";
            skillInfo.description = "데미지를 5만큼 입히고,\n본인 HP가 상대의 손만큼 회복됨.";
            break;
        case 5: // 음유시인
            skillInfo.name = "예술의 선율";
            skillInfo.description = "데미지를 상대의\n잔여 HP 절반만큼 입힘.";
            break;
        case 6: // 탐험가
            skillInfo.name = "탐험의 지혜";
            skillInfo.description = "데미지를 본인\n모든 손의 합만큼 입힘.";
            break;
        case 7: // 드루이드
            skillInfo.name = "자연의 분노";
            skillInfo.description = "데미지를 상대의 손\n+6만큼 입힘.";
            break;
        case 8: // 정보대마왕
            skillInfo.name = "디지털 혼돈";
            skillInfo.description = "데미지를 8~15 사이\n랜덤 값을 입힘.";
            break;
        default:
            skillInfo.name = "Unknown Skill";
            skillInfo.description = "No description available.";
            break;
    }

    return skillInfo;
}