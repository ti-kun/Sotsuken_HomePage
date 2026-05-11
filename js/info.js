const btns = document.querySelectorAll('.filter-btn');
const rows = document.querySelectorAll('#tableBody tr');
const countEl = document.getElementById('count');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        let visible = 0;
        rows.forEach(row => {
            const show = f === 'all' || row.dataset.cat === f;
            row.style.display = show ? '' : 'none';
            if (show) visible++;
        });
        countEl.textContent = visible;
    });
});

document.querySelectorAll(".link-row").forEach(row => {
    row.addEventListener("click", () => {
    window.open(row.dataset.href, "_blank");
    });
});


fetch("../php/get_data.php")
    .then(response => response.json())
    .then(data => {

        const tbody = document.getElementById("tableBody");

        data.forEach(item => {

        tbody.innerHTML += `
            <tr class="link-row"
                data-href="${item.HP_link}">

            <td>${item.date}</td>

            <td>${item.time}限目</td>

            <td>${item.class_code}</td>

            <td class="title">
                ${item.title}
            </td>

            <td class="summary">
                ${item.link_title}
            </td>

            </tr>
        `;

        });

    });