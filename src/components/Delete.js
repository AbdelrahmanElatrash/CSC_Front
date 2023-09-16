import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Delete(props) {
    const deleteUser = async (e) => {
        e.preventDefault();
        console.log(e.target);

        const server_url = `http://localhost:3001/delete/${props.userIdToDelete.id}`;
        console.log(props.userIdToDelete.id);
      
        try {
            const response = await fetch(server_url, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              throw new Error(`Failed to delete user (HTTP ${response.status})`);
            }
          const data = await response.json();
          console.log(data);
      
          // Close the update modal
          props.closeDeleteConfirmation();
          // Update the old user
        //   props.takeNewArrFromChild(data);
      
        
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
      
  
    return (
      <Modal show={props.deleteConfirmationFlag} onHide={props.closeDeleteConfirmation}>
        
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to Delete this user?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={deleteUser}>Confirm</Button>
          <Button variant="primary" onClick={props.closeDeleteConfirmation}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default Delete;
    ;
