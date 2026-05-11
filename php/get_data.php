<?php


header('Content-Type: application/json');

$pdo = new PDO(
    "mysql:host=localhost;dbname=group_list_db;charset=utf8",
    "root",
    ""
);

$sql = "SELECT * FROM members";

$stmt = $pdo->query($sql);

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data, JSON_UNESCAPED_UNICODE);