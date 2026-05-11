const btn = document.querySelector(".menu-icon");
const menu = document.getElementById("menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

const index = document.querySelector(".index");
const buttons = document.querySelectorAll(".button");

window.addEventListener("scroll", () => {
    const top = index.getBoundingClientRect().top;

    if (top <= 0) {
        buttons.forEach((button) => {
            button.classList.add("active");
        });
    } else {
        buttons.forEach((button) => {
            button.classList.remove("active");
        });
    }
});