//const registerController = () => {};
//export default registerController
import userModel from "../models/UserModel.js";
import DoctorModel from "../models/DoctorModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import fs from "fs"

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
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      username,
      email,
      phonenumber,
      address,
      password: hashedPassword,
      answer,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//POST LOGIN
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
        return res.status(200).send({
          success:false,
          message:'Invalid Password'
        })
      }
      //token
     const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
       expiresIn: "7d", //7days ma exipre
     });
     return res.status(200).send({
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
      return res.status(500).send({
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
      return res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "new password is required" });
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
    return res.status(200).send({
      success: true,
      message: 'password reset successful'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'something went wrong',
      error
    });
  }
};

//update prfole
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




export default { registerController, loginController,forgotPasswordController,updateProfileController,registerDoctorController };
  