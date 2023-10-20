document.addEventListener("DOMContentLoaded", function() {
  const element = document.getElementById("FRONT-END-TITLE");
  const element2 = document.getElementById("BACK-END-TITLE");
  const element3 = document.getElementById("FULLSTACK-TITLE");

  function updateLocalStorage() {
    let x;

    switch (true) {
      case (element && element.textContent === "FRONT-END"):
      case (element2 && element2.querySelector('span').textContent === "BACK-END"):
      case (element3 && element3.textContent === "FULLSTACK"):
        x = document.getElementsByClassName("container black-text").length;
        localStorage.setItem("x", x);
        console.log(localStorage.getItem("x"));
        break;
      default:
        console.log(localStorage.getItem("x"));
    }
  }

  document.getElementById("chooseCategoryButton").addEventListener("click", function () {
    const categorySpanText = document.getElementById("categorySpan").textContent;

    function redirectToPage(page) {
      if (localStorage.getItem("x") == 3) {
        window.location.href = page;
      }
    }

    switch (true) {
      case (categorySpanText === "JAVASCRIPT" || categorySpanText === "REACT" || categorySpanText === "ANGULAR"):
        redirectToPage("frontend.html");
        break;
      case (categorySpanText === "C#" || categorySpanText === "NODE.JS" || categorySpanText === "PHP"):
        redirectToPage("backend.html");
        break;
      default:
        console.log("error");
    }

    if (
      (categorySpanText === "JAVASCRIPT" || categorySpanText === "REACT" || categorySpanText === "ANGULAR" || 
       categorySpanText === "C#" || categorySpanText === "NODE.JS" || categorySpanText === "PHP") && 
      localStorage.getItem("x") == 6
    ) {
      window.location.href = "fullstack.html";
    }
  });

  updateLocalStorage();
});

document.addEventListener("DOMContentLoaded", function() {
  var containers = document.querySelectorAll(".category-link");

  containers.forEach(function(container) {
    container.addEventListener("click", function() {
      var title = container.querySelector(".card-panel").textContent.trim();
      localStorage.setItem("title", title);
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var categorySpan = document.getElementById("categorySpan");

  function updateCategorySpan() {
    if (categorySpan) {
      var title = localStorage.getItem("title");

      if (title) {
        console.log("Przekazana zmienna: " + title);
        categorySpan.textContent = title;
      } else {
        console.log("Brak przekazanej zmiennej.");
      }
    }
  }

  updateCategorySpan();
});

document.addEventListener("DOMContentLoaded", function() {
  var buttons = document.querySelectorAll(".category-link");
  var categorySpan = document.getElementById("categorySpan");

  if (categorySpan) {
    var title = categorySpan.textContent;

    function setButtonsDataVariable() {
      buttons.forEach(function(button) {
        button.setAttribute("data-variable", title);
      });

      localStorage.setItem("title", title);
    }

    setButtonsDataVariable();
  }
});
