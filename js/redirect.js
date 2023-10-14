document.addEventListener("DOMContentLoaded", function() {
    var przyciski = document.querySelectorAll(".category-button");

    przyciski.forEach(function(przycisk) {
        przycisk.addEventListener("click", function() {
            var zmienna = przycisk.getAttribute("data-variable");
            localStorage.setItem("zmienna", zmienna);
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var categorySpan = document.getElementById("categorySpan");
    
    if (categorySpan) {
        var zmienna = localStorage.getItem("zmienna");

        if (zmienna) {
            console.log("Przekazana zmienna: " + zmienna);

            categorySpan.textContent = zmienna;
        } else {
            console.log("Brak przekazanej zmiennej.");
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var przyciski = document.querySelectorAll(".category-button");
    var categorySpan = document.getElementById("categorySpan");

    if (categorySpan) {
        var zmienna = categorySpan.textContent; // Pobierz tekst z categorySpan

        przyciski.forEach(function(przycisk) {
            przycisk.setAttribute("data-variable", zmienna); // Ustaw wartość atrybutu data-variable
        });

        localStorage.setItem("zmienna", zmienna);
    }
});