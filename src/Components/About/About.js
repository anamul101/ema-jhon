import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UseContext';

const About = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <h1>this is a aboutus: { user.email}</h1>
            
        </div>
    );
};

export default About;