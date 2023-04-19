import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, admin }) => {
    const { currentUser } = useContext(AuthContext)
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const loggedIn = currentUser
    if (admin) {
        return isAdmin ? element : <Navigate to="/login" />
    } else {
        return loggedIn ? element : <Navigate to="/login" />;
    }
};

export default PrivateRoute