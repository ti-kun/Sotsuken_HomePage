<?php

$conn = new mysqli(
    "localhost",
    "root",
    "Ti-kun@4808",
    "group_list_db"
);

$No = (int)$_POST['No'];

$Name = trim($_POST['Name']);

$Mail = trim($_POST['Mail']);

$Link = trim($_POST['Link']);

$sql = "
INSERT INTO classmate (
    No,
    Name,
    Mail,
    Link
)
VALUES (?, ?, ?, ?)

ON DUPLICATE KEY UPDATE
    Name = VALUES(Name),
    Mail = VALUES(Mail),
    Link = VALUES(Link)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "isss",
    $No,
    $Name,
    $Mail,
    $Link
);

$result = $stmt->execute();

?>

<!DOCTYPE html>
<html lang='ja'>

<head>
<meta charset='UTF-8'>
<title>保存完了</title>
</head>

<body>

<?php if($result): ?>

    <h1>保存完了</h1>

<?php else: ?>

    <h1>保存失敗</h1>

    <p>
        <?= htmlspecialchars($conn->error) ?>
    </p>

<?php endif; ?>

<a href="../html/vote_admin.html">
    戻る
</a>

</body>
</html>