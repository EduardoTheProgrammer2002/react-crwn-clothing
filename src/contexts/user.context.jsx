import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, OnAuthStateChangesListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = OnAuthStateChangesListener(async (user) => {
            setCurrentUser(user)
            if (user) {
                await createUserDocumentFromAuth(user);
            }
        })

        return unsubscribe;
    }, [])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}