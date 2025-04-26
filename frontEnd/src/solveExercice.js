import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function SolveExercice() {
  const user = JSON.parse(localStorage.getItem("user"));
  const exerciceId = useParams().id;
  const [exercice, setExercice] = useState({});
  const [assignment, setAssignment] = useState({
    exerciceId: "",
    accomplishDate: new Date(),
    userId: user._id,
    note: 0,
    response: ""
  });
  const navigate=useNavigate()
  const loadExercice = () => {
    axios.get(`http://localhost:8080/exercises/getExericeById/${exerciceId}`)
      .then(response => {
        const exer = response.data;
        setExercice(exer);
        // Met à jour exerciceId dans l'assignement une fois que l'exercice est chargé
        setAssignment(prev => ({ ...prev, exerciceId: exer._id }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:8080/assignment/addAssignment/", assignment)
      .then(response => {
        console.log("Assignment envoyé :", response.data);
        navigate("/lesson/viewLessonExercices/"+exercice.lessonId)
      })
      .catch(error => {
        console.log("Erreur :", error);
      });
  };

  useEffect(() => {
    loadExercice();
  }, []);

  return (
    <>
      <Navbar color="var(--mainColor)" />
      <div className="text-center mt-5">
        <h6 className="d-inline-block bg-white text-dark fw-semibold border-bottom border-3 px-3 py-1 shadow-sm rounded" style={{ borderColor: "var(--mainColor)" }}>
          Exercices
        </h6>
        <h3 className="mt-3 mb-4 specialText fw-bold">
          {exercice.title}
        </h3>
      </div>

      <div className="container bg-light p-5 rounded shadow-sm">
        <h4 className="text-center specialText mb-4">
          <span className="specialText">Tâches à faire</span>
        </h4>
        <p className="text-center h5 text-muted">
          {exercice.description}
        </p>
      </div>

      <div className="container mt-4">
        <h5 className="text-center specialText fw-semibold mb-3">
          Réponse de l'étudiant
        </h5>
        <form>
          <div className="mb-3">
            <label htmlFor="studentResponse" className="form-label fw-medium">Votre réponse :</label>
            <textarea
              className="form-control shadow-sm"
              id="studentResponse"
              rows="6"
              value={assignment.response}
              onChange={(e) => setAssignment({ ...assignment, response: e.target.value })}
              placeholder="Écrivez votre réponse ici...">
            </textarea>
          </div>
          <div className="text-center">
            <button type="button" onClick={handleSubmit} className="btn btn-success px-4 mb-2">
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
