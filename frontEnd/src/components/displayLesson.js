import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Navbar from "./navbar";
import "./videoPlayer.css";
import { IoIosReturnLeft } from "react-icons/io";
import { FaCheckDouble } from "react-icons/fa";
import { Link } from "react-router-dom";
const DisplayLesson = () => {
  const role = localStorage.getItem("role");
  const navigate=useNavigate()
  const [lesson, setLesson] = useState({});
  const [subscription, setSubscription] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const lessonId = useParams().id;
  const courseId = useParams().courseId;
  const chapterId = useParams().chapterId;
  const updateStudentPoints=()=>{
  
    subscription["totalPoints"]+=5
    subscription["terminatedLessons"]+=lesson._id+"-"
    console.log(subscription)
    axios.put("http://localhost:8080/subscriptions/updateOne/"+subscription._id,subscription)
    .then(response=>{
        console.log(response)
        navigate("/chapter/manageContent/"+lesson.chapterId)
    })
    .catch(error=>{
        console.log(error)
    })
  }
  const getYoutubeVideoUrl = (url) => {
    console.log("attachmentLink:", url); // Log the attachmentLink to check its value
    if (!url) return ""; // Fallback if the URL is not available
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    console.log("match:", match); // Log the match result
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  // Load lesson data from the API
  const loadLesson = () => {
    axios
      .get("http://localhost:8080/lessons/getById/" + lessonId)
      .then((response) => {
        console.log("Lesson data:", response.data); // Log the response
        setLesson(response.data);
      })
      .catch((error) => {
        console.log("Error loading lesson:", error);
      });
  };

  useEffect(() => {
    loadLesson();
    axios.get("http://localhost:8080/subscriptions/getCoursebyDetails/"+user._id+"/"+courseId)
    .then((response)=>{
        console.log(response)
        setSubscription(response.data)
    })
    .catch((error)=>{
        console.log(error)
    })
    
  }, [user._id]);

  return (
    <>
      <Navbar color="var(--mainColor)" />
        <div className="playerContainer">
            <div className="w-full videoPlayer">
      
        <iframe
          width="100%"
          height="100%"
          src={getYoutubeVideoUrl(lesson.attachmentLink)}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-cover"
        ></iframe>
      </div>
        </div>
      

      <div className="m-0 p-2 d-flex justify-content-center flex-column align-items-center">
        <h4 className="text-xl font-bold mb-2"><span className="text-primary fs-4">Course : </span>{lesson.title}</h4>
        <p className="text-gray-700 mb-4"><span className="text-primary fs-4">Descritpion : </span>{lesson.content}</p>
        <div className="actions ">
        
        <button className="btn btn-primary mx-2">
        
        <Link to={"/chapter/manageContent/"+chapterId} style={{color:"#fff",textDecoration:"none"}}>
        <IoIosReturnLeft className="mx-1 fs-4"/> 
        Retourner à la page précédente
        </Link>
        </button>
        <button className="btn btn-success mx-2"  onClick={updateStudentPoints}>
        <FaCheckDouble className="mx-1 fs-4"/>Marquer comme lu
        </button>
        </div>
        

      </div>
    </>
  );
};

export default DisplayLesson;
