import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
function PersonalProfile(props) {
  const [show, setShow] = useState(false);
  const role=localStorage.getItem("role")
  const user=props.user;
  const [profile, setProfile] = useState({
    id:JSON.parse(localStorage.getItem("user")).id ,
    userLastName: user.userLastName,
    userFirstName: user.userFirstName,
    userBirthDate: new Date(user.userBirthDate).toISOString().split('T')[0],
    userEmail: user.userEmail,
    userPassowrd: user.userPassowrd,
    userPhoneNumber: user.userPhoneNumber
  });
  
  const [validated, setValidated] = useState(false);
  const [customErrors, setCustomErrors] = useState({
    age: '',
    numeroTelephone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'numeroTelephone') {
      const onlyDigits = value.replace(/\D/g, '').substring(0, 8);
      setProfile({ ...profile, [name]: onlyDigits });
      setCustomErrors({
        ...customErrors,
        numeroTelephone: onlyDigits.length !== 8 ? "Le numéro de téléphone doit contenir exactement 8 chiffres" : ''
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const validateCustomFields = () => {
    const errors = { age: '', numeroTelephone: '' };
    let isValid = true;

    if (profile.age && profile.age.length !== 2) {
      errors.age = "L'âge doit contenir exactement 2 chiffres";
      isValid = false;
    }

    if (profile.numeroTelephone && profile.numeroTelephone.length !== 8) {
      errors.numeroTelephone = "Le numéro de téléphone doit contenir exactement 8 chiffres";
      isValid = false;
    }

    setCustomErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const customValid = validateCustomFields();

    if (form.checkValidity() === false || !customValid) {
      event.stopPropagation();
    } else {
      console.log("Données du profil à envoyer:", profile);
      alert("Profil mis à jour avec succès!");
      setShow(false);
    }

    setValidated(true);
  };

  const formGroupStyle = { marginBottom: '15px' };
  const errorTextStyle = {
    color: '#r',
    fontSize: '0.875em',
    marginTop: '0.25rem'
  };

  const buttonPrimaryStyle = {
    backgroundColor: "#FFF6F2",
    borderColor: "var(--mainColor)",
    color:"var(--mainColor)",
    fontWeight: "bold"
  };
  const updateProfile = () => {
    console.log(profile);
    
    if(role=="admin")
    {
     axios.put("http://localhost:8080/administrators/updateOne/" + profile.id, profile)
      .then(response => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(profile));
        setShow(false); 
      })
      .catch(error => {
        console.log(error);
      });
    }
    else if(role=="teacher")
      {
        axios.put("http://localhost:8080/teachers/updateOne/" + profile.id, profile)
        .then(response => {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(profile));
          setShow(false); 
        })
        .catch(error => {
          console.log(error);
        });
      }
      else 
        {
          axios.put("http://localhost:8080/teachers/updateOne/" + profile.id, profile)
          .then(response => {
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(profile));
            setShow(false); 
          })
          .catch(error => {
            console.log(error);
          });
        }
  };
  
  return (
    <div className="text-center mt-5">
      <Button variant="primary" onClick={() => setShow(true)}>
        Modifier mon profil
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: "var(--mainColor)", color: 'white' }}>
          <Modal.Title className="w-100 text-center">Modifier votre profil</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#E3E2ED" }}>
          <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group style={formGroupStyle} controlId="nom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="userLastName"
                      onChange={handleChange}
                      value={profile.userLastName}
                      placeholder="Entrez votre nom"
                    />
                    <Form.Control.Feedback type="invalid">Veuillez entrer votre nom.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group style={formGroupStyle} controlId="prenom">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="userFirstName"
                      value={profile.userFirstName}
                      onChange={handleChange}
                      placeholder="Entrez votre prénom"
                    />
                    <Form.Control.Feedback type="invalid">Veuillez entrer votre prénom.</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group style={formGroupStyle} controlId="dateNaissance">
                <Form.Label>Date de naissance</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="userBirthDate"
                  value={profile.userBirthDate}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Veuillez entrer votre date de naissance.</Form.Control.Feedback>
              </Form.Group>

              

              <Form.Group style={formGroupStyle} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="userEmail"
                  value={profile.userEmail}
                  onChange={handleChange}
                  placeholder="Entrez votre email"
                />
                <Form.Control.Feedback type="invalid">Veuillez entrer une adresse email valide.</Form.Control.Feedback>
              </Form.Group>


              <Form.Group style={formGroupStyle} controlId="numeroTelephone">
                <Form.Label>Numéro de téléphone</Form.Label>
                <Form.Control
                  type="text"
                  inputMode="numeric"
                  name="userPhoneNumber"
                  value={profile.userPhoneNumber}
                  onChange={handleChange}
                  placeholder="Entrez votre numéro de téléphone (8 chiffres)"
                  isInvalid={!!customErrors.numeroTelephone}
                  maxLength="8"
                />
                {customErrors.numeroTelephone && (
                  <div style={errorTextStyle}>{customErrors.numeroTelephone}</div>
                )}
              </Form.Group>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Annuler
                </Button>
                <Button
                  type="button"
                  onClick={updateProfile}
                  style={buttonPrimaryStyle}
                  disabled={!!customErrors.age || !!customErrors.numeroTelephone}
                >
                  Enregistrer les modifications
                </Button>
              </div>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PersonalProfile;
