

const addDataStor=(id) =>{
    let shopingCard = {};

    // get data from localstor
    const storedCart = localStorage.getItem('shoping-cart');
    if(storedCart){
        shopingCard = JSON.parse(storedCart)
    }
    // add data local stor
    const quantity = shopingCard[id];
    if(quantity){
        const newQuantity = quantity+1;
        shopingCard[id]=newQuantity;
    }else{
        shopingCard[id]= 1;
    }

    localStorage.setItem('shoping-cart', JSON.stringify(shopingCard));
}

const removeDataStor = (id)=>{
    const storedCart = localStorage.getItem('shoping-cart');
    if(id in storedCart){
       const shopingCard = JSON.parse(storedCart);
       delete shopingCard[id]
       localStorage.setItem('shoping-cart', JSON.stringify(shopingCard));
    }
}

const deleteShopingCard = ()=>{
    localStorage.removeItem('shoping-cart');
}
export{addDataStor}