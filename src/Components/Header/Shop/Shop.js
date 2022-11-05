import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart, removeFromDb } from '../../../utilities/fakedb';

import Card from '../../Card/Card';
import SingleProduct from '../../SingleProduct/SingleProduct';
import './Shop.css';
 /*
 count : loader data count
 pare page : 10;
 sizeing: count/parePage
 currentPage: 
 */
const Shop = () => {
    // const {products,count}= useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0)
    const [card , setCard] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(()=>{
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
            .then(res=>res.json())
            .then(data=>{
                setCount(data.count);
                setProducts(data.products);
            })
    },[page,size])

    const pages = Math.ceil(count/size);
    
    

    useEffect(()=>{
       const shopingCart = getStoredCart();
       const saveCard = [];
       const ids = Object.keys(shopingCart);
       fetch('http://localhost:5000/productsByIds',{
        method:'POST',
        headers:{
            "content-type" : "application/json"
        },
        body: JSON.stringify(ids)
       })
       .then(res=>res.json())
       .then(data=>{
        console.log(data);
            for(const id in shopingCart){
                const addProduct = data.find(product=>product._id === id);
                if(addProduct){
                    const quantity = shopingCart[id];
                    addProduct.quantity = quantity;
                    saveCard.push(addProduct);
                }
        }
        setCard(saveCard);
       })
       
    },[products])
    const evenHandelar = (product) =>{
        // console.log(product)
        let newCard = []
        const existis = card.find(singleProduct => singleProduct._id === product._id);
        if(!existis){
            product.quantity = 1;
            newCard = [...card, product]
        }else{
            const rest = card.filter(singleProduct=> singleProduct._id !== product._id);
            existis.quantity= existis.quantity+1;
            newCard=[...rest,existis]
        }
        // const newCard = [...card, product];
        setCard(newCard)
        addToDb(product._id)
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
                    products.map(product=><SingleProduct key={product._id} product={product} evenHandelar={evenHandelar}></SingleProduct>)
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
            <div className="paigination">
                <p className='current-page'>Curent page selected: <span>{page}</span> Products Size: <span>{size}</span></p>
                {
                    [...Array(pages).keys()].map(number=><button 
                    key={number}
                    onClick={()=>setPage(number)}
                    className={page === number && 'selected'}
                    >
                        {number + 1}
                    </button>)
                }
                <select className='selected' onChange={(event)=>setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;