// import React, { useState } from 'react';
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../styles/styles";
// import { Link, useNavigate } from "react-router-dom";
// import './Gyno.css';
// import { toast } from 'react-toastify'
// import { useAuth } from '../context/auth'
// import axios from 'axios';

// const DoctorLogin = () => {
//   const [auth, setAuth] = useAuth();

//   const [password, setPassword] = useState('');
//   const [visible, setVisible] = useState(''); // for password visibility
//   const [email, setEmail] = useState('');

//   const navigate = useNavigate();

//   //form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`/api/v1/auth/doctor-login`, { email, password });

//       if (res.data && res.data.success) {
//         toast.success(res.data.message);

//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });

//         localStorage.setItem('auth', JSON.stringify(res.data));
//         navigate('/dashboard/doctor');
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Something went wrong');
//     }
//   };


//   return (
//     <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
//       <div className='sm:mx-auto sm:w-full sm:max-w-md'>
//         <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-800'>
//           Gynecologist Login
//         </h2>
//       </div>
//       <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
//         <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18'>
//           <form className='space-y-6' onSubmit={handleSubmit}>
//             <div>
//               <label for="exampleInputEmail1" class="form-label mt-4">Email</label>
//               <input type="text" name="email" class="form-control focus:border-pink-500 bg-pink-100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
//             </div>
//             {/* <div className="mt-1">
//               </label>
//             </div> */}
//             <div class="form-group">

//               <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
//               <input class="form-control focus:border-pink-500 bg-pink-100" id="exampleInputPassword1" placeholder="Password" type={visible ? "text" : "password"} name="password" autoComplete='current-password' required
//                 value={password} onChange={(e) => setPassword(e.target.value)} />
//               {
//                 visible ? (
//                   <AiOutlineEye className='absolute right-2 top-2 cursor-pointer' size={25} onClick={() => SetVisible(false)} />
//                 ) : (
//                   <AiOutlineEyeInvisible className='absolute right-2 top-2 cursor-pointer' size={25} onClick={() => SetVisible(true)} />
//                 )
//               }
//             </div>
//             <div className={`${styles.noramlFlex} justify-between`}>
//               <div className={`${styles.noramlFlex}`}>
//                <input type="checkbox" name="remember-me" id="remember-me"
//                   className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded' />
//                 <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>Remember me</label>
//               </div>
//               <div className="text-sm" style={{ marginLeft: '175px' }}>
//                 <a href=".forget-password" className='font-medium text-pink-600 hover:text-pink-500'/>
            
//             <div>
//               <button type="submit" className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700'>
                
//                 Login to your site
//               </button>
//             </div>
//             <div className={`${styles.noramlFlex} w-full`} >
//               <h4>New to EaseFlow? </h4>
             
//               <Link to="/doctorsignup" className="text-pink-600 pl-2" style={{ marginLeft: '145px' }}>Sign Up</Link>
//             </div>
//             </div>
//       </form>
//       </div>
//       </div>
      
//   );
// };


// export default DoctorLogin;
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
  const [visible, setVisible] = useState(''); // for password visibility
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
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-800'>
          Gynecologist Login
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label for="exampleInputEmail1" class="form-label mt-4">Email</label>
              <input type="text" name="email" class="form-control focus:border-pink-500 bg-pink-100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            {/* <div className="mt-1">
                <input className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
                type="email" name="email" autoComplete='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div> */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
            </div> 
            <div class="form-group">
              <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
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
              <div className={`${styles.noramlFlex}`}>
                <input type="checkbox" name="remember-me" id="remember-me"
                  className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded' />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>Remember me</label>
              </div>
              <div className="text-sm" style={{ marginLeft: '175px' }}>
                <a href=".forget-password" className='font-medium text-pink-600 hover:text-pink-500'>
                  Forgot Password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
              >a
                Login
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`} >
              <h4>New to EaseFlow? </h4>
              <Link to="/doctorsignup" className="text-pink-600 pl-2" style={{ marginLeft: '145px' }}>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DoctorLogin;
