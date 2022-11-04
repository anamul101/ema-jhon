import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UseContext';
import  './LognIn.css';
import Swal from 'sweetalert2'

const LogIn = () => {
    const [error, setError] = useState(null);
    const [resetPass , setResetPass] = useState('');
    
    const {sigIn,signInWithGoogle,passReset} = useContext (AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const handelaSignIn = (event)=>{
    
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);

        // Validation
        if(password.length < 6){
            setError('Passsword should be 6 carectars or more!');
            return
        }
        // email and password set firebase
        sigIn(email,password)
            .then(result=>{
                const user = result.user;
                console.log(user);
                form.reset();
                Swal.fire(
                    'Good job!',
                    'Yore LogIn Successfully!',
                    'success'
                  );
                navigate(from, {replace:true});
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
    const handelaReset =() =>{
         passReset(resetPass)
         console.log(resetPass)
            .then(()=>{
                Swal.fire(
                    'great job',
                    'Yore reset password has been send your email!',
                    'success'
                  );
            })
            .catch(error=>{
                const errorMessage = error.message;
                setError(errorMessage);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'wrong information provide your email!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }
    return (
        <div className='form-container'>
        <h2 className='form-title'>LogIn</h2>
            <form onSubmit={handelaSignIn}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' onBlur={(e)=>setResetPass(e.target.value)} required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required/>
                </div>
                <p onClick={handelaReset} className='reset-pass'>Reset Password</p>
                <p className='error-text'>{error}</p>
                <input className='btn-submit' type="submit" value="LogIn" />
            </form>
            <p className='small-title'>New to ema jhon <Link className='link-title' to='/register'>creat new account</Link></p>
            <button onClick={handelaGoogle} className='Google-btn'>LogIn With Google</button>
        </div>
    );
};

export default LogIn;