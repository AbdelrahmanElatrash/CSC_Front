// StudentList.js
import React, { useEffect, useState } from 'react';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/students'; 
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
       
        setStudents(data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);
  return (
    <div>
      <h2>List of Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.user_id}>{student.user_id}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
