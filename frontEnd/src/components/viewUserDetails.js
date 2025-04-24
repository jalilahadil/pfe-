import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile] = useState({
    userId: user.userId,
    nom: user.userLastName,
    prenom: user.userFirstName,
    dateNaissance: new Date(user.userBirthDate).toISOString().split('T')[0],
    age: user.userAge,
    email: user.userEmail,
    motDePasse: user.userPassword,
    numeroTelephone: user.userPhoneNumber,
    adresse: user.userAddress,
    ville: user.userCity,
    pays: user.userCountry
  });

  return (
    <div className="text-center mt-5">
      <Button variant="primary" onClick={() => setShow(true)}>
        Voir mon profil
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--mainColor)", color: 'white' }}>
          <Modal.Title className="w-100 text-center">Détails de votre profil</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#E3E2ED" }}>
          <Container>
            <Row className="g-3">
              <Col md={6}>
                <h5>Nom</h5>
                <p>{profile.nom}</p>
              </Col>
              <Col md={6}>
                <h5>Prénom</h5>
                <p>{profile.prenom}</p>
              </Col>
            </Row>

            <Row className="g-3">
              <Col md={6}>
                <h5>Date de naissance</h5>
                <p>{profile.dateNaissance}</p>
              </Col>
              <Col md={6}>
                <h5>Âge</h5>
                <p>{profile.age}</p>
              </Col>
            </Row>

            <Row className="g-3">
              <Col md={6}>
                <h5>Email</h5>
                <p>{profile.email}</p>
              </Col>
              <Col md={6}>
                <h5>Numéro de téléphone</h5>
                <p>{profile.numeroTelephone}</p>
              </Col>
            </Row>

            <Row className="g-3">
              <Col md={6}>
                <h5>Adresse</h5>
                <p>{profile.adresse}</p>
              </Col>
              <Col md={6}>
                <h5>Ville</h5>
                <p>{profile.ville}</p>
              </Col>
            </Row>

            <Row className="g-3">
              <Col md={6}>
                <h5>Pays</h5>
                <p>{profile.pays}</p>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => setShow(false)}>
                Fermer
              </Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserProfile;
