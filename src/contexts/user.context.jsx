import { createContext, useEffect, useReducer, useState } from "react";
import { createUserDocumentFromAuth, OnAuthStateChangesListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

/*
{
    type: action type,
    payload: data to change
}

*/

const USER_REDUCER_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const UserReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: payload
            }
    
        default:
            throw new Error(`Unknown type: ${type}`);
    }
}

const INITIAL_VALUE = {
    currentUser: null
}

export const UserContextProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [{currentUser}, dispatch] = useReducer(UserReducer, INITIAL_VALUE);

    const setCurrentUser = (user) => {
        dispatch({type: USER_REDUCER_TYPES.SET_CURRENT_USER, payload: user});
    }

    const value = { currentUser, setCurrentUser };

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