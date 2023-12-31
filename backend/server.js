import axios from 'axios';
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
// import symptomsRoutes from './routes/SymptomsRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import appointmentRoute from './routes/appointmentRoute.js'
import bodyParser from 'body-parser';

import cors from 'cors';


config();
connectDB();
const app = express(); //rest object

//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product",productRoutes)
// app.use("/api/v1/symptoms",symptomsRoutes)
app.use("/api/v1/order",orderRoutes)
app.use("/api/v1/appointment",appointmentRoute)

app.post('/khalti-payment', async (req, res) => {
  try {
    console.log('Received JSON:', req.body);
    const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', {
      ...req.body,
    }, {
      headers: {
        'Authorization': 'key 805eb6763170463489be3ba2b735cde0',
        'Content-Type': 'application/json',
      },
    });
    console.log('Sent JSON:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error sending payment data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//khalti verify
app.post('/khalti-verify',async(req,res) => {
  try{
   console.log('Received JSON:', req.body);
    const response = await axios.post('https://a.khalti.com/api/v2/epayment/lookup/', {
      ...req.body,
    }, {
      headers: {
        'Authorization': `key 805eb6763170463489be3ba2b735cde0`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Sent JSON:', response.data);
    console.log('Received JSON:', req.body);
    res.status(response.status).json(response.data); 
  }catch(error){
    console.error('Error approving payment data:', error);
    res.status(500).json({ error: 'Internal Server Error' });  }
})


app.get('/', (req, res) => { 
    res.send('<h1>Welcome to node server of Easeflow</h1>')
});

//app.use('/api',productRoutes)

//app.use(errorHandler);

const PORT = process.env.PORT || 8080; // Use the port from environment variables or default to 8080
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.underline.green);
    });
