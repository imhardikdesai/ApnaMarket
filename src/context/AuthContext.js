import { onAuthStateChanged } from 'firebase/auth';
// import { get, ref } from 'firebase/database';
import { useState, useEffect, createContext } from 'react';
// import { useSelector } from 'react-redux';
import { auth } from '../firebase/firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentUserDetails } from '../utils/utils';
import { updateAdminRole } from '../redux/actions/authActions';
import { GetAllProductDetailsFirebaseByUID } from '../utils/product';
import { updateCurrentCartFirebase } from '../redux/actions/cartActions';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const status = useSelector(state => state.auth.status)
    const [currentUser, setCurrentUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (!user) {
                setUserDetails(null)
            }
            if (user) {
                setUserDetails(user.providerData[0]);
                GetCurrentUserDetails(user).then((res) => {
                    dispatch(updateAdminRole(res.isAdmin))
                })

                GetAllProductDetailsFirebaseByUID(user.uid).then((res) => {
                    dispatch(updateCurrentCartFirebase(res))
                })
            }
            setLoading(false);
        });
    }, [status, dispatch]);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, userDetails, setUserDetails }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
