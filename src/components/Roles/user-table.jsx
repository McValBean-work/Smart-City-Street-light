import { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from '../api/axios-instance';
import '../dashboard/dashboard.css';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';



    

export function UserSearchBar(){

  const [searchedUser, setSearchedUser] = useState();
   const [searchResults, setSearchResults] = useState();
  

  function GetSearchedUser(){

          console.log(searchedUser);
          setSearchResults(allUsers.filter(user => user.fullName.toLowerCase().includes(searchedUser.toLowerCase())));
        }

        console.log(searchResults);

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
             <span>
             <a href={`#${result._id}`}>{result.fullName}</a>

             
            </span>

            ))}
          </div>
        )}
    </>
  )
}

  function UserTable(){
        const [allUsers , setAllUsers] = useState([]);
        const [filteredUsers ,setFilteredUsers] = useState([]);
        const location = useLocation();
        const onDashboard = location.pathname === "/portal/dashboard"; // or whatever your dashboard path is
        const usersToDisplay = onDashboard ? allUsers.slice(-5) : filteredUsers;
        const [activeUserId , setActiveUserId] = useState(null);
        const [userToDelete, setUserToDelete] = useState(null);
        const [showPopUpId, setShowPopUpId] = useState(null);
        const [showDeletePrompt, setShowDeletePrompt] = useState(null);
        const [showMoreInfoUser, setShowMoreInfoUser] = useState(null);
        const [filterText, setFilterText] = useState('');
        
        
       console.log(filteredUsers)
        
        const [userDeleteEmail, setUserDeleteEmail] = useState({
            email:null
        });
        

        async function getUsers() {
                const response = await api.get("api/users");
                setAllUsers(response.data.accounts);
                setFilteredUsers(response.data.accounts);

                console.log("this is all users set use state", allUsers);
            }
                useEffect(()=>{
                    getUsers();
                    console.log("useEffect get users called");
                    },[]);
                    
  useEffect(() => {
  if (filterText && ['admin', 'supervisor', 'engineer'].includes(filterText)) {
    setFilteredUsers(allUsers.filter(user => user.role === filterText));
  } else {
    setFilteredUsers(allUsers);
  }
}, [filterText, allUsers]);





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
       
        <div className="table-div">

        <h1>{onDashboard ? `Latest Users`
        : (
        <>
        <select name='filterText'
        value={filterText}
        onChange={(e)=> setFilterText(e.target.value)}
        className="filter-select">
          <option value="all_users">All Users</option>
          <option value="admin">Admins</option>
          <option value="supervisor">Supervisors</option>
          <option value="engineer">Engineers</option>
        </select>
        </>)}</h1>
        <table>
            <tr>
                <th>Role</th>
                <th>FullName</th>
                <th>Email Address</th>
            </tr>
             {Array.isArray(usersToDisplay) &&
       usersToDisplay.map((user)=>(
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
        {allUsers.length > 5 && onDashboard && (
        
          
        <>
        <Link to='/portal/user-management' className="view-more-link"> View more <FontAwesomeIcon icon={faArrowRight} /></Link>
        </>
      
          
          )}
          {!onDashboard && (
          <>
          {filteredUsers.length} out of {allUsers.length}
          </>
        )}
        
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

export default UserTable;