<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Controllers\UserController;
use App\Controllers\AuthController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$uri = str_replace(['/index.php', '/public'], '', $uri);

$normalizedUri = $uri;
if (preg_match('#^/user/\d+$#', $uri)) {
    $normalizedUri = '/user/:id';
}

switch ("$method $normalizedUri") {
    case 'POST /user':
        UserController::register();
        break;
    case 'POST /token':
        AuthController::login();
        break;
    case 'GET /token':
        AuthController::verify();
        break;
    case 'GET /user':
        UserController::getByEmail();
        break;
    case 'GET /user/profile':
        UserController::getProfile();
        break;
    case 'PUT /user/:id':
        $id = basename($uri);
        UserController::update($id);
        break;
    case 'DELETE /user/:id':
        $id = basename($uri);
        UserController::delete($id);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Rota não encontrada']);
        break;
}

