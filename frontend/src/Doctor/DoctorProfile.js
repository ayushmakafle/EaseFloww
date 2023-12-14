import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import DoctorNavbar from './DoctorNavbar';
import {toast} from 'react-toastify';
import Select from 'react-select';


const DoctorProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [officeHoursStart, setOfficeHoursStart] = useState('');
  const [officeHoursEnd, setOfficeHoursEnd] = useState('');
  const [officeDays,setOfficeDays] = useState('');
  const [ feesPerConsultation,setFeesPerConsultation]=useState('');

  // Fetch doctor data
useEffect(() => {
  const fetchDoctorData = async () => {
    try {
      const response = await axios.get('/api/v1/auth/doctor-data'); 
      if (response.data.success) {
        console.log(response.data);
        const doctorData = response.data.data; // Update this line
        const { name, email, phonenumber, address, officeHoursStart, officeHoursEnd ,feesPerConsultation,officeDays} = doctorData;
        setName(name);
        setEmail(email);
        setPhonenumber(phonenumber);
        setAddress(address);
        setOfficeHoursStart(officeHoursStart);
        setOfficeHoursEnd(officeHoursEnd);
        setFeesPerConsultation(feesPerConsultation);
        setOfficeDays(officeDays);
      } else {
        console.error('Error fetching doctor data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  fetchDoctorData();
}, []);

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


  useEffect(() => {
    if (auth && auth.doctor) {
      const { name, email, phonenumber, address, officeHoursStart, officeHoursEnd,officeDays,feesPerConsultation } = auth.doctor;
      setName(name);
      setEmail(email);
      setPhonenumber(phonenumber);
      setAddress(address);
      setOfficeHoursStart(officeHoursStart);
      setOfficeHoursEnd(officeHoursEnd);
      setOfficeDays(officeDays);
      setFeesPerConsultation(feesPerConsultation)
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/update-doctor-profile", {
        name,
        email,
        phonenumber,
        address,
        officeHoursStart,
        officeHoursEnd,
        officeDays,
        feesPerConsultation
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, doctor: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.doctor = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
       } catch (error) {
      console.error('Error:', error);
      toast.error('Error in updating profile');
    }
  };

  return (
    <>
      <DoctorNavbar />
      <form onSubmit={handleSubmit} className='m-5 p-5'>
  <div>
    <label htmlFor='name'>Name</label>
    <input
      type='text'
      id='name'
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor='email'>Email</label>
    <input
      type='email'
      id='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor='phonenumber'>Phone Number</label>
    <input
      type='text'
      id='phonenumber'
      value={phonenumber}
      onChange={(e) => setPhonenumber(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor='address'>Address</label>
    <input
      type='text'
      id='address'
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor='officeHoursStart'>Office Hours Start</label>
    <input
      type='time'
      id='officeHoursStart'
      value={officeHoursStart}
      onChange={(e) => setOfficeHoursStart(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor='officeHoursEnd'>Office Hours End</label>
    <input
      type='time'
      id='officeHoursEnd'
      value={officeHoursEnd}
      onChange={(e) => setOfficeHoursEnd(e.target.value)}
    />
  </div>

  <div>
    <label className='form-label' style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>Office Days</label>
      <Select
        name='officeDays'
        options={daysOfWeek}
        isMulti
        value={officeDays}
        onChange={handleOfficeDaysChange}
      />
  </div>

   <div>
      <label htmlFor='feesPerConsultation' className='form-label' style={{ color: '#ef5e99', fontWeight: 'bold', fontFamily: 'Raleway, sans-serif' }}>
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


  <button type='submit'>Update</button>
</form>

    </>
  )
}
export default DoctorProfile