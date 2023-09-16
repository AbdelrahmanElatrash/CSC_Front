import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Adduser(props) {
    const addeUser = async (e) => {
        e.preventDefault();
        console.log(e.target);
        const obj = {
          username: e.target.elements.username.value,
          email: e.target.elements.email.value,
          password:e.target.elements.password.value,
          confirmPassword:e.target.elements.confirmPassword.value,
          

        };
      
        const server_url = `http://localhost:3001/register/`;
        
        try {
          const response = await fetch(server_url, {
            method: 'POST',
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
      
          
          props.closeAddModal();
         
          console.log(obj);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
      
  
    return (
      <Modal show={props.addFlag} onHide={props.closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addeUser}>
          <Form.Group className="mb-3">
  <Form.Label>Username</Form.Label>
  <Form.Control type="text" name="username" />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Email</Form.Label>
  <Form.Control type="email" name="email" />
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" name="password" />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>confirmPassword</Form.Label>
  <Form.Control type="Password" name="confirmPassword" />
  <Form.Text className="text-muted">

  </Form.Text>
</Form.Group>




            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  
  export default Adduser;
