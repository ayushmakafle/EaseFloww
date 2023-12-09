import mongoose, { Schema, model } from 'mongoose';

// Define the review schema
const reviewSchema = Schema({
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
}, { timestamps: true });

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
        type: mongoose.Schema.Types.ObjectId, // Corrected the type
        ref: 'Category', // Assuming the category model is named 'Category'
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema], // Use the defined review schema as a subdocument array
    rating: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
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
}, { timestamps: true });

// Export the "Product" model
export default model('Product', productSchema);
