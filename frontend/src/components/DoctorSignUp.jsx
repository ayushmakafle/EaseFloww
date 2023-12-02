import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../styles/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [certificatePhoto, setCertificatePhoto] = useState('')
  const [address, setAddress] = useState('');
  const [hospitalOrClinic, setHospitalOrClinic] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phonenumber', phonenumber);
    formData.append('specialization', specialization);
    formData.append('address', address);
    formData.append('hospitalOrClinic', hospitalOrClinic);
    formData.append('certificatePhoto', certificatePhoto);


    // Append other form data as needed

    try {
      console.log([...formData.entries()]);

      const res = await axios.post(`/api/v1/auth/doctorsignup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // Redirect or handle success as needed
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error during request setup:', error.message);
      }
      toast.error('Error in doctor registration');
    }
  };

  return (
    <div>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-800'>Sign up for Gynecologist</h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name' className='form-label mt-4'>
                Name
              </label>
              <input
                type='text'
                name='name'
                className='form-control focus:border-pink-500 bg-pink-100'
                id='name'
                placeholder='Enter name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                name='email'
                className='form-control focus:border-pink-500 bg-pink-100'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <input
                type='password'
                name='password'
                className='form-control focus:border-pink-500 bg-pink-100'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='phonenumber' className='form-label'>
                Phone Number
              </label>
              <input
                type='tel'
                name='phonenumber'
                className='form-control focus:border-pink-500 bg-pink-100'
                required
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='specialization' className='form-label'>
                Specialization
              </label>
              <input
                type='text'
                name='specialization'
                className='form-control focus:border-pink-500 bg-pink-100'
                required
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='certificatePhoto' className='form-label mt-4'>
                Certificate Photo
              </label>
              <input
                type='file'
                id='certificatePhoto'
                name='certificatePhoto'
                className='form-control'
                accept='image/*'
                required
                onChange={(e) => setCertificatePhoto(e.target.files[0])}
              />
            </div>
            {/* preview image using browser properties*/}
            <div className="mb-3">
              {certificatePhoto && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(certificatePhoto)}
                    alt="certificate photo"
                    height={'200px'}
                    className='img img-responsive'
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <input
                type='text'
                name='address'
                className='form-control'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='hospitalOrClinic' className='form-label'>
                Hospital or Clinic
              </label>
              <input
                type='text'
                name='hospitalOrClinic'
                className='form-control'
                required
                value={hospitalOrClinic}
                onChange={(e) => setHospitalOrClinic(e.target.value)}
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
            <h3 className='inline-block mr-2 px-4'>Already a doctor?</h3>
            <Link to='/doctor-login' className='text-pink-600 inline-block'>
              <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700'>
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignUp;