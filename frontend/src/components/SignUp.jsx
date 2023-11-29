import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../styles/styles';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(''); // for password visibility
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('')

  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`/api/v1/auth/register`,
        { username, email, password, phonenumber, address, answer })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  }
  return (
    <div>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-800'>Sign up</h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18'>
          <form className='space-y-6'
            onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username' className='form-label mt-4'>
                Name
              </label>
              <input
                type='text'
                name='username'
                className='form-control focus:border-pink-500 bg-pink-100'
                id='username'
                aria-describedby='emailHelp'
                placeholder='Enter name'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password' className='form-label mt-4'>
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
            <div>
              <label htmlFor='email' className='form-label mt-4'>
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
              <label htmlFor='address' className='form-label mt-4'>
                Address
              </label>
              <input
                type='text'
                name='address'
                className='form-control focus:border-pink-500 bg-pink-100'
                id='address'
                aria-describedby='emailHelp'
                placeholder='Enter your address'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='phonenumber' className='form-label mt-4'>
                Phone Number
              </label>
              <input
                type='text'
                name='phonenumber'
                className='form-control focus:border-pink-500 bg-pink-100'
                id='phonenumber'
                aria-describedby='emailHelp'
                placeholder='Enter your Contact Number'
                required
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='answer' className='form-label mt-4'>
                For account recovery
              </label>
              <input
                type='text'
                name='answer'
                className='form-control focus:border-pink-500 bg-pink-100'
                id='answer'
                aria-describedby='emailHelp'
                placeholder='what is the name of your first pet'
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-center text-sm font-medium rounded-md text-blackauthc bg-pink-600 hover:bg-pink-700'
              >
                Signup
              </button>
            </div>
          </form>
        </div>
        <div className='text-center mt-6'>
          <div className='flex items-center'>
            <h3 className='inline-block mr-2 px-4'>Already a member?</h3>
            <Link to='/Login' className='text-pink-600 inline-block'>
              <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700'>
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className='text-center mt-6'>
          <div className='flex items-center'>
            <h3 className='inline-block mr-2 px-4'> An EaseFlow Doctor?</h3>
            <Link to='/GynecologistSignUp' className='text-pink-600'>
              <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700'>
                Doctor Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

