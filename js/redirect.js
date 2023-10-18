document.addEventListener("DOMContentLoaded", function() {
    var containers = document.querySelectorAll(".category-link");

    containers.forEach(function(container) {
        container.addEventListener("click", function() {
            var title = container.querySelector(".card-panel").textContent.trim(); // Używamy trim() do usunięcia białych znaków
            localStorage.setItem("title", title);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var categorySpan = document.getElementById("categorySpan");
    
    if (categorySpan) {
        var title = localStorage.getItem("title");

        if (title) {
            console.log("Przekazana zmienna: " + title);

            categorySpan.textContent = title;
        } else {
            console.log("Brak przekazanej zmiennej.");
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".category-link");
    var categorySpan = document.getElementById("categorySpan");

    if (categorySpan) {
        var title = categorySpan.textContent; 

        buttons.forEach(function(button) {
            button.setAttribute("data-variable", title);
        });

        localStorage.setItem("title", title);
    }
});
