import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import ProductScreen from './ProductScreen';
import EcomHeader from '../components/EcomHeader';
// import MainNavbar from '../components/Navbar';
import { Checkbox, Radio, Col } from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom'
import MainNavbar from '../components/Navbar';
//import footer from '../components/footer';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify'
import MainFooter from '../components/footer';
import '../styles/EcomHomeScreen.css';

const EcomHomeScreen = () => {

  const [cart, setCart] = useCart()

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data.success) {
        setCategories(data?.category); //optional chaining to prevent error messages while loading
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllCategory()
    getTotal()
  }, [])

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  /* useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); */

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <MainNavbar />
      <EcomHeader />

      <div className="container-fluid row mt-2">
        <div className="col-md-2">
          <h6 className="text-center-box " style={{ color: '#000080' }}>Filter by Category</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h6 className="text-center-box" style={{ color: '#000080' }}>Filter by Price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button className='btn btn-primary'
              onClick={() => window.location.reload()}>
              Reset Filters</button>
          </div>

        </div>
        <div className="col-md-9">
          <h3 className="text-center" style={{ color: '#000080' }}> All Products</h3>
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
                      {p.name.substring(0, 40)}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">
                      NRs.{p.price}/-
                    </p>
                    <button className='btn btn-primary ms-1'
                      onClick={() => navigate(`/product/${p.slug}`)}>
                      More Details</button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        const updatedCart = [...cart];
                        const existingProduct = updatedCart.find(item => item._id === p._id);
                        if (existingProduct) {
                          existingProduct.numberOfItems += 1;
                        } else {
                          updatedCart.push({ ...p, numberOfItems: 1 });
                        }
                        setCart(updatedCart);
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                        toast.success("Item Added to cart");
                      }}
                    >
                      <i className="fas fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              </Col>
            ))}

          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-primary'
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}>
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>

      </div >
      <MainFooter />
    </>
  );
};

export default EcomHomeScreen;