import React, { useState, useEffect } from 'react';
import DoctorNavbar from './DoctorNavbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import { useAuth } from '../context/auth';

const DoctorRateProducts = () => {
  const { auth } = useAuth();
  const doctorId = auth?.user?._id;

  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/get-product');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle rating submission
const handleRateProduct = async (productId, rating) => {
  try {



    // Rating payload
    const ratingPayload = { doctorId, rating };

    console.log('Rating Payload:', ratingPayload);

    // Make the API call to submit the rating
    const response = await axios.post(`/api/v1/product/rate/${productId}`, ratingPayload);
    // Get the product name from the products array
    const productName = products.find((p) => p._id === productId)?.name || 'Unknown Product';

    // Handle the response
    console.log('Rating Response:', response.data);

    toast.success(`You rated ${productName} with ${rating} stars.`);

    // Refresh the product list after rating
    getAllProducts();
  } catch (error) {
    console.error('Error submitting rating:', error);
    toast.error('Failed to submit rating. Please try again.');
  }
};

  return (
    <>
      <DoctorNavbar />
      <div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap justify-content-around">
              {products?.map((p) => (
                <div key={p._id} className="card m-2" style={{ width: '300px', height: '500px', padding: '10px', margin: '10px' }}>
                  <Link to={`/dashboard/doctor/product/${p.slug}`} className="product-link">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#FF06BF' }}>{p.name}</h5>
                    <p className="card-text" style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, maxHeight: '3em' }}>
                      {p.description}
                    </p>
                    <div className="text-center mt-3">
                      <Rate allowHalf defaultValue={p.averageRating} onChange={(rating) => handleRateProduct(p._id, rating)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DoctorRateProducts