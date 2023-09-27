var fiszki = [
  { pytanie: "Pytanie 1?", odpowiedz: "Odpowiedź na pytanie 1." },
  { pytanie: "Pytanie 2?", odpowiedz: "Odpowiedź na pytanie 2." },
  { pytanie: "Pytanie 3?", odpowiedz: "Odpowiedź na pytanie 3." },
];

var currentQuestionIndex = -1; 
var questionsUsed = [];

function showQuestion() {
  if (questionsUsed.length === fiszki.length) {
    var questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "Nie ma więcej pytań.";
    questionContainer.style.display = "block";
    document.getElementById("nextQuestionButton").style.display = "none";

    var answerContainer = document.getElementById("answer-container");
    answerContainer.innerHTML = "";
    answerContainer.style.display = "none";
  } else {
    var newIndex;
    do {
      newIndex = Math.floor(Math.random() * fiszki.length);
    } while (questionsUsed.includes(newIndex));
  
    questionsUsed.push(newIndex);
  
    var randomQuestion = fiszki[newIndex].pytanie;
    var randomAnswer = fiszki[newIndex].odpowiedz;
  
    var fiszkaButton = document.getElementById("fiszkaButton");
    var questionContainer = document.getElementById("question-container");
    var answerContainer = document.getElementById("answer-container");
  
    fiszkaButton.style.display = "none";
    questionContainer.innerHTML = randomQuestion;
    questionContainer.style.display = "block";
    answerContainer.style.display = "none";
  
    questionContainer.onclick = function () {
      questionContainer.style.display = "none"; 
      answerContainer.innerHTML = randomAnswer;
      answerContainer.style.display = "block";
    };
  }
}


function nextQuestion() {
  showQuestion();
}

function redirectToIndex() {
  window.location.href = "/index.html";
}

window.addEventListener("load", showQuestion);
document.getElementById("nextQuestionButton").addEventListener("click", nextQuestion);
document.getElementById("chooseCategoryButton").addEventListener("click", redirectToIndex);