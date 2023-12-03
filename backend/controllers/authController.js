import userModel from "../models/UserModel.js";
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
      html:`<p> Hi ${username},Please click here to <a href="http://localhost:3000/verify?id=${user_id}">Verify</a>Your mail.</p>` 
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
    const updateVerifiedUser = await userModel.updateOne({_id:req.query.id},{$set:{
      isEmailVerified:1
    }})
    console.log(updateVerifiedUser)
     res.redirect('/verified-email')
  }catch(error){
    console.error(error.message)
  }
}

//user register
const registerController = async (req, res) => {
  try {
    const { username, email, password, phonenumber, address,answer } = req.body;
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
    if (!answer) {
      return res.send({ message: "Answer is Required" });
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
      answer,
    }).save();

    // Wait for the email to be sent before responding
    await sendUserVerifyEmail(username, email, user._id);

    res.status(201).send({
      success: true,
      message: "User registered successfully. Email has been sent for verification.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
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
         message: "Email is not registerd",
       });
     }
      const match = await comparePassword (password,user.password)
      if(!match){
        res.status(200).send({
          success:false,
          message:'Invalid Password'
        })
      }
      //token
     const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
       expiresIn: "7d", //7days ma expire
     });
     res.status(200).send({
       success: true,
       message: "login successfully",
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
    res.status(500).send({
      success:false,
      message:'Error in login',
      error
    })
  }
}

//forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "new password is required" });
    }
    //check
    const user = await UserModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'wrong email or answer'
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: 'password reset successful'
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'something went wrong',
      error
    });
  }
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { username, email, password, address, phonenumber } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
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


//register doctor
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

    const newDoctor = new DoctorModel({...req.fields});
    if (certificatePhoto) {
      newDoctor.certificatePhoto.data = fs.readFileSync(certificatePhoto.path);
      newDoctor.certificatePhoto.contentType = certificatePhoto.type
    }
    await newDoctor.save()

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
      message: "Erorr while getting certificate photo",
      error,
    });
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


export default { registerController, loginController,forgotPasswordController,updateProfileController,
  registerDoctorController,getUnapprovedDoctorsController,certificatePhotoController,approveDoctorController,
denyDoctorController };
  