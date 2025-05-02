import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import axios from "axios";
import CreateChapterModal from '../components/addChpater';
import UpdateChapterModal from '../components/updateChapter';
import chapterImage from "../assets/courseChapter.png"

export default function ManageCourse() {
    const courseId=useParams().id;
    const [course,setCourse]=useState({});
    const [updateMode,setUpdateMode]=useState(false);
    const [selectedChapter,setSelectedChapter]=useState({});
    const [chapters,setChapters]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"))
    const role=localStorage.getItem("role")
    const deleteChapter=(chapterId)=>{
        axios.delete("http://localhost:8080/chapters/deleteOne/"+chapterId)
        .then(response=>{
            console.log(response)
            loadData()
            window.location.reload()
        })
        .catch(error=>{
            console.log(error)
            window.location.reload()
        })
    }
    const loadData = async () => {
      try {
        const courseResponse = await axios.get(`http://localhost:8080/courses/getById/${courseId}`);
        setCourse(courseResponse.data);
    
        const chaptersResponse = await axios.get(`http://localhost:8080/chapters/getByCourseId/${courseResponse.data._id}`);
        setChapters(chaptersResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(()=>{
      
       loadData()
    },[user._id])
  return (
    <>
    <Navbar color="var(--mainColor)"/>
    <div className="container-xxl py-5 category">
            <div className="container">
              
            <h3 className='text-center text-primary'>Cours : {course.title}</h3>
            <p className="text-center">{course.description}</p>
              </div>
              <div className="text-center mb-5">
                <h6 className="section-title bg-white text-center specialText px-3">Cours</h6>
                <h1 className="mb-5">Gérer les Chapitres </h1>
                {
                  (course.creatorId==user._id || role=="admin" ) && <CreateChapterModal courseId={courseId} onUpdate={loadData}></CreateChapterModal>
                }
              </div>
              <div className="row d-flex justify-content-center ">
                {chapters.length>0 &&  chapters.map((chapter,index)=>{
                    return  <div class="card shadow-sm border-0 rounded-4" key={index} style={{maxWidth: "24rem"}}>
                     <img src={chapterImage} class="card-img-top" alt="Chapter" style={{height: "12rem", objectFit: "cover" }}/>
                     <div class="card-body">
                       <h5 class="card-title fw-semibold mb-2">{ chapter.title  }...</h5>
                       <p class="card-text text-muted small">{chapter.description }</p>
                       <div className="actions d-flex  column-gap-2">
                        {(course.creatorId==user._id || role=="admin" ) && <button className="btn btn-danger mx-2 p-1" onClick={()=>{deleteChapter(chapter._id)}}>Supprimer Chapitre </button>}
                        {(course.creatorId==user._id  ) && <button className="btn btn-warning mx-2 p-1" onClick={()=>{setSelectedChapter(chapter);setUpdateMode(true)}}>Modifier Chapitre </button>}
                      {role!="" && 
                       <button className="btn btn-primary mx-2 p-1 " ><Link style={{textDecoration:"none",color:"#fff"}} to={"/chapter/manageContent/" + chapter._id}
                       >Poursuivre avec Ce Chapitre </Link></button>}
                       </div>
                     </div>
                   </div>
                   
                })}
              </div>
              
          </div>
          <UpdateChapterModal 
          show={updateMode}
          onClose={() => setUpdateMode(false)} 
          chapterId={selectedChapter._id} 
          onUpdate={loadData} 
          chapterTitle={selectedChapter.title} 
          chapterDescription={selectedChapter.description} 
          courseId={courseId} 
        />
    </>
  )
}
