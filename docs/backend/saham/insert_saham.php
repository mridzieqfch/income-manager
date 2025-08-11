<?php 
// File: backend/saham/insert_saham.php
require_once '../config.php';

if (!isset($_SESSION['user_id'])) {
    send_response(401, "error", "Akses ditolak.");
}
$user_id = $_SESSION['user_id'];

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->tanggal, $data->pair_or_symbol, $data->lot_or_amount, $data->profit_loss)) {
    send_response(400, "error", "Data transaksi tidak lengkap.");
}

$keterangan = isset($data->keterangan) ? trim($data->keterangan) : null;

$conn = connectDB();
$stmt = $conn->prepare("INSERT INTO transactions (user_id, type, tanggal, pair_or_symbol, lot_or_amount, profit_loss, keterangan) VALUES (?, 'saham', ?, ?, ?, ?, ?)");
$stmt->bind_param("issdds", $user_id, $data->tanggal, $data->pair_or_symbol, $data->lot_or_amount, $data->profit_loss, $keterangan);

if ($stmt->execute()) {
    send_response(201, "success", "Transaksi Saham berhasil disimpan.");
} else {
    send_response(500, "error", "Gagal menyimpan transaksi.");
}

$stmt->close(); 
$conn->close();
?>