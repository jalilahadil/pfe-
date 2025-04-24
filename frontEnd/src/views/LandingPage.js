import React from 'react'
import './styles/LandingPageStyle.css'

import Navbar from "../components/navbar"
export default function LandingPage () {
  return (
    <>
      <div className='container-fluid bgContainer '>
        <Navbar color="transparent"></Navbar>
        <div className='container content h-75 d-flex flex-column justify-content-center'>
          <p className='firstText'>Admission</p>
          <p className='secondText'>
            <span>OPEN FOR </span>
            <span>2024-2025</span>
          </p>
          <p className='sloganText'>
            Play Ground | Free Courses | After Studying Activities
          </p>
          <p className='sloganText'>
            <button className='btn btn-lg' id="enrollBtn">Enroll Now</button>
          </p>
        </div>
      </div>
    </>
  )
}
