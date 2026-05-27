<?php
session_start();

if (!isset($_SESSION['login'])) {
    header("Location: login.html");
    exit;
}

$user_no = $_SESSION['user_id'];
$user_name = $_SESSION['user_name'];
?>

<!DOCTYPE html>
<html>
<head>
    <title>☆卒研投票サイト☆</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/vote.scss">
</head>

<body>
    <div class="login-user">
        <p>
            ログイン中のアカウント：
            <?php echo htmlspecialchars($user_no, ENT_QUOTES, 'UTF-8'); ?>&nbsp;&nbsp;
            <?php echo htmlspecialchars($user_name, ENT_QUOTES, 'UTF-8'); ?>
        </p>
    </div>

    <div class="contents-card">
        <div class="card-title">
            <h2>投票先選択</h2>
        </div>

        <div class="filter-bar-wrap">
            <p>適用するフィルターを選んでね☆：</p>
            <button class="filter-favorite">お気に入り</button>
        </div>

        <div  class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th class="border" id="favorite">お気に入り</th>
                        <th class="border" style="min-width: 15%;">名前</th>
                        <th class="border" style="min-width: 30%;">E-Mail</th>
                        <th class="border" style="min-width: 30%;">リンク</th>
                        <th id="vote">投票先</th>
                    </tr>
                </thead>
                
                <tbody id="tableBody">
                </tbody>
            </table>
        </div>

        <div class="vote-button-wrap">
            <button class="vote-button">
                ☆投票☆
            </button>
        </div>
    </div>
<script src="../js/vote.js" defer></script>
</body>
</html>