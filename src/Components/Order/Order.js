import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Card from '../Card/Card';
import ReviewItems from '../ReviewItems/ReviewItems';

const Order = () => {
    const {products, previousCart}=useLoaderData();
    const [card, setCard] = useState(previousCart);

    const removeItemHandela=(id)=>{
        const remainingCart = card.filter(product => product.id !== id);
        setCard(remainingCart);
        removeFromDb(id)
    }
    const clearCart = ()=>{
        setCard([]);
        deleteShoppingCart()
   }
    return (
        <div className='shop-container'>
        {/* all single product */}
            <div className="review-container">
                {
                    card.map(productItem => <ReviewItems key={productItem.id} productItem={productItem} removeItemHandela={removeItemHandela}></ReviewItems>)
                }
                {
                    card.length === 0 && <h2>No card found please back to <Link to='/'>Shop page</Link></h2>
                }
            </div>

        {/* order now */}
            <div className= "card-container">
                <Card card={card} clearCart={clearCart}>
                    <Link className='link-btn' to='/shipping'>
                        <button className='btn-clear'>Procced Shipping <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon></button>
                    </Link>
                </Card>
            </div>
    </div>
    );
};

export default Order;