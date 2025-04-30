import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OTPVerificationProps {
    email: string;
    onVerificationSuccess: () => void;
}

const OTPVerification = ({ email, onVerificationSuccess }: OTPVerificationProps) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token if needed
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                onVerificationSuccess();
                navigate('/login');
            } else {
                setError(data.message || 'Verification failed');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setError('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900">
                    Verify your email
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    We've sent a verification code to {email}. Please enter it below.
                </p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="otp" className="sr-only">
                        Verification Code
                    </label>
                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        pattern="[0-9]{6}"
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            loading 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                    >
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OTPVerification; 