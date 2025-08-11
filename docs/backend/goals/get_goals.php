<?php 
// File: backend/goals/get_goals.php
require_once '../config.php';

if (!isset($_SESSION['user_id'])) {
    send_response(401, "error", "Akses ditolak.");
}
$user_id = $_SESSION['user_id'];

$conn = connectDB();
$stmt = $conn->prepare("SELECT id, goal_name, target_amount, current_amount FROM goals WHERE user_id = ? ORDER BY created_at DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$goals = $result->fetch_all(MYSQLI_ASSOC);

send_response(200, "success", "Data sasaran berhasil diambil.", $goals);

$stmt->close(); 
$conn->close();
?>