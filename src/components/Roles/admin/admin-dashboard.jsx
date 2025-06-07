import TopSection from "../../dashboard/top-section";
import { useState , useEffect } from "react";
import '../../dashboard/dashboard.css'
import SideBar from "../../layout/sidebar";
import Main from "../../layout/main"
import api from "../../api/axios-instance"
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'

function AdminDashboardBody(){
 const [allUsers , setAllUsers] = useState([]);
        const [supervisors , setSupervisors] =useState([]);
        const [engineers , setEngineers] =useState([]);
        const [activeUserId , setActiveUserId] = useState(null);
        const [showPopUpId, setShowPopUpId] = useState(null);
        const [showDeletePrompt, setShowDeletePrompt] = useState(null);
        const [userDeleteEmail, setUserDeleteEmail] = useState({
            email:null
        });
        const totalUsers = allUsers.length;



                async function getUsers() {
                const response = await api.get("api/users");
                setAllUsers(response.data.accounts);
                const FilterSupervisors = response.data.accounts.filter(user => user.role === "supervisor");
                const FilterEngineers = response.data.accounts.filter(user => user.role === "engineer");
                console.log(response.data.accounts);

                setSupervisors(FilterSupervisors);
                setEngineers(FilterEngineers);

                console.log("this is all users set use state", allUsers);
                console.log("this is the supervisors set use state", supervisors);
                console.log("this is the engineers set use state", engineers);
            }

                useEffect(()=>{
                    getUsers();
                    console.log("useEffect get users called");
                    },[]);

        function HandleUserOnClick(userEmail, userId){
            console.log(userId);
            console.log(userEmail);

            setUserDeleteEmail(
                { email: userEmail}
            );
            setActiveUserId(userId);
            setShowPopUpId(prev => (prev === userId ? null : userId));
        }

        async function HandleDeleteUser(){
            console.log(userDeleteEmail)
            try{
                const res = await api.delete('api/users',  {data: userDeleteEmail} );
                console.log(res.data)
                toast(res.data);
            }
            catch(error){
                console.log(error);
                toast.error(error);
            }
        }

    return(
        <>
        <div className="dashboard-layout">
        <div className="supervisor-list">
        <h1>All Users : {totalUsers}</h1>
        <table>
            <tr>
                <th>Role</th>
                <th>FullName</th>
                <th>Email Address</th>
            </tr>
             { Array.isArray(allUsers) &&
       allUsers.map((user)=>(
        <tr key={user._id}>
            <td>{user.role}</td>
            <td>{user.fullName}</td>
            <td>
                <span>
                    {user.email}
                <button
                className='more-options'
                onClick={() =>HandleUserOnClick(user.email , user._id)}>:</button>
                {showPopUpId === user._id && (
                                    <div className='pop-up-div'>
                                      <span
                                        className="delete"
                                        onClick={() => {
                                          setShowDeletePrompt(true);
                                          setShowPopUpId(null);
                                          setActiveUserId(user._id);
                                        }}>
                                        delete user
                                      </span>
                                      <span>
                                        <Link to='/portal/user/info'>
                                        More Info
                                        </Link>
                                      </span>
                                    </div>
                                  )}
                </span>
            </td>
        </tr>
        ))
       }
        </table>
        </div>
        {showDeletePrompt && (
        <div className='form-overlay'>
           <div className="confirm-delete">
            <div>
              <button onClick={()=> setShowDeletePrompt(false)}>x</button>
            </div>
          <span>Are you sure you want to delete this User?</span>
          <button
            onClick={HandleDeleteUser}
            className="confirm-delete-button"
          >
            Confirm Delete
          </button>
        </div>
        </div>

      )}
        <div className="engineer-list">
            <h1>this is the engineer list div</h1>
        </div>
    </div>
        </>
    )

}


function AdminDashboard(){
    return(
        <div className="dashboard">
        <TopSection />
        <div className="dashboard-body">

                <SideBar />
                <Main className='client-main'>
                    <AdminDashboardBody />
                </Main>
        </div>
        </div>
    )
}

export default AdminDashboard;