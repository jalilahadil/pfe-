import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import axios from "axios";
import { Modal, Button } from 'react-bootstrap'; // Import necessary components
import "./styles/usersStyle.css"
export default function Teachers() {
  const [error,setError]=useState(false)
  const activateAccount=(teacher)=>{
    const updatedTeacher={...teacher,accountStatus:"active"}
    console.log(updatedTeacher)
     axios.put("http://localhost:8080/teachers/updateOne/"+teacher._id,updatedTeacher)
    .then(response=>{
        console.log(response)
        loadTeachers()
        setSuccess(true)
    })
    .catch(error=>{
        console.log(error)
        setError(true)
    }) 
  }
  const blockAccount=(teacher)=>{
    const updatedTeacher={...teacher,accountStatus:"waiting"}
    console.log(updatedTeacher)
     axios.put("http://localhost:8080/teachers/updateOne/"+teacher._id,updatedTeacher)
    .then(response=>{
        console.log(response)
       
        setSuccess(true) 
        loadTeachers()
    })
    .catch(error=>{
        console.log(error)
        setError(true)
    }) 
  }
  const [success,setSuccess]=useState(false)
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedTeacher, setSelectedTeacher] = useState(null); // State for selected teacher
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
    const deleteUserAccount =(userId)=>{
        console.log(userId)
        axios.delete("http://localhost:8080/teachers/deleteOne/:"+userId)
        .then((response)=>{
            console.log(response)
            loadTeachers()
            setSuccess(true)
        })
        .catch((error)=>{
            console.log(error)
            setError(true)
        })
    }
    const loadTeachers=()=>{
        axios.get("http://localhost:8080/teachers/getAllTeachers/")
      .then(response => {
        console.log(response.data);
        setTeachers(response.data);
       
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
    loadTeachers()
  }, [role]);

  const formatTimestampToFrenchDate = (timestamp) => {
    const date = new Date(timestamp);

    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const monthsOfYear = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    return ` ${day} ${month} ${year}`;
  };

  // Function to handle the opening of the modal
  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
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
            <h6 className="section-title bg-white text-center specialText px-3">Enseignats</h6>
            <h1 className="mb-5">Liste des Enseignants</h1>
            {error==true &&  <p className="alert alert-danger">Erreur de traitement de votre demande , veuillez réessayer plus tard.</p>
            }
            {success==true && <p className="alert alert-success">Opération réussie.</p>
            }

          </div>
          <div className="col-12 m-0 p-0">
            <table className="table col-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom </th>
                <th scope="col">Prénom</th>
                <th scope="col">Adresse</th>
                <th scope="col">Spécialité</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{teacher.userLastName}</td>
                  <td>{teacher.userFirstName}</td>
                  <td>{`${teacher.userCity} ${teacher.userAddress} ${teacher.userCountry}`}</td>
                  <td>{teacher.specialty}</td>
                    <td>
                    {teacher.accountStatus=="active" &&  <p style={{backgroundColor:"transparent"}} className='text-success p-2 m-0'>Active</p>}
                    {teacher.accountStatus=="waiting" && <p style={{backgroundColor:"transparent"}} className='text-warning p-2 m-0'>Suspendu</p>}
                    </td>
                  <td>
                    <button className='btn btn-primary mx-1' onClick={() => handleViewDetails(teacher)}>
                      Détails
                    </button>
                    {teacher.accountStatus === "active" && 
                    <button className='btn btn-warning mx-1' onClick={() => { blockAccount(teacher) }}>Bloquer le compte</button>
                    }
                    {teacher.accountStatus === "waiting" && 
                    <button className='btn btn-success mx-1' onClick={() => { activateAccount(teacher) }}>Activer le compte</button>
                    }

                    <button className='btn btn-danger mx-1' onClick={()=>{deleteUserAccount(teacher._id)}}>Supprimer le compte</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
        </div>
      </div>

      {/* Modal for showing teacher details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--mainColor)", color: 'white' }}>
          <Modal.Title className="w-100 text-center">Détails de l'étudiant</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#E3E2ED" }}>
          {selectedTeacher && (
            <div>
                <p><strong>Statut du Compte: </strong>{selectedTeacher.accountStatus}</p>
                <p><strong>Date de Création: </strong>{formatTimestampToFrenchDate(selectedTeacher.createdAt)}</p>
                <p><strong>Niveau d'Éducation: </strong>{selectedTeacher.educationLevel}</p>
                <p><strong>Adresse: </strong>{selectedTeacher.userAddress}</p>
                <p><strong>Date de Naissance: </strong>{formatTimestampToFrenchDate(selectedTeacher.userBirthDate)}</p>
                <p><strong>Ville: </strong>{selectedTeacher.userCity}</p>
                <p><strong>Spécialité: </strong>{selectedTeacher.specialty}</p>
                <p><strong>Pays: </strong>{selectedTeacher.userCountry}</p>
                <p><strong>Email: </strong>{selectedTeacher.userEmail}</p>
                <p><strong>Prénom: </strong>{selectedTeacher.userFirstName}</p>
                <p><strong>Genre: </strong>{selectedTeacher.userGender}</p>
                <p><strong>Nom: </strong>{selectedTeacher.userLastName}</p>
                <p><strong>Numéro de Téléphone: </strong>{selectedTeacher.userPhoneNumber}</p>
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
