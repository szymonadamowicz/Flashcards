var flashcards;
var currentQuestionIndex = 0;


function fetchFlashcards() {
  fetch('/files/flashcards.json')
    .then(response => response.json())
    .then(data => {
      flashcards = data;
      showQuestion();
    })
    .catch(error => console.error('Błąd pobierania danych z pliku JSON:', error));
}


function showQuestion() {
  var flashcardButton = document.getElementById("flashcardButton");
  var questionContainer = document.getElementById("question-container");
  var answerContainer = document.getElementById("answer-container");

  if (currentQuestionIndex == 0) {
    var prevQuestionButton = document.getElementById("prevQuestionButton");
    prevQuestionButton.disabled = true;

  } else {
    var prevQuestionButton = document.getElementById("prevQuestionButton");
    prevQuestionButton.style.display = "inline-block";
    prevQuestionButton.disabled = false;
  }

  if (currentQuestionIndex < flashcards.length) {
    var randomQuestion = flashcards[currentQuestionIndex].question;
    var randomAnswer = flashcards[currentQuestionIndex].answer;

    flashcardButton.style.display = "none";
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
  }

  if (currentQuestionIndex == flashcards.length) {
    var nextQuestionButton = document.getElementById("nextQuestionButton");
    nextQuestionButton.disabled = true;
    var help = document.getElementById("help");
    help.style.visibility = "hidden";
  } else {
    var nextQuestionButton = document.getElementById("nextQuestionButton");
    nextQuestionButton.style.display = "inline-block";
    nextQuestionButton.disabled = false;
    var help = document.getElementById("help");
    help.style.visibility = "visible";
  }
  updateProgressBar();
}


function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = ((currentQuestionIndex + 1) / flashcards.length) * 100; 
  progressBar.style.width = progress + "%"; 
}


function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
  updateProgressBar();
}


function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
    updateProgressBar();
  }
}


function redirectToIndex() {
  window.location.href = "/index.html";
}


document.getElementById("prevQuestionButton").addEventListener("click", prevQuestion);
document.getElementById("nextQuestionButton").addEventListener("click", nextQuestion);
document.getElementById("chooseCategoryButton").addEventListener("click", redirectToIndex);
window.addEventListener("load", fetchFlashcards);
