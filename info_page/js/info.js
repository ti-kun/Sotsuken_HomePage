// js/info.js
// ─── API パス（html/ から見た相対パス）─────────────────
const API_BASE = '../php/get_members.php';

let allData = [];

// 時間コードを表示文字列に変換
function timeLabel(t) {
    const map = { '1': '1限', '2': '2限', '3': '3限', '4': '4限', '5': '5限', '6': '6限' };
    return map[t] ?? t;
}

// 日付を MM/DD 形式に変換
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
}

// テーブル描画
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    const countEl = document.getElementById('count');
    countEl.textContent = data.length;

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:#888;">該当するデータがありません</td></tr>';
        return;
    }

    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${formatDate(row.date)}</td>
            <td>${timeLabel(row.time)}</td>
            <td>${row.class_name ?? row.class_code}</td>
            <td>
                ${row.HP_link
                    ? `<a href="${escHtml(row.HP_link)}" target="_blank" rel="noopener">${escHtml(row.link_title || row.title)}</a>`
                    : escHtml(row.title)
                }
            </td>
            <td>${escHtml(row.title)}</td>
        </tr>
    `).join('');
}

// XSS対策
function escHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// フィルター適用
function applyFilter() {
    const activeDate = document.querySelector('.date-btn.active')?.dataset.date ?? '';
    const activeTime = document.querySelector('.time-btn.active')?.dataset.time ?? '';

    const filtered = allData.filter(row => {
        const matchDate = !activeDate || row.date === activeDate;
        const matchTime = !activeTime || row.time === activeTime;
        return matchDate && matchTime;
    });
    renderTable(filtered);
}

// データ取得
async function fetchData() {
    try {
        const res = await fetch(API_BASE);
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        allData = json.data;
        applyFilter();
    } catch (e) {
        console.error('データ取得エラー:', e);
        document.getElementById('tableBody').innerHTML =
            '<tr><td colspan="5" style="text-align:center;color:red;">データの取得に失敗しました</td></tr>';
    }
}

// ボタンイベント登録
document.querySelectorAll('.date-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');
        document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
        if (!isActive) btn.classList.add('active');
        applyFilter();
    });
});

document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const isActive = btn.classList.contains('active');
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        if (!isActive) btn.classList.add('active');
        applyFilter();
    });
});

document.querySelector('.reset-btn')?.addEventListener('click', () => {
    document.querySelectorAll('.date-btn, .time-btn').forEach(b => b.classList.remove('active'));
    applyFilter();
});

// 初期化
fetchData();
