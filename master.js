// global
let questionArea = document.querySelector(".quiz-info");
let bulletsSpan = document.querySelector(".blts-spans");
let quizArea = document.querySelector(".questions-area");
let answerArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector(".submit-answer");
let rightAnswersEl = document.querySelector(".right-answersE");
let wroungAnswersEl = document.querySelector(".roung-answersE");
let quizContent = document.querySelector(".quiz-content");
let countdownEl = document.querySelector(".countdownEl");

///global
let reloadBtn = document.createElement("button");
reloadBtn.className = "reloadBtn";
reloadBtn.innerText = "RELOAD";
// set

let current = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
let resault = 0;
let countDownInterval;
function getRequest() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let myRequestObject = JSON.parse(this.responseText);
      let qCount = myRequestObject.length;
      //countDown function
      countDown(10, qCount);
      // creat bullets and count of question
      creatBullets(qCount);
      // add question function
      addQuesData(myRequestObject[current], qCount);
      // submit answer
      submitBtn.onclick = () => {
        let rightAnswer = myRequestObject[current]["right_answer"];
        // increase current
        current++;
        // chek the right answer
        checkAnswer(rightAnswer, qCount);
        // remove previos question
        restUi();
        addQuesData(myRequestObject[current], qCount);
        document.querySelectorAll(".pullets .blts-spans span").forEach((e) => {
          e.classList.remove("on");
        });
        handelBullets();
        rightAndWroung();
        // resault function
        calculateResult(qCount);
        //reset timer
        resetTimer(10, qCount);
      };
    }
  };
  request.open("GET", "html_q.json", true);
  request.send();
  request.onerror = function () {
    alert("Failed to load data. Please check your internet connection.");
  };
}
// reset Timer
function resetTimer(duration, qCount) {
  clearInterval(countDownInterval);
  countDown(duration, qCount);
}
// rest function
function restUi() {
  quizArea.innerHTML = "";
  answerArea.innerHTML = "";
  rightAnswersEl.innerHTML = "";
  wroungAnswersEl.innerHTML = "";
}
getRequest();
// make a function to creat bullets and count of question
function creatBullets(qCount) {
  for (let i = 0; i < qCount; i++) {
    let bullSpan = document.createElement("span");

    bulletsSpan.appendChild(bullSpan);
    bullSpan.innerText = i + 1;
    if (i === 0) {
      bullSpan.className = "on";
    }
  }
}
// add data function

function addQuesData(obj, count) {
  if (current < count) {
    let question = document.createElement("h2");
    question.innerText = obj.title;
    quizArea.appendChild(question);

    // set answers
    for (let i = 1; i <= 4; i++) {
      let answerDiv = document.createElement("div");
      answerDiv.className = "answer";
      let answer = document.createElement("input");
      answer.className = "answers";
      answer.id = `answer_${i}`;
      answer.type = "radio";
      answer.dataset.answer = obj[`answer_${i}`];
      // answer labdel
      let answerLabel = document.createElement("label");
      answerLabel.htmlFor = `answer_${i}`;
      let labelText = obj[`answer_${i}`];
      // insert elements
      answerLabel.innerText = labelText;
      answerDiv.appendChild(answer);
      answerDiv.appendChild(answerLabel);
      answerArea.appendChild(answerDiv);
    }
  }
}

//chek function
function checkAnswer(rightAnswer) {
  // select all answers
  let allAnswers = document.querySelectorAll(".answers");
  choosenAnswer = "";
  for (let i = 0; i < 4; i++) {
    if (allAnswers[i].checked) {
      choosenAnswer = allAnswers[i].dataset.answer;
      if (choosenAnswer === rightAnswer) {
        rightAnswers++;
        resault++;
      } else {
        wrongAnswers++;
      }
    }
  }
  if (choosenAnswer === "") {
    wrongAnswers++;
  }
}
// right And Roung label
function rightAndWroung() {
  // Right and roung answers
  let rightAnsSpansDiv = document.createElement("div");
  rightAnsSpansDiv.style.display = "flex";
  rightAnswersEl.appendChild(rightAnsSpansDiv);
  let wwroungAnsSpansDiv = document.createElement("div");
  wwroungAnsSpansDiv.style.display = "flex";
  wroungAnswersEl.appendChild(wwroungAnsSpansDiv);
  for (let i = 0; i < rightAnswers; i++) {
    let rightAnsSpans = document.createElement("span");
    rightAnsSpans.className = "right-spans";
    rightAnsSpansDiv.appendChild(rightAnsSpans);
  }
  for (let i = 0; i < wrongAnswers; i++) {
    let wroungAnsSpans = document.createElement("span");
    wroungAnsSpans.className = "roung-spans";
    wwroungAnsSpansDiv.appendChild(wroungAnsSpans);
  }
}
// hhandelBullets
function handelBullets() {
  let createdSpans = document.querySelectorAll(".pullets .blts-spans span");
  let bSpanzAraay = Array.from(createdSpans);

  bSpanzAraay.forEach((span, index) => {
    if (current === index) {
      span.className = "on";
    }
  });
}

// resault
function calculateResult(count) {
  if (current === count) {
    questionArea.innerHTML = "";
    submitBtn.remove();
    let resultDiv = document.createElement("div");

    resultDiv.className = "resault";
    let footerAtR = document.createElement("div");
    footerAtR.className = "footerR";
    footerAtR.innerText = "MADE BY MOSTAFA ABD-ELRAHEEM";

    quizContent.appendChild(resultDiv);
    resultDiv.appendChild(footerAtR);
    let theResault;

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResault = `<div class="theResault"><span class="veryGood"> Very Good </span><span> Your True Answers </span>
      <div><span class="rResalteAns"> ${rightAnswers} </span> <span> From </span><span> ${count} </span></div></div>`;
      resultDiv.classList.add("congrats");
    } else if (rightAnswers === count) {
      theResault = `<div class="theResault"><span class="exelent"> Exelent </span><span> Your True Answers </span>
      <div><span class="rResalteAns"> ${rightAnswers} </span> <span> From </span><span> ${count} </span></div></div>`;
      resultDiv.classList.add("congrats");
    } else {
      theResault = `<div class="theResault"><span class="sorry"> Sorry </span><span> Your True Answers  </span>
      <div><span class="rResalteAns"> ${rightAnswers} </span><span> From </span><span> ${count} </span></div></div>`;
      resultDiv.classList.add("sad");
    }
    questionArea.innerHTML = theResault;
  }
  document.body.appendChild(reloadBtn);
}
//reloadBtnc

function reloadfn() {
  location.reload();
}
reloadBtn.onclick = () => {
  reloadfn();
};
// countDown function
function countDown(duration, qCount) {
  let minutes, secondes;
  countDownInterval = setInterval(function () {
    if (current < qCount) {
      minutes = parseInt(duration / 60);
      secondes = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      secondes = secondes < 10 ? `0${secondes}` : secondes;
      countdownEl.innerHTML = `${minutes}:${secondes}`;
      if (--duration < 0) {
        clearInterval(countDownInterval);
        submitBtn.click();
      }
    }
  }, 1000);
}
