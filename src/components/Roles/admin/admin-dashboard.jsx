import { useState , useEffect } from "react";
import '../../dashboard/dashboard.css'
import api from "../../api/axios-instance"
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import PropertyTable from "../property-table";
import TaskTable from "../task-table";
import ReportsTable from '../reports-table';
import { Link } from 'react-router-dom'

function UserTable(){
 const [allUsers , setAllUsers] = useState([]);
        const [supervisors , setSupervisors] =useState([]);
        const [engineers , setEngineers] =useState([]);
        const [activeUserId , setActiveUserId] = useState(null);
        const [userToDelete, setUserToDelete] = useState(null);
        const [showPopUpId, setShowPopUpId] = useState(null);
        const [showDeletePrompt, setShowDeletePrompt] = useState(null);
        const [showMoreInfoUser, setShowMoreInfoUser] = useState(null);
        const [searchedUser, setSearchedUser] = useState();
        const [searchResults, setSearchResults] = useState();
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

        function GetSearchedUser(){

          console.log(searchedUser);
          setSearchResults(allUsers.filter(user => user.fullName.toLowerCase().includes(searchedUser.toLowerCase())));
        }

 console.log(searchResults);
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
            console.log(userDeleteEmail);
            console.log('active user id is', activeUserId)
            try{
                const res = await api.delete('api/users',  {data: userDeleteEmail});
                console.log(res.data);
                toast.success(res.data.message || 'Deleted Successfully');
            }
            catch(error){
                console.log(error);
                toast.error(error?.response.data.message);
            }
            finally{
                await getUsers();
                setActiveUserId(null);
                setShowDeletePrompt(false);
            }
        }

    function HandleMoreInfoOnClick(user){
        console.log(user);
        setShowMoreInfoUser(user);
    }

    return(
        <>
        <div className='search-bar-div'>
          <button onClick={GetSearchedUser} className='search-button'>
            <FontAwesomeIcon icon ={faMagnifyingGlass} className ='search-button-icon' />
          </button>
          <input type="text"
          placeholder="Enter user name here"
          value={searchedUser}
          onChange={ (e) =>
            {setSearchedUser(e.target.value); {GetSearchedUser} }
          } />
          <button className='clear-button' onClick={() => {setSearchedUser(''); setSearchResults('')}}>X</button>
        </div>
        {Array.isArray(searchResults) && (
          <div className="search-dropdown">
             { searchResults.map(result => (
            <span key={result._id}>
              <Link to ='#${result._id}'>{result.fullName}</Link>
            </span>

            ))}
          </div>
        )}
        <div>

        <h1>All Users : {totalUsers}</h1>
        <table>
            <tr>
                <th>Role</th>
                <th>FullName</th>
                <th>Email Address</th>
            </tr>
             { Array.isArray(allUsers) &&
       allUsers.map((user)=>(
        <tr key={user._id} id={user._id}>
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
                                      <button
                                        className="delete"
                                        onClick={() => {
                                          setShowDeletePrompt(true);
                                          setShowPopUpId(null);
                                          setUserToDelete(user.fullName);
                                          setActiveUserId(user._id);
                                        }}>
                                        delete user
                                      </button>
                                      <button onClick={()=> HandleMoreInfoOnClick(user)}>
                                        More Info
                                      </button>
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

              <button onClick={()=> setShowDeletePrompt(false)}
                className='close-pop-up-button'>X</button>
            <div>
              <span>Are you sure you want to delete {userToDelete}'s account?</span>
          <button
            onClick={HandleDeleteUser}
            className="confirm-delete-button"
          >
            Confirm Delete
          </button>

            </div>

        </div>
        </div>

      )}
    {showMoreInfoUser && (
        <div className='form-overlay'>
           <div className="confirm-delete">
            <button onClick={()=> setShowMoreInfoUser(null)}
              className='close-pop-up-button'>X</button>
            
            <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
          <li><span className='show-more-title'>Full Name:</span>  {showMoreInfoUser.fullName}</li>
          <li><span className='show-more-title'>Email address:</span> {showMoreInfoUser.email}</li>
          <li><span className='show-more-title'>Phone number:</span> {showMoreInfoUser.phoneNumber}</li>
          <li><span className='show-more-title'>Role:</span> {showMoreInfoUser.role}</li>
          <li><span className='show-more-title'>Date joined:</span> {showMoreInfoUser.createdAt.split("T")[0]}</li>
        </ul>

            
        </div>
        </div>

      )}
        </>
    )

}


function AdminDashboard(){
    return(
      <>
      <div className="dashboard-layout">
          <UserTable />
          <PropertyTable />
          <ReportsTable />
          <TaskTable />


      </div>
      </>
    )
}

export default AdminDashboard;