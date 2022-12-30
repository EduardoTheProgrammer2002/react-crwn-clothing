import { initializeApp } from 'firebase/app'
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9I0jz0Rf80ndI4wTcOaMjvnvyUIVFd10",
    authDomain: "crwn-clothing-db-75087.firebaseapp.com",
    projectId: "crwn-clothing-db-75087",
    storageBucket: "crwn-clothing-db-75087.appspot.com",
    messagingSenderId: "415644198900",
    appId: "1:415644198900:web:94e599ee710bf47328bba1"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore();

export const createUserDoc = async (userAuth) => {
    const userDocRef = await doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    //if the userDoc does not exist, we want to create a doc for the especific user signing in
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('Error creating the user Doc', error.message);
        }
    }

    // check if the doc exists, if so:
    // return the userDocRef
    return userDocRef;
};
