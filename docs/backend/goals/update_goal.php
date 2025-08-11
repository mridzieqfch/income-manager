<?php 
// File: backend/goals/update_goal.php
require_once '../config.php';

if (!isset($_SESSION['user_id'])) {
    send_response(401, "error", "Akses ditolak.");
}
$user_id = $_SESSION['user_id'];

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id, $data->amount_to_add)) {
    send_response(400, "error", "Data untuk pembaruan tidak lengkap.");
}

$goal_id = $data->id;
$amount_to_add = $data->amount_to_add;

if (!is_numeric($goal_id) || !is_numeric($amount_to_add) || $amount_to_add <= 0) {
    send_response(400, "error", "Jumlah atau ID sasaran tidak valid.");
}

$conn = connectDB();
$stmt = $conn->prepare("UPDATE goals SET current_amount = current_amount + ? WHERE id = ? AND user_id = ?");
$stmt->bind_param("dii", $amount_to_add, $goal_id, $user_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        send_response(200, "success", "Tabungan berhasil ditambahkan.");
    } else {
        send_response(404, "error", "Sasaran tidak ditemukan atau Anda tidak berhak mengubahnya.");
    }
} else {
    send_response(500, "error", "Gagal memperbarui sasaran.");
}

$stmt->close(); 
$conn->close();
?>