<?php

header('Content-Type: application/json');

if (!isset($_GET['No'])) {

    echo json_encode([
        'exists' => false
    ]);

    exit;

}

$No = (int)$_GET['No'];

$conn = new mysqli(
    "localhost",
    "root",
    "Ti-kun@4808",
    "group_list_db"
);

$stmt = $conn->prepare("
    SELECT *
    FROM classmate
    WHERE No = ?
");

$stmt->bind_param("i", $No);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $student = $result->fetch_assoc();

    echo json_encode([
        'exists' => true,
        'No' => $student['No'],
        'Name' => $student['Name'],
        'Mail' => $student['Mail'],
        'Link' => $student['Link']
    ]);

} else {

    echo json_encode([
        'exists' => false
    ]);

}