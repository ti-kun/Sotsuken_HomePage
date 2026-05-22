/**管理画面 */
const noInput =
    document.getElementById("student-no");
const nameInput =
    document.getElementById("name");
const mailInput =
    document.getElementById("mail");
const linkInput =
    document.getElementById("link");
const submitBtn =
    document.getElementById("submit-btn");

noInput.addEventListener("input", async () => {

    const no = noInput.value;

    if (!no) {

        submitBtn.textContent = "追加";

        nameInput.value = "";
        mailInput.value = "";
        linkInput.value = "";

        return;
    }

    const response = await fetch(
        `/Sotsuken_HomePage/php/check_no.php?No=${no}`
    );

    const data = await response.json();

    if (data.exists) {

        submitBtn.textContent = "更新";

        nameInput.value = data.Name ?? "";
        mailInput.value = data.Mail ?? "";
        linkInput.value = data.Link ?? "";

    } else {

        submitBtn.textContent = "追加";

        nameInput.value = "";
        mailInput.value = "";
        linkInput.value = "";

    }

});