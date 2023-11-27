import React from 'react';
import '../components/Login.css';

const Products = () => {
  const products = [
    {
      name: 'pad',
      image: '/images/pad.jpg',
      description: 'pad ho pad',
      brand: 'whisper',
      category: 'pad',
      price: 20.99,
      countInStock: 10,
      rating: 4.5,
      numReviews: 12,
    },
    {
      name: 'tampon',
      image: '/images/tampon.jpg',
      description: 'tamponnn',
      brand: 'safabrand',
      category: 'tampon',
      price: 599.99,
      countInStock: 7,
      rating: 4.0,
      numReviews: 8,
    },
    {
      name: 'menstrual cup',
      image: '/images/cup.jpg',
      description: 'cup cup',
      brand: 'safacup',
      category: 'cup',
      price: 929.99,
      countInStock: 5,
      rating: 3,
      numReviews: 12,
    },
    {
      name: 'menstrual-cup',
      image: '/images/menstrual-cup.jpg',
      description: 'menstrual-cup',
      brand: 'arkocup',
      category: 'cup',
      price: 399.99,
      countInStock: 11,
      rating: 5,
      numReviews: 12,
    },
    {
      name: 'paree',
      image: '/images/paree.jpg',
      description: 'pareeeeee',
      brand: 'paree',
      category: 'pad',
      price: 49.99,
      countInStock: 7,
      rating: 3.5,
      numReviews: 10,
    },
    {
      name: 'pad',
      image: '/images/pads.jpg',
      description: 'padss',
      brand: 'stayfree',
      category: 'pad',
      price: 29.99,
      countInStock: 0,
      rating: 4,
      numReviews: 12,
    },
  ];

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <div key={index} className="product-box">
          <div className="box-content">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-rating">Rating: {product.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
