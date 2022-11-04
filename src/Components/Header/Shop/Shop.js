import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart, removeFromDb } from '../../../utilities/fakedb';

import Card from '../../Card/Card';
import SingleProduct from '../../SingleProduct/SingleProduct';
import './Shop.css'
const Shop = () => {
    const products= useLoaderData();
    const [card , setCard] = useState([]);
    

    useEffect(()=>{
       const shopingCart = getStoredCart();
       const saveCard = [];
       for(const id in shopingCart){
            const addProduct = products.find(product=>product.id === id);
            // console.log(addProduct);
            if(addProduct){
                const quantity = shopingCart[id];
                addProduct.quantity = quantity;
                // console.log(addProduct)
                saveCard.push(addProduct);
            }
       }
       setCard(saveCard);
    },[products])
    const evenHandelar = (product) =>{
        // console.log(product)
        let newCard = []
        const existis = card.find(singleProduct => singleProduct.id === product.id);
        if(!existis){
            product.quantity = 1;
            newCard = [...card, product]
        }else{
            const rest = card.filter(singleProduct=> singleProduct.id !== product.id);
            existis.quantity= existis.quantity+1;
            newCard=[...rest,existis]
        }
        // const newCard = [...card, product];
        setCard(newCard)
        addToDb(product.id)
    }
   const clearCart = ()=>{
        setCard([]);
        deleteShoppingCart()
   }
    return (
        <div className='shop-container'>
            {/* all single product */}
            <div className="products-container">
                {
                    products.map(product=><SingleProduct key={product.id} product={product} evenHandelar={evenHandelar}></SingleProduct>)
                }
            </div>

            {/* order now */}
            <div className= "card-container">
                <Card card={card} clearCart={clearCart} >
                    <Link className='link-btn' to='/order'>
                        <button className='btn-clear'>Review Order <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Shop;