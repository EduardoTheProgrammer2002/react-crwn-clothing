import { initializeApp } from 'firebase/app'
import { } from 'firebase/auth'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs

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

export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done✅');
}

export const getCollectionAndDocs = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querrySnapshot = await getDocs(q);

    const categoryMap = querrySnapshot.docs.map((snapShot) => snapShot.data())

    return categoryMap;
};

export const createUserDocumentFromAuth = async (userAuth, additional = {}) => {
    const userDocRef = await doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if the userDoc does not exist, we want to create a doc for the especific user signing in
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additional
            });
        } catch (error) {
            console.log('Error creating the user Doc', error.message);
        }
    }

    // check if the doc exists, if so:
    // return the userDocRef
    return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signUserInWithEmailAngPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const OnAuthStateChangesListener = (callback) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (authUser) => {
                unsubscribe();
                resolve(authUser);
            },
            reject
        )
    })
}