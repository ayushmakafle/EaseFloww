import { Timestamp } from 'mongodb';
import mongoose, { Schema, model } from 'mongoose';

/*const reviewSchema = Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type: String,
        required: false
    }
}, {timestamps: true}) */

const productSchema = Schema({
    name: {
        type: String,
        required: true,
    },  
    slug:{
        type:String,
        required:true
    },  
    photo: {
        data:Buffer,
        contentType: String
    },    
    /*brand: {
        type: String,
        required: true,
    },*/
   category: {
        type: mongoose.ObjectId,
        ref:'category',
        required:true
    },
    description: {
        type: String,
        required: true,
    },
    /*reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true
    },
    numReviews:{
        type:Number,
        required:true
    },*/
    price:{
        type:Number,
        required: true
    },
    quantity: {
        type:Number,
        required:true
    },
    shipping:{
        type:Boolean
    }
},{timestamps:true})

export default mongoose.model("Products",productSchema)
//const Product = model('Products', productSchema);
//export default Product; */