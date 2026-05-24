window.addEventListener("load", () => {
    const bars = document.querySelectorAll(".graph-bar");
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.dataset.width;
        }, index * 120);
    });
});