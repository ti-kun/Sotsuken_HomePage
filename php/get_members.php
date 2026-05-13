<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db.php';

try {
    $pdo = getDBConnection();

    $where  = [];
    $params = [];

    if (!empty($_GET['date'])) {
        $where[]         = 'm.date = :date';
        $params[':date'] = $_GET['date'];
    }
    if (!empty($_GET['time'])) {
        $where[]         = 'm.time = :time';
        $params[':time'] = $_GET['time'];
    }

    $whereSQL = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $sql = "
        SELECT
            m.No,
            m.date,
            m.time,
            m.class_code,
            c.class_name,
            m.title,
            m.HP_link,
            m.link_title
        FROM members m
        JOIN class c ON m.class_code = c.class_code
        $whereSQL
        ORDER BY m.date ASC, m.time ASC, m.No ASC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    echo json_encode(
        ['success' => true, 'data' => $rows],
        JSON_UNESCAPED_UNICODE
    );

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(
        ['success' => false, 'message' => $e->getMessage()],
        JSON_UNESCAPED_UNICODE
    );
}
