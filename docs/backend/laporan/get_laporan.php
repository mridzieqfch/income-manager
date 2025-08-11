<?php
// File: backend/laporan/get_laporan.php
require_once '../config.php';

if (!isset($_SESSION['user_id'])) {
    send_response(401, "error", "Akses ditolak. Silakan login.");
}
$user_id = $_SESSION['user_id'];

// Ambil parameter filter dari query string (GET request)
$type = $_GET['type'] ?? 'semua';
$start_date = $_GET['start_date'] ?? null;
$end_date = $_GET['end_date'] ?? null;

$conn = connectDB();

// Bangun query dasar
$sql = "SELECT id, tanggal, type, pair_or_symbol, lot_or_amount, profit_loss 
        FROM transactions 
        WHERE user_id = ?";
$params = ["i", $user_id];

// Tambahkan filter jika ada
if ($type !== 'semua') {
    $sql .= " AND type = ?";
    $params[0] .= "s";
    $params[] = $type;
}
if ($start_date) {
    $sql .= " AND tanggal >= ?";
    $params[0] .= "s";
    $params[] = $start_date;
}
if ($end_date) {
    $sql .= " AND tanggal <= ?";
    $params[0] .= "s";
    $params[] = $end_date;
}

$sql .= " ORDER BY tanggal DESC, id DESC";

$stmt = $conn->prepare($sql);

// bind_param membutuhkan referensi, jadi kita buat array referensi
$ref_params = [];
foreach ($params as $key => &$param) {
    $ref_params[$key] = &$param;
}
call_user_func_array([$stmt, 'bind_param'], $ref_params);

$stmt->execute();
$result = $stmt->get_result();
$laporan = $result->fetch_all(MYSQLI_ASSOC);

send_response(200, "success", "Data laporan berhasil diambil.", $laporan);

$stmt->close();
$conn->close();
?>
