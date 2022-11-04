import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './SingleProduct.css'
const SingleProduct = (props) => {
    const {product,evenHandelar} = props;
    const {img,name,price,ratings,seller} = product;
    return (
        <div className='singleProdut'>
            <img src={img? img: 'No Found Image'} alt="" />
            <div className='product-info'>
                <div className='product-name'>
                    <h4>Name: {name}</h4>
                    <p>Price: {price}</p>
                </div>
                <div className='product-rating'>
                    <p>Saller: {seller}</p>
                    <p>Rating: {ratings}</p>
                </div>
            </div>
           
            <button onClick={() => evenHandelar(product)} className='btn-card'>
                <p className='btn-text'>Add To Card</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
           
        </div>
    );
};

export default SingleProduct;