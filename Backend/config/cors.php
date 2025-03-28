<?php


return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // ✅ Allow API & Sanctum CSRF requests
    'allowed_methods' => ['*'], // ✅ Allow all HTTP methods (GET, POST, etc.)
    'allowed_origins' => ['http://localhost:3000'], // ✅ Allow React frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // ✅ Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // ✅ Enable cookies for authentication
];

