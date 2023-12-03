import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import MainNavbar from '../components/Navbar';
import EcomHeader from '../components/EcomHeader';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <MainNavbar /> */}
      <EcomHeader />

      <Link to='/ecommerce' className='btn-light' style={{ textDecoration: 'none' }}>
        <i className="fa-solid fa-arrow-left" style={{ fontSize: '1em' }}></i>
        &nbsp;GO BACK
      </Link>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">{product.name}</h2>
                {product.category && (
                  <p className="card-text">
                    <span style={{ color: '#007BFF' }}>Category:</span> {product.category.name}
                  </p>
                )}
                <p className="card-text">
                  <span style={{ color: '#28A745' }}>Price:</span> ${product.price}
                </p>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-primary btn-lg">
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1>Similar Products</h1>
        {relatedProducts.length < 1 && (<p>No Similar Products Found</p>)}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: '300px', height: '450px', padding: '15px' }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#FF06BF' }}>
                  {p.name.substring(0, 40)}</h5>
                <p className="card-text">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="card-text">
                  NRs.{p.price}/-
                </p>
                <button className='btn btn-secondary'>
                  <i className="fas fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          ))}
        </div>      </div>
    </>
  );
};

export default ProductDetails;
