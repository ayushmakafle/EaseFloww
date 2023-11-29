/* import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';

const ProductScreen = ({ product }) => {
    return (
        <>
            <div className="p-2">
                <Card className='my-3 p-2 rounded' style={{ width: '250px', height: '300px' }}>
                    <a href={`/product/${product._id}`}>
                        <Card.Img src={product.image} variant='top' style={{ height: '150px', objectFit: 'cover' }} />
                    </a>
                    <Card.Body className="d-flex flex-column">
                        <Link to={`/product/${product._id}`}>
                            <Card.Title as='div'>
                                <strong>{product.name}</strong>
                            </Card.Title>
                        </Link>
                        <div className="d-flex justify-content-between align-items-center flex-grow-1">
                            <div>
                                <Card.Text as="div">
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </Card.Text>
                                <Card.Text as="div">
                                    ${product.price}
                                </Card.Text>
                            </div>
                            <div>
                                <Card.Text>
                                    <Button className='btn-block' type='button' style={{ width: '100%' }}>
                                        <i className="fas fa-cart-shopping"></i>
                                    </Button>
                                </Card.Text>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default ProductScreen;
 */