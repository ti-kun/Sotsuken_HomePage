<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// プリフライトリクエスト対応
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$body   = json_decode(file_get_contents('php://input'), true) ?? [];

try {
    $pdo = getDBConnection();

    // ─── INSERT（No は AUTO_INCREMENT のため不要）────────────
    if ($method === 'POST') {
        $required = ['date', 'time', 'class_code', 'title', 'HP_link'];
        foreach ($required as $f) {
            if (!isset($body[$f]) || trim($body[$f]) === '') {
                throw new InvalidArgumentException("必須項目が未入力です: {$f}");
            }
        }

        $stmt = $pdo->prepare("
            INSERT INTO members (date, time, class_code, title, HP_link, link_title)
            VALUES (:date, :time, :class_code, :title, :HP_link, :link_title)
        ");
        $stmt->execute([
            ':date'       => $body['date'],
            ':time'       => $body['time'],
            ':class_code' => $body['class_code'],
            ':title'      => trim($body['title']),
            ':HP_link'    => trim($body['HP_link']),
            ':link_title' => isset($body['link_title']) ? trim($body['link_title']) : null,
        ]);

        $newNo = $pdo->lastInsertId();
        echo json_encode(
            ['success' => true, 'message' => "登録しました（No.{$newNo}）", 'No' => $newNo],
            JSON_UNESCAPED_UNICODE
        );

    // ─── UPDATE ──────────────────────────────────────────────
    } elseif ($method === 'PUT') {
        if (empty($body['No'])) {
            throw new InvalidArgumentException('No が指定されていません');
        }

        $stmt = $pdo->prepare("
            UPDATE members
            SET date       = :date,
                time       = :time,
                class_code = :class_code,
                title      = :title,
                HP_link    = :HP_link,
                link_title = :link_title
            WHERE No = :No
        ");
        $stmt->execute([
            ':No'         => $body['No'],
            ':date'       => $body['date'],
            ':time'       => $body['time'],
            ':class_code' => $body['class_code'],
            ':title'      => trim($body['title']),
            ':HP_link'    => trim($body['HP_link']),
            ':link_title' => isset($body['link_title']) ? trim($body['link_title']) : null,
        ]);

        echo json_encode(
            ['success' => true, 'message' => "No.{$body['No']} を更新しました"],
            JSON_UNESCAPED_UNICODE
        );

    // ─── DELETE ──────────────────────────────────────────────
    } elseif ($method === 'DELETE') {
        $no = $body['No'] ?? ($_GET['No'] ?? null);
        if (!$no) {
            throw new InvalidArgumentException('No が指定されていません');
        }

        $stmt = $pdo->prepare('DELETE FROM members WHERE No = :No');
        $stmt->execute([':No' => $no]);

        echo json_encode(
            ['success' => true, 'message' => "No.{$no} を削除しました"],
            JSON_UNESCAPED_UNICODE
        );

    } else {
        http_response_code(405);
        echo json_encode(
            ['success' => false, 'message' => 'Method Not Allowed'],
            JSON_UNESCAPED_UNICODE
        );
    }

} catch (InvalidArgumentException $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
