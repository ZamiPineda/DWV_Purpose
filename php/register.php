<?php
// Recibe datos del cliente
$data = json_decode(file_get_contents("php://input"));

// Validación mínima (puedes agregar más validaciones según tus necesidades)
if (!isset($data->username) || !isset($data->password)) {
    echo json_encode(['success' => false]);
    exit;
}

// Conexión a la base de datos (reemplaza con tus propias credenciales)
$servername = "localhost";
$username = "zamir";
$password = "UPBI9/gY2XP3OCKN";
$dbname = "tu_base_de_datos";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta para verificar si el usuario ya existe
$sql = "SELECT * FROM usuarios WHERE username = '{$data->username}'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(['success' => false]);
} else {
    // Insertar nuevo usuario
    $insertSql = "INSERT INTO usuarios (username, password) VALUES ('{$data->username}', '{$data->password}')";
    if ($conn->query($insertSql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

$conn->close();
?>