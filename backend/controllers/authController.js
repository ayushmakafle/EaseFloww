import userModel from "../models/UserModel.js";
import DoctorModel from "../models/DoctorModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import fs from "fs"
import nodemailer from 'nodemailer'

//user email verification
const sendUserVerifyEmail = async(username,email,user_id) => {
  try{
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:'easeflow2023@gmail.com',
        pass:`${process.env.SMTP_PASSWORD}`
      }
    })
    
    const mailOptions = {
      from:'easeflow2023@gmail.com',
      to:email,
      subject:"Verify your EaseFlow account",
      html:`<p> Hi ${username},Please click here to <a href="${process.env.REACT_APP_API}/api/v1/auth/verify?id=${user_id}">Verify</a>Your mail.</p>` 
    }
    transporter.sendMail(mailOptions, function(error,info){
      if(error){
        console.log(error)
      }
      else{
        console.log('email has been sent ',info.response)
      }
    })
  }catch(error){
    console.log(error)
  }
}

const userVerifyMail = async(req,res) => {
  try{
    console.log(req.query)
    const updateVerifiedUser = await userModel.updateOne({_id:req.query.id},{$set:{
      isEmailVerified:1
    }})
    console.log(updateVerifiedUser)
     res.redirect(`${process.env.FRONTEND_URL}/verified-email`)
  }catch(error){
    console.error(error.message)
  }
}

//user register
const registerController = async (req, res) => {
  try {
    const { username, email, password, phonenumber, address} = req.body;
    //validations
    if (!username) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phonenumber) {
      return res.send({ message: "Phone number is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }    
    //check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered. Please login.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      username,
      email,
      phonenumber,
      address,
      password: hashedPassword,
    }).save();

    // Wait for the email to be sent before responding
    await sendUserVerifyEmail(username, email, user._id);

    return res.status(201).send({
      success: true,
      message: "User registered successfully. Email has been sent for verification.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};


//LOGIN
export const loginController = async (req, res) => {
  try {
    const {email,password} = req.body
    //validation
     if (!email || !password) {
       return res.status(404).send({
         success: false,
         message: "Invalid email or password",
       });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
       return res.status(404).send({
         success: false,
         message: "Email is not registered",
       });
     }
      // Check if the user's email is verified
    if (user.isEmailVerified !== 1) {
      return res.status(200).send({
        success: false,
        message: "Your email isn't verified",
      });
    }
      const match = await comparePassword (password,user.password)
      if(!match){
        return res.status(200).send({
          success:false,
          message:'Invalid Password'
        })
      }
      //token
     const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
       expiresIn: "7d", //7days ma expire
     });
     return res.status(200).send({
       success: true,
       message: "Login successful",
       user: {
         _id: user._id,
         username: user.username,
         email: user.email,
         phonenumber: user.phonenumber,
         address: user.address,
         role:user.role
       },
       token,
     });
    } catch(error) {
      return res.status(500).send({
      success:false,
      message:'Error in login',
      error
    })
  }
}

// //forgot password
// export const forgotPasswordController = async (req, res) => {
//   try {
//     const { email, answer, newPassword } = req.body;
//     if (!email) {
//       return res.status(400).send({ message: "email is required" });
//     }
//     if (!answer) {
//       return res.status(400).send({ message: "answer is required" });
//     }
//     if (!newPassword) {
//       return res.status(400).send({ message: "new password is required" });
//     }
//     //check
//     const user = await UserModel.findOne({ email, answer });
//     //validation
//     if (!user) {
//      return res.status(404).send({
//         success: false,
//         message: 'wrong email or answer'
//       });
//     }
//     const hashed = await hashPassword(newPassword);
//     await userModel.findByIdAndUpdate(user._id, { password: hashed });
//     return res.status(200).send({
//       success: true,
//       message: 'password reset successful'
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: 'something went wrong',
//       error
//     });
//   }
// };

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { username, email, password, address, phonenumber } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        username: username || user.username,
        password: hashedPassword || user.password,
        phonenumber: phonenumber || user.phonenumber,
        address: address || user.address,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating profile",
      error,
    });
  }
};
/* 
//doctor email verification
const sendDoctorVerifyEmail = async(name,email,user_id) => {
  try{
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:'easeflow2023@gmail.com',
        pass:`${process.env.SMTP_PASSWORD}`
      }
    })
    const mailOptions = {
      from:'easeflow2023@gmail.com',
      to:email,
      subject:"Verify your EaseFlow account",
      html:`<p> Hi ${name},Please click here to <a href="http://localhost:3000/verify-doctor-email?id=${user_id}">Verify</a>Your mail.</p>` 
    }
    transporter.sendMail(mailOptions, function(error,info){
      if(error){
        console.log(error)
      }
      else{
        console.log('email has been sent ',info.response)
      }
    })
  }catch(error){
    console.log(error)
  }
}

const doctorVerifyMail = async(req,res) => {
  try{
    const updateVerifiedUser = await DoctorModel.updateOne({_id:req.query.id},{$set:{
      isEmailVerified:1
    }})
    console.log(updateVerifiedUser)
     res.redirect('/verified-email')
  }catch(error){
    console.error(error.message)
  }
} */


export const registerDoctorController = async (req, res) => {
  try {
    console.log(req.fields);
    const { name, email, password, phonenumber, specialization, 
      address, hospitalOrClinic } = req.fields
    const { certificatePhoto } = req.files 
    // Validations
    if (!name || !email || !password || !phonenumber || !specialization || !address || !hospitalOrClinic) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (!certificatePhoto) {
      return res.status(400).json({ success: false, message: 'Certificate photo is required' });
    }
    if (certificatePhoto.size > 1000000) {
      return res.status(400).json({ success: false, message: 'Certificate photo size should be less than 1MB' });
    }
    // Hash the password before saving
    const hashedPassword = await hashPassword(password);
    const newDoctor = new DoctorModel({
      ...req.fields,
      password: hashedPassword,
    });
    if (certificatePhoto) {
      newDoctor.certificatePhoto.data = fs.readFileSync(certificatePhoto.path);
      newDoctor.certificatePhoto.contentType = certificatePhoto.type;
    }
    await newDoctor.save();
    //await sendDoctorVerifyEmail(name, email, newDoctor._id);

    res.status(201).json({
      success: true,
      message: 'Doctor registration pending approval',
      doctor: newDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in doctor registration', error });
  }
};


//fetch doctors for approval
export const getUnapprovedDoctorsController = async (req, res) => {
  try {
    const unapprovedDoctors = await DoctorModel.find({ isApproved: false });

    res.status(200).json({
      success: true,
      doctors: unapprovedDoctors,
    });
  } catch (error) {
    console.error('Error fetching unapproved doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// get photo
export const certificatePhotoController = async (req, res) => {
  try {
    const unapprovedDoctors = await DoctorModel.findById(req.params.did).select("certificatePhoto");
    if (unapprovedDoctors.certificatePhoto.data) {
      res.set("Content-type", unapprovedDoctors.certificatePhoto.contentType);
      return res.status(200).send(unapprovedDoctors.certificatePhoto.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting certificate photo",
      error,
    });
  }
};

//doctor approval denial
export const sendDoctorApprovalEmail = async (username, email, user_id, isApproved) => {
  try {
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:'easeflow2023@gmail.com',
        pass:`${process.env.SMTP_PASSWORD}`
      }
    })
    
    let subject, message;
    if (isApproved) {
      subject = 'Your EaseFlow Doctor Account has been Approved';
      message = `<p> Hi ${username}, your EaseFlow Doctor account has been approved.</p>`;
    } else {
      subject = 'Your EaseFlow Doctor Account has been Denied';
      message = `<p> Hi ${username}, your EaseFlow Doctor account has been denied.</p>`;
    }
    const mailOptions = {
      from: 'easeflow2023@gmail.com',
      to: email,
      subject,
      html: message,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email has been sent ', info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Approve Doctor
export const approveDoctorController = async (req, res) => {
  try {
    const { did } = req.params;

    // Find the doctor by ID and update isApproved to true
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(
      did,
      { $set: { isApproved: true } },
      { new: true }
    );

     // Send approval email to the doctor
    await sendDoctorApprovalEmail(updatedDoctor.name, updatedDoctor.email, updatedDoctor._id, true);

    res.status(200).json({
      success: true,
      message: 'Doctor approved successfully',
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error('Error approving doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

//deny doctor
export const denyDoctorController = async (req, res) => {
  try {
    const { did } = req.params;
    console.log('Denying doctor with ID:', did);
    // Find the doctor by ID and remove from the database
    const removedDoctor = await DoctorModel.findByIdAndDelete(did);
    if (!removedDoctor) {
      console.log('Doctor not found');
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }
    // Send denial email to the doctor
    await sendDoctorApprovalEmail(removedDoctor.name, removedDoctor.email, removedDoctor._id, false);

    console.log('Doctor denied and removed successfully');
    res.status(200).json({
      success: true,
      message: 'Doctor denied and removed successfully',
    });
  } catch (error) {
    console.error('Error denying doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

/* //check if the doctor is approved
export const checkDoctorApprovalController = async (req, res) => {
  try {
    // Find the doctor by email
    const doctor = await DoctorModel.findOne({ email: req.body.email });

    if (doctor && doctor.isApproved) {
      // If the doctor is found and is approved, send the response
      res.status(200).json({ isApproved: true });
    } else {
      // If the doctor is not found or is not approved, send the response
      res.status(200).json({ isApproved: false });
    }
  } catch (error) {
    console.error('Error checking doctor approval:', error);
    // Handle error or send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; */// DOCTOR LOGIN
export const doctorLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check if the user is a doctor
    const doctor = await DoctorModel.findOne({ email });
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    // Doctor login logic
    if (doctor.isApproved) {
      const isPasswordMatch = await comparePassword(password, doctor.password);
      const userData = {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phonenumber: doctor.phonenumber,
        specialization: doctor.specialization,
        address: doctor.address,
        hospitalOrClinic: doctor.hospitalOrClinic,
        role: doctor.role,
      }

      if (isPasswordMatch) {
        const token = await JWT.sign(userData,process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).send({
          success: true,
          message: "Doctor login successful",
          doctor: userData,
          token,
        });
      } else {
        console.log('Invalid password');
        return res.status(401).send({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      console.log("Your doctor account hasn't been approved yet");
      return res.status(403).send({
        success: false,
        message: "Your doctor account hasn't been approved by our admins",
      });
    }
  } catch (error) {
    console.error('Error in doctor login:', error);
    return res.status(500).send({
      success: false,
      message: "Error in doctor login",
      error: error.message,
    });
  }
};


//fetch approved doctors
export const getDoctorsController = async (req, res) => {
  try {
    const approvedDoctors = await DoctorModel.find({ isApproved: true });

    res.status(200).json({
      success: true,
      doctors: approvedDoctors,
    });
  } catch (error) {
    console.error('Error fetching all approved doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

//fetch single doctor
export const getSingleDoctorController = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Single doctor fetched',
      data: doctor,
    });
  } catch (error) {
    console.error('Error fetching one doctor', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

//fetch all users
export const getUsersController = async (req, res) => {
  try {
  const users = await userModel.find({ role: 0, isEmailVerified: 1 });

    res.status(200).json({
      success: true,
      user: users,
    });
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
//test controller
/* export const testController = (req,res) => {
  res.send('protected route')
} */

// Update doctor profile controller
export const updateDoctorProfileController = async (req, res) => {
  try {
    // req.user should be available if requireSignIn middleware is applied
    const doctorId = req.user?._id;

    // Update the doctor's profile with the data in req.body
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(doctorId, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: 'Doctor Profile updated successfully',
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// Fetch doctor data
export const getDoctorData = async (req, res) => {
  try {
    // Get the authenticated user's ID from the request object
    const doctorId = req.user._id;

    // Fetch the doctor data based on the user's ID
    const doctorData = await DoctorModel.findOne({ _id: doctorId });

    if (doctorData) {
      res.status(200).json({
        success: true,
        data: doctorData,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Doctor data not found',
      });
    }
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};


export default { registerController, loginController,updateProfileController,
  registerDoctorController,getUnapprovedDoctorsController,certificatePhotoController,approveDoctorController,
denyDoctorController,doctorLoginController, userVerifyMail , getDoctorsController,getUsersController
 ,updateDoctorProfileController,getSingleDoctorController,getDoctorData};
  