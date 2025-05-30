import { useEffect, useState} from "react";
import api from "../api/axios-instance";

function GetUsers(){

    const [allUsers , setAllUsers] = useState([]);
        const [supervisors , setSupervisors] =useState([]);
        const [engineers , setEngineers] =useState([]);

        async function getUsers() {
        const response = await api.get("api/users");
        setAllUsers(response.data.accounts);
        console.log(response.data.accounts);

        setSupervisors(allUsers.filter((user) => (user.role === "supervisor")))
        console.log(supervisors);
        setEngineers(allUsers.filter((user) => (user.role === "engineer")))
        console.log(engineers);
    }

        useEffect(()=>{
            getUsers();
            console.log("useEffect get users called");
            },[]);

}

export default GetUsers;
