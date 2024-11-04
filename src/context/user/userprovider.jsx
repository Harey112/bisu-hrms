import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from '../auth/authprovider';
import { db } from '../../firebase-config';
import { reload } from 'firebase/auth';

const UserContext = createContext();



export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setLoading ] = useState(true);
    const [refresh, triggerRefresh] = useState(null);
    const {currentUser, userLoggedIn, authLoading} = useAuth();




    const saveNewData = async(data)=>{
        data.personalinfo.email = currentUser.email;
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

        const reloadData = async ()=>{
            setLoading(true);
            try {
                const docRef = doc(db, "User", currentUser.uid, 'data', 'personal');
                const data = await getDoc(docRef);
                setUser(data.data());
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(true);
                
            }
        };

        if(!authLoading && userLoggedIn){
            
            reloadData();
        }
    }, [refresh]);




    return (
        <UserContext.Provider value={{user, userLoading, saveNewData}}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
