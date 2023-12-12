import React from 'react'
import DoctorNavbar from './DoctorNavbar'

const DoctorProfile = () => {
  return (
    <>
    <DoctorNavbar />
      <h1>your profile</h1>
    </>
  )
}

export default DoctorProfile


/* import React,{useState,useEffect} from 'react'
import { useAuth } from '../context/auth';
import {toast} from 'react-toastify';
import axios from 'axios';
import Select from 'react-select';


const DoctorProfile = () => {

  const[auth,setAuth] = useAuth();

  const [username, setUsername] = useState('');
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

  //get doctor data
  useEffect(() => {
    const {
      username, phonenumber, address, hospitalOrClinic, experience, feesPerConsultation,
          officeHoursStart,officeHoursEnd, officeDays,
        } = auth?.user;

        setUsername(username);
        setAddress(address);
        setPhonenumber(phonenumber);
        setFeesPerConsultation(feesPerConsultation);
        setExperience(experience);
        setOfficeHoursStart(officeHoursStart);
        setHospitalOrClinic(hospitalOrClinic);
        setOfficeHoursEnd(officeHoursEnd);
        setOfficeDays(officeDays);
  }, [auth?.user]);



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
    formData.append('username', username);
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

      const {data} = await axios.put(`/api/v1/auth/update-doctor-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(data?.error){
        toast.error(data.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls=JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success("profile updated successfully")
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
    <>
    <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username' className='form-label mt-4'>
                Name
              </label>
              <input
                type='text'
                name='username'
                className='form-control focus:border-pink-500 bg-pink-100'
                id='username'
                placeholder='Enter name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
          
            <div>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <input
                type='text'
                name='address'
                className='form-control'
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
                value={hospitalOrClinic}
                onChange={(e) => setHospitalOrClinic(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor='experience' className='form-label'>
                Number of years of experience in the field of specialization
              </label>
              <input
                type='number'
                name='experience'
                className='form-control'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div>
              <label className='form-label'>Office Days</label>
              <Select
                name='officeDays'
                options={daysOfWeek}
                isMulti
                value={officeDays}
                onChange={handleOfficeDaysChange}
              />
            </div>


            <div>
              <label htmlFor='officeHours' className='form-label'>
                Office Hours Start
              </label>
              <input
                type='time'
                name='officeHoursStart'
                className='form-control'
                value={officeHoursStart}
                onChange={handleOfficeHoursStartChange}
              />
            </div>

            <div>
              <label htmlFor='officeHours' className='form-label'>
                Office Hours End
              </label>
              <input
                type='time'
                name='officeHoursEnd'
                className='form-control'
                value={officeHoursEnd}
                onChange={handleOfficeHoursEndChange}
              />
            </div>


            <div>
              <label htmlFor='feesPerConsultation' className='form-label'>
                Fees Per Consultation
              </label>
              <input
                type='number'
                name='feesPerConsultation'
                className='form-control'
                value={feesPerConsultation}
                onChange={(e) => setFeesPerConsultation(e.target.value)}
              />
            </div>


            <div>
              <button
                type='submit'
                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-center text-sm font-medium rounded-md text-blackauthc bg-pink-600 hover:bg-pink-700'
              >
                UPDATE
              </button>
            </div>
          </form>
      
    </>
  )
}

export default DoctorProfile
 */