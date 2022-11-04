import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Lyouts/Main';
import About from './Components/About/About';
import Shop from './Components/Header/Shop/Shop';
import Inventory from './Components/Inventory/Inventory';
import Order from './Components/Order/Order';
import { ProductsAndCardLoader } from './Components/Loader/ProductsAndCardLoader';
import LogIn from './Components/Login/LogIn';
import Register from './Components/Register/Register';
import Shipping from './Components/Shipping/Shipping';
import PrivateRouters from './Routs/PrivateRouters';


function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Main></Main>,
      children:[
        {
          path:'/',
          loader:()=>fetch('products.json'),
          element:<Shop></Shop>
        },
        {
          path:'/order',
          loader:ProductsAndCardLoader,
          element:<Order></Order>
        },
        {
          path:'/inventory',
          element:<PrivateRouters><Inventory></Inventory></PrivateRouters>
        },
        {
          path:'/shipping',
          element:<PrivateRouters><Shipping></Shipping></PrivateRouters>
        },
        {
          path:'/about',
          element:<About></About>
        },
        {
          path:'/logIn',
          element:<LogIn></LogIn>
        },
        {
          path:'/register',
          element:<Register></Register>
        }
      ]
    },
    
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
