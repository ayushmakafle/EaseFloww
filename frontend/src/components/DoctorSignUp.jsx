import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../styles/styles';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Gyno.css';
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
  const [experience, setExperience] = useState('')
  const [feesPerConsultation, setFeesPerConsultation] = useState('')
  const [officeHoursStart, setOfficeHoursStart] = useState('');
  const [officeHoursEnd, setOfficeHoursEnd] = useState('');
  const [officeDays, setOfficeDays] = useState([]);

  const handleOfficeHoursStartChange = (e) => {
    setOfficeHoursStart(e.target.value);
  };

  const handleOfficeHoursEndChange = (e) => {
    setOfficeHoursEnd(e.target.value);
  };

  const daysOfWeek = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
  ];

  const handleOfficeDaysChange = (selectedOptions) => {
    // Handle the selected office days
    setOfficeDays(selectedOptions);
  };

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
    formData.append('experience', experience);
    formData.append('feesPerConsultation', feesPerConsultation);
    formData.append('officeHoursStart', officeHoursStart);
    formData.append('officeHoursEnd', officeHoursEnd);
    formData.append('officeDays', JSON.stringify(officeDays));

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
    <div className="gradient-bg">
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h1 className='mt-0 text-center text-3xl font-extrabold text-gray-800'>Sign up for Gynecologist</h1>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name' className='form-label mt-1'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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
              <label htmlFor='email' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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
              <label htmlFor='password' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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
              <label htmlFor='phonenumber' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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
              <label htmlFor='specialization' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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
              <label htmlFor='certificatePhoto' className='form-label mt-4'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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
              <label htmlFor='address' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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
              <label htmlFor='hospitalOrClinic' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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
              <label htmlFor='experience' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                Number of years of experience in the field of specialization
              </label>
              <input
                type='number'
                name='experience'
                className='form-control'
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div>
              <label className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>Office Days</label>
              <Select
                name='officeDays'
                options={daysOfWeek}
                isMulti
                value={officeDays}
                onChange={handleOfficeDaysChange}
              />
            </div>


            <div>
              <label htmlFor='officeHours' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                Office Hours Start
              </label>
              <input
                type='time'
                name='officeHoursStart'
                className='form-control'
                required
                value={officeHoursStart}
                onChange={handleOfficeHoursStartChange}
              />
            </div>

            <div>
              <label htmlFor='officeHours' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                Office Hours End
              </label>
              <input
                type='time'
                name='officeHoursEnd'
                className='form-control'
                required
                value={officeHoursEnd}
                onChange={handleOfficeHoursEndChange}
              />
            </div>


            <div>
              <label htmlFor='feesPerConsultation' className='form-label'style={{color:'#ef5e99',fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
                Fees Per Consultation
              </label>
              <input
                type='number'
                name='feesPerConsultation'
                className='form-control'
                required
                value={feesPerConsultation}
                onChange={(e) => setFeesPerConsultation(e.target.value)}
              />
            </div>


            <div>
              <button
                type='submit'
                className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700'style={{ borderRadius: '8px' }}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className='text-center mt-6'>
          <div className='flex items-center'>
            <h3 className='inline-block mr-2 px-4'style={{color:'white',fontWeight: 'normal', fontFamily: 'Raleway, sans-serif' }}>Already a doctor?</h3>
            <Link to='/doctor-login' className='text-pink-600 inline-block'>
              <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700'style={{ borderRadius: '8px' }}>
                Doctor Login
              </button>
            </Link>
          </div>
          <div className='flex items-center'>
            <h3 className='inline-block mr-2 px-4'style={{color:'white',fontWeight: 'normal', fontFamily: 'Raleway, sans-serif' }}>Regular User?</h3>
            <Link to='/login' className='text-pink-600 inline-block'>
              <button className='py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700'style={{ borderRadius: '8px' }}>
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