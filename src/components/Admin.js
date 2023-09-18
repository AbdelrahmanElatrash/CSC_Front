import React, { useEffect, useState } from 'react';
import Adminmodal from './Adminmodal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import UpdateModal from './UpdateModal';
import Delete from './Delete';
import Adduser from './Adduser';
import AssignSubject from './AssignSubject';
import Addsubject from './Addsubject'


const UserList = () => {

    const [users, setUsers] = useState([]);
    const [showFlag,setShowFlag] = useState(false);
    const [clickedUser, setClickedUser] = useState({});
    const [updateFlag,setUpdateFlag] = useState(false);
    const [deleteConfirmationFlag, setDeleteConfirmationFlag] = useState(false);
    const [addFlag, setAddFlag] = useState(false);
    const [newArr, setNewArr] =useState([]);
    const [subjectFlag, setsubjectFlag] = useState(false);
    const [showaddsubjectFlag,setshowaddsubjectFlag] = useState(false);


const handleShow = (item) =>{
    console.log(item);
    setClickedUser(item);
    setShowFlag(true);
}


const handleclose = () =>{
    setShowFlag(false);
}
const handleAddsubjectclose = () =>{
  setshowaddsubjectFlag(false);
}
const showUpdateModal= (item) =>{
    setUpdateFlag(true);
    setClickedUser(item);
    console.log(item);
}

const closeUpdateModal = () =>{
    setUpdateFlag(false);
    
}
const showAddModal= (item) =>{
    setAddFlag(true);
}

const closeAddModal = () =>{
    setAddFlag(false);
    
}

const showAddSubjectModal= (item) =>{
  setshowaddsubjectFlag(true);
}

const showSubjectModal= (item) =>{
  setsubjectFlag(true);
}

const closeSubjectModal = () =>{
  setsubjectFlag(false);
  
}
// Function to show the delete confirmation modal
const showDeleteConfirmation = (item) => {
    setDeleteConfirmationFlag(true);
    setClickedUser(item);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmation = () => {
    setDeleteConfirmationFlag(false);
  };

  
const takeNewArrFromChild = (arr) => {
    // console.log("parent Comp",arr);
    // props.takeNewArr(arr);
    setNewArr(arr);
}


  useEffect(() => {
    // Fetch user data from the backend API
    fetch('http://localhost:3001/getdata')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  
  




  return (
    <div>

      <div className=''>
      
              <Button variant="primary" onClick={() =>{showAddModal()}}>Add</Button>
              <Button variant="primary" onClick={() =>{showSubjectModal()}}>Subject</Button>
              <Button variant="primary" onClick={() =>{showAddSubjectModal()}}>Add Subject</Button> 
      </div>

      <div>
          <table>
            <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>role</th>
                  <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                  <Button variant="success" onClick={() =>{showUpdateModal(item)}}>Edit</Button>
                  <Button variant="danger" onClick={() =>showDeleteConfirmation(item)} >Delete</Button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      
      
      <Adminmodal showFlag={showFlag} handleclose={handleclose} userData={clickedUser}/>
      <UpdateModal  updateFlag={updateFlag} closeUpdateModal={closeUpdateModal} item={clickedUser}  takeNewArrFromChild={takeNewArrFromChild} />
      <Delete
        deleteConfirmationFlag={deleteConfirmationFlag}
        closeDeleteConfirmation={closeDeleteConfirmation}
        userIdToDelete={clickedUser}/>
        < Adduser addFlag={addFlag} closeAddModal={closeAddModal } />
        <AssignSubject subjectFlag={subjectFlag} closeSubjectModal={closeSubjectModal} />
        <Addsubject showaddsubjectFlag={showaddsubjectFlag} handleAddsubjectclose={handleAddsubjectclose} />
    
     
      
      
    </div>
  );
};

export default UserList;
