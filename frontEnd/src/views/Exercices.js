import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import { MdDelete, MdEdit, MdStart } from 'react-icons/md';
import AddExercice from "../components/addExercice"
import UpdateExercice from "../components/updateExercice"
export default function Exercices() {
  const lessonId = useParams().id;
  const navigate=useNavigate()
  const [exercices, setExercices] = useState([])
  const [selectedExercice, setSelectedExercice] = useState([])
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));
  const startExercice=(exerciceId)=>{
    navigate("/exercice/solveExercice/"+exerciceId)
  }
  const updateExercice=(exerciceId)=>{
    console.log("update ",exerciceId)
  }
  const deleteExercice=(exerciceId)=>{
    console.log("delete ",exerciceId)
    axios.delete("http://localhost:8080/exercises/deleteOne/"+exerciceId)
    .then((response)=>{
      console.log(response)
      loadExercices()
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  const loadExercices = () => {
    axios.get("http://localhost:8080/exercises/getByLessonId/" + lessonId)
      .then((response) => {
        console.log(response.data)
        setExercices(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    loadExercices()
  }, [user._id])
  return (
    <>
      <Navbar color="var(--mainColor)"></Navbar>
      <div className="container mt-4">
        <div className="text-center mb-5">
          <h6 className="section-title bg-white text-center specialText px-3">Exercices</h6>
          <h1 className="mb-5">Liste des Exercices</h1>
          <div className="container d-flex justify-content-center">
            <AddExercice lessonId={lessonId} onUpdate={loadExercices}></AddExercice>
          </div>
        </div>
      </div>
      <div className="container p-2 d-flex flex-wrap justify-content-center ">
      {exercices.length>0 && exercices.map((exercice,index)=>{
        return (<div className="col-lg-3 col-md-4 wow fadeInUp m-2"  key={index}>
        <div className="course-item bg-light">
          <div className="position-relative overflow-hidden">
            <img className="img-fluid" src="https://placehold.co/600x400" alt={`Course ${index + 1}`} />
        
          </div>
          <div className="text-center p-4 pb-0">
            <h5 className="mb-0">{exercice.title} </h5>
            
          </div>
          <div className="d-flex border-top">
            <small className="flex-fill text-center text-primary fw-bold border-end py-2">
              <i className="fa fa-user-tie specialText  me-2"></i>
              {exercice.score} Points
            </small>
          </div>
          


          <div className="action d-flex justify-content-center">
            {role=="student" && 
            <button className="btn btn-primary p-1 mx-1" onClick={()=>{startExercice(exercice._id)}}><MdStart className="p-0 " />Commencer</button>
            }
            <UpdateExercice lessonId={lessonId} exercice={exercice} onUpdate={loadExercices} isShow={false}></UpdateExercice>

            <button className="btn btn-danger p-1 mx-1" onClick={()=>{deleteExercice(exercice._id)}}><MdDelete className="" /> Supprimer</button>
          </div>
        </div>
      </div>)
      })}
      </div>
      
    </>
  )
}
