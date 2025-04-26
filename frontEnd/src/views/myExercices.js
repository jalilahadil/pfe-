import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';

export default function MyExercices() {
  const [selectedAssignment, setSelectedAssignment] = useState(null); 
  const [selectedAssignmentAT, setSelectedAssignmentAT] = useState(null); 
  const [updatedAssignment, setUpdatedAssignment] = useState(null);  
  const [updatedAssignmentAT, setUpdatedAssignmentAT] = useState(null);  
  const [responses, setResponses] = useState([]);
  const [responsesAT, setResponsesAT] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
const loadResponses = () => {
  axios.get(`http://localhost:8080/assignment/getAssignmentByUserId/${user._id}`)
    .then((response) => {
      console.log(response.data);
      setResponses(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };
const handleCloseModal = () => {
  setSelectedAssignment(null);
  setUpdatedAssignment(null);
};
const changeFormDate = (field, value) => {
  setUpdatedAssignment((prev) => ({ ...prev, [field]: value }));
}; 
const changeFormDateAt = (field, value) => {
  setUpdatedAssignmentAT((prev) => ({ ...prev, [field]: value }));
}; 
const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const data={  
    "_id":updatedAssignment._id,
    "exerciceId":updatedAssignment.exerciceId,
    "accomplishDate":(Date.now()).toString(),
    "userId":updatedAssignment.userId,
    "note":updatedAssignment.note,
    "response":updatedAssignment.response,
    }
    axios.put(`http://localhost:8080/assignment/updateAssignment/${updatedAssignment._id}`,updatedAssignment)
    .then((res) => {
      console.log('Mise à jour réussie', res.data);
      loadResponses(); 
      handleCloseModal();
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour', error);
    });
};
const handleUpdateSubmitAT = (e) => {
  e.preventDefault();
  const data={  
  "_id":updatedAssignmentAT._id,
  "exerciceId":updatedAssignmentAT.exerciceId,
  "accomplishDate":(Date.now()).toString(),
  "userId":updatedAssignmentAT.userId,
  "note":updatedAssignmentAT.note,
  "response":updatedAssignmentAT.response,
  }
  axios.put(`http://localhost:8080/assignment/updateAssignment/${updatedAssignmentAT._id}`,updatedAssignment)
  .then((res) => {
    console.log('Mise à jour réussie', res.data);
    loadResponses(); 
    handleCloseModal();
  })
  .catch((error) => {
    console.error('Erreur lors de la mise à jour', error);
  });
};
  const handleOpenEditModal = () => {
    if (selectedAssignment) {
      setUpdatedAssignment({ ...selectedAssignment, response: selectedAssignment.response || '' });
    }
  };
  

  const deleteAssignment = (id) => {
    axios.delete(`http://localhost:8080/assignment/deleteAssignment/${id}`)
      .then((res) => {
        console.log('Assignment supprimé', res.data);
        loadResponses(); // refresh table
      })
      .catch((error) => {
        console.error('Erreur de suppression', error);
      });
  };

  useEffect(() => {
    if (user && user._id) {
      loadResponses();
    }
  }, [user._id]);

  return (
    <>
      <Navbar color="var(--mainColor)" />
      <section className="asTeacherSection">
        <h4 className='text-center p-3'>My Exercices As Student</h4>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Note</th>
              <th>Date Soumission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>Exercice {index + 1}</td>
                <td>{response.note}</td>
                <td>{new Date(response.accomplishDate).toLocaleString()}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteAssignment(response._id)}>
                    Delete
                  </button>
                  <button className="btn btn-warning mx-1" onClick={() => setUpdatedAssignment(response)}>
                    Update
                  </button>
                  <button className="btn btn-primary mx-1" onClick={() => setSelectedAssignment(response)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    
        {selectedAssignment && (
          <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Détails de l'Assignment</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Exercice :</strong> {selectedAssignment.exercice?.title}</p>
                  <p><strong>Description :</strong> {selectedAssignment.exercice?.description}</p>
                  <p><strong>Note :</strong> {selectedAssignment.note}</p>
                  <p><strong>Réponse :</strong> {selectedAssignment.response}</p>
                  <p><strong>Date :</strong> {new Date(selectedAssignment.accomplishDate).toLocaleString()}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


     
        {updatedAssignment && (
          <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier Assignment</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdateSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold specialText">Thème</label>
                      <p>{updatedAssignment.exercice.title}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold specialText">Question</label>
                      <p>{updatedAssignment.exercice.description}</p>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Votre Réponse</label>
                      <textarea 
                      rows={4}
                      className="form-control"
                      value={updatedAssignment?.response || ''}  // Make sure the value is tied to state
                      onChange={(e) => changeFormDate("response", e.target.value)}
                    
                    />

                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">
                        Enregistrer
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>

      <section className="asStudentSection">
        <h4 className='text-center p-3'>My Exercices As Teacher</h4>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Note</th>
              <th>Date Soumission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((responseAT, index) => (
              <tr key={index}>
                <td>Exercice {index + 1}</td>
                <td>{responseAT.note}</td>
                <td>{new Date(responseAT.accomplishDate).toLocaleString()}</td>
                <td>
                  <button className="btn btn-warning mx-1" onClick={() => setUpdatedAssignmentAT(responseAT)}>
                    Update
                  </button>
                  <button className="btn btn-primary mx-1" onClick={() => setSelectedAssignmentAT(responseAT)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {updatedAssignmentAT && (
          <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier Assignment</h5>
                  <button type="button" className="btn-close" onClick={()=>{setUpdatedAssignmentAT(null)}}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleUpdateSubmitAT}>
                    <div className="mb-3">
                      <label className="form-label fw-bold specialText">Thème</label>
                      <p>{updatedAssignmentAT.exercice.title}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold specialText">Question</label>
                      <p>{updatedAssignmentAT.exercice.description}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold specialText">Réponse de l'étudiant</label>
                      <p>{updatedAssignmentAT.reponse}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Note Attribuée</label>
                      <input 
                      className="form-control"
                      value={updatedAssignmentAT?.note || ''} 
                      onChange={(e) => changeFormDateAt("note", e.target.value)}
                    
                    />

                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">
                        Enregistrer
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={()=>{setUpdatedAssignmentAT(null)}}>
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      {selectedAssignmentAT && (
          <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Détails de l'Assignment</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Exercice :</strong> {selectedAssignmentAT.exercice?.title}</p>
                  <p><strong>Description :</strong> {selectedAssignmentAT.exercice?.description}</p>
                  <p><strong>Note :</strong> {selectedAssignmentAT.note}</p>
                  <p><strong>Réponse :</strong> {selectedAssignmentAT.response}</p>
                  <p><strong>Date :</strong> {new Date(selectedAssignmentAT.accomplishDate).toLocaleString()}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={()=>{setSelectedAssignmentAT(null)}}>
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
