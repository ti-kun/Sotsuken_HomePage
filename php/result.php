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
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>投票結果</title>
    <link rel="stylesheet" href="../css/result.scss">
</head>

<body id="result-page">
    <div class="result-card">
        <div class="title-wrap">
            <h1>投票結果</h1>
        </div>

        <div class="result-list">
            <?php while($row = $result->fetch_assoc()): ?>
            <?php
                $max = 24; // 最大票数（仮）
                $percent = ($row['vote_count'] / $max) * 100;
            ?>

            <div class="result-row">
                <div class="info">
                    <span class="name">
                        <?= htmlspecialchars($row['Name']) ?>
                    </span>

                    <span class="count">
                        <?= $row['vote_count'] ?>票
                    </span>
                </div>

                <div class="graph-bg">
                    <div 
                        class="graph-bar"
                        data-width="<?= $percent ?>%"
                    ></div>
                </div>
            </div>
            <?php endwhile; ?>
        </div>
    </div>
<script src="../js/result.js" defer></script>
</body>
</html>