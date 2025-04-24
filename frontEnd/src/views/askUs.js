import React from 'react'
import "./styles/footerStyle.css"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import Navbar from "../components/navbar"

export default function AskUs() {
  return (
    <>
    <Navbar color="#AA11B1"></Navbar>
    <div className="row m-0 p-0">
        <div className="footerComponent m-0 p-0">
                <div className="askForm m-0 p-0  ">
                    <h3>Ask About Kids Act </h3>
                    <form action="" className="form">
                        <input type="text" className='form-control  askFormControl' name="nameInput" id="nameInput" placeholder='Your Name' />
                        <input type="text" className='form-control  askFormControl' name="emailInput" id="emailInput" placeholder='Email Address' />
                        <input type="text" className='form-control  askFormControl' name="phoneInput" id="phoneInput" placeholder='Phone Number' />
                        <input type="text" className='form-control  askFormControl' name="studyingInput" id="studyingInput" placeholder='Starting Class' />
                    </form>
                    <div className="container-fluid mt-4 text-end">
                    <button className="btn  viewAllButton">
                        Submit
                    </button>
                </div>
                </div>
                <div className="footerContent">
                    <ul>
                    <li className='nav-item'>
                  <a className='nav-link' to='#home'>
                    Home
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' to='#'>
                    Administration
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' to='#'>
                    Categories
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' to='#'>
                    Courses
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' to='#'>
                    Our Team
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#gallery'>
                    Gallery
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' to='#'>
                    Contact Us
                  </a>
                </li>
                    </ul>
                    <ul>
                        <span className='text-primary'>Follow Us </span>
                    <li className='nav-item'>
                        <a className='nav-link' to='#home'>
                            <FaFacebook />
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' to='#home'>
                            <FaTwitter />
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' to='#home'>
                            <FaInstagram />
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' to='#home'>
                            <FaLinkedinIn />
                        </a>
                    </li>
               
                
                
                
                
                    </ul>
                    <p className='text-center copyrights'>Copyright &copy; 2025 KidsRock . All rights reserved. </p>
                </div>
            </div>
    </div>
    </>
  )
}
