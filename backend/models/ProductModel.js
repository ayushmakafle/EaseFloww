import { Timestamp } from 'mongodb';
import { Schema, model } from 'mongoose';

const reviewSchema = Schema({
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
}, {timestamps: true})

const productSchema = Schema({
    User:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },    
    image: {
        type: String,
        required: true,
    },    
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true
    },
    numReviews:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required: true
    },
    countInStock: {
        type:Number,
        required:true
    }
})

const Product = model('Product', productSchema);
export default Product;