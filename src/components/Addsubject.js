import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Addsubject(props) {
   const addeSubject = async (e) => {
  e.preventDefault();

  const obj = {
    subject_name: e.target.elements.subject_name.value,
    new_pass_mark: e.target.elements.new_pass_mark.value,
  };

  const server_url = `http://localhost:3001/addsubjecto/`;

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

    props.handleAddsubjectclose();

    console.log(obj);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

    return (
      <Modal show={props.showaddsubjectFlag} onHide={props.handleAddsubjectclose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addeSubject}>
          <Form.Group className="mb-3">
  <Form.Label>subject_name</Form.Label>
  <Form.Control type="text" name="subject_name" />
  <Form.Text className="text-muted">
    
  </Form.Text>
</Form.Group>

<Form.Group className="mb-3">
  <Form.Label>pass_mark</Form.Label>
  <Form.Control type="number" name="new_pass_mark" />
</Form.Group>






            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  
  export default Addsubject;
