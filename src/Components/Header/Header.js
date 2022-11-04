import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UseContext';
import logo from '../../images/Logo.svg'
import './Header.css';

const Header = () => {
    const {user,logOut} = useContext(AuthContext);

    return (
        <nav className='headers'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/order">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                { 
                user?.uid? 
                <Link onClick={logOut} to="/logIn">LogOut</Link>
                :
                <>
                    <Link to="/logIn">LogIn</Link>
                    <Link to="/register">Sign Up</Link>
                </>
                }
                
                 <span className='show-user-details'>{user?.email}</span>
                
            </div>
        </nav>
    );
};

export default Header;