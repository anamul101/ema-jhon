import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/UseContext';

const PrivateRouters = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    let location = useLocation();

    if(loading){
        return <div>Loading...</div>
    }

    if(user && user.uid){
        return children;
    }
    
    return <Navigate to = '/login' state={{from:location}} replace ></Navigate>
};

export default PrivateRouters;