/**データ取得及びテーブル反映 */
document.addEventListener("DOMContentLoaded", () => {

    fetch("../php/get_classmate.php")
        .then(response => response.json())
        .then(data => {

            const tbody = document.getElementById("tableBody");

            data.forEach(item => {

                tbody.innerHTML += `
                <tr>
                    <td class="star"><button class="favorite-button">☆</button></td>
                    <td>${item.Name}</td>
                    <td>${item.Mail}</td>
                    <td class="Link">
                        <a href="${item.Link}" target="_blank">
                            ${item.Link}
                        </a>
                    </td>
                    <td class="radio">
                        <input type="radio" name="vote" class="vote-button" value="${item.No}">
                    </td>
                </tr>
                `;
            });

        });

});

/**フィルターボタン */
const filterfavoritebtn = document.querySelector('.filter-favorite');

filterfavoritebtn.addEventListener('click', () => {
    filterfavoritebtn.classList.toggle("active");

    const rows = document.querySelectorAll('#tableBody tr');

    rows.forEach(row => {
        if (filterfavoritebtn.classList.contains("active")) {
            if (!row.classList.contains("favorite-row")) {
                row.style.display = "none";
            }
        }else{
            row.style.display = "";
        }
    });
});

/**お気に入りボタン */
document.addEventListener("click", e => {

    if (e.target.classList.contains("favorite-button")) {
        const btn = e.target;
        const row = btn.closest("tr");

        btn.classList.toggle("active");
        row.classList.toggle("favorite-row");

        btn.textContent =
            btn.classList.contains("active")
            ? "★"
            : "☆";
    }

});

/**投票ボタン */
const voteBtn = document.querySelector(".vote-button");

voteBtn.addEventListener("click", async () => {

    const selected = document.querySelector(
        'input[name="vote"]:checked'
    );

    if (!selected) {
        alert("選択してください");
        return;
    }else{
        const votedNo = selected.value;
        const result = confirm(
            `${votedNo} に投票しますか？`
        );

        if (!result) {
            return;
        }

        const response = await fetch(
            "submit_vote.php",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/x-www-form-urlencoded"
                },

                body:
                `voted_no=${votedNo}`
            }
        );

        const data = await response.json();
        if (data.success) {
            alert("投票完了");
            location.href =
            "../php/result.php";
        } else {
            alert(data.message);
        }
    }
});