<!DOCTYPE html>
<html>
<head>
    <title>OTP Verification</title>
    <style>
        /* Add some basic styling */
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            padding: 20px;
        }
        .otp-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            max-width: 400px;
            margin: auto;
            text-align: center;
        }
        .otp-code {
            font-size: 2em;
            font-weight: bold;
            color: #333333;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.8em;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="otp-container">
        <h2>Verify Your Email Address</h2>
        <p>Use the following One-Time Password (OTP) to complete your registration:</p>
        <div class="otp-code">{{ $otpCode }}</div>
        <p>This code will expire in 10 minutes.</p>
        <div class="footer">
            <p>If you did not request this, please ignore this email.</p>
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}</p>
        </div>
    </div>
</body>
</html>
