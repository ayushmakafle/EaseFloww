import JWT from 'jsonwebtoken'
import UserModel from '../models/UserModel.js';
import DoctorModel from '../models/DoctorModel.js';


// Protected routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log('Decoded User:', decode); // Log the decoded user
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Unauthorized access' });
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);

    if (!user || user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized access',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: 'Error in admin middleware',
    });
  }
};

// doctor access
export const isDoctor = async (req, res, next) => {
  try {
    const doctor = await DoctorModel.findById(req.user._id);
    if (!doctor) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized access',
      });
    } else {
      req.doctor = doctor; // Optionally, you can attach the doctor object to req.doctor for future use
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: 'Error in doctor middleware',
    });
  }
};
