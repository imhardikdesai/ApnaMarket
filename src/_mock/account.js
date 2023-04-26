import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Account = () => {
  const { userDetails } = useContext(AuthContext)
  const account = {
    displayName: userDetails ? userDetails.displayName : 'loading...',
    email: userDetails ? userDetails.email : 'loading...',
    photoURL: userDetails ? userDetails.photoURL : '/assets/images/avatars/avatar_default.jpg',
  };

  return (account)
}



export default Account;
