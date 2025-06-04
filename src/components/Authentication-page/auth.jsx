export default function getRole(){

    return localStorage.getItem("role");
}

export function isAuthenticated(){

    return !!localStorage.getItem("authToken");
}

 isAuthenticated;

