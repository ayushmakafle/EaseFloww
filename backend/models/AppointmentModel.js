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
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Pending'
    },
   startTime: {
        type: String, 
        required: true,
    },
    endTime: {
        type: String, 
        required: true,
    },
    patientName :{
        type:String,
        required : true
    },
    patientAge :{
        type:String,
        required:true
    },
    patientContact :{
        type:String,
        required:true
    },
    isCancelled:{
        type:Boolean,
        default: false
    }
},{timestamps:true})

export default mongoose.model("appointment",AppointmentSchema)