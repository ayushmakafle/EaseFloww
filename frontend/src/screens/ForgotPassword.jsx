// import React, { useState } from 'react';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import styles from '../../src/styles/styles';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// //import './Login.css';
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const ForgotPassword = () => {

//     const [newPassword, setNewPassword] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [visible, setVisible] = useState(''); // for password visibility
//     const [email, setEmail] = useState('');

//     const navigate = useNavigate();

//     //form function
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`/api/v1/auth/forgot-password`, { email, newPassword, answer });

//             if (res.data && res.data.success) {
//                 toast.success(res.data.message);

//                 navigate('/login');
//             } else {
//                 toast.error(res.data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error('Something went wrong');
//         }
//     };
//     return (
//         <>
//             <div>
//                 <div className='sm:mx-auto sm:w-full sm:max-w-md'>
//                     <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-800'>Reset Password</h2>
//                 </div>
//                 <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
//                     <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18'>
//                         <form className='space-y-6'
//                             onSubmit={handleSubmit}>
//                             <div>
//                                 <label htmlFor='email' className='form-label mt-4'>
//                                     Email
//                                 </label>
//                                 <input
//                                     type='email'
//                                     name='email'
//                                     className='form-control focus:border-pink-500 bg-pink-100'
//                                     id='email'
//                                     aria-describedby='emailHelp'
//                                     placeholder='Enter Email'
//                                     required
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>
//                             <div className='form-group'>
//                                 <label htmlFor='newPassword' className='form-label mt-4'>
//                                     Password
//                                 </label>
//                                 <input
//                                     className='form-control focus:border-pink-500 bg-pink-100'
//                                     id='password'
//                                     placeholder='Password'
//                                     type={visible ? 'text' : 'password'}
//                                     name='password'
//                                     autoComplete='current-password'
//                                     required
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                 />
//                                 {visible ? (
//                                     <AiOutlineEye
//                                         className='absolute right-2 top-2 cursor-pointer'
//                                         size={25}
//                                         onClick={() => setVisible(false)}
//                                     />
//                                 ) : (
//                                     <AiOutlineEyeInvisible
//                                         className='absolute right-2 top-2 cursor-pointer'
//                                         size={25}
//                                         onClick={() => setVisible(true)}
//                                     />
//                                 )}
//                             </div>
//                             <div>
//                                 <label htmlFor='answer' className='form-label mt-4'>
//                                     Enter secret answer
//                                 </label>
//                                 <input
//                                     type='text'
//                                     name='answer'
//                                     className='form-control focus:border-pink-500 bg-pink-100'
//                                     id='answer'
//                                     aria-describedby='emailHelp'
//                                     placeholder='Enter the name of your first pet'
//                                     required
//                                     value={answer}
//                                     onChange={(e) => setAnswer(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <button
//                                     type='submit'
//                                     className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-center text-sm font-medium rounded-md text-blackauthc bg-pink-600 hover:bg-pink-700'
//                                 >
//                                     Reset
//                                 </button>

//                             </div>

//                         </form>

//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }

// export default ForgotPassword
