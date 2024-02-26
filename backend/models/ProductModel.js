import mongoose, { Schema, model } from 'mongoose';

// Define the review schema
/* const reviewSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
}, { timestamps: true }); */

// Define the product schema
const productSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
  
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Boolean,
    },
    ratings: [
        {
        //   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
          rating: { type: Number, default: 0 },
        },
      ],
      
    averageRating: { type: Number, default: 0 },
}, { timestamps: true });

// Export the "Product" model
export default model('Product', productSchema);
