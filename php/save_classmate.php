<?php

header('Content-Type: application/json');

$data = json_decode(
    file_get_contents('php://input'),
    true
);

$conn = new mysqli(
    "localhost",
    "root",
    "Ti-kun@4808",
    "group_list_db"
);

if ($conn->connect_error) {

    echo json_encode([
        'success' => false,
        'message' => 'DB接続失敗'
    ]);

    exit;

}

$mode = $data['mode'] ?? '';

/* =========================
削除
========================= */

if ($mode === 'delete') {

    $No = (int)$data['No'];

    $stmt = $conn->prepare("
        DELETE FROM classmate
        WHERE No = ?
    ");

    $stmt->bind_param("i", $No);

    $result = $stmt->execute();

    echo json_encode([
        'success' => $result
    ]);

    exit;
}

/* =========================
保存・更新
========================= */

$No = (int)$data['No'];

$Name = trim($data['Name']);

$Mail = trim($data['Mail']);

$Link = trim($data['Link']);

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

echo json_encode([
    'success' => $result
]);