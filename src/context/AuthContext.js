import { onAuthStateChanged } from 'firebase/auth';
// import { get, ref } from 'firebase/database';
import { useState, useEffect, createContext } from 'react';
// import { useSelector } from 'react-redux';
import { auth } from '../firebase/firebase-config';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    // const status = useSelector(state => state.auth.status)
    const [currentUser, setCurrentUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (!user) {
                setUserDetails(null)
            }
            if (user) {
                setUserDetails(user.providerData[0]);
            }

            setLoading(false);
        });
    }, []);


    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, userDetails, setUserDetails }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
