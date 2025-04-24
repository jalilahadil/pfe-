import './styles/ProfilePage.css';
import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from "../components/navbar.js";
import { useNavigate } from 'react-router-dom'; 
import PersonalProfile from '../components/PersonalProfile.js';
import avatar from "../assets/img/avat4.jpg"
const ProfilePage = () => {
  const navigate = useNavigate(); 
  const [showPostsOnly, setShowPostsOnly] = useState(true);
  const user=JSON.parse(localStorage.getItem("user"));

  const profile=JSON.parse(localStorage.getItem("user"));
  

  return (
    <div>
      <Navbar color="var(--purpleColor)"/>
      <div className='profile'>
        <div className='profile-data'>
          <div className='profile-data_up'>
            <div className='profile_image'>
              <img src={avatar} alt='Profile' />
            </div>
            <h2 className='profile-data_up_Name'>{user.userFirstName+" "+user.userLastName}</h2>
            <div className='profile-data_up_username'>@{user.username}</div>
            <div className='profile-data_up_bio'>{user.bio}</div>

            
            <div style={{ marginTop: '10px' }}>
              <PersonalProfile></PersonalProfile>
            </div>

            
          </div>

          <Container className="mb-4">
  <h3 className="text-center mb-4">Mon Profil</h3>
  <Row className="justify-content-center">
    <Col md={8}>
      <div className="border p-4 rounded shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
        <p><strong>Nom :</strong> { profile.userLastName}</p>
        <p><strong>Prénom :</strong> {profile.userFirstName}</p>
        <p><strong>Date de naissance :</strong> {profile.userBirthDate}</p>
        <p><strong>Âge :</strong> {profile.userAge}</p>
        <p><strong>Email :</strong> {profile.userEmail}</p>
        <p><strong>Numéro de téléphone :</strong> {profile.userPhoneNumber}</p>
      </div>
    </Col>
  </Row>
</Container>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
