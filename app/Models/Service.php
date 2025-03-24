<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'points', 'image'];

    protected $casts = [
        'points' => 'array', // Convert JSON to array automatically
    ];

    // Get full image URL
    public function getImageAttribute($value)
    {
        return url('storage/' . $value);
    }
}
