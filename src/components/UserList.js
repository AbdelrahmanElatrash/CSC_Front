import React, { useEffect, useState } from 'react';
import Adminmodal from './Adminmodal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showFlag, setShowFlag] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleshow = (user) => {
    setSelectedUser(user); // Set the selected user for editing
    setShowFlag(true);
  };

  const handleclose = () => {
    setShowFlag(false);
  };

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('http://localhost:3001/getdata')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleshow(user)}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <Adminmodal
          showFlag={showFlag}
          handleclose={handleclose}
          selectedUser={selectedUser} // Pass the selected user data to the modal
        />
      )}
    </div>
  );
};

export default UserList;
