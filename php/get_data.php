<?php


header('Content-Type: application/json');

$pdo = new PDO(
    "mysql:host=localhost;dbname=group_list_db;charset=utf8",
    "root",
    ""
);

$sql = "
    SELECT
        members.*,
        class.class_name
    FROM members
    JOIN class
    ON members.class_code = class.class_code
    ORDER BY date, time
";

$stmt = $pdo->query($sql);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data, JSON_UNESCAPED_UNICODE);