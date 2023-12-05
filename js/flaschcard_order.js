var flashcards;
var currentQuestionIndex = 0;
var answerVisible = false;
var touchStartX = 0;
var touchEndX = 0;

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
    fetch("/files/flashcards.json")
      .then((response) => response.json())
      .then((data) => {
        if (data[category]) {
          flashcards = data[category];
          showQuestion();
        } else {
          console.error("Kategoria nie istnieje w pliku JSON:", category);
        }
      })
      .catch((error) =>
        console.error("Błąd pobierania danych z pliku JSON:", error)
      );
  }

  window.addEventListener("load", function () {
    fetchFlashcards(category);
  });

  const flipCard = document.querySelector(".flip-card");
  flipCard.addEventListener("click", () => {
    flipCard.classList.toggle("is-flipped");
    toggleAnswer();
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

    const pageElement = document.querySelector(".page");

    if (touchEndX < touchStartX - swipeThreshold) {
      nextQuestion();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevQuestion();
    }
  }

  document
    .querySelector(".page")
    .addEventListener("touchstart", handleTouchStart);
  document.querySelector(".page").addEventListener("touchend", handleTouchEnd);
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
      questionContainer.innerHTML = marked.parse(randomQuestion);
      nextQuestionButton.style.opacity = 1;
      nextQuestionButton.style.pointerEvents = "unset";
      questionContainer.style.pointerEvents = "unset";
      questionContainer.style.display = "block";
    } else {
      answerContainer.innerHTML = marked.parse(randomAnswer);
      answerContainer.style.display = "block";
      questionContainer.style.display = "block";
    }

    document.querySelector(".flip-card").style.pointerEvents = "unset";
  } else {
    questionContainer.innerHTML = "Nie ma więcej pytań.";
    document.querySelector(".flip-card").style.pointerEvents = "none";
    nextQuestionButton.style.opacity = 0.1;
    nextQuestionButton.style.pointerEvents = "none";
  }

  updateProgressBar();
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = (currentQuestionIndex / flashcards.length) * 100;
  progressBar.style.width = progress + "%";
  document.getElementById("abc").innerHTML =
    "Ukończono " + currentQuestionIndex + "/" + flashcards.length;
}

function toggleAnswer() {
  answerVisible = !answerVisible;
  showQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex < flashcards.length) {
    if (document.getElementsByClassName("is-flipped")) {
      const flipCard = document.querySelector(".flip-card");
      flipCard.classList.remove("is-flipped");
    }
    answerVisible = false;
    currentQuestionIndex++;
    showQuestion();
    updateProgressBar();
  } else {
    document.querySelector(".flip-card").style.pointerEvents = "none";
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    if (document.getElementsByClassName("is-flipped")) {
      const flipCard = document.querySelector(".flip-card");
      flipCard.classList.remove("is-flipped");
    }
    document.querySelector(".flip-card").style.pointerEvents = "unset";
    answerVisible = false;
    currentQuestionIndex--;
    showQuestion();
    updateProgressBar();
  }
}

function redirectToIndex() {
  window.location.href = "./pages/languages.html";
}