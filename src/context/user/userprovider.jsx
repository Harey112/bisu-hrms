import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from '../auth/authprovider';
import { db } from '../../firebase-config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [refresh, triggerRefresh] = useState(null);


    const {currentUser, userLoggedIn} = useAuth();


    const saveNewData = async(data)=>{
        try {
            const docRef = doc(db, "User", currentUser.uid, 'data', 'personal');
            await setDoc(docRef, data);
            triggerRefresh(Math.random())
            return {success: true, message: "Successful"};
        } catch (error) {
            return {success: false, message: error.message};
        }
    };


    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "User", currentUser.uid, 'data', 'personal');
            const data = await getDoc(docRef);
            setUser(data.data())
        }
        
        if(currentUser.uid){
        
            fetchData();
        }
    }, [refresh]);
    

    useEffect((currentUser) => {
        
        if (userLoggedIn) {
            sessionStorage.setItem('user', JSON.stringify(user));
        }else{
            sessionStorage.removeItem('user')
        }
    }, [user, userLoggedIn, currentUser]);

    return (
        <UserContext.Provider value={{user, saveNewData}}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
