import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AssignSubject(props) {
  const [studentId, setStudentId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
   
    fetch('http://localhost:3001/getdata') 
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });

    fetch('http://localhost:3001/subjects') // Replace with your API endpoint for fetching subjects
      .then((response) => response.json())
      .then((data) => {
        // Update the 'subjects' state with the fetched data
        setSubjects(data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  const handleAssign = () => {
    // Send a POST request to the backend API to assign the subject to the student
    // Use the 'studentId' and 'subjectId' state values
    // Handle success or failure
    const apiUrl = 'http://localhost:3001/assign-subject';
    const data = {
      studentId: studentId,
      subjectId: subjectId,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        // Handle success
        console.log('Assignment successful:', responseData);
        // You can update your component state or show a success message here
      });
  };

  return (
    <Modal show={props.subjectFlag} onHide={props.closeSubjectModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
      <div>
        <label htmlFor="student">Select Student: </label>
        <select id="student" onChange={(e) => setStudentId(e.target.value)}>
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.id}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="subject">Select Subject: </label>
        <select id="subject" onChange={(e) => setSubjectId(e.target.value)}>
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.subject_id}>
              {subject.subject_name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssign}>Assign</button>
   
    </Modal.Body>
    </Modal>

  );
}

export default AssignSubject;
