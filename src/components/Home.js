import React, { useEffect, useState } from 'react';
import UserSubject from './UserSubject';
import UserList from './Admin';


function Home() {
  const [userData, setUserData] = useState({});
  const [loading,setLoading]=useState(true)
  


  useEffect(()=>{
    const getUserData=localStorage.getItem('userData');
    const parsedUserData = JSON.parse(getUserData);
    setUserData(parsedUserData)
    setLoading(false)
    console.log(parsedUserData);

  },[])


  if (!loading & userData.is_active===false & userData===null){
     window.location.href = 'http://localhost:3000';
  }
  //  if user is student ---------------------------------------
  if (userData.role==='student'){
    return (
      <div className="container mt-5">
      <h1 className="mb-4">Welcome to the Student Page</h1>
      {userData && (
        <div>
          <h2 className="mb-3">User Data</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.username}</td>
                <td>{userData.email}</td>
                
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <UserSubject user_id={userData.id}/>
    </div>
    )
  }

  //  if user is adminstration ---------------------------------------
  if (userData.role==='adminstration'){
    return (
      <div>
        <UserList/>
      </div>
    )
  }
  
}

export default Home;
