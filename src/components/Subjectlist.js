// SubjectList.js
import React, { useEffect, useState } from 'react';

function SubjectList() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/subjects'; // Replace with your actual API URL

    // Fetch the list of subjects from the backend API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the 'subjects' state with the fetched data
        setSubjects(data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);
  return (
    <div>
      <h2>List of Subjects</h2>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>{subject.subject_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;
