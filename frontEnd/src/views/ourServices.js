import React from 'react'
import "./styles/servicesStyle.css"
import { FaPencilAlt } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import Navbar from "../components/navbar"

export default function OurServices() {
  return (
    <>
    <Navbar color="#3A3858"></Navbar>

    <div className="row m-0 p-0">
        <div className="container-fluid m-0 p-0 servicesContainer">
            <div className="content d-flex flex-column justify-content-center  h-75 p-3">
                <h1>We Provide the <br /> main Kid Activities</h1>
                <p className='w-50'>
                    Lorem ipsum dolor sit amet consectetur adipisicing  elit. Vitae culpa repellendus laudantium in eligendi? Voluptatibus accusantium nemo iure nobis voluptas.
                    Lorem ipsum dolor sit amet consectetur adipisicing  elit. Vitae culpa repellendus laudantium in eligendi? Voluptatibus accusantium nemo iure nobis voluptas.
                    Lorem ipsum dolor sit amet consectetur adipisicing  elit. Vitae culpa repellendus laudantium in eligendi? Voluptatibus accusantium nemo iure nobis voluptas.
                </p>
                <div className="row">
                <div className="services d-flex my-2">
                 
                    <div className="service mx-3">
                        <div className="serviceImage">
                            <FaPencilAlt className='h4 mx-2'/>
                            <span className='fw-bold'>Indoor Games</span>
                        </div>
                    </div>
                    <div className="service">
                        <div className="serviceImage">
                            <FaPencilAlt className='h4 mx-2'/>
                            <span className='fw-bold '>Outdoor Games</span>
                        </div>
                    </div>
                </div>
                <div className="services d-flex">
                 
                    <div className="service mx-3">
                        <div className="serviceImage">
                            <FaPencilAlt className='h4 mx-2'/>
                            <span className='fw-bold'>Sport Activity </span>
                        </div>
                    </div>
                    <div className="service">
                        <div className="serviceImage">
                            <FaPencilAlt className='h4 mx-2'/>
                            <span className='fw-bold '>Water Games</span>
                        </div>
                    </div>
                </div>
                </div>
                <div className="mt-4 text-center w-25 ">
                <button className="btn  viewAllButton">
                View All 
                </button>
                </div>
                <div className=" container-fluid contentFooter m-0 p-0">
                    <h4 className='text-center text-light'>Make your children's life special by enrolling them in our academy</h4>
                    <div className="container-fluid justify-content-center d-flex align-items-center ">
                        <button className="btn  viewAllButton btn-warning">
                            Enroll Your child 
                        </button>
                        <LuPhoneCall className='mx-3 h2 text-light'/>
                        <span className='h4 text-light'>+458-1435416</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
    </>
    
  )
}
