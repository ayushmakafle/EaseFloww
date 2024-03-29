import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
//import MainNavbar from '../components/Navbar';
import EcomHeader from '../components/EcomHeader';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify'
import { Rate } from 'antd';
const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart()
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate()

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
  const goBack = () => {
    navigate(-1); // Navigate back
  };
  return (
    <>
      {/* <MainNavbar /> */}
      <EcomHeader />
      <button className="back-button" onClick={goBack}>
          <span role="img" aria-label="Back Arrow" className="pink-arrow" style={{ color: '#f38dbc' }}>❮❮</span>
        </button>
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
                <h2 className="card-title text-center mb-4" style={{ fontFamily: 'Poppins', color: '#FF06BF' }}>
                  {product.name}
                </h2>
                {product.category && (
                  <p className="card-text" style={{ color: '#ef5e99' }}>
                    <span style={{ color: '#de5d83', fontFamily: 'sans-serif' }}>Category:</span> {product.category.name}

                  </p>
                )}
                <p className="card-text" style={{ color: '#ef5e99', fontWeight: 'bolder' }}>
                  <span style={{ color: '#de5d83' }}>Price:</span> NRs.{product.price}/-
                </p>
                <p className="card-text" style={{ color: '#ef5e99' }}>
                  Rating from EaseFlow Doctors: <Rate value={Number(product.averageRating)} disabled allowHalf />
                </p>
                <p className="card-text" style={{ color: '#212129', fontFamily: 'sans-serif' }}>{product.description}</p>
                <button className='btn btn-secondary' style={{ backgroundColor: '#FF06BF' }} onClick={() => {
                  const updatedCart = [...cart];
                  const existingProduct = updatedCart.find(item => item._id === product._id);
                  if (existingProduct) {
                    existingProduct.numberOfItems += 1;
                  } else {
                    updatedCart.push({ ...product, numberOfItems: 1 });
                  }
                  setCart(updatedCart);
                  localStorage.setItem("cart", JSON.stringify(updatedCart));
                  toast.success("Item Added to cart")
                }}>
                  <i className="fas fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1 style={{ fontFamily: 'Times New Roman', marginLeft: '22px', marginTop: '22px', textAlign: 'center', color: '#FF06BF' }}>
          Similar Products
        </h1>
        {relatedProducts.length < 1 && (<h3 style={{ fontFamily: 'Times New Roman', marginLeft: '22px', marginTop: '22px', textAlign: 'center', color: '#FF06BF' }}>No Similar Products Found</h3>)}
        <div className="d-flex flex-wrap" style={{ margin: '20px', alignContent: 'center' }}>
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
                <button className='btn btn-primary ms-1'
                  onClick={() => navigate(`/product/${p.slug}`)}
                  style={{ backgroundColor: '#FF06BF' }}
                >
                  More Details
                </button>

              </div>
            </div>
          ))}
        </div>      </div>
    </>
  );
};

export default ProductDetails;