/**管理画面 */
const noInput =
    document.getElementById("student-no");
const passInput =
    document.getElementById("pass");
const nameInput =
    document.getElementById("name");
const mailInput =
    document.getElementById("mail");
const linkInput =
    document.getElementById("link");
const submitBtn =
    document.getElementById("submit-btn");
const tbody = document.getElementById('student-list');
let allStudents = [];
let editMode = false;
let editNo = null;
let originalNo = null;

/**パスワード全角除外 */
passInput.addEventListener('input', () => {
    passInput.value =
        passInput.value.replace(/[^\x20-\x7E]/g, '');
});

noInput.addEventListener("input", async () => {
    if (editMode) return;
    const no = noInput.value;
    if (!no) {
        submitBtn.textContent = "追加";
        nameInput.value = "";
        passInput.value = "";
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
        passInput.value = data.pass ?? "";
        nameInput.value = data.Name ?? "";
        mailInput.value = data.Mail ?? "";
        linkInput.value = data.Link ?? "";
    } else {
        submitBtn.textContent = "追加";
        passInput.value = "";
        nameInput.value = "";
        mailInput.value = "";
        linkInput.value = "";
    }
});

async function loadStudents() {
    try {
        const response = await fetch('../php/get_classmate.php');
        const data = await response.json();
        allStudents = data;
        renderStudents(data)
    } catch (error) {
        console.error(error);
        alert('データ取得エラー');
    }
}

/**編集ボタン押下時 */
function editStudent(no) {
    const student = allStudents.find(
        s => s.No == no
    );
    if (!student) return;
    editMode = true;
    originalNo = student.No;
    noInput.value = student.No;
    passInput.value = student.pass
    nameInput.value = student.Name;
    mailInput.value = student.Mail ?? '';
    linkInput.value = student.Link ?? '';
    submitBtn.textContent = '更新';
}

/**保存ボタン押下時 */
async function saveStudent() {
    const No = noInput.value.trim();
    let pass = passInput.value.trim();
    const Name = nameInput.value.trim();
    const Mail = mailInput.value.trim();
    const Link = linkInput.value.trim();

    /* =====================
    バリデーション
    ===================== */

    if (!No) {
        alert('学籍番号を入力してください');
        noInput.focus();
        return;
    }

    if (!pass) {
        pass = 'pass';
    }

    if (!Name) {
        alert('名前を入力してください');
        nameInput.focus();
        return;
    }

    if (!Mail) {
        alert('メールアドレスを入力してください');
        nameInput.focus();
        return;
    }

    if (!Link) {
        alert('ホームページのリンクを入力してください');
        nameInput.focus();
        return;
    }

    /* =====================
    保存
    ===================== */

    try {
        const response = await fetch(
            '../php/save_classmate.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mode: 'save',
                    originalNo,
                    No,
                    pass,
                    Name,
                    Mail,
                    Link
                })
            }
        );

        const data = await response.json();

        if (!data.success) {
            alert(data.message ?? '保存失敗');
            return;
        }
        alert('保存しました');
        loadStudents();
        resetForm();
    } catch (error) {
        console.error(error);
        alert('保存エラー');
    }
}

/**リセットボタン押下時 */
function resetForm() {
    editMode = false;
    originalNo = null;
    document.querySelector('form').reset();
    submitBtn.textContent = '追加';
}

/**削除ボタン押下時 */
async function deleteStudent(no) {
    const result = confirm(`${no} を削除しますか？`);
    if (!result) return;
    try {
        const response = await fetch('../php/save_classmate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mode: 'delete',
                No: no
            })
        });

        const data = await response.json();
        if (!data.success) {
            alert(data.message);
            return;
        }
        alert('削除しました');
        loadStudents();
    } catch (error) {
        console.error(error);
        alert('削除エラー');
    }
}

/**一覧表示 */
function renderStudents(data) {
    document.getElementById(
        'student-count'
    ).textContent = data.length;

    tbody.innerHTML = data.map(student => `
        <tr>
            <td>${student.No}</td>
            <td>${student.Name}</td>
            <td>${student.Mail ?? ''}</td>
            <td>
                ${
                    student.Link
                    ? `<a href="${student.Link}" target="_blank">リンク</a>`
                    : '—'
                }
            </td>
            <td>
                <div class="action-buttons">
                    <button
                        class="table-btn edit-btn"
                        onclick="editStudent(${student.No})"
                    >
                        編集
                    </button>

                    <button
                        class="table-btn delete-btn"
                        onclick="deleteStudent(${student.No})"
                    >
                        削除
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

}

loadStudents();