class Character {
    constructor(name, id, majorIdx) {
        this.name = name; // ex) 고수렐리우스
        this.id = id; // ex) 2019-16798
        this.majorIdx = majorIdx // ex) 1 (인문대학 국어국문학과)

        this.grade = 0;
        this.attack = 0;
        this.defense = 0;
        this.hp = 0;
        this.skillTurn = 0;

        this.initStatus();
    }

    // 규칙에 따라 스탯 분배
    initStatus() {
        // 학년
        let currentYear = {}//현재 연도
        let year = parseInt(this.id.slice(0, 4)); // 학년
        let degree = parseInt(this.id.charAt(5)) - 1; // 학위 변수 학사(0), 석사(2), 박사(3)
        let rawGrade = max(year - currentYear, 4) // 4학년 이상은 4학년으로 취급
        this.grade = rawGrade + degree;

        // 공격력
        let attack = parseInt(this.id.charAt(6));
        this.attack = attack === 0 ? 10 : attack;

        // 방어력
        let defense = parseInt(this.id.charAt(7));
        this.defense = defense === 0 ? 10 : defense;

        // 체력
        let hp = parseInt(this.id.charAt(8));
        this.hp = (hp === 0 ? 10 : hp) + 15;

        // Skill turn
        let skillTurn = parseInt(this.id.charAt(9));
        if (skillTurn === 0) {
            skillTurn = 10;
        }
        if (skillTurn >= 1 && skillTurn <= 3) {
            this.skillTurn = 2;
        } else if (skillTurn >= 4 && skillTurn <= 7) {
            this.skillTurn = 3;
        } else if (skillTurn >= 8 && skillTurn <= 10) {
            this.skillTurn = 4;
        }
    }
}