import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../Components/Firebase/Firebase.init';


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const UseContext = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const sigIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    const passReset = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }
    useEffect(()=>{
      const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('user unsubscript',currentUser )
             setUser(currentUser);
             setLoading(false);
        })
        return ()=> unSubscribe();
    },[])
    const authInfo = {user,loading,createUser,sigIn,signInWithGoogle,logOut,passReset};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UseContext;