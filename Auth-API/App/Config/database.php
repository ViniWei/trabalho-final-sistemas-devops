<?php

namespace App\Config;

use PDO;

class Database {
    public function connect(): PDO {
        return new PDO(
            'mysql:host=mysql;port=3306;dbname=auth_api;charset=utf8mb4',
            'root',
            'senha', 
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }
}