import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UseContext';
import './Register.css';
import Swal from 'sweetalert2'

const Register = () => {
    const [error, setError] = useState(null);
    const {createUser,signInWithGoogle} = useContext (AuthContext);

    const handelaSigUp = (event)=>{
    
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email,password,confirm);

        // Validation

        if(password.length < 6){
            setError('Passsword should be 6 carectars or more!');
            return
        }
        if(password !== confirm){
            setError('Confirm password does not macth!');
            return
        }
        // email and password set firebase
        createUser(email,password)
            .then(result=>{
                const user = result.user;
                console.log(user);
                form.reset();
                Swal.fire(
                    'Good job!',
                    'Yore Sign Up Successfully!',
                    'success'
                  );
            })
            .catch(error=>{
                const errorMessage = error.message;
                setError(errorMessage);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
        
    }
    const handelaGoogle = ()=>{
        signInWithGoogle()
        .then(result=>{
            const user = result.user;
            console.log(user)
        })
        .catch(error=>{
            const errorMessage = error.message;
            setError(errorMessage);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handelaSigUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm' required/>
                </div>
                <p className='error-text'>{error}</p>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p className='small-title'>Already have an account <Link className='link-title' to='/login'>LogIn</Link></p>

            <button onClick={handelaGoogle} className='Google-btn'>SignUp With Google</button>
        </div>
    );
};

export default Register;