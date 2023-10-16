document.addEventListener("DOMContentLoaded", function() {
    var buttons = document.querySelectorAll(".category-button");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            var title = button.getAttribute("data-variable");
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
    var buttons = document.querySelectorAll(".category-button");
    var categorySpan = document.getElementById("categorySpan");

    if (categorySpan) {
        var title = categorySpan.textContent; 

        buttons.forEach(function(button) {
            button.setAttribute("data-variable", title);
        });

        localStorage.setItem("title", title);
    }
});

zmienna