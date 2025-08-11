<?php 
// File: backend/crypto/get_crypto.php
require_once '../config.php';

if (!isset($_SESSION['user_id'])) {
    send_response(401, "error", "Akses ditolak.");
}
$user_id = $_SESSION['user_id'];

$conn = connectDB();
$stmt = $conn->prepare("SELECT id, tanggal, pair_or_symbol, lot_or_amount, profit_loss, keterangan FROM transactions WHERE user_id = ? AND type = 'crypto' ORDER BY tanggal DESC, id DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$transactions = $result->fetch_all(MYSQLI_ASSOC);

send_response(200, "success", "Data Crypto berhasil diambil.", $transactions);

$stmt->close(); 
$conn->close();
?>