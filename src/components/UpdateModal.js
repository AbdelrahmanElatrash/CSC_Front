import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

function UpdateModal(props) {
  const [formData, setFormData] = useState({});

    const updateUser = async (e) => {
        e.preventDefault();
        console.log(e.target);
        const obj = {
          username: e.target.elements.username.value,
          email: e.target.elements.email.value,
          is_active: e.target.elements.is_active.value,
        };
        
        
        
      
        const server_url = `http://localhost:3001/updateuser/${props.item.id}`;
        console.log(props.item.id);
      
        try {
          const response = await fetch(server_url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data);
      
          // Close the update modal
          props.closeUpdateModal();
          // Update the old user
          props.takeNewArrFromChild(data);
      
          console.log(obj);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
      const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
  
    return (
      <Modal show={props.updateFlag} onHide={props.closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" defaultValue={props.item.username} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" defaultValue={props.item.email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <Form.Check  
    type="checkbox"
    label="Is active"
    name="is_active"
    checked={props.item.is_active}
    onChange={handleInputChange}
  />
</Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  
  export default UpdateModal;
