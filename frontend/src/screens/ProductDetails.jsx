import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MainNavbar from '../components/Navbar'
import EcomHeader from '../components/EcomHeader'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {

  const params = useParams()

  const [product, setProduct] = useState({})

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };


  return (
    <>
      <MainNavbar />
      <EcomHeader />

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
                <p className="card-text">
                  <span style={{ color: '#007BFF' }}>Category:</span> {product.category.name}
                </p>
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
      <div className="row">Similar Producrs</div>
    </>
  )
}

export default ProductDetails


// import React, { useState, useEffect } from 'react';
// import { Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
// import Rating from '../components/Rating';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import EcomHeader from '../components/EcomHeader';
// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axios.get(`/api/products/${id}`);
//         setProduct(data);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     localStorage.setItem('cartItems', JSON.stringify([product])); // Assuming product is added as an array
//     navigate('/dashboard/cart');
//   };

//   return (

//   <div>
//   <EcomHeader />
//   <Link to='/ecommerce' className='btn-light' style={{ textDecoration: 'none' }}>
//     <i className="fa-solid fa-arrow-left" style={{ fontSize: '1em' }}></i>
//     &nbsp;GO BACK
//   </Link>
//   <Row>
//     <Col md={6}>
//       <Image src={product.image} fluid />
//     </Col>
//     <Col md={3}>
//       <ListGroup variant="flush">
//         <ListGroupItem>
//           <h3>{product.name}</h3>
//         </ListGroupItem>
//         <ListGroupItem>
//           <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
//         </ListGroupItem>
//         <ListGroupItem>
//           Price : ${product.price}
//         </ListGroupItem>
//         <ListGroupItem>
//           {product.description}
//         </ListGroupItem>
//       </ListGroup>
//     </Col>
//     <Col md={3}>
//       <ListGroup.Item className="border p-3">
//         <Row>
//           <Col className="border-end pe-3"> Status </Col>
//           <Col className="ps-3"> {product.countInStock > 0 ? `In Stock` : 'Out of Stock'}</Col>
//         </Row>
//       </ListGroup.Item>
//       <ListGroup.Item className='p-4'>
//         <Button
//           className='btn-block'
//           type='button'
//           style={{ width: '100%' }}
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </Button>
//       </ListGroup.Item>
//     </Col>
//   </Row>
// </div>
// );
// };
