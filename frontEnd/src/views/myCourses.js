import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { useNavigate } from 'react-router'
import { useState } from 'react'

import axios from "axios"
 
export default function MyCourses() {
  const navigate=useNavigate()
    const [courses,setCourses]=useState();
    const [subscriptions,setSubscriptions]=useState();
    const [mergedData, setMergedData] = useState([]);
    const user=JSON.parse(localStorage.getItem("user"))
    const loadSubscriptions=()=>{
        axios.get("http://localhost:8080/subscriptions/getByStudentId/"+user._id)
        .then((response)=>{
          setSubscriptions(response.data)
        })
        .catch((error)=>{
          console.log(error)
        }) 
    }
    const loadCourses=()=>{
        axios.get("http://localhost:8080/courses/getAllCourses/")
        .then((response)=>{
          setCourses(response.data)
        })
        .catch((error)=>{
          console.log(error)
        })
      }
      const loadData = async () => {
        try {
          await loadCourses();
          await loadSubscriptions();
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };
      useEffect(() => {
        
      
        loadData();
      }, [user._id]);
      const handleCancelSubscription = (subscriptionId) => {
        console.log("Annuler abonnement:", subscriptionId);
        axios.delete("http://localhost:8080/subscriptions/deleteOne/"+subscriptionId)
        .then((response)=>{
          console.log(response)
          loadData()
        })
        .catch((error)=>{
          console.log(error)
        })
      };
      
      const handleContinueCourse = (courseId) => {
        console.log("Poursuivre cours:", courseId);
        // par exemple : navigate(`/courses/${courseId}`)
      };
      useEffect(() => {
        try {
          if (Array.isArray(courses) && Array.isArray(subscriptions) && courses.length && subscriptions.length) {
            const merged = subscriptions.map((sub) => {
              const matchingCourse = courses.find(course => course._id.toString() === sub.courseId.toString());
              return {
                ...sub,
                course: matchingCourse || null,
              };
            });
      
            console.log("Merged Data:", merged);
            setMergedData(merged);
          }
        } catch (error) {
          console.error("Error merging data:", error);
        }
      }, [courses, subscriptions]);
      
  return (
   <>
   <Navbar color="var(--mainColor)"></Navbar>
   <div className="container-xxl py-5 category">
           <div className="container">
             <div className="text-center mb-5">
               <h6 className="section-title bg-white text-center specialText px-3">Cours</h6>
               <h1 className="mb-5">Mes Cours</h1>
             </div>
             <div className="container-fluid d-flex flex-wrap justify-content-center column-gap-3">
                    {mergedData.map((sub) => (
  <div className="card mb-3 mx-3" style={{width:"25rem"}} key={sub._id}>
    <div className="card-body">
      <h5 className="card-title text-primary">
        {sub.course?.title || "Cours inconnu"}
      </h5>
      <p className="card-text overflow-hidden">
        {sub.course?.description?.slice(0,30) || "Aucune description disponible..."}...
      </p>

      <ul className="list-group list-group-flush mb-3">
        <li className="list-group-item">
          <strong>Durée :</strong> {sub.course?.duration || "—"}
        </li>
        <li className="list-group-item">
          <strong>Nombre de leçons :</strong> {sub.course?.lessonsCount || 0}
        </li>
        <li className="list-group-item">
          <strong>Prix :</strong> {sub.course?.price} DT
        </li>
        <li className="list-group-item">
          <strong>Status d'abonnement :</strong>{" "}
          <span className={`badge bg-${sub.subscribedStatus === "waiting" ? "warning" : "success"}`}>
            {sub.subscribedStatus}
          </span>
        </li>
      </ul>

      <div className="d-flex justify-content-between">
        <button 
          className="btn btn-danger mx-1"
          onClick={() => handleCancelSubscription(sub._id)}
        >
          Annuler l'abonnement
        </button>
  
        <button 
          className="btn btn-warning mx-1"
          onClick={() => navigate("/cours/updateCourse/"+sub.course?._id)}
        >
          Continer avec ce  cours
        </button>
      </div>

      <small className="text-muted text-center d-block mt-3">
        Abonné le : {new Date(sub.subscribedAt).toLocaleString()}
      </small>
    </div>
  </div>
))}

             </div>
         
           </div>
         </div>
   </>
  )
}
