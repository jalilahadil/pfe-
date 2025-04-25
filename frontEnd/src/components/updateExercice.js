import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';

const UpdateExerciceModal = ({ lessonId,exercice,onUpdate,isShow  }) => {
  const [show, setShow] = useState(isShow);
  const [formData, setFormData] = useState({
    title: exercice.title,
    description: exercice.description,
    score: exercice.score,
    lessonId:exercice.lessonId
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newExercice =formData;
     axios.put("http://localhost:8080/exercises/updateOne/"+exercice._id, newExercice)
     .then(response=>{
        console.log(response)
        onUpdate()
     })
     .catch(error=>{
      console.log(error)
     })
      setShow(false);
    } catch (error) {
      console.error('Error creating Exercice:', error);
    }
  };

  return (
    <>

      <Button className=" btn btn-warning " onClick={() => setShow(true)}>
       <MdEdit></MdEdit> Modifier 
      </Button>

      {show && <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update  Exercice</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="ExerciceTitle">
              <Form.Label>Exercice Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ExerciceDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ExercicePoints">
              <Form.Label>Exercice Points</Form.Label>
              <Form.Control
                type="number"
                name="score"
                value={formData.score}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Exercice
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>}
    </>
  );
};

export default UpdateExerciceModal;
