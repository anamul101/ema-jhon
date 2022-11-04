import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewItems.css'

const ReviewItems = ({productItem,removeItemHandela}) => {
    const {id,img, name,price,quantity,shipping}=productItem;
    return (
        <div className='review-items'>
           <div>
                <img src={img} alt="" />
            </div> 
            <div className="item-details">
                <div className='item-info'>
                    <p>{name}</p> 
                    <p>Price: ${price}</p>
                    <p>Shipping: ${shipping}</p>
                    <p>Quantity:{quantity}</p>
                </div>
                <div className="item-btn">
                    <button onClick={()=>removeItemHandela(id)} className='btn-delete'>
                        <FontAwesomeIcon className='btn-icone' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;