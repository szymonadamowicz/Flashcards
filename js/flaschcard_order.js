var fiszki = [
  { pytanie: "Pytanie 1?", odpowiedz: "Odpowiedź na pytanie 1." },
  { pytanie: "Pytanie 2?", odpowiedz: "Odpowiedź na pytanie 2." },
  { pytanie: "Pytanie 3?", odpowiedz: "Odpowiedź na pytanie 3." },
];

var currentQuestionIndex = 0;

function showQuestion() {
  var fiszkaButton = document.getElementById("fiszkaButton");
  var questionContainer = document.getElementById("question-container");
  var answerContainer = document.getElementById("answer-container");

  if (currentQuestionIndex < fiszki.length) {
    var randomQuestion = fiszki[currentQuestionIndex].pytanie;
    var randomAnswer = fiszki[currentQuestionIndex].odpowiedz;

    fiszkaButton.style.display = "none";
    questionContainer.innerHTML = randomQuestion;
    questionContainer.style.display = "block";
    answerContainer.style.display = "none";

    questionContainer.onclick = function () {
      questionContainer.style.display = "none";
      answerContainer.innerHTML = randomAnswer;
      answerContainer.style.display = "block";
    };
  } else {
    questionContainer.style.display = "block";
    questionContainer.innerHTML = "Nie ma więcej pytań.";
    answerContainer.style.display = "none";
    
    var nextQuestionButton = document.getElementById("nextQuestionButton");
    nextQuestionButton.style.display = "none";
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

function redirectToIndex() {
  window.location.href = "/index.html";
}

window.addEventListener("load", showQuestion);
document.getElementById("nextQuestionButton").addEventListener("click", nextQuestion);
document.getElementById("chooseCategoryButton").addEventListener("click", redirectToIndex);