<?php
// File: backend/delete_data.php
require_once 'config.php';

// Pastikan pengguna sudah login
if (!isset($_SESSION['user_id'])) {
    send_response(401, "error", "Akses ditolak. Silakan login.");
}
$user_id = $_SESSION['user_id'];

// Ambil data dari body request
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id) || !is_numeric($data->id)) {
    send_response(400, "error", "ID transaksi tidak valid.");
}
$transaction_id = $data->id;

$conn = connectDB();
// Pastikan hanya pemilik yang bisa menghapus
$stmt = $conn->prepare("DELETE FROM transactions WHERE id = ? AND user_id = ?");
$stmt->bind_param("ii", $transaction_id, $user_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        send_response(200, "success", "Transaksi berhasil dihapus.");
    } else {
        send_response(404, "error", "Transaksi tidak ditemukan atau Anda tidak berhak menghapusnya.");
    }
} else {
    send_response(500, "error", "Gagal menghapus transaksi.");
}

$stmt->close();
$conn->close();
?>
