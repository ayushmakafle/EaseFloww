import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../../src/styles/styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../context/auth'

const Login = () => {
  const [auth, setAuth] = useAuth();

  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(''); // for password visibility
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const location = useLocation(); //to redirect to the page before login

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });

      if (res.data && res.data.success) {
        toast.success(res.data.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="login-page">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-800">Login</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18">
          <form className="space-y-1" onSubmit={handleSubmit}>
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
            <div className='form-group'>
              <label htmlFor='password' className='form-label mt-4' style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                Password
              </label>
              <input
                className='form-control focus:border-pink-500 bg-pink-100'
                id='password'
                placeholder='Password'
                type={visible ? 'text' : 'password'}
                name='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type='submit'
                className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700' style={{ borderRadius: '8px', minWidth: '120px' }}
              >
                Login
              </button>
              <button
                type='submit'
                className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700' style={{ borderRadius: '8px', minWidth: '80px' }}
                onClick={() => navigate('/forget')}
              >
                Forgot Password?
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

export default Login;