  const element = document.getElementById("FRONT-END-TITLE");
  const element2 = document.getElementById("BACK-END-TITLE");
  const element3 = document.getElementById("FULLSTACK-TITLE");

  if ((element && element.textContent === "FRONT-END") || 
  (element2 && element2.querySelector('span').textContent === "BACK-END") || 
  (element3 && element3.textContent === "FULLSTACK")) {
    const x = document.getElementsByClassName("container black-text").length;
    localStorage.setItem("x", x);
    console.log(localStorage.getItem("x"));
  } else {
    console.log(localStorage.getItem("x"));
  }
  
  
  document.getElementById("chooseCategoryButton").addEventListener("click", function () {
    if ((document.getElementById("categorySpan").textContent === "JAVASCRIPT" || document.getElementById("categorySpan").textContent === "REACT" || document.getElementById("categorySpan").textContent === "ANGULAR") && localStorage.getItem("x") == 3) {
      window.location.href = "frontend.html";
    } else if ((document.getElementById("categorySpan").textContent === "C#" || document.getElementById("categorySpan").textContent === "NODE.JS" || document.getElementById("categorySpan").textContent === "PHP") && localStorage.getItem("x") == 3) {
      window.location.href = "backend.html";
    } else if ((document.getElementById("categorySpan").textContent === "JAVASCRIPT" || document.getElementById("categorySpan").textContent === "REACT" || document.getElementById("categorySpan").textContent === "ANGULAR" || document.getElementById("categorySpan").textContent === "C#" || document.getElementById("categorySpan").textContent === "NODE.JS" || document.getElementById("categorySpan").textContent === "PHP") && localStorage.getItem("x") == 6) {
      window.location.href = "fullstack.html";
    }
  });
  