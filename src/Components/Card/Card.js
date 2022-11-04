import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Card.css'

const Card = (props) => {
    const {card, clearCart,children} = props;
    // console.log(card)

    let total = 0;
    let shiping = 0;
    let quantity = 0;
    for(const product of card){
        quantity= quantity+product.quantity;
        total = total+ product.price * product.quantity;
        shiping = shiping+product.shipping * product.quantity;
    }
    
    const tax = (total * 0.1).toFixed(2);
    const totalTax = parseFloat(tax);
    
    const grandTotal = total+shiping+totalTax;
   
    return (
        <div className='card'>
            <h3>Product Summary</h3>
            <p>Card ltems: {quantity}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping: ${shiping}</p>
            <p>Tax:${totalTax}</p>
            <h4>Grand Total:  ${grandTotal}</h4>

            <button onClick={()=>clearCart()} className="btn-clear">
                <p className='btn-p'>Clear Card</p>
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
            {children}
        </div>
    );
};

export default Card;