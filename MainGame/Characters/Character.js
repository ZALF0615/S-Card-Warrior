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
            print_log(`GetIdxByDepartment failed`);
            this.majorIdx = 86;
        }
        
        this.jobIdx = characterData[this.majorIdx].job_idx;
        this.subtitle = characterData[this.majorIdx].title;


        print_log(`jobIdx : ${this.jobIdx}`);
        print_log(`subtitle : ${this.subtitle}`);

        // 이름의 앞 두글자와 뒤 두글자를 붙여서 직업을 정함
        this.name = this.name.slice(0, 2) + characterData[this.majorIdx].name;

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