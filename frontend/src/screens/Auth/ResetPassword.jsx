import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
        if (!newPassword.match(passwordRegex)) {
            return toast.error('Password must be at least 8 characters, including one special character.');
        }
        try {
            const res = await axios.post('/api/v1/auth/reset-password', { email, token, newPassword });
            toast.success('Password reset successful. You can now log in with your new password.');
            // Redirect to login page
            setTimeout(() => {
                window.location.href = '/login'; // Replace with your login page URL
            }, 3000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                // If the error object does not have a response or message property,
                // display a generic error message
                toast.error('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-800">Reset Password</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18">
                    <form onSubmit={handleSubmit} className="space-y-1">
                        <div>
                            <label htmlFor='email' className='form-label mt-4' style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                                Email
                            </label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control focus:border-pink-500 bg-pink-100' required />
                            <label htmlFor='token' className='form-label mt-4' style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                                Token
                            </label>
                            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} className='form-control focus:border-pink-500 bg-pink-100' required />
                            <div className='form-group'>
                                <label htmlFor='token' className='form-label mt-4' style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                                    New Password
                                </label>
                                <input
                                    name='newPassword'
                                    type={visible ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className='form-control focus:border-pink-500 bg-pink-100'
                                    required
                                />
                                {visible ? (
                                    <AiOutlineEye
                                        className='absolute right-2 top-2 cursor-pointer'
                                        size={25}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className='absolute right-2 top-2 cursor-pointer'
                                        size={25}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-center text-sm font-medium rounded-md text-blackauthc bg-pink-600 hover:bg-pink-700'
                            >
                                Reset Password
                            </button>
                            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                        </div>
                        <div className='text-center mt-6'>
                            <div className='flex items-center'>
                                <h5 className='inline-block mr-2 px-4' style={{ color: '#ef5e99', fontWeight: 'normal', fontFamily: 'Raleway, sans-serif' }}>New to EaseFlow?</h5>
                                <Link to='/signup' className='text-pink-600 inline-block'>
                                    <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700' style={{ borderRadius: '8px' }}>
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className='text-center mt-6'>
                            <div className='flex items-center'>
                                <h5 className='inline-block mr-2 px-4' style={{ color: '#ef5e99', fontWeight: 'normal', fontFamily: 'Raleway, sans-serif' }}>Doctor in EaseFlow?</h5>
                                <Link to='/doctor-login' className='text-pink-600'>
                                    <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700' style={{ borderRadius: '8px' }}>
                                        Dr. Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
};

export default ForgetPasswordPage;



/* import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/reset-password`, { token, password });
            // Handle success response
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Forget Password</h2>
            <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
 */