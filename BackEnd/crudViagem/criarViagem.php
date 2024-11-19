<?php
$conn = new mysqli("localhost", "root", "", "viacaocalango");

// Verifica se a conexão falhou
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexão falhou: " . $conn->connect_error]));
}

// Verifica se o método de requisição é POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Valida os dados da requisição
    if (!isset($data['origem'], $data['destino'], $data['horario_de_partida'],
    $data['data_de_partida'], $data['preco'], $data['assentos'])) {
        echo json_encode(["error" => "Campos obrigatórios ausentes."]);
        $conn->close();
        exit;
    }

    // Obtém e valida os dados
    $origem = $conn->real_escape_string($data['origem']);
    $destino = $conn->real_escape_string($data['destino']);
    $horario_de_partida = $conn->real_escape_string($data['horario_de_partida']);
    $data_de_partida = $conn->real_escape_string($data['data_de_partida']);
    $preco = $conn->real_escape_string($data['preco']);
    $assentos = intval($data['assentos']); // Garante que seja um número inteiro

    // Monta a query de inserção usando prepared statements
    $stmt = $conn->prepare("INSERT INTO viagem (origem, destino, horario_de_partida, data_de_partida, preco, status, assentos) 
                            VALUES (?, ?, ?, ?, ?, 1, ?)");
    $stmt->bind_param("sssdii", $origem, $destino, $horario_de_partida, $data_de_partida, $preco, $assentos);

    // Executa a query
    if ($stmt->execute()) {
        echo json_encode(["success" => "Nova viagem inserida com sucesso!"]);
    } else {
        echo json_encode(["error" => "Erro ao inserir a viagem: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
