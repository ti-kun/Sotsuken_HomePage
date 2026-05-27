<?php
session_start();

$conn = new mysqli(
    "localhost",
    "root",
    "Ti-kun@4808",
    "group_list_db"
);

$student_no = $_POST['No'];
$password = $_POST['pass'];

$sql = "SELECT * FROM classmate WHERE No = ?";
$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $student_no);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && $password === $user['pass']) {

    $_SESSION['login'] = true;
    $_SESSION['user_id'] = $user['No'];
    $_SESSION['user_name'] = $user['Name'];

    header("Location: vote.php");
    exit;

} else {

    echo "ログイン失敗";

}
?>