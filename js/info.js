/**絞り込み・件数表示 */
const datebtns = document.querySelectorAll('.date-btn');
const timebtns = document.querySelectorAll('.time-btn');
const resetbtn = document.querySelector('.reset-btn');

const countEl = document.getElementById('count');

/**初期状態 */

let selectedDate = 'all';
let selectedTime = 'all';

/**日付 */
datebtns.forEach(btn => {

    btn.addEventListener('click', () => {

        selectedDate = btn.dataset.date;

        updateFilter();

    });

});

/**時間 */
timebtns.forEach(btn => {

    btn.addEventListener('click', () => {

        selectedTime = btn.dataset.time;

        updateFilter();

    });

});

/**リセット */
resetbtn.addEventListener('click', () => {

    selectedDate = 'all';
    selectedTime = 'all';

    updateFilter();

});

function updateFilter(){

    const rows = document.querySelectorAll('#tableBody tr');

    let visible = 0;

    rows.forEach(row => {

        const show =

            (selectedDate === 'all' ||
                row.dataset.date === selectedDate)

            &&

            (selectedTime === 'all' ||
                row.dataset.time === selectedTime);

        row.style.display = show ? '' : 'none';

        if(show){
            visible++;
        }

    });

    countEl.textContent = visible;

}

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
                data-href="${item.HP_link}"
                data-date="${item.date}"
                data-time="${item.time}">

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