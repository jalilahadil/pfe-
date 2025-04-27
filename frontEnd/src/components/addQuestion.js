import React, { useState } from 'react';
import Navbar from './navbar';
import { useParams } from 'react-router';
import axios from 'axios';

const AddQuestionModal = (props) => {
  const quizId = props.quizId;
  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 0,
    quizId: quizId
  });
  const [display, setDisplay] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Question Submitted:', formData);
    axios.post("http://localhost:8080/questions/postNewQuestion/",formData)
    .then((response)=>{
      console.log(response.data)
      props.onAddQuestion()
    })
    .catch((error)=>{
      console.log(error)
    })
    // Clear the form data and hide the modal after submission
    setFormData({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 0,
      quizId: quizId
    });
    setDisplay(false); // Close the modal after submission
  };

  return (
    <section>
      <div className="container-fluid d-flex justify-content-center p-2">
        <button className="btn btn-primary" onClick={() => setDisplay(true)}>
          Ajouter une nouvelle question
        </button>
      </div>

      {display && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }} // Ensure the modal overlays the content
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            style={{
              maxWidth: '500px',
              width: '100%',
              overflowY: 'auto', // Ensure content is scrollable if too long
              zIndex: 1060, // Ensure modal content is above the backdrop
            }}
          >
            <h2 className="h4 mb-4">Ajouter une nouvelle question</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Texte de la question</label>
                <input
                  type="text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Options</label>
                {formData.options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="form-control mb-2"
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                ))}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Réponse correcte</label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={formData.correctAnswer}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Points</label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="d-flex justify-content-end pt-3">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => setDisplay(false)} // Close modal on cancel
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddQuestionModal;
