/**件数表示 */
const btns = document.querySelectorAll('.filter-btn');
const countEl = document.getElementById('count');

btns.forEach(btn => {

    btn.addEventListener('click', () => {

        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const f = btn.dataset.filter;

        const rows = document.querySelectorAll('#tableBody tr');

        let visible = 0;

        rows.forEach(row => {

            const show =
                f === 'all' ||
                row.dataset.cat === f;

            row.style.display = show ? '' : 'none';

            if(show){
                visible++;
            }

        });

        countEl.textContent = visible;

    });

});


/**データ取得及びテーブル反映 */
document.addEventListener("DOMContentLoaded", () => {

    fetch("../php/get_data.php")
        .then(response => response.json())
        .then(data => {

        countEl.textContent = data.length;

        const tbody = document.getElementById("tableBody");

        data.forEach(item => {

            tbody.innerHTML += `
            <tr class="link-row"
                data-href="${item.HP_link}">

                <td>${item.date}</td>

                <td>${item.time}</td>

                <td>${item.class_name}</td>

                <td>${item.title}</td>

                <td>${item.link_title}</td>

            </tr>
            `;
        });

        });

});

document.addEventListener("click", function(e){

    const row = e.target.closest(".link-row");

    if(row){

        window.open(row.dataset.href, "_blank");
    }

});