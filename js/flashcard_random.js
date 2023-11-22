var questionsUsed = [];
var questionCount = 0;

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
  const flipCard = document.querySelector('.flip-card');

  flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('is-flipped');
  });


function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].clientX;
}

function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].clientX;

  handleSwipe(touchEndX);
}

function handleSwipe(touchEndX) {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    nextQuestion();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    console.log("cannot go back on the interview mode");
  }
}

document.querySelector('.page').addEventListener('touchstart', handleTouchStart);
document.querySelector('.page').addEventListener('touchend', handleTouchEnd);
});

function showQuestion() {
  
  if (questionsUsed.length == flashcards.length) {
    questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "Nie ma więcej pytań.";
    document.querySelector(".page").style.pointerEvents = "none";
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
      answerContainer.style.display = "block";
      answerContainer.innerHTML = randomAnswer;
    };

    answerContainer.onclick = function () {
      questionContainer.innerHTML = randomQuestion;
      questionContainer.style.display = "block";
    };
  }
  updateProgressBar();
}

function updateProgressBar() {
  var progressBar = document.getElementById("progress-bar");
  var progress = ((questionCount) / flashcards.length) * 100;
  progressBar.style.width = progress + "%";
  document.getElementById("acb").innerHTML = "Ukończono " + (questionCount) + '/' + (flashcards.length);
  questionCount++;
}

function nextQuestion() {
  if (document.getElementsByClassName("is-flipped")) {
    const flipCard = document.querySelector('.flip-card');
    flipCard.classList.remove("is-flipped");
  };
  showQuestion();
}


