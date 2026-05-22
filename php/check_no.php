<?php

header('Content-Type: application/json');

$conn = new mysqli(
    "localhost",
    "root",
    "Ti-kun@4808",
    "group_list_db"
);

$No = (int)$_GET['No'];

$sql = "
SELECT
    No,
    Name,
    Mail,
    Link
FROM classmate
WHERE No = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $No);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "exists" => true,
        "Name" => $row['Name'],
        "Mail" => $row['Mail'],
        "Link" => $row['Link']
    ]);
} else {
    echo json_encode([
        "exists" => false
    ]);
}
?>