import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {auth} from '../../firebase-config'
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [authLoading, setLoading ] = useState(true);

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    },[]);

    async function initializeUser(user){
        if(user){
            setCurrentUser({...user});
            
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false)
        }

        setLoading(false);
    }
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        setAuthData({currentUser, userLoggedIn, authLoading});
    },[currentUser, userLoggedIn, authLoading]);

    return (
        <AuthContext.Provider value={authData}>
            {!authLoading && children}
        </AuthContext.Provider>
    )
}