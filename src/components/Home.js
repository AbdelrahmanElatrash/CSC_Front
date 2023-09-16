import React, { useEffect, useState } from 'react';

function Home() {
  const [userData, setUserData] = useState(null);
  const [subjectsData, setSubjectsData] = useState([]);
  
  useEffect(() => {
    // Fetch user data from local storage
    
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    } else {
      // Handle the case where user data is not found in local storage
      setUserData(null);
    }
  }, []);

  // Retrieve the userId from local storage
  const userId = userData ? userData.user_id : null;

  useEffect(() => {
    if (userId) {
      console.log(userId)
      // Use the retrieved userId to make a request to your API
      fetch(`http://localhost:3001/sau?user_id=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setSubjectsData(data);
        })
        .catch((error) => {
          console.error('Error fetching subjects data:', error);
        });
    }
  }, [userId])

  useEffect(() => {
    console.log("data", subjectsData);
  }, [subjectsData]);

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
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData.username}</td>
                <td>{userData.email}</td>
                <td>{userData.password}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mt-5 mb-3">Enrolled Subjects</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Pass Mark</th>
            <th>Mark Obtained</th>
          </tr>
        </thead>
        <tbody>
          {subjectsData.map((subjectData, index) => (
            <tr key={index}>
              <td>{subjectData.subject_name}</td>
              <td>{subjectData.new_pass_mark}</td>
              <td>{subjectData.student_mark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
