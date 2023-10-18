var flashcards;
var currentQuestionIndex = 0;
var answerVisible = false;

document.addEventListener("DOMContentLoaded", function () {
  var categorySpan = document.getElementById("categorySpan");

  var title = localStorage.getItem("title");

  if (title) {
    categorySpan.textContent = title;
  } else {
    console.log("Brak przekazanej zmiennej.");
  }

  var category = categorySpan.textContent;

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
  window.addEventListener("load", function() {
    fetchFlashcards(category);
  });
});

function showQuestion() {
  var questionContainer = document.getElementById("question-container");
  var answerContainer = document.getElementById("answer-container");
  var nextQuestionButton = document.getElementById("nextQuestionButton");

  if (currentQuestionIndex === 0) {
    var prevQuestionButton = document.getElementById("prevQuestionButton");
    prevQuestionButton.style.opacity = 0.1;
    prevQuestionButton.style.pointerEvents = "none";
  } else {
    var prevQuestionButton = document.getElementById("prevQuestionButton");
    prevQuestionButton.style.opacity = 1;
    prevQuestionButton.style.pointerEvents = "unset";
  }

  if (currentQuestionIndex < flashcards.length) {
    var randomQuestion = flashcards[currentQuestionIndex].question;
    var randomAnswer = flashcards[currentQuestionIndex].answer;

    if (!answerVisible) {
      questionContainer.innerHTML = randomQuestion;
      nextQuestionButton.style.opacity = 1;
      nextQuestionButton.style.pointerEvents = "unset";
      questionContainer.style.pointerEvents = "unset";
      questionContainer.style.display = "block";
      answerContainer.style.display = "none";
    } else {
      questionContainer.style.display = "none";
      answerContainer.innerHTML = randomAnswer;
      answerContainer.style.display = "block";
    }
    
  } else {
    questionContainer.innerHTML = "Nie ma więcej pytań.";
    questionContainer.style.pointerEvents = "none";
    nextQuestionButton.style.opacity = 0.1;
    nextQuestionButton.style.pointerEvents = "none";
    answerContainer.style.display = "none";
  }
  updateProgressBar();
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = (currentQuestionIndex / flashcards.length) * 100;
  progressBar.style.width = progress + "%";
  document.getElementById("abc").innerHTML = "Ukończono " + currentQuestionIndex + '/' + flashcards.length;
}

function toggleAnswer() {
  answerVisible = !answerVisible; 
  showQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex < flashcards.length) {
    currentQuestionIndex++;
    answerVisible = false; 
    showQuestion();
    updateProgressBar();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    answerVisible = false;
    showQuestion();
    updateProgressBar();
  }
}

function redirectToIndex() {
  window.location.href = "/../pages/languages.html";
}

document.getElementById("prevQuestionButton").addEventListener("click", prevQuestion);
document.getElementById("nextQuestionButton").addEventListener("click", nextQuestion);
document.getElementById("chooseCategoryButton").addEventListener("click", redirectToIndex);
document.getElementById("question-container").addEventListener("click", toggleAnswer);
