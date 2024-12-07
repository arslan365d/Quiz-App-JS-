import questions from "./data.js";
let score = 0;
let totalNum = questions.length;
let questionNo = 0;

let startBtn = document.querySelector(".start");

// selecting templates
let templateOfQuesion = document.querySelector("#questionHtml");
let startPageOfQuiz = document.querySelector("#quiz__start__page")


startBtn.addEventListener("click", () => {
  addQuestion();
})

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="hello"]:checked');
  if (selectedOption) {
    if(selectedOption.value === questions[questionNo].correctAnswer){
      score+=1
    }
  }else if (!selectedOption) {
    alert("Please select an answer.");
    return;
  }
  questionNo += 1;
  if (questionNo < questions.length) {
    addQuestion();
  } else {
    addScore();
  }
}


function addScore() {
  // Calculating Remarks
  let remarks = "Good"
  let scoreInPercent =  (score / totalNum)*100
  if(scoreInPercent ===100){
    remarks = "Excellent"
  }else if(scoreInPercent >=50){
    remarks = "Good"
  }else if(scoreInPercent <50 && scoreInPercent>10){
    remarks = "Satisfactory"
  }else{
    remarks = "Work Hard"
  }
  document.body.innerHTML = `<div class='completed'><h1>Quiz Completed 👍</h1><h2>Score:${score}/${totalNum}</h1><p>Remarks: ${remarks}</p><button class='backToQuiz'>Back to Home</button></div>`
  let backToQuizBtn = document.querySelector(".backToQuiz")
  backToQuizBtn.addEventListener("click", () => {
    let actualCodeOfStartPage = startPageOfQuiz.content.cloneNode(true);
    actualCodeOfStartPage.querySelector(".start").addEventListener("click",()=>{
      questionNo = 0
      score = 0;
      addQuestion()
    })
    document.body.innerHTML = ""
    document.body.appendChild(actualCodeOfStartPage)
  })
}

function addQuestion() {
  let questionData = questions[questionNo]
  let { question, options } = questionData
  let actualCode = templateOfQuesion.content.cloneNode(true);

  actualCode.querySelector(".question__content").innerText = question;
  actualCode.querySelector("#option1").innerText = options[0];
  actualCode.querySelector("#q1").value = options[0]
  actualCode.querySelector("#option2").innerText = options[1];
  actualCode.querySelector("#q2").value = options[1]
  actualCode.querySelector("#option3").innerText = options[2];
  actualCode.querySelector("#q3").value = options[2]
  actualCode.querySelector("#option4").innerText = options[3];
  actualCode.querySelector("#q4").value = options[3]
  actualCode.querySelector(".nextQuestion").addEventListener("click", () => {
    nextQuestion();
  })
  document.body.innerHTML = ""
  document.body.appendChild(actualCode)
}
