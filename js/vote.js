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
                    <td>${item.Age}</td>
                    <td>${item.Name}</td>
                    <td>${item.Mail}</td>
                    <td>
                        <a href="${item.Link}" target="_blank">
                            ${item.Link}
                        </a>
                    </td>
                    <td class="check-box"><input type="checkbox" class="checkbox-button"></td>
                </tr>
                `;
            });

        });

});