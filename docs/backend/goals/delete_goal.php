<?php 
// File: backend/goals/delete_goal.php
require_once '../config.php';

if (!isset($_SESSION['user_id'])) {
    send_response(401, "error", "Akses ditolak.");
}
$user_id = $_SESSION['user_id'];

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id) || !is_numeric($data->id)) {
    send_response(400, "error", "ID sasaran tidak valid.");
}

$goal_id = $data->id;

$conn = connectDB();
$stmt = $conn->prepare("DELETE FROM goals WHERE id = ? AND user_id = ?");
$stmt->bind_param("ii", $goal_id, $user_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        send_response(200, "success", "Sasaran berhasil dihapus.");
    } else {
        send_response(404, "error", "Sasaran tidak ditemukan atau Anda tidak berhak menghapusnya.");
    }
} else {
    send_response(500, "error", "Gagal menghapus sasaran.");
}

$stmt->close(); 
$conn->close();
?>