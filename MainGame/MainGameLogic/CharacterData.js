const characterData = {
    1: { department: "인문대학 국어국문학과", college: "인문대학", major: "국어국문학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    2: { department: "인문대학 영어영문학과", college: "인문대학", major: "영어영문학과", job: "현자", title: "고대의 현자", name: "셰익스피어", job_idx: 1 },
    3: { department: "인문대학 독어독문학과", college: "인문대학", major: "독어독문학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    4: { department: "인문대학 불어불문학과", college: "인문대학", major: "불어불문학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    5: { department: "인문대학 중어중문학과", college: "인문대학", major: "중어중문학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    6: { department: "인문대학 노어노문학과", college: "인문대학", major: "노어노문학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    7: { department: "인문대학 서어서문학과", college: "인문대학", major: "서어서문학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    8: { department: "인문대학 언어학과", college: "인문대학", major: "언어학과", job: "현자", title: "고대의 현자", name: "춈스키", job_idx: 1 },
    9: { department: "인문대학 아시아언어문명학부", college: "인문대학", major: "아시아언어문명학부", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    10: { department: "인문대학 역사학부", college: "인문대학", major: "역사학부", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    11: { department: "인문대학 철학과", college: "인문대학", major: "철학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    12: { department: "인문대학 고고미술사학과", college: "인문대학", major: "고고미술사학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    13: { department: "인문대학 종교학과", college: "인문대학", major: "종교학과", job: "현자", title: "고대의 현자", name: "소크라테스", job_idx: 1 },
    14: { department: "사범대학 교육학과", college: "사범대학", major: "교육학과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    15: { department: "사범대학 국어교육과", college: "사범대학", major: "국어교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    16: { department: "사범대학 영어교육과", college: "사범대학", major: "영어교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    17: { department: "사범대학 불어교육과", college: "사범대학", major: "불어교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    18: { department: "사범대학 독어교육과", college: "사범대학", major: "독어교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    19: { department: "사범대학 사회교육과", college: "사범대학", major: "사회교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    20: { department: "사범대학 역사교육과", college: "사범대학", major: "역사교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    21: { department: "사범대학 지리교육과", college: "사범대학", major: "지리교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    22: { department: "사범대학 윤리교육과", college: "사범대학", major: "윤리교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    23: { department: "사범대학 수학교육과", college: "사범대학", major: "수학교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    24: { department: "사범대학 물리교육과", college: "사범대학", major: "물리교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    25: { department: "사범대학 화학교육과", college: "사범대학", major: "화학교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    26: { department: "사범대학 생물교육과", college: "사범대학", major: "생물교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    27: { department: "사범대학 지구과학교육과", college: "사범대학", major: "지구과학교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    28: { department: "사범대학 체육교육과", college: "사범대학", major: "체육교육과", job: "현자", title: "교육의 현자", name: "몬테소리", job_idx: 1 },
    29: { department: "경영대학 경영학과", college: "경영대학", major: "경영학과", job: "현자", title: "자본의 현자", name: "카네기", job_idx: 1 },
    30: { department: "자연과학대학 수리과학부", college: "자연과학대학", major: "수리과학부", job: "마법사", title: "생명의 마법사", name: "찰스다윈", job_idx: 2 },
    31: { department: "자연과학대학 통계학과", college: "자연과학대학", major: "통계학과", job: "마법사", title: "생명의 마법사", name: "찰스다윈", job_idx: 2 },
    32: { department: "자연과학대학 생명과학부", college: "자연과학대학", major: "생명과학부", job: "마법사", title: "생명의 마법사", name: "찰스다윈", job_idx: 2 },
    33: { department: "자연과학대학 지구환경과학부", college: "자연과학대학", major: "지구환경과학부", job: "마법사", title: "생명의 마법사", name: "찰스다윈", job_idx: 2 },
    34: { department: "자연과학대학 물리천문학부", college: "자연과학대학", major: "물리천문학부", job: "마법사", title: "중력 마법사", name: "뉴턴", job_idx: 2 },
    35: { department: "자연과학대학 화학부", college: "자연과학대학", major: "화학부", job: "마법사", title: "연금 마법사", name: "알케미아", job_idx: 2 },
    36: { department: "공과대학 전기정보공학부", college: "공과대학", major: "전기정보공학부", job: "메카 파일럿", title: "전기의 수호자", name: "파라데이", job_idx: 3 },
    37: { department: "공과대학 컴퓨터공학부", college: "공과대학", major: "컴퓨터공학부", job: "메카 파일럿", title: "인공지능 해커", name: "챗지피티", job_idx: 3 },
    38: { department: "공과대학 화학생물공학부", college: "공과대학", major: "화학생물공학부", job: "메카 파일럿", title: "화학의 장인", name: "라부아지에", job_idx: 3 },
    39: { department: "공과대학 재료공학부", college: "공과대학", major: "재료공학부", job: "메카 파일럿", title: "화학의 장인", name: "라부아지에", job_idx: 3 },
    40: { department: "공과대학 에너지자원공학과", college: "공과대학", major: "에너지자원공학과", job: "메카 파일럿", title: "화학의 장인", name: "라부아지에", job_idx: 3 },
    41: { department: "공과대학 원자핵공학과", college: "공과대학", major: "원자핵공학과", job: "메카 파일럿", title: "화학의 장인", name: "라부아지에", job_idx: 3 },
    42: { department: "공과대학 산업공학과", college: "공과대학", major: "산업공학과", job: "메카 파일럿", title: "기계의 전사", name: "테슬라", job_idx: 3 },
    43: { department: "공과대학 기계항공공학부", college: "공과대학", major: "기계항공공학부", job: "메카 파일럿", title: "기계의 전사", name: "테슬라", job_idx: 3 },
    44: { department: "공과대학 조선해양공학과", college: "공과대학", major: "조선해양공학과", job: "메카 파일럿", title: "기계의 전사", name: "테슬라", job_idx: 3 },
    45: { department: "공과대학 항공우주공학과", college: "공과대학", major: "항공우주공학과", job: "메카 파일럿", title: "기계의 전사", name: "테슬라", job_idx: 3 },
    46: { department: "공과대학 건설환경공학부", college: "공과대학", major: "건설환경공학부", job: "메카 파일럿", title: "건설의 설계자", name: "가우디", job_idx: 3 },
    47: { department: "공과대학 건축학과", college: "공과대학", major: "건축학과", job: "메카 파일럿", title: "건설의 설계자", name: "가우디", job_idx: 3 },
    48: { department: "의과대학 의학과", college: "의과대학", major: "의학과", job: "힐러", title: "의술의 치유자", name: "히포크라테스", job_idx: 4 },
    49: { department: "의과대학 의예과", college: "의과대학", major: "의예과", job: "힐러", title: "의술의 치유자", name: "히포크라테스", job_idx: 4 },
    50: { department: "치과대학 치의학과", college: "치과대학", major: "치의학과", job: "힐러", title: "의술의 치유자", name: "히포크라테스", job_idx: 4 },
    51: { department: "약학대학 약학과", college: "약학대학", major: "약학과", job: "힐러", title: "약물의 연금술사", name: "플레밍", job_idx: 4 },
    52: { department: "수의과대학 수의학과", college: "수의과대학", major: "수의학과", job: "힐러", title: "동물의 구원자", name: "제인구달", job_idx: 4 },
    53: { department: "간호대학", college: "간호대학", major: "-", job: "힐러", title: "흰옷의 천사", name: "나이팅게일", job_idx: 4 },
    54: { department: "음악대학 작곡과", college: "음악대학", major: "작곡과", job: "음유시인", title: "선율의 음유시인", name: "베토벤", job_idx: 5 },
    55: { department: "음악대학 성악과", college: "음악대학", major: "성악과", job: "음유시인", title: "선율의 음유시인", name: "베토벤", job_idx: 5 },
    56: { department: "음악대학 음악학과", college: "음악대학", major: "음악학과", job: "음유시인", title: "선율의 음유시인", name: "베토벤", job_idx: 5 },
    57: { department: "음악대학 피아노과", college: "음악대학", major: "피아노과", job: "음유시인", title: "선율의 음유시인", name: "베토벤", job_idx: 5 },
    58: { department: "음악대학 관현악과", college: "음악대학", major: "관현악과", job: "음유시인", title: "선율의 음유시인", name: "베토벤", job_idx: 5 },
    59: { department: "음악대학 국악과", college: "음악대학", major: "국악과", job: "음유시인", title: "선율의 음유시인", name: "베토벤", job_idx: 5 },
    60: { department: "미술대학 공예과", college: "미술대학", major: "공예과", job: "음유시인", title: "화폭의 음유시인", name: "피카소", job_idx: 5 },
    61: { department: "미술대학 동양화과", college: "미술대학", major: "동양화과", job: "음유시인", title: "화폭의 음유시인", name: "피카소", job_idx: 5 },
    62: { department: "미술대학 서양화과", college: "미술대학", major: "서양화과", job: "음유시인", title: "화폭의 음유시인", name: "피카소", job_idx: 5 },
    63: { department: "미술대학 조소과", college: "미술대학", major: "조소과", job: "음유시인", title: "화폭의 음유시인", name: "피카소", job_idx: 5 },
    64: { department: "미술대학 디자인과", college: "미술대학", major: "디자인과", job: "음유시인", title: "화폭의 음유시인", name: "피카소", job_idx: 5 },
    65: { department: "인문대학 미학과", college: "인문대학", major: "미학과", job: "음유시인", title: "화폭의 음유시인", name: "바움가르텐", job_idx: 5 },
    66: { department: "생활과학대학 소비자아동학부", college: "생활과학대학", major: "소비자아동학부", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    67: { department: "사회과학대학 정치외교학부", college: "사회과학대학", major: "정치외교학부", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    68: { department: "사회과학대학 경제학부", college: "사회과학대학", major: "경제학부", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    69: { department: "사회과학대학 사회학과", college: "사회과학대학", major: "사회학과", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    70: { department: "사회과학대학 인류학과", college: "사회과학대학", major: "인류학과", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    71: { department: "사회과학대학 심리학과", college: "사회과학대학", major: "심리학과", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    72: { department: "사회과학대학 지리학과", college: "사회과학대학", major: "지리학과", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    73: { department: "사회과학대학 사회복지학과", college: "사회과학대학", major: "사회복지학과", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    74: { department: "사회과학대학 언론정보학과", college: "사회과학대학", major: "언론정보학과", job: "탐험가", title: "사회적 탐구가", name: "마르크스", job_idx: 6 },
    75: { department: "생활과학대학 식품영양학과", college: "생활과학대학", major: "식품영양학과", job: "탐험가", title: "생활의 모험가", name: "에어하트", job_idx: 6 },
    76: { department: "생활과학대학 의류학과", college: "생활과학대학", major: "의류학과", job: "탐험가", title: "생활의 모험가", name: "에어하트", job_idx: 6 },
    77: { department: "자유전공학부", college: "자유전공학부", major: "-", job: "탐험가", title: "자유로운 방랑자", name: "해밍웨이", job_idx: 6 },
    78: { department: "첨단융합학부", college: "첨단융합학부", major: "-", job: "탐험가", title: "자유로운 방랑자", name: "해밍웨이", job_idx: 6 },
    79: { department: "농업생명과학대학 농경제사회학부", college: "농업생명과학대학", major: "농경제사회학부", job: "드루이드", title: "대자연의 친구", name: "드루이드", job_idx: 7 },
    80: { department: "농업생명과학대학 식물생산과학부", college: "농업생명과학대학", major: "식물생산과학부", job: "드루이드", title: "대자연의 친구", name: "드루이드", job_idx: 7 },
    81: { department: "농업생명과학대학 식품·동물생명공학부", college: "농업생명과학대학", major: "식품·동물생명공학부", job: "드루이드", title: "대자연의 친구", name: "드루이드", job_idx: 7 },
    82: { department: "농업생명과학대학 산림과학부", college: "농업생명과학대학", major: "산림과학부", job: "드루이드", title: "대자연의 친구", name: "드루이드", job_idx: 7 },
    83: { department: "농업생명과학대학 조경·지역시스템공학부", college: "농업생명과학대학", major: "조경·지역시스템공학부", job: "드루이드", title: "대자연의 친구", name: "드루이드", job_idx: 7 },
    84: { department: "농업생명과학대학 바이오시스템·소재학부", college: "농업생명과학대학", major: "바이오시스템·소재학부", job: "드루이드", title: "대자연의 친구", name: "드루이드", job_idx: 7 },
    85: { department: "농업생명과학대학 응용생물화학부", college: "농업생명과학대학", major: "응용생물화학부", job: "드루이드", title: "대자연의 친구", name: "드루이드", job_idx: 7 },
    86: { department: "연합전공 정보문화학", college: "", major: "정보의 대마왕", job: "정보의 대마왕", title: "정보의 대마왕", name: "루시퍼", job_idx: 8 }
};

// 특정 department 이름으로 idx를 검색하는 함수
function GetIdxByDepartment(departmentName) {
    for (const [key, value] of Object.entries(characterData)) {
        if (value.department === departmentName) {
            return parseInt(key); // 키를 정수형으로 반환
        }
    }
    return null; // 찾지 못한 경우 null 반환
}

function GetDepartmentList(){
    let departmentList = [];
    for (const [key, value] of Object.entries(characterData)) {
        if (!departmentList.includes(value.department) && value.department !== "") {
            departmentList.push(value.department);
        }
    }
    return departmentList;
}

function GetCollegeList(){
    let collegeList = [];
    for (const [key, value] of Object.entries(characterData)) {
        if (!collegeList.includes(value.college) && value.college !== "") {
            collegeList.push(value.college);
        }
    }
    return collegeList;
}

function GetMajorList(){
    let majorList = [];
    for (const [key, value] of Object.entries(characterData)) {
        if (!majorList.includes(value.major) && value.major !== "") {
            majorList.push(value.major);
        }
    }
    return majorList;
}
