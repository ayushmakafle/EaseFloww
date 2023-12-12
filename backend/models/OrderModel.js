import { Schema, model } from 'mongoose';



const orderSchema = Schema({
    User: {
        type: Schema.Types.ObjectId,
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
            price:{
                type:Number,
                required:true
            },
            Product:{
                type: Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            }
        }
    ],
    paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String}
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

const Order = model("Order",orderSchema);

export default Order;