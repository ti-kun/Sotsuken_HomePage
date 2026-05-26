<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db.php';

try {
    $pdo  = getDBConnection();
    $stmt = $pdo->query(
        'SELECT class_code, class_name FROM class ORDER BY class_code ASC'
    );
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
