const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/Users');
const User = require('./models/UserModel');
const Order = require("./models/OrderModel");
const products = require('./data/products')
const connectDb = require('./config/config');
const Product = require('./models/ProductModel');
require('colors') //for terminal

dotenv.config();
connectDb();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createUser = await User.insertMany(users);
        const adminUser = createUser[0]._id;

        const sampleData = products.map(product => {
            return { ...product, User: adminUser };
        });

        await Product.insertMany(sampleData);
        console.log(`Data Imported`.green.inverse);
        process.exit(0);
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
};


const dataDestroy = async () =>{
     try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log(`Data Destroyed`.red.inverse);
        process.exit(0);
    } catch (error) {
        console.log(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    dataDestroy()
}else{
    importData()
}