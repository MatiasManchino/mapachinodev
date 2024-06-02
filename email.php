<?php

if($_SERVER['REQUEST_METHOD'] != 'POST'){
    header('Location: index.php');
}

require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$errores = array();

if(isset($_POST['submit'])){

    $destinatario = 'no-reply@byakurenkenpo.com';
    $nombre = !empty($_POST['nombre']) ? htmlspecialchars(trim($_POST['nombre'])) : '';
    $mail = !empty($_POST['mail']) ? htmlspecialchars(trim($_POST['mail'])) : '';
    $asunto = !empty($_POST['asunto']) ? htmlspecialchars(trim($_POST['asunto'])) : '';
    $mensaje = !empty($_POST['mensaje']) ? htmlspecialchars(trim($_POST['mensaje'])) : '';

    if(!$nombre) {
        array_push($errores, "<p class='error-php'>Complete el nombre</p>");
    }
    else {
        if(strlen($nombre) > 16){
            array_push($errores, "<p class='error-php'>El nombre es muy largo</p>");
        }
    } 

    if(!$mail){
        array_push($errores, "<p class='error-php'>Complete el mail</p>");//www-data@mail.midominio.localhost
    } else {
        if(!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            array_push($errores, "<p class='error-php'>El correo es incorrecto</p>");
        }
    }
    if(!$asunto) {
        array_push($errores, "<p class='error-php'>Complete el asunto</p>");
    } else {
        if(strlen($asunto) > 40){
           array_push($errores, "<p class='error-php'>El asunto es muy largo</p>");
        } 
    } 
    if(!$mensaje) {
        array_push($errores, "<p class='error-php'>Complete el mensaje</p>");
    } else {
        if(strlen($mensaje) > 300){
           array_push($errores, "<p class='error-php'>El mensaje es muy largo</p>");
        } 
    }      


    // Limite de envios por direccion de IP
    $user_ip = $_SERVER['REMOTE_ADDR'];
    $time = time();
    $limit = 60 * 10; // Limite de 1 hora
    $max_requests = 3; // Máximo de 6 envíos
    $file = 'ips.txt';

    // Obtener registro de direcciones IP
    $ips = [];
    if (file_exists($file)) {
        $ips = unserialize(file_get_contents($file));
    }

    // Verificar si la direccion IP ya ha enviado un mensaje recientemente
    if (isset($ips[$user_ip]) && ($time - $ips[$user_ip] < $limit)) {
        // Verificar el número de envíos para la dirección IP
        $requests = $ips[$user_ip]['requests'];
        if ($requests >= $max_requests) {
        die('Error: Limite de envios por dirección IP excedido');
        }
        // Actualizar el número de envíos para la dirección IP
        $ips[$user_ip]['requests'] = ++$requests;
    } else {
        // Inicializar el número de envíos para la dirección IP
        $ips[$user_ip] = [
        'timestamp' => $time,
        'requests' => 1,
        ];
    }

    // Actualizar el registro de direcciones IP
    file_put_contents($file, serialize($ips));

    if(empty($errores)){
        $body = <<<HTML
            <h3> Mensaje de la pagina de byakurenkenpo.com</h3>
            <p>De: $nombre </p>
            <p>Email: $mail </p>
            <p>Mensaje:</p>
            $mensaje
        HTML;

        $mailer = new PHPMailer();

        try {
            $mailer->SMTPDebug = 0;
            $mailer->isSMTP();
            $mailer->Host = 'c2501209.ferozo.com';
            $mailer->SMTPAuth = true;
            $mailer->Username = $destinatario;
            $mailer->Password = 'WKU4e8NJiT';
            $mailer->SMTPSecure = 'ssl';
            $mailer->Port = '465';

            $mailer->setFrom ($mail, $nombre);
            $mailer->addAddress($destinatario,'Sitio Web');

            $mailer->Suject = "Mensaje: $asunto";
            $mailer->msgHTML($body);
    
            $mailer->send( );
            //header('Location:index.php');

        } catch (Exception $e){
            echo 'Ha ocurrido algo inesperado, intente nuevamente', $mailer->ErrorInfo;
        }

    } else {

        header('Location:fail.php');
        //print_r ($errores);
        //echo 'Fallo';

    }
   

} else{

    header('Location:fail.php');

}

error_reporting(E_ALL);

/*
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);?> */


?>