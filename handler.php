<?php
header('Content-Type: application/json');

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';

if (!$name || !$email || !$phone) {
    echo json_encode(['success' => false, 'message' => 'Все поля обязательны для заполнения.']);
    exit;
}

// Подключение к базе данных
$servername = "localhost";
$username = "tourlonlin";
$password = "QSDYg4LTr!QSB52a";
$dbname = "tourlonlin";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Ошибка соединения с базой данных.']);
    exit;
}

$sql = "INSERT INTO requests (name, email, phone) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("sss", $name, $email, $phone);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Данные успешно сохранены.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при сохранении данных.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка при подготовке запроса.']);
}

$conn->close();
?>
