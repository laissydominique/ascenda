<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura os dados do formulário e faz um sanitize básico
    $nome = htmlspecialchars(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $whatsapp = htmlspecialchars(trim($_POST["whatsapp"]));
    $assunto = htmlspecialchars(trim($_POST["assunto"]));
    $mensagem = htmlspecialchars(trim($_POST["mensagem"]));

    // Validação dos campos
    if (!$nome || !$email || !$whatsapp || !$mensagem || !$assunto) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Por favor, preencha todos os campos corretamente."]);
        exit;
    }

    // Configurações do email
    $para = "atendimento.ascenda.ia@gmail.com"; // Email da Ascenda
    $assunto_email = "Nova mensagem de contato - $nome";
    $corpo = "Nova mensagem recebida através do site:\n\n";
    $corpo .= "Nome: $nome\n";
    $corpo .= "Email: $email\n";
    $corpo .= "WhatsApp: $whatsapp\n";
    $corpo .= "Assunto: $assunto\n";
    $corpo .= "Mensagem:\n$mensagem\n\n";
    $corpo .= "---\n";
    $corpo .= "Enviado em: " . date('d/m/Y H:i:s') . "\n";
    $corpo .= "IP: " . $_SERVER['REMOTE_ADDR'];

    // Cabeçalhos do email
    $cabecalho = "From: noreply@ascenda.ia\r\n";
    $cabecalho .= "Reply-To: $email\r\n";
    $cabecalho .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $cabecalho .= "X-Mailer: PHP/" . phpversion();

    // Tentativa de envio
    if (mail($para, $assunto_email, $corpo, $cabecalho)) {
        echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso! Entraremos em contato em breve."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erro ao enviar a mensagem. Tente novamente mais tarde."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método não permitido."]);
}
?>