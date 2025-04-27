import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'
import { useNavigate } from 'react-router'
export default function MyQuizes() {
    const [quizzes,setQuizes]=useState([])
    const navigate=useNavigate()
    const role=localStorage.getItem("role")
    const user=JSON.parse(localStorage.getItem("user"))
    const loadQuizzes=()=>{
        axios.get("http://localhost:8080/quizReponse/getResponseByStudent/"+user._id)
        .then((response)=>{
            setQuizes(response.data.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const formatDate=(dateString)=> {
        const date = new Date(dateString);
      
        // Get day, month, year, and time
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        // Get hours and minutes in a 2-digit format
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        // Format the date and time
        const formattedDate = `${dayOfWeek} ${day} ${month} ${year} at ${hours}:${minutes}`;
      
        return formattedDate;
      }
      
    const deleteQuiz=(responseId)=>{
        axios.delete("http://localhost:8080/response/deleteResponse/"+responseId)
        .then((response)=>{
            console.log(response.data)
            loadQuizzes()
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const restartQuiz=(quizId)=>{
        navigate("/quiz/displayQuiz/"+quizId)
    }
    useEffect(()=>{
        loadQuizzes()
    },[user._id])
  return (
    <>
    <Navbar color="var(--mainColor)"></Navbar>
    <div className="text-center mt-5">
            <h6 className="section-title bg-white text-center specialText px-3">Quiz</h6>
            <h1 className="mb-5">Mes Quizs</h1>
    </div>
    <div className="container-fluid p-2">
    {quizzes.length>0 && quizzes.map((response,index)=>{
        return(
            <div className="col-lg-3 col-md-4 wow fadeInUp" key={index}>
                <div className="course-item bg-light">
                  <div className="position-relative d-flex justify-content-center overflow-hidden">
                    <img className="img-fluid" src="https://placehold.co/400x200" alt="quiz" />
                  </div>
                  <div className="text-center p-4 pb-0">
                    <h5 className="mb-0">Passed At </h5>{formatDate(response.responseDate)}
                  </div>
                  <div className="text-center p-4 pb-0">
                    <h5 className="mb-0">Score  </h5>{response.totalPoints}
                  </div>
                  <div className="d-flex justify-content-center p-3">
                    <button className='btn btn-danger mx-2' onClick={() => deleteQuiz(response._id)}>Delete Response</button>
                    <button className='btn btn-warning mx-2' onClick={() => restartQuiz(response.quizId)}>Restart Quiz</button>
                  </div>
                </div>
              </div>
        )
    })}
    </div>
    
    </>
    
  )
}
