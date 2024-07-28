const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France ?",
    options: ["Berlin", "Madrid", "Paris"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system ?",
    options: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    id: 3,
    question: "What is the chemical symbol for water ?",
    options: ["O2", "H2O", "C2O"],
    answer: "H2O",
  },
  {
    id: 4,
    question: "Who wrote 'to kill a Mockingbrid ?",
    options: ["Harper Lee", "Mark Twain", "Jane Austen"],
    answer: "Harper Lee",
  },
  {
    id: 5,
    question: "What is the smallest prime number ?",
    options: ["1", "2", "3"],
    answer: "2",
  },
];
let userSelectedValue = [];
let score = 0;
let isQuestionOptionSelected = false;
let isQuestionOptionDisabled = false;

// selecting dom element
const startQuizEle = document.getElementsByClassName("start-quiz")[0];
const endQuizEle = document.getElementsByClassName("end-quiz")[0];
let questionCcontainerEle =
  document.getElementsByClassName("question-container")[0];

// start quiz function
function startQuiz() {
  startQuizEle.style.display = "none";
  questionCcontainerEle.style.display = "flex";
  showQoestion();
}
// display question
function showQoestion(index = 0, userAnswer = "", correctAnswer = "") {
  if (index < quizQuestions.length) {
    questionCcontainerEle.innerHTML = `
  <span style="color: teal; padding-top: 30px; font-weight: 700">
  total question : 5</span >
 <h2>${quizQuestions[index].id} : ${quizQuestions[index].question}</h2>
 <div class="question-options">
 ${quizQuestions[index].options
   .map((option) => {
     return ` <label>
      <input type="radio"
       name="option" 
       ${isQuestionOptionDisabled ? "disabled" : ""}
       value=${option.includes(" ") ? option.replace(" ", "-") : option}
       onchange='selectOptionQuestion(event,${quizQuestions[index].id})'/>
      <p  class = ${
        userAnswer == option && correctAnswer == option
          ? "correct"
          : userAnswer == option
          ? "wrong"
          : correctAnswer == option
          ? "correct"
          : ""
      }>${option}</p>
    </label>`;
   })
   .join("")}
 </div>
 <button onclick='nextQuestion(${quizQuestions[index].id})'>next</button>
${userAnswer || correctAnswer ? "" : "<p> please select question </p>"} 
   `;
  } else {
    questionCcontainerEle.style.display = "none";
    endQuizEle.style.display = "flex";
    endQuizEle.innerHTML = `
    <h3>score ${score}/100</h3>
    <button onclick='palyAgain()'>play again</button>
    <button onclick='checkYourAnswer()'>check your answer</button>
    `;
  }
}
// go to next question
function nextQuestion(page) {
  if (isQuestionOptionSelected) {
    showQoestion(page);
    isQuestionOptionSelected = false;
  }
  if (isQuestionOptionDisabled) {
    checkYourAnswer(page);
  }
}
// select an question
function selectOptionQuestion(event, id) {
  isQuestionOptionSelected = true;
  const value = event.target.value.includes("-")
    ? event.target.value.replace("-", " ")
    : event.target.value;
  userSelectedValue.push(value);
  quizQuestions.find((question) => {
    if (question.id == id && question.answer == value) {
      score += 20;
    }
  });
}
// start play again
function palyAgain() {
  score = 0;
  isQuestionOptionDisabled = false;
  userSelectedValue = [];
  questionCcontainerEle.style.display = "flex";
  endQuizEle.style.display = "none";
  showQoestion();
}
// for checking answer
function checkYourAnswer(index = 0) {
  questionCcontainerEle.style.display = "flex";
  endQuizEle.style.display = "none";
  isQuestionOptionDisabled = true;
  showQoestion(index, userSelectedValue[index], quizQuestions[index]?.answer);
}
