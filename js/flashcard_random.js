var flashcards;
var currentQuestionIndex = -1; 
var questionsUsed = [];
var questionCount = 0;

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
    questionContainer.onclick = console.log();
    questionContainer.disabled = "true";
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
  
    var questionContainer = document.getElementById("question-container");
    var answerContainer = document.getElementById("answer-container");
  
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
  
  if (document.getElementById("question-container").innerText == "Nie ma więcej pytań."){
    progress = 100;
  }
  var progressBar = document.getElementById("progress-bar");
  var progress = ((questionCount ) / flashcards.length) * 100;
  progressBar.style.width = progress + "%";
  document.getElementById("acb").innerHTML = "Ukończono " + (questionCount) + '/' + (flashcards.length);
  questionCount ++
}


function nextQuestion() {
  showQuestion();
}

function redirectToIndex() {
  window.location.href = "/../pages/languages/javascript.html";
}

window.addEventListener("load", fetchFlashcards);
document.getElementById("nextQuestionButton").addEventListener("click", nextQuestion);
document.getElementById("chooseCategoryButton").addEventListener("click", redirectToIndex);