<?php 
// File: backend/auth/login.php
require_once '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email, $data->password)) {
    send_response(400, "error", "Email dan password harus diisi.");
}

$email = trim($data->email); 
$password = trim($data->password);

if (empty($email) || empty($password)) {
    send_response(400, "error", "Email dan password tidak boleh kosong.");
}

$conn = connectDB();

$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute(); 
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id']; 
        $_SESSION['username'] = $user['username'];
        $userData = ['id' => $user['id'], 'username' => $user['username']];
        send_response(200, "success", "Login berhasil!", $userData);
    } else {
        send_response(401, "error", "Email atau password salah.");
    }
} else {
    send_response(404, "error", "Akun dengan email tersebut tidak ditemukan.");
}

$stmt->close(); 
$conn->close();
?>