import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../../components/Login.css';
import { toast } from 'react-toastify'
import axios from 'axios'

const Forget = () => {

    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send email reset request
            const res = await axios.post(`/api/v1/auth/forget`, { email });
            if (res.status === 201) {
                // Show success notification
                toast.success("Reset email sent. Check your email inbox.");

                // Navigate to forget-password page
                navigate('/forget-password');
            }
        } catch (error) {
            console.error(error);
            // Show error notification
            toast.error("Failed to send reset email. Please try again.");
        }
    };
    return (
        <div className="login-page">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-800">Forgot Password</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18">
                    <form action='/forget' method='post' className="space-y-1" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email' className='form-label mt-4' style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                className='form-control focus:border-pink-500 bg-pink-100'
                                id='email'
                                aria-describedby='emailHelp'
                                placeholder='Enter Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700' style={{ borderRadius: '8px' }}
                            >
                                Send Reset Email
                            </button>
                            <button
                                type='submit'
                                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-center text-sm font-medium rounded-md text-blackauthc bg-pink-600 hover:bg-pink-700'
                                onClick={() => navigate('/login')}
                            >
                                Login?
                            </button>
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

export default Forget;