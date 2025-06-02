import { useEffect, useState} from "react";
import api from "../api/axios-instance";

function GetUsers(){

    const [allUsers , setAllUsers] = useState([]);
        const [supervisors , setSupervisors] =useState([]);
        const [engineers , setEngineers] =useState([]);

        async function getUsers() {
        const response = await api.get("api/users");
        setAllUsers(response.data.accounts);
        const FilterSupervisors = response.data.accounts.filter(user => user.role === "supervisor");
        const FilterEngineers = response.data.accounts.filter(user => user.role === "engineer");
        console.log(response.data.accounts);

        setSupervisors(FilterSupervisors);
        setEngineers(FilterEngineers);
        
        console.log(allUsers);
        console.log(supervisors);
        console.log(engineers);
    }

        useEffect(()=>{
            getUsers();
            console.log("useEffect get users called");
            },[]);

}

export default GetUsers;
