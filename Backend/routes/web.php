<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
   # logger()->info('I was inside this');
    #dumb([1, 2, 3]);
    return view('welcome');
});
