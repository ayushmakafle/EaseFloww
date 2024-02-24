import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../styles/styles';
import { Link, useNavigate } from 'react-router-dom';
import './Gyno.css';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';
import axios from 'axios';

const DoctorLogin = () => {
  const [auth, setAuth] = useAuth();

  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/doctor-login`, { email, password });
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate('/dashboard/doctor');
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
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-800">Doctor Login</h2>
      </div>

      {/* <div className="gynolog-page"> */}
      {/* <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'> */}
      {/* <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
         <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-800'>
            Doctor Login
          </h2> 
      </div> */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18">
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label for="exampleInputEmail1" class="form-label mt-0" style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>Email</label>
              <input type="text" name="email" class="form-control focus:border-pink-500 bg-pink-100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>


            </div>
            <div class="form-group">
              <label for="exampleInputPassword1" class="form-label mt-0" style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>Password</label>
              <input class="form-control focus:border-pink-500 bg-pink-100" id="exampleInputPassword1" placeholder="Password" type={visible ? "text" : "password"} name="password" autoComplete='current-password' required
                value={password} onChange={(e) => setPassword(e.target.value)} />
              {
                visible ? (
                  <AiOutlineEye className='absolute right-2 top-2 cursor-pointer' size={25}
                    onClick={() => setVisible(false)} />
                ) : (
                  <AiOutlineEyeInvisible className='absolute right-2 top-2 cursor-pointer' size={25}
                    onClick={() => setVisible(true)} />
                )
              }
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              {/* <div className={`${styles.noramlFlex}`}>
                <input type="checkbox" name="remember-me" id="remember-me"
                  className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded' />
                <label htmlFor='remember-me' className='ml-2 block text-s text-gray-900'>Remember me</label>
              </div> */}
              {/* <div className="text-sm" style={{ marginLeft: '175px' }}>
                <a href=".forget-password" className='font-medium text-pink-600 hover:text-pink-500'>
                  Forgot Password?
                </a>
              </div> */}
            </div>
            <div>
              <button
                type="submit"
                className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700' style={{ borderRadius: '8px' }}
              >Login
              </button>
            </div>
            <div className='flex items-center'>
              <h5 className='inline-block mr-2 px-4' style={{ color: '#ef5e99', fontWeight: 'normal', fontFamily: 'Raleway, sans-serif' }}>New Doctor to EaseFlow?</h5>
              <Link to='/doctorsignup' className='text-pink-600 inline-block'>
                <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700' style={{ borderRadius: '8px' }}>
                  Sign Up
                </button>
              </Link>
            </div>
            <div className='flex items-center'>
              <h5 className='inline-block mr-2 px-4' style={{ color: '#ef5e99', fontWeight: 'normal', fontFamily: 'Raleway, sans-serif' }}>Regular User?</h5>
              <Link to='/login' className='text-pink-600 inline-block'>
                <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700' style={{ borderRadius: '8px' }}>
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default DoctorLogin;
