// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { useParams, Link } from 'react-router-dom'; // Import useParams hook
// import { Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
// import Rating from '../components/Rating';
// import axios from 'axios';
// import EcomHeader from '../components/EcomHeader';
// // import Navbar from '../components/Navbar';

// const ProductDetails = () => {
//     const { id } = useParams(); // Use useParams hook to get the 'id' parameter
//     const [product, setProduct] = useState([]);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const { data } = await axios.get(`/api/products/${id}`);
//                 setProduct(data);
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//             }
//         };
//         fetchProduct();
//     }, [id]);


//     return (
//         <div>
//             {/* <Navbar /> */}
//             <EcomHeader />
//             <Link to='/ecommerce' className='btn-light' style={{ textDecoration: 'none' }}>
//                 <i className="fa-solid fa-arrow-left" style={{ fontSize: '1em' }}></i>
//                 &nbsp;GO BACK
//             </Link>

//             <Row>
//                 <Col md={6}>
//                     <Image src={product.image} fluid />
//                 </Col>
//                 <Col md={3}>
//                     <ListGroup variant="flush">
//                         <ListGroupItem>
//                             <h3>{product.name}</h3>
//                         </ListGroupItem>
//                         <ListGroupItem>
//                             <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
//                         </ListGroupItem>
//                         <ListGroupItem>
//                             Price : ${product.price}
//                         </ListGroupItem>
//                         <ListGroupItem>
//                             {product.description}
//                         </ListGroupItem>
//                     </ListGroup>
//                 </Col>
//                 <Col md={3}>
//                     <ListGroup.Item className="border p-3">
//                         <Row>
//                             <Col className="border-end pe-3"> Status </Col>
//                             <Col className="ps-3"> {product.countInStock > 0 ? `In Stock` : 'Out of Stock'}</Col>
//                         </Row>
//                     </ListGroup.Item>
//                     <ListGroup.Item className='p-4'>
//                         <Button className='btn-block' type='button' style={{ width: '100%' }}> Add to Cart</Button>
//                     </ListGroup.Item>
//                 </Col>



//             </Row>
//         </div>
//     );
// }

// export default ProductDetails;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { useParams, Link } from 'react-router-dom'; // Import useParams hook
// import { Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
// import Rating from '../components/Rating';
// import axios from 'axios';
// import EcomHeader from '../components/EcomHeader';
// // import Navbar from '../components/Navbar';

// const ProductDetails = () => {
//     const history = useHistory();

//     const { id } = useParams(); // Use useParams hook to get the 'id' parameter
//     const [product, setProduct] = useState([]);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const { data } = await axios.get(`/api/products/${id}`);
//                 setProduct(data);
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//             }
//         };
//         const handleAddToCart = () => {
//             history.push('/cart');

//         fetchProduct();
//     }, [id];
// }


//     return (
//         <div>
//             {/* <Navbar /> */}
//             <EcomHeader />
//             <Link to='/ecommerce' className='btn-light' style={{ textDecoration: 'none' }}>
//                 <i className="fa-solid fa-arrow-left" style={{ fontSize: '1em' }}></i>
//                 &nbsp;GO BACK
//             </Link>

//             <Row>
//                 <Col md={6}>
//                     <Image src={product.image} fluid />
//                 </Col>
//                 <Col md={3}>
//                     <ListGroup variant="flush">
//                         <ListGroupItem>
//                             <h3>{product.name}</h3>
//                         </ListGroupItem>
//                         <ListGroupItem>
//                             <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
//                         </ListGroupItem>
//                         <ListGroupItem>
//                             Price : ${product.price}
//                         </ListGroupItem>
//                         <ListGroupItem>
//                             {product.description}
//                         </ListGroupItem>
//                     </ListGroup>
//                 </Col>
//                 <Col md={3}>
//                     <ListGroup.Item className="border p-3">
//                         <Row>
//                             <Col className="border-end pe-3"> Status </Col>
//                             <Col className="ps-3"> {product.countInStock > 0 ? `In Stock` : 'Out of Stock'}</Col>
//                         </Row>
//                     </ListGroup.Item>
//                     <ListGroup.Item className='p-4'>
//       <Button
//         className='btn-block'
//         type='button'
//         style={{ width: '100%' }}
//         onClick={handleAddToCart}
//       >
//         Add to Cart
//       </Button>
//     </ListGroup.Item>
//                 </Col>



//             </Row>
//         </div>
//     );
// }

// export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EcomHeader from '../components/EcomHeader';
// import CartPage from './CartPage';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    localStorage.setItem('cartItems', JSON.stringify([product])); // Assuming product is added as an array
    navigate('/dashboard/cart');
  };

  return (

  <div>
  <EcomHeader />
  <Link to='/ecommerce' className='btn-light' style={{ textDecoration: 'none' }}>
    <i className="fa-solid fa-arrow-left" style={{ fontSize: '1em' }}></i>
    &nbsp;GO BACK
  </Link>
  <Row>
    <Col md={6}>
      <Image src={product.image} fluid />
    </Col>
    <Col md={3}>
      <ListGroup variant="flush">
        <ListGroupItem>
          <h3>{product.name}</h3>
        </ListGroupItem>
        <ListGroupItem>
          <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
        </ListGroupItem>
        <ListGroupItem>
          Price : ${product.price}
        </ListGroupItem>
        <ListGroupItem>
          {product.description}
        </ListGroupItem>
      </ListGroup>
    </Col>
    <Col md={3}>
      <ListGroup.Item className="border p-3">
        <Row>
          <Col className="border-end pe-3"> Status </Col>
          <Col className="ps-3"> {product.countInStock > 0 ? `In Stock` : 'Out of Stock'}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item className='p-4'>
        <Button
          className='btn-block'
          type='button'
          style={{ width: '100%' }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </ListGroup.Item>
    </Col>
  </Row>
  {/* <CartPage/> */}
</div>
);
};

export default ProductDetails;