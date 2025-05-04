import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateChapterModal = ({ courseId,onUpdate  }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const sendNotification=()=>{
    const message = `Un nouveau chapitre a été ajouté ! Veuillez consulter vos cours si vous souhaitez y participer.`;
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newChapter = {
        ...formData,
        courseId, 
      };
     axios.post("http://localhost:8080/chapters/createChapter/", newChapter)
     .then(response=>{
        console.log(response)
        sendNotification()
        onUpdate()
     })
     .catch(error=>{
      console.log(error)
     })
     
      setFormData({ title: '', description: '', image: '' });
      setShow(false);
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };

  return (
    <>
      <Button className="mb-3" onClick={() => setShow(true)}>
        Ajouter un nouveau chapitre
      </Button>

      {show && <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Chapter</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="chapterTitle">
              <Form.Label>Chapter Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="chapterDescription">
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
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Chapter
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>}
    </>
  );
};

export default CreateChapterModal;
