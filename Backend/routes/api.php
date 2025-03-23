<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json([
        'message' => 'Hello from Laravel API!',
        'status' => 200
    ]);
});
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\InquiryController;
Route::get('/sliders', [SliderController::class, 'index']);
Route::post('/sliders', [SliderController::class, 'store']);
Route::put('/sliders/{id}', [SliderController::class, 'update']); // ✅ Edit Route
Route::delete('/sliders/{id}', [SliderController::class, 'destroy']);

// Route::get('/settings', [SettingsController::class, 'getPrimaryColor']);
// Route::post('/settings', [SettingsController::class, 'updatePrimaryColor']);
// Route::get('/contact', [SettingsController::class, 'getContactDetails']);
// Route::post('/contact', [SettingsController::class, 'updateContactDetails']);
Route::get('/settings', [SettingsController::class, 'getSettings']);
Route::post('/settings', [SettingsController::class, 'updatePrimaryColor']);
Route::get('/contact', [SettingsController::class, 'getContactDetails']);
Route::post('/contact', [SettingsController::class, 'updateContactDetails']);
Route::post('/settings/logo', [SettingsController::class, 'updateLogo']);
Route::post('/settings/social-links', [SettingsController::class, 'updateSocialLinks']);

// Route::get('/testimonials', [TestimonialController::class, 'index']);
// Route::post('/testimonials', [TestimonialController::class, 'store']);
Route::resource('testimonials', TestimonialController::class);

Route::get('/services', [ServiceController::class, 'index']);
Route::post('/services', [ServiceController::class, 'store']);
Route::put('/services/{id}', [ServiceController::class, 'update']);
Route::delete('/services/{id}', [ServiceController::class, 'destroy']);








use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password/{token}', [AuthController::class, 'resetPassword']);
use Illuminate\Support\Facades\Auth;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return response()->json(Auth::user());
// });

Route::post('/inquiries', [InquiryController::class, 'store']);
Route::get('/leads', [InquiryController::class, 'leads']);
Route::get('/contacts', [InquiryController::class, 'contacts']);
Route::get('customers', [InquiryController::class, 'customers']);
Route::post('/leads/{id}/save-note', [InquiryController::class, 'saveNote']);
Route::post('/leads/{id}/move', [InquiryController::class, 'moveLead']);

Route::get('/profile', [ProfileController::class, 'index']);
Route::post('/profile', [ProfileController::class, 'update']);

Route::get('/dashboard', [DashboardController::class, 'index']);
