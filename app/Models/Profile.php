<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Profile extends Model
{
    use HasFactory;
    protected $table = 'profile';

    protected $fillable = [
        'user_id',
        'company_name',
        'gst',
        'contact_person',
        'mobile',
        'email',
        'address',
        'city',
        'district',
        'state',
        'postal_code',
        'country',
        'profile_image',
    ];

}
