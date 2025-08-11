<?php 
// File: backend/auth/register.php
require_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username, $data->email, $data->password)) {
    send_response(400, "error", "Data pendaftaran tidak lengkap.");
}

$username = trim($data->username); 
$email = trim($data->email); 
$password = trim($data->password);

if (empty($username) || empty($email) || empty($password)) {
    send_response(400, "error", "Semua kolom wajib diisi.");
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_response(400, "error", "Format email tidak valid.");
}
if (strlen($password) < 6) {
    send_response(400, "error", "Password minimal harus 6 karakter.");
}

$conn = connectDB();

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $username, $email);
$stmt->execute(); 
$stmt->store_result();

if ($stmt->num_rows > 0) {
    send_response(409, "error", "Username atau email sudah terdaftar.");
}
$stmt->close();

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashed_password);

if ($stmt->execute()) {
    send_response(201, "success", "Pendaftaran berhasil! Silakan login.");
} else {
    send_response(500, "error", "Gagal melakukan pendaftaran: " . $stmt->error);
}

$stmt->close(); 
$conn->close();
?>