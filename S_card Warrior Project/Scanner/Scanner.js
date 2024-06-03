//스캐너 작동 코드
class Scanner {
    constructor(posX, posY, button) {
      this.capture = null;
      this.img = null;
      this.isCapturing = false;
      this.rectangleX = width / 2;
      this.rectangleY = height / 2;
      this.rectangleWidth = 380;
      this.rectangleHeight = 210;
      this.posX = posX;
      this.posY = posY;
      this.isProcessing = false;
      this.dataLoaded = false;
      this.student_name = "NONE";
      this.student_major = "NONE";
      this.student_id = "NONE";
      this.button = button;
    }
  
    display() {
      if (!this.capture) {
        this.capture = createCapture(VIDEO);
        this.capture.size(640, 400);
        this.capture.hide();
      }
      
      //background('gray');
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
    
  
      if (this.isProcessing) {
        image(this.img, this.posX, this.posY);
        text('스캔중...', this.posX, this.posY - 100);
      } else if (this.isCapturing) {
        image(this.img, this.posX, this.posY);
        text('SPACE를 눌러 다시 스캔', this.posX, this.posY - 100);
      } else {
        image(this.capture, this.posX, this.posY);
        text(this.button + "를 눌러 스캔하세요", this.posX + 320, this.posY+windowHeight/2);
      }
  
      noFill();
      stroke(255, 255, 0);
      rectMode(CENTER);
      rect(this.posX + 320, this.posY + 200, this.rectangleWidth, this.rectangleHeight);
  
      if (this.dataLoaded) {
        textAlign(LEFT, CENTER);
        if (this.student_name === "NONE") {
          text(`S-Card가 인식되지 않았습니다. 다시 스캔해 보세요.`, 10, 10);
        } else {
          text(`당신의 이름은 ${this.student_name}입니다.`, 10, 10);
          text(`당신의 전공은 ${this.student_major}입니다.`, 10, 30);
          text(`당신의 학번은 ${this.student_id}입니다.`, 10, 50);
        }
      }
    }
  
    processImage() {
      this.isProcessing = true;
  
      let canvas = document.createElement('canvas');
      canvas.width = this.rectangleWidth;
      canvas.height = this.rectangleHeight;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(this.img.canvas, this.rectangleX, this.rectangleY, this.rectangleWidth, this.rectangleHeight, 0, 0, this.rectangleWidth, this.rectangleHeight);
      let dataURL = canvas.toDataURL('image/jpeg');
      this.OpenaiFetchAPI(dataURL);
    }
  
    OpenaiFetchAPI(imageURL) {
      console.log("Calling GPT");
      let url = "https://api.openai.com/v1/chat/completions";
      let bearer = 'Bearer ' + API_KEY;
  
      let system_message = `
      학생증 사진을 보고 다음 내용의 텍스트를 추출해주세요.
      - 이름
      - 전공
      - 학번

      제공될 사진에서 정보는 다음과 같은 순서로 되어 있을 거야.
      [사진 형식]
      {
        한글 이름
        전공
        학번
      }
      위의 형식 중에서 [한글 이름], [전공], [학번]의 텍스트를 추출해줘.
  
      결과는 아래같이 JSON 형식으로 제시해주고, 그 외의 내용은 말하지 마.
      
      [JSON 형식]
      {
        "student_name":{name},
        "student_major":{major},
        "student_id" :{id}
      }
  
      만약 사진에서 학생증 정보가 보이지 않는 경우, 다음과 같은 형식으로 더미 값을 제시해줘. 아래의 형식 외에는 답변에서 내용을 말하지 마.
      {
        "student_name":"NONE",
        "student_major":"NONE",
        "student_id":"NONE"
      }
      단, 제시될 전공은 아래 중 하나일 가능성이 높으니 참고해.

      인문대학 국어국문학과
      인문대학 영어영문학과
      인문대학 독어독문학과
      인문대학 불어불문학과
      인문대학 중어중문학과
      인문대학 노어노문학과
      인문대학 서어서문학과
      인문대학 언어학과
      인문대학 역사학과
      인문대학 철학과
      인문대학 고고미술사학과
      인문대학 종교학과
      사회과학대학 정치외교학부
      사회과학대학 경제학부
      사회과학대학 사회학과
      사회과학대학 인류학과
      사회과학대학 심리학과
      사회과학대학 지리학과
      사회과학대학 사회복지학과
      사회과학대학 언론정보학과
      자연과학대학 수리과학부
      자연과학대학 통계학과
      자연과학대학 물리천문학부
      자연과학대학 화학부
      자연과학대학 생명과학부
      자연과학대학 지구환경과학부
      경영대학 경영학과
      공과대학 건설환경공학부
      공과대학 기계항공공학부
      공과대학 전기정보공학부
      공과대학 컴퓨터공학부
      공과대학 화학생물공학부
      공과대학 재료공학부
      공과대학 에너지자원공학과
      공과대학 산업공학과
      공과대학 원자핵공학과
      농업생명과학대학 농경제사회학부
      농업생명과학대학 식물생산과학부
      농업생명과학대학 식품·동물생명공학부
      농업생명과학대학 산림과학부
      농업생명과학대학 응용생물화학부
      사범대학 교육학과
      사범대학 국어교육과
      사범대학 영어교육과
      사범대학 수학교육과
      사범대학 물리교육과
      사범대학 생물교육과
      사범대학 지구과학교육과
      사범대학 역사교육과
      사범대학 일반사회교육과
      사범대학 체육교육과
      생활과학대학 소비자아동학부
      생활과학대학 식품영양학과
      생활과학대학 의류학과
      의과대학 의학과
      치과대학 치의학과
      약학대학 약학과
      수의과대학 수의학과
      음악대학 작곡과
      음악대학 성악과
      음악대학 기악과
      음악대학 국악과
      미술대학 동양화과
      미술대학 서양화과
      미술대학 조소과
      미술대학 디자인학부
      자유전공학부 자유전공학부

      `;
  
      let messages = [
        {
          "role": "system",
          "content": system_message
        },
        {
          "role": "user",
          "content": "여기 학생증 이미지를 확인해주세요: " + imageURL
        }
      ];
  //어디서 오류가 났는지 확인하기 위해 기존 고수창님 코드를 수정했습니다!
      fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "model": "gpt-4",
          "messages": messages,
          "max_tokens": 300
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log("API Response:", data);
  
        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
          let content = data.choices[0].message.content;
          console.log("Parsed Content:", content);
  
          try {
            let resultJSON = JSON.parse(content);
            this.student_name = resultJSON.student_name;
            this.student_major = resultJSON.student_major;
            this.student_id = resultJSON.student_id;
            this.dataLoaded = true;
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error("Unexpected API response structure:", data);
        }
  
        this.isProcessing = false;
      })
      .catch(error => {
        console.error("API call failed:", error);
        this.isProcessing = false;
      });
    }
  }
  
/*
function setup() {
  createCanvas(640, 480);
  
  capture = createCapture(VIDEO);
  capture.size(640, 400);
  capture.hide();

  rectangleX = width / 2;
  rectangleY = height / 2;
  rectangleWidth = 380;
  rectangleHeight = 210;
  

}

function draw() {

  background('gray');
  textAlign(CENTER, CENTER);

  if (isProcessing) {
    image(img, 0, 0);
    text('스캔중...', width / 2, height - 100);
  } else if (isCapturing) {
    image(img, 0, 0);
    text('SPACE를 눌러 다시 스캔', width / 2, height - 100);
  } else {
    image(capture, 0, 0);
    text('SPACE를 눌러 스캔', width / 2, height - 100);
  }

  noFill();
  stroke(255, 255, 0);

  rectMode(CENTER);
  rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

  if (dataLoaded) {

    textAlign(LEFT, CENTER);

    if (student_name == "NONE") {
      text(`S-Card가 인식되지 않았습니다. 다시 스캔해 보세요.`, 10, 10);
    } else {
      text(`당신의 이름은 ${student_name}입니다.`, 10, 10);
      text(`당신의 전공은 ${student_major}입니다.`, 10, 30);
      text(`당신의 학번은 ${student_id}입니다.`, 10, 50);
    }


  }
}

function keyPressed() {
  if (key === ' ') {
    if (!isCapturing) {
      isCapturing = true;
      img = capture.get();
      // capture.stop();
      processImage();
    } else {
      isCapturing = false;
      dataLoaded = false;
    }


  }
}

function processImage() {

  isProcessing = true;

  let canvas = document.createElement('canvas');
  canvas.width = rectangleWidth;
  canvas.height = rectangleHeight;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img.canvas, rectangleX, rectangleY, rectangleWidth, rectangleHeight, 0, 0, rectangleWidth, rectangleHeight);
  let dataURL = canvas.toDataURL('image/jpeg');
  OpenaiFetchAPI(dataURL);
}

function showText(str) {

}

function OpenaiFetchAPI(imageURL) {
  console.log("Calling GPT");
  let url = "https://api.openai.com/v1/chat/completions";
  let bearer = 'Bearer ' + API_KEY;

  let system_message = `

  학생증 사진을 보고 다음 내용의 텍스트를 추출해주세요.
  - 이름
  - 전공
  - 학번

  결과는 아래같이 JSON 형식으로 제시해주고, 그 외의 내용은 말하지 마.
  
  [JSON 형식]
{
  "student_name":{name},
  "student_major":{major},
  "student_id" :{id}
}

만약 사진에서 학생증 정보가 보이지 않는 경우, 다음과 같은 형식으로 더미 값을 제시해줘.

{
  "student_name":"NONE",
  "student_major":"NONE",
  "student_id":"NONE"
}

단, 제시될 전공은 아래 중 하나일 가능성이 높으니 참고해.

인문대학 국어국문학과
인문대학 영어영문학과
인문대학 독어독문학과
인문대학 불어불문학과
인문대학 중어중문학과
인문대학 노어노문학과
인문대학 서어서문학과
인문대학 언어학과
인문대학 역사학과
인문대학 철학과
인문대학 고고미술사학과
인문대학 종교학과
사회과학대학 정치외교학부
사회과학대학 경제학부
사회과학대학 사회학과
사회과학대학 인류학과
사회과학대학 심리학과
사회과학대학 지리학과
사회과학대학 사회복지학과
사회과학대학 언론정보학과
자연과학대학 수리과학부
자연과학대학 통계학과
자연과학대학 물리천문학부
자연과학대학 화학부
자연과학대학 생명과학부
자연과학대학 지구환경과학부
경영대학 경영학과
공과대학 건설환경공학부
공과대학 기계항공공학부
공과대학 전기정보공학부
공과대학 컴퓨터공학부
공과대학 화학생물공학부
공과대학 재료공학부
공과대학 에너지자원공학과
공과대학 산업공학과
공과대학 원자핵공학과
농업생명과학대학 농경제사회학부
농업생명과학대학 식물생산과학부
농업생명과학대학 식품·동물생명공학부
농업생명과학대학 산림과학부
농업생명과학대학 응용생물화학부
사범대학 교육학과
사범대학 국어교육과
사범대학 영어교육과
사범대학 수학교육과
사범대학 물리교육과
사범대학 생물교육과
사범대학 지구과학교육과
사범대학 역사교육과
사범대학 일반사회교육과
사범대학 체육교육과
생활과학대학 소비자아동학부
생활과학대학 식품영양학과
생활과학대학 의류학과
의과대학 의학과
치과대학 치의학과
약학대학 약학과
수의과대학 수의학과
음악대학 작곡과
음악대학 성악과
음악대학 기악과
음악대학 국악과
미술대학 동양화과
미술대학 서양화과
미술대학 조소과
미술대학 디자인학부
자유전공학부 자유전공학부

`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': bearer,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "model": "gpt-4o",
      "messages": [
        {
          "role": "system",
          "content": system_message
        },
        {
          "role": "user",
          "content": [
            {
              "type": "image_url",
              "image_url": {
                "url": imageURL
              }
            }
          ]
        }
      ],
      "max_tokens": 300
    })
  }).then(response => {
    return response.json()
  }).then(data => {
    let content = data['choices'][0].message.content;
    console.log(content);
    let resultJSON = JSON.parse(content);

    student_name = resultJSON.student_name;
    student_major = resultJSON.student_major;
    student_id = resultJSON.student_id;

    dataLoaded = true;
    isProcessing = false;
    return;
  })
}
*/