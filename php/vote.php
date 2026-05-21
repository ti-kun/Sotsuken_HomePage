<?php
session_start();

if (!isset($_SESSION['login'])) {

    header("Location: login.html");
    exit;

}
?>

<!DOCTYPE html>
<html>
<head>
    <title>投票画面</title>
</head>
<body>

<h1>投票画面</h1>

</body>
</html>