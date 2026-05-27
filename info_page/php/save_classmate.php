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
$originalNo = $data['originalNo'] ?? null;

$No = (int)$data['No'];

$pass = trim($data['pass']);

$Name = trim($data['Name']);

$Mail = trim($data['Mail']);

$Link = trim($data['Link']);

if ($originalNo !== null) {
    $sql = "
    UPDATE classmate
    SET
        No = ?,
        pass = ?,
        Name = ?,
        Mail = ?,
        Link = ?
    WHERE No = ?
    ";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "issssi",
        $No,
        $pass,
        $Name,
        $Mail,
        $Link,
        $originalNo
    );
}

else {
    $sql = "
    INSERT INTO classmate (
        No,
        pass,
        Name,
        Mail,
        Link
    )
    VALUES (?, ?, ?, ?, ?)
    ";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "issss",
        $No,
        $pass,
        $Name,
        $Mail,
        $Link
    );
}

$result = $stmt->execute();

echo json_encode([
    'success' => $result
]);