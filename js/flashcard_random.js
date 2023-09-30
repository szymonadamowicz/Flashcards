var flashcards;
var currentQuestionIndex = -1; 
var questionsUsed = [];

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
  if (questionsUsed.length === flashcards.length) {
    var questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "Nie ma więcej pytań.";
    questionContainer.style.display = "block";
    document.getElementById("nextQuestionButton");
    nextQuestionButton.disabled = true;
    var help = document.getElementById("help");
    help.style.visibility = "hidden";
    var answerContainer = document.getElementById("answer-container");
    answerContainer.innerHTML = "";
    answerContainer.style.display = "none";
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
  
    var flashcardButton = document.getElementById("flashcardButton");
    var questionContainer = document.getElementById("question-container");
    var answerContainer = document.getElementById("answer-container");
  
    flashcardButton.style.display = "none";
    questionContainer.innerHTML = randomQuestion;
    questionContainer.style.display = "block";
    answerContainer.style.display = "none";
  
    questionContainer.onclick = function () {
      questionContainer.style.display = "none"; 
      answerContainer.innerHTML = randomAnswer;
      answerContainer.style.display = "block";
    };
  }
  updateProgressBar();

}
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = ((questionsUsed.length)  / (flashcards.length) * 100);
  progressBar.style.width = progress + "%";
}


function nextQuestion() {
  showQuestion();
}

function redirectToIndex() {
  window.location.href = "/index.html";
}

window.addEventListener("load", fetchFlashcards);
document.getElementById("nextQuestionButton").addEventListener("click", nextQuestion);
document.getElementById("chooseCategoryButton").addEventListener("click", redirectToIndex);