import React from 'react'
import './styles/LandingPageStyle.css'
import { useNavigate } from 'react-router'
import Navbar from "../components/navbar"
export default function LandingPage () {
  const navigate=useNavigate()
  return (
    <>
      <div className='container-fluid bgContainer '>
        <Navbar color="transparent"></Navbar>
        <div className='container content h-75 d-flex flex-column justify-content-center'>
    <p className='firstText'>Inscription</p>
    <p className='secondText'>
        <span>OUVERT POUR </span>
        <span>2024-2025</span>
    </p>
    <p className='sloganText'>
        Terrain de jeux | Cours gratuits | Activités après l'étude
    </p>
    <p className='sloganText'>
        <button className='btn btn-lg' id="enrollBtn" onClick={()=>{navigate("/signup")}}>Inscrivez-vous maintenant</button>
    </p>
</div>

      </div>
    </>
  )
}
