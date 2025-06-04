import { Navigate } from "react-router-dom";
import  getRole  from "../Authentication-page/auth";
import { isAuthenticated } from "../Authentication-page/auth";

function ProtectedRoute ({allowedUsers = [] , children}){
    const role = getRole();
    const authenticated = isAuthenticated();

    if(!authenticated){
        return <Navigate to="/login" replace />
    }
   else if(!allowedUsers.includes(role)){
        return <Navigate to="/unauthorized" replace />
    }
    else{
        return children
    }
}

export default ProtectedRoute;