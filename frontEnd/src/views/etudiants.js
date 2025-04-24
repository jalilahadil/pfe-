import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import axios from "axios";
import UserDetails from "../components/viewUserDetails";
import { Modal, Button } from 'react-bootstrap'; // Import necessary components
import "./styles/usersStyle.css"
export default function Etudiants() {
  const [error,setError]=useState(false)
  const activateAccount=(student)=>{
    const updatedStudent={...student,accountStatus:"active"}
    axios.put("http://localhost:8080/students/updateOne/"+student._id,updatedStudent)
    .then(response=>{
        console.log(response)
        loadStudents()
        setSuccess(true)
    })
    .catch(error=>{
        console.log(error)
        setError(true)
    })
  }
  const blockAccount=(student)=>{
    const updatedStudent={...student,accountStatus:"waiting"}
    axios.put("http://localhost:8080/students/updateOne/"+student._id,updatedStudent)
    .then(response=>{
        console.log(response)
       
        setSuccess(true) 
        loadStudents()
    })
    .catch(error=>{
        console.log(error)
        setError(true)
    })
  }
  const [success,setSuccess]=useState(false)
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
    const deleteUserAccount =(userId)=>{
        axios.delete("http://localhost:8080/students/deleteOne/"+userId)
        .then((response)=>{
            console.log(response)
            loadStudents()
            setSuccess(true)
        })
        .catch((error)=>{
            console.log(error)
            setError(true)
        })
    }
    const loadStudents=()=>{
        axios.get("http://localhost:8080/students/getAllStudents/")
      .then(response => {
        console.log(response.data);
        setStudents(response.data);
       
      })
      .catch(error => {
        console.log(error);
      });
      setTimeout(()=>{
        setError(false);
        setSuccess(false)
    },3000)
    }
  useEffect(() => {
    loadStudents()
  }, [role]);

  const formatTimestampToFrenchDate = (timestamp) => {
    const date = new Date(timestamp);

    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const monthsOfYear = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${day} ${month} ${year}`;
  };

  // Function to handle the opening of the modal
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar color="var(--mainColor)" />
      <div className="container-xxl py-5 category">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="section-title bg-white text-center specialText px-3">Étudiants</h6>
            <h1 className="mb-5">Liste des Étudiants</h1>
            {error==true &&  <p className="alert alert-danger">Erreur de traitement de votre demande , veuillez réessayer plus tard.</p>
            }
            {success==true && <p className="alert alert-success">Opération réussie.</p>
            }

          </div>
          <div className="row">
            <table className="table container-fluid">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom </th>
                <th scope="col">Prénom</th>
                <th scope="col">Date de Naissance</th>
                <th scope="col">Adresse</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.userLastName}</td>
                  <td>{student.userFirstName}</td>
                  <td>{formatTimestampToFrenchDate(student.userBirthDate)}</td>
                  <td>{`${student.userCity} ${student.userAddress} ${student.userCountry}`}</td>
                    <td>
                    {student.accountStatus=="active" &&  <p style={{backgroundColor:"transparent"}} className='text-success p-2 m-0'>Active</p>}
                    {student.accountStatus=="waiting" && <p style={{backgroundColor:"transparent"}} className='text-warning p-2 m-0'>Suspendu</p>}
                    </td>
                  <td>
                    <button className='btn btn-primary mx-1' onClick={() => handleViewDetails(student)}>
                      Voir les détails
                    </button>
                    {student.accountStatus === "active" && 
                    <button className='btn btn-warning mx-1' onClick={() => { blockAccount(student) }}>Bloquer le compte</button>
                    }
                    {student.accountStatus === "waiting" && 
                    <button className='btn btn-success mx-1' onClick={() => { activateAccount(student) }}>Activer le compte</button>
                    }

                    <button className='btn btn-danger mx-1' onClick={()=>{deleteUserAccount(student._id)}}>Supprimer le compte</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
        </div>
      </div>

      {/* Modal for showing student details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--mainColor)", color: 'white' }}>
          <Modal.Title className="w-100 text-center">Détails de l'étudiant</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#E3E2ED" }}>
          {selectedStudent && (
            <div>
                <p><strong>Statut du Compte: </strong>{selectedStudent.accountStatus}</p>
                <p><strong>Date de Création: </strong>{formatTimestampToFrenchDate(selectedStudent.createdAt)}</p>
                <p><strong>Niveau d'Éducation: </strong>{selectedStudent.educationLevel}</p>
                <p><strong>Total des Points: </strong>{selectedStudent.totalPoints}</p>
                <p><strong>Adresse: </strong>{selectedStudent.userAddress}</p>
                <p><strong>Date de Naissance: </strong>{formatTimestampToFrenchDate(selectedStudent.userBirthDate)}</p>
                <p><strong>Ville: </strong>{selectedStudent.userCity}</p>
                <p><strong>Pays: </strong>{selectedStudent.userCountry}</p>
                <p><strong>Email: </strong>{selectedStudent.userEmail}</p>
                <p><strong>Prénom: </strong>{selectedStudent.userFirstName}</p>
                <p><strong>Genre: </strong>{selectedStudent.userGender}</p>
                <p><strong>Nom: </strong>{selectedStudent.userLastName}</p>
                <p><strong>Numéro de Téléphone: </strong>{selectedStudent.userPhoneNumber}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
