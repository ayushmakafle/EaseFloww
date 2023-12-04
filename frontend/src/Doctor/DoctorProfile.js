import React,{useState,useEffect} from 'react'
import { useAuth } from "../context/auth";
import {toast} from 'react-toastify'
import axios from 'axios';
import DoctorNavbar from './DoctorNavbar';

const DoctorProfile = () => {
  

  return (
    <>
    <DoctorNavbar />
    <h1>your doctor</h1>
     
    </>
  )
}

export default DoctorProfile
