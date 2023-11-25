const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems: [
        {
            name:{
                type:String,
                required:true
            },
            qyt:{
                type:Number,
                required: true
            },
            image:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            Product:{
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            }
        }
    ],
    shippingAddress:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        }
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String}
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false
    },
    DeliveredAt:{
        type:Date
    }
},{timestamps:true})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;