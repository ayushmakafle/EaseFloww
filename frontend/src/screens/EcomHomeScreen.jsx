import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox, Radio, Col } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/Navbar';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';
import MainFooter from '../components/footer';
import EcomHeader from '../components/EcomHeader';
import '../styles/EcomHomeScreen.css';

const EcomHomeScreen = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productRatings, setProductRatings] = useState({});

  const navigate = useNavigate();

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data.success) {
        setCategories(data?.category); // Optional chaining to prevent error messages while loading
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const displayStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} role="img" aria-label="star">⭐</span>);
    }

    if (halfStar) {
      stars.push(<span key="half" role="img" aria-label="half-star">⭐️</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} role="img" aria-label="empty-star">⭐️</span>);
    }

    return stars;
  };

  // Get product ratings
  const getProductRatings = async () => {
    try {
      const ratings = {};
      for (const product of products) {
        const response = await axios.get(`/api/v1/product/get-rating/${product._id}`);
        ratings[product._id] = response.data.rating; // Assuming your API response has a field 'rating'
      }
      setProductRatings(ratings);
    } catch (error) {
      console.error('Error fetching product ratings:', error);
    }
  };

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, [page]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    getProductRatings(); // Fetch ratings when products are loaded
  }, [products]);

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainNavbar />
      <EcomHeader />

      <div className="container-fluid row mt-2">
        <div className="col-md-2">
          <h6 className="text-center-box" style={{ color: '#000080' }}>
            Filter by Category
          </h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h6 className="text-center-box" style={{ color: '#000080' }}>
            Filter by Price
          </h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h3 className="text-center" style={{ color: '#000080' }}>
            All Products
          </h3>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Col key={p._id} xs={24} sm={12} md={8} lg={6}>
                <div className="card" style={{ padding: '15px' }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#FF06BF' }}>
                      {p.name.substring(0, 40)}
                    </h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                    <p className="card-text">NRs.{p.price}/-</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <div className="text-center mt-3">
                      {/* Display the doctor rating for the product */}
                      {productRatings[p._id] && (
                        <div>
                          Doctor Rating: {displayStars(productRatings[p._id])}
                        </div>
                      )}
                    </div>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        const updatedCart = [...cart];
                        const existingProduct = updatedCart.find(
                          (item) => item._id === p._id
                        );
                        if (existingProduct) {
                          existingProduct.numberOfItems += 1;
                        } else {
                          updatedCart.push({ ...p, numberOfItems: 1 });
                        }
                        setCart(updatedCart);
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                        toast.success('Item Added to cart');
                      }}
                    >
                      <i className="fas fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : 'Load More'}
              </button>
            )}
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default EcomHomeScreen;
