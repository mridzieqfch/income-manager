<?php 
// File: backend/auth/logout.php
require_once '../config.php';

session_destroy();
send_response(200, "success", "Anda telah berhasil logout.");
?>