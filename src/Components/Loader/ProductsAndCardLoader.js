import { getStoredCart } from "../../utilities/fakedb";

export const ProductsAndCardLoader =async ()=>{
    // get products
    const productsData = await fetch('http://localhost:5000/products');
    const {products} = await productsData.json();

    // get cart
    const savedCart = getStoredCart();
    // console.log('savedCard',savedCart)
    const previousCart = [];
    for(const id in savedCart){
        const addedProduct = products.find(product => product._id === id);
        if(addedProduct){
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            previousCart.push(addedProduct);
        }
    }

    return {products, previousCart};
}