import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdateChapterModal = ({ show, onClose, chapterId, onUpdate, chapterTitle, chapterDescription, courseId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: ''
  });

  useEffect(() => {
    setFormData({
      title: chapterTitle || '',
      description: chapterDescription || '',
      courseId: courseId || ''
    });
  }, [chapterTitle, chapterDescription, courseId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const updateChapter = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/chapters/updateOne/${chapterId}`, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating chapter:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Chapter</Modal.Title>
      </Modal.Header>
      <Form >
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
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={updateChapter}>
            Update Chapter
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateChapterModal;
