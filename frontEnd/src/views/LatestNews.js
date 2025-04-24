import React from 'react'
import "./styles/newsStyle.css"
import { FaCalendarAlt } from "react-icons/fa";
import saturn from "../assets/img/saturn.png"
import stars from "../assets/img/stars.png"
import balloons from "../assets/img/balloons.png"
import Navbar from "../components/navbar"
export default function LatestNews() {
  return (
    <>
    <Navbar color="#AA11B1"></Navbar>
    <h1 className="text-center">Latest News </h1>
    <div className="row m-0 p-0 mt-3">
        <div className="col-md-6 col-lg-6 col-sm-12  column-gap-2">
            <div className="row">
             <div className="newsImageContainer  col-8" id='nic1'></div>
            <div className="containerInformations p-4 col">
                <h3>Make learning fun <br /> for kids</h3>
                <FaCalendarAlt className='FaCalendarAlt' /> <span>June 10 ,2022</span>
                <p className='my-2 w-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quasi ipsum ad recusandae molestias porro ratione laudantium aliquam nemo voluptatibus.</p>
                <p className='readMoreText'>Read More </p>
            </div>   
            </div>
            
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12  column-gap-2">
            <div className="row">
             <div className="newsImageContainer  col-8" id='nic1'></div>
            <div className="containerInformations p-4 col">
                <h3>Make learning fun <br /> for kids</h3>
                <FaCalendarAlt className='FaCalendarAlt' /> <span>June 10 ,2022</span>
                <p className='my-2 w-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quasi ipsum ad recusandae molestias porro ratione laudantium aliquam nemo voluptatibus.</p>
                <p className='readMoreText'>Read More </p>
            </div>   
            </div>
            
        </div>
        <div className="container-fluid text-center mt-5">
            
            <button className="btn  viewAllButton">
                View All 
            </button>
        </div>
        <img className="decorationIcon" src={saturn} />
        <img className="decorationIcon" src={balloons} />
        <img className="decorationIcon" src={stars} />
    </div>
    </>
  )
}
