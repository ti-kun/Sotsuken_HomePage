/**絞り込み・件数表示 */
const datebtns = document.querySelectorAll('.date-btn');
const timebtns = document.querySelectorAll('.time-btn');
const resetbtn = document.querySelector('.reset-btn');
const datecard = document.querySelector('.date-card');
const timecard = document.querySelector('.time-card');

const countEl = document.getElementById('count');

/**初期状態 */

let selectedDate = 'all';
let selectedTime = 'all';
datecard.classList.add("full");
timecard.classList.add("hidden");

/**日付 */
datebtns.forEach(btn => {

    btn.addEventListener('click', () => {
        if(btn.classList.contains("active")){
            btn.classList.remove("active");
            timebtns.forEach(t => {
                t.classList.remove("active");
            });
            selectedDate = 'all';
            selectedTime = 'all';
            timecard.classList.add("hidden");
            datecard.classList.add("full");
        }else{
            datebtns.forEach(b => {
                b.classList.remove("active");
            });
            
            btn.classList.add("active");

        selectedDate = btn.dataset.date;
        datecard.classList.remove("full");
        setTimeout(() => {
            timecard.classList.remove("hidden");
        }, 195)
    }

        updateFilter();
    });

});

/**時間 */
timebtns.forEach(btn => {

    btn.addEventListener('click', () => {
        if(btn.classList.contains("active")){
            btn.classList.remove("active");
            selectedTime = 'all';
        }else{
            timebtns.forEach(t => {
                t.classList.remove("active");
            });
            
            btn.classList.add("active");

        selectedTime = btn.dataset.time;
        }

        updateFilter();
    });

});

/**リセット */
resetbtn.addEventListener('click', () => {

    datebtns.forEach(b => {
        b.classList.remove("active");
    });

    timebtns.forEach(t => {
        t.classList.remove("active");
    });

    selectedDate = 'all';
    selectedTime = 'all';
    datecard.classList.add("full");
    timecard.classList.add("hidden");

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

    fetch("../php/get_members.php")  // get_data.php → get_members.php に変更
        .then(response => response.json())
        .then(json => {

        const data = json.data;  // { success, data } 形式に対応

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
