// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const ForgetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

//   const handleEmailSubmit = (e) => {
//     e.preventDefault();
//     // Add logic here to send a reset link to the provided email
//     console.log(`Forget password request for email: ${email}`);
//     setIsEmailSubmitted(true);
//   };

//   return (
//     <div >
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="text-center text-3xl font-extrabold text-gray-800">Forget Password</h2>
//       </div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-18">
//           {!isEmailSubmitted ? (
//             <form onSubmit={handleEmailSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="exampleInputEmail1" className="form-label mt-4">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control focus:border-pink-500 bg-pink-100"
//                   id="exampleInputEmail1"
//                   aria-describedby="emailHelp"
//                   placeholder="Enter email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-pink bg-pink-600 hover:bg-pink-700"
//                 >
//                   Submit
//                 </button>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-gray-500">
//                   Remember your password?{' '}
//                   <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
//                     Login
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           ) : (
//             <div>
//               <p className="text-sm text-gray-500 mb-4">
//                 An email has been sent to {email}. Please check your inbox for further instructions.
//               </p>
//               <p className="text-sm text-gray-500">
//                 Back to{' '}
//                 <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
//                   Login
//                 </Link>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;
