import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Main from "../layout/main";
import '../dashboard/dashboard.css'
function UnauthorizedPage(){
    const navigate = useNavigate();
    const [count , setCount] = useState(5);

    useEffect(()=>{
       const timer = setInterval(()=>{
            setCount(prev => prev - 1);
        },1000)
         return () => clearInterval(timer);
    },[])


    useEffect(() => {
        setTimeout(() => {
        navigate("/portal/dashboard");
            }, 5000);


    },[navigate])


    return(
        <>
        <Main className="unauthorized-content">
            <h1>401 Unauthorized</h1>
            <p >
            You are not permitted to view this page
         </p>
         <p>Redirecting in ... {count}</p>
        </Main>
         
        </>
    )



}
export default UnauthorizedPage;