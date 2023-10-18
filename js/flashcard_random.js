var flashcards;
var currentQuestionIndex = -1;
var questionsUsed = [];
var questionCount = 0;

var categorySpan;
var title;
var category;

var questionContainer;
var answerContainer;
var nextQuestionButton;

document.addEventListener("DOMContentLoaded", function () {
  categorySpan = document.getElementById("categorySpan");
  title = localStorage.getItem("title");

  questionContainer = document.getElementById("question-container");
  answerContainer = document.getElementById("answer-container");
  nextQuestionButton = document.getElementById("nextQuestionButton");

  if (title) {
    categorySpan.textContent = title;
  } else {
    console.log("Brak przekazanej zmiennej.");
  }

  category = categorySpan.textContent;

  function fetchFlashcards(category) {
    fetch('/files/flashcards.json')
      .then(response => response.json())
      .then(data => {
        if (data[category]) {
          flashcards = data[category];
          showQuestion();
        } else {
          console.error('Kategoria nie istnieje w pliku JSON:', category);
        }
      })
      .catch(error => console.error('Błąd pobierania danych z pliku JSON:', error));
  }

  window.addEventListener("load", function () {
    fetchFlashcards(category);
  });
});

function showQuestion() {
  if (questionsUsed.length == flashcards.length) {
    questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "Nie ma więcej pytań.";
    questionContainer.style.pointerEvents = "none";
    nextQuestionButton.style.opacity = 0.1;
    nextQuestionButton.style.pointerEvents = "none";
    var help = document.getElementById("help");
    help.style.visibility = "hidden";
    answerContainer = document.getElementById("answer-container");
  } else {
    var newIndex;
    do {
      newIndex = Math.floor(Math.random() * flashcards.length);
    } while (questionsUsed.includes(newIndex));
    var help = document.getElementById("help");
    help.style.display = "block";
    questionsUsed.push(newIndex);

    var randomQuestion = flashcards[newIndex].question;
    var randomAnswer = flashcards[newIndex].answer;

    questionContainer = document.getElementById("question-container");
    answerContainer = document.getElementById("answer-container");

    questionContainer.style.display = "block";
    answerContainer.style.display = "none";
    questionContainer.innerHTML = randomQuestion;

    questionContainer.onclick = function () {
      questionContainer.style.display = "none";
      answerContainer.style.display = "block";
      answerContainer.innerHTML = randomAnswer;
    };

    answerContainer.onclick = function () {
      answerContainer.style.display = "none";
      questionContainer.innerHTML = randomQuestion;
      questionContainer.style.display = "block";
    };
  }
  updateProgressBar();
  questionContainer.style.display = "block";
  answerContainer.style.display = "none";
}

function updateProgressBar() {
  var progressBar = document.getElementById("progress-bar");
  var progress = ((questionCount) / flashcards.length) * 100;
  progressBar.style.width = progress + "%";
  document.getElementById("acb").innerHTML = "Ukończono " + (questionCount) + '/' + (flashcards.length);
  questionCount++;
}

function nextQuestion() {
  showQuestion();
}

function redirectToIndex() {
  window.location.href = "/../pages/languages.html";
}
