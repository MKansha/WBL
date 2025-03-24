<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'settings'; // Define table name explicitly
    protected $fillable = ['primary_color', 'email', 'email2', 'phone', 'address', 'logo','social_links'];
    protected $casts = ['social_links' => 'array'];
}

