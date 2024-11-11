import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function OtpVerify({ userId }) {
    const { data, setData, post, processing, errors } = useForm({
        otp_code: '',
        user_id: userId,
    });

    const [status, setStatus] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        post(route('otp.verify'), {
            onSuccess: () => {
                // Optionally handle success
            },
            onError: () => {
                // Optionally handle errors
            },
        });
    };

    const handleResend = () => {
        post(route('otp.resend'), {
            data: { user_id: userId },
            onSuccess: () => {
                setStatus('A new OTP has been sent to your email address.');
            },
            onError: () => {
                setStatus('Failed to resend OTP. Please try again.');
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="OTP Verification" />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                {/* Logo */}
                <div className="mb-8">
                    <img src="/images/logo.png" alt="Logo" className="w-32 h-32 object-contain" />
                </div>

                {/* OTP Verification Card */}
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4 text-center">OTP Verification</h2>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="otp_code" value="Enter OTP" />

                            <TextInput
                                id="otp_code"
                                type="text"
                                name="otp_code"
                                value={data.otp_code}
                                className="mt-1 block w-full"
                                autoComplete="one-time-code"
                                onChange={(e) => setData('otp_code', e.target.value)}
                                required
                                placeholder="6-digit code"
                            />

                            <InputError message={errors.otp_code} className="mt-2" />
                        </div>

                        <input type="hidden" name="user_id" value={data.user_id} />

                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-sm text-blue-600 underline hover:text-blue-800 focus:outline-none"
                                disabled={processing}
                            >
                                Resend OTP
                            </button>

                            <PrimaryButton className="ml-4" disabled={processing}>
                                {processing ? 'Verifying...' : 'Verify OTP'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
