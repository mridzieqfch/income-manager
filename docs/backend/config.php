<?php
// File: backend/config.php

// Ganti * dengan URL frontend Anda saat produksi untuk keamanan
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// --- GANTI DENGAN DETAIL DATABASE ANDA ---
define('DB_HOST', 'sqlXXX.infinityfree.com');
define('DB_USER', 'if0_XXXXXXXX');
define('DB_PASS', 'YourPassword');
define('DB_NAME', 'if0_XXXXXXXX_traderdb');

/**
 * Membuat koneksi ke database MySQL.
 * @return mysqli|void
 */
function connectDB() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            throw new Exception("Koneksi Gagal: " . $conn->connect_error);
        }
        return $conn;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Tidak dapat terhubung ke database: " . $e->getMessage()]);
        exit();
    }
}

/**
 * Mengirim respons dalam format JSON dan menghentikan eksekusi.
 * @param int $statusCode - Kode status HTTP.
 * @param string $status - 'success' atau 'error'.
 * @param string $message - Pesan respons.
 * @param array|null $data - Data tambahan (opsional).
 */
function send_response($statusCode, $status, $message, $data = null) {
    http_response_code($statusCode);
    $response = ["status" => $status, "message" => $message];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response);
    exit();
}

// Menangani pre-flight request dari browser
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Memulai session jika belum ada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
?>
