import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateExerciceModal = ({ lessonId,onUpdate  }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    score: 0,
    lessonId:lessonId
  });
  const sendNotification=()=>{
    const message = `Un nouvel exercice été ajouté ! Veuillez consulter vos cours si vous souhaitez y participer. `;
    const date=new Date().toISOString()
    const title ="Alerte !  "
    const waring={
      notificationDate:date,
      notificationTitle:title,
      notificationDescription:message,
      notificationReceiver:"All",
    }
    console.log(waring)
    axios.post("http://localhost:8080/notifications/postNotifications/",waring)
    .then((response)=>{
      console.log(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
  };
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
     axios.post("http://localhost:8080/exercises/createOne/", newExercice)
     .then(response=>{
        console.log(response)
        sendNotification()
        onUpdate()
     })
     .catch(error=>{
      console.log(error)
     })
     
      setFormData({ title: '', description: '', score: 0,lessonId:lessonId });
      setShow(false);
    } catch (error) {
      console.error('Error creating Exercice:', error);
    }
  };

  return (
    <>
      <Button className="mb-3" onClick={() => setShow(true)}>
        Ajouter un nouveau Exercice
      </Button>

      {show && <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Exercice</Modal.Title>
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

export default CreateExerciceModal;
