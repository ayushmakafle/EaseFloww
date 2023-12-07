import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true 
    },
    doctorID:{
        type:String,
        required:true
    },
    doctorInfo:{
        type:String,
        required:true
    },
    userInfo:{
        type:String,
        required:true
    },
    data:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    },
    time:{
        type:String,
        required:true
    }

},{timestamps:true})

export default mongoose.model("appointment",AppointmentSchema)