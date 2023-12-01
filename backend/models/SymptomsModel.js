import { Timestamp } from 'mongodb';
import mongoose, { Schema, model } from 'mongoose';

const SymptomsSchema = new mongoose.Schema({
    user_id:{
        type:Number,
        required:true,
        unique:true
    },
    username:{
        type:string,
        required:true,
        unique:true
    },
    symptomsdate:{
        type:Number,
        required:true,
        unique:true

    },
},
    { timestamps: true }
    );

    export default mongoose.model("symptoms",SymptomsSchema);