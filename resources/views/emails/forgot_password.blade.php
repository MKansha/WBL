@component('mail::message')

# Forgot Your Password?

Hello, **{{ $user->lastname }}**,

We received a request to reset your password. Click the button below to reset it:
@component('mail::button', ['url' => config('app.frontend_url').'/reset-password/'.$user->remember_token])
Reset Password
@endcomponent

If you didn’t request this, ignore this email.

Thanks,
Team <a style="color: black; text-decoration: none" href="https://mntfuture.com/">MnT</a>

@endcomponent
