import express, { json } from 'express';
//import { errorHandler } from './middlewares/errorMiddleware';
// import { json } from 'express'; // Ensure you import 'json' separately

import products from './data/products.js';
import { config } from 'dotenv'; 
import mongoose from 'mongoose';
import connectDB from './config/config.js';
import 'colors'; //for terminal
import productRoutes from './routes/productsRoute.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors';


config();
connectDB();
const app = express(); //rest object

//middlewares
app.use(cors());
app.use(json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product",productRoutes)

app.get('/', (req, res) => { 
    res.send('<h1>Welcome to node server of Easeflow</h1>')
});

//app.use('/api',productRoutes)

//app.use(errorHandler);

const PORT = process.env.PORT || 8080; // Use the port from environment variables or default to 8080
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.underline.green);
    });
