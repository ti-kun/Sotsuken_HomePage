<?php

$conn = new mysqli(
    "localhost",
    "root",
    "Ti-kun@4808",
    "group_list_db"
);

$sql = "
SELECT
    c2.Name,
    c2.No,
    COUNT(c1.vote) AS vote_count

FROM classmate c2

LEFT JOIN classmate c1
ON c1.vote = c2.No

GROUP BY c2.No

ORDER BY vote_count DESC
";

$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang='ja'>

<head>
<meta charset='UTF-8'>
<title>投票結果</title>
</head>

<body>

<h1>投票結果</h1>

<?php while($row = $result->fetch_assoc()): ?>

<p>
    <?= htmlspecialchars($row['Name']) ?>
    （<?= htmlspecialchars($row['No']) ?>）
    ：
    <?= $row['vote_count'] ?>票
</p>

<?php endwhile; ?>

</body>
</html>