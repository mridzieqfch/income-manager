<?php 
// File: backend/goals/add_goal.php
require_once '../config.php';

if (!isset($_SESSION['user_id'])) {
    send_response(401, "error", "Akses ditolak.");
}
$user_id = $_SESSION['user_id'];

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->goal_name, $data->target_amount)) {
    send_response(400, "error", "Data sasaran tidak lengkap.");
}

$goal_name = trim($data->goal_name);
$target_amount = $data->target_amount;

if (empty($goal_name) || !is_numeric($target_amount) || $target_amount <= 0) {
    send_response(400, "error", "Nama atau target sasaran tidak valid.");
}

$conn = connectDB();
$stmt = $conn->prepare("INSERT INTO goals (user_id, goal_name, target_amount) VALUES (?, ?, ?)");
$stmt->bind_param("isd", $user_id, $goal_name, $target_amount);

if ($stmt->execute()) {
    send_response(201, "success", "Sasaran baru berhasil dibuat.");
} else {
    send_response(500, "error", "Gagal membuat sasaran.");
}

$stmt->close(); 
$conn->close();
?>