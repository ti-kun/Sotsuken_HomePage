<?php
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['login'])) {

    echo json_encode([
        "success" => false,
        "message" => "未ログイン"
    ]);

    exit;
}

$conn = new mysqli(
    "localhost",
    "root",
    "Ti-kun@4808",
    "group_list_db"
);

$voter_no = trim((string)$_SESSION['user_id']);
$voted_no = trim((string)$_POST['voted_no']);

if ($voter_no === $voted_no) {

    echo json_encode([
        "success" => false,
        "message" => "自分には投票できません"
    ]);

    exit;
}

$sql = "
UPDATE classmate
SET vote = ?
WHERE No = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ss",
    $voted_no,
    $voter_no
);

$stmt->execute();

echo json_encode([
    "success" => true
]);
?>