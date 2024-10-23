import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../src/firebase-config";


const auth = getAuth(app);


export async function login(email, password){
    try {
        if (!navigator.onLine) throw new Error('No internet connection');
        var output = await signInWithEmailAndPassword(auth, email, password);  
        return {status: true, data: output, message: "Login Successfully."};
    } catch (error) {
        return {status: false, data: null, message: error.message};
    }

}


async function createAccount(email, password){
    try {
        if (!navigator.onLine) throw new Error('No internet connection');
        var output = await createUserWithEmailAndPassword(email, password);
        return {status: true, data: output, message: "Created Succesfully."}
    } catch (error) {
        return {status: false, data: null, message: error.message};
    }
}


export async function logout(){
    try {
        if (!navigator.onLine) throw new Error('No internet connection');
        await auth.signOut();

        
        return {status: true, message: "Logged out successfully."}
    } catch (error) {
        return {status: false, message: error.message};
    }
}


