<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

// Route::get('/', function () {
//    # logger()->info('I was inside this');
//     #dumb([1, 2, 3]);
//     return view('welcome');
// });


Route::get('/{any}', function () {
    $path = public_path('react/index.html');
    if (File::exists($path)) {
        return Response::file($path);
    }
    abort(404);
})->where('any', '.*');
