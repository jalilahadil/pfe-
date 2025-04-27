import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { useParams } from 'react-router'
import { useState } from 'react'
import axios from "axios"
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdStart } from "react-icons/md";
import { SiExercism } from "react-icons/si";



import { Link } from 'react-router-dom'
export default function ManageChapter() {
    const chapterId = useParams().id;
    const [course, setCourse] = useState({});
    const [error, setError] = useState("");
    
    const [selectedLesson, setSelectedLesson] = useState({});
    const [updateMode, setUpdateMode] = useState({});
    const deleteLesson = (lessonId) => {
        axios.delete("http://localhost:8080/lessons/deleteOne/" + lessonId)
            .then(response => {
                console.log(response)

                loadData()
            })
            .catch(error => {
                setError(error)

            })
    }
    const [lessons, setLessons] = useState([])
    const role = localStorage.getItem("role")
    const user = JSON.parse(localStorage.getItem("user"))
    const [chapter, setChapter] = useState({})
    const [subscribe, setSubscribe] = useState([])
    const loadData = () => {
        axios.get("http://localhost:8080/chapters/getById/" + chapterId)
            .then(response => {
                setChapter(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
        axios.get("http://localhost:8080/lessons/getByChapterId/" + chapterId)
            .then(response => {
                setLessons(response.data)
                loadSubscription()
            })
            .catch(error => {
                console.log(error)
                setError(error.response.data.error)
                setLessons([])
            })
    }
    const loadSubscription = () => {
        console.log("course", course)
        console.log("chapter", chapter)
        console.log("user", user._id)
        axios.get("http://localhost:8080/subscriptions/getCoursebyDetails/" + user._id + "/" + chapter.courseId)
            .then(response => {
                console.log("the suuuuuuuub is ", response.data)
                setSubscribe(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const getYoutubeThumbnail = (url) => {
        const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "https://placehold.co/600x400";
    };
    useEffect(() => {
        loadData()

    }, [user._id])
    return (

        <>
            <Navbar color="var(--mainColor)"></Navbar>
            <div className="container-xxl py-5 category">
                <div className="container">
                    <h3 className='text-center text-primary'>Cours : {chapter.title}</h3>
                    <p className="text-center">{course.description}</p>
                </div>

                <div className="text-center mb-5">
                    <h6 className="section-title bg-white text-center specialText px-3">Leçons</h6>
                    <h1 className="mb-5">Gérer les Leçons</h1>
                    <div className=" d-flex justify-content-center">
                        <Link className="btn btn-primary mx-2 p-1" style={{ textDecoration: "none", color: "#fff" }} to={`/lesson/addNewOne/${chapterId}`}>
                            Ajouter une nouvelle Leçon
                        </Link>
                    </div>

                </div>
                {error != "" && <p className="alert alert-danger">{error}</p>}
                <div className="row d-flex justify-content-center">
                    {lessons.map((lesson, index) => (
                        <div className="card shadow-sm border-0 rounded-4" key={index} style={{ maxWidth: "26rem" }}>
                            <img
                                src={getYoutubeThumbnail(lesson.attachmentLink)}
                                className="card-img-top"
                                alt="Lesson"
                                style={{ height: "12rem", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-2">
                                    {lesson.title}
                                    {subscribe.terminatedLessons && subscribe.terminatedLessons.indexOf(lesson._id) !== -1 && (
                                        <span className="ms-2 text-success">
                                            <FaCheckCircle />
                                        </span>
                                    )}
                                </h5>
                                <p className="card-text text-muted small">{lesson.description}</p>
                                




                                <div className="actions d-flex column-gap-2 flex-wrap justify-content-center ">
                                    {(course.creatorId==user._id || role=="admin" ) && 
                                    <button className="btn btn-danger mx-2 my-1 p-1" onClick={() => deleteLesson(lesson._id)}>
                                    <MdDelete className='mx-1 fs-4'/> Supprimer 
                                        </button>}
                                    {(course.creatorId==user._id || role=="admin" ) && 
                                        <button className="btn btn-warning mx-2 my-1 p-1" onClick={() => { setSelectedLesson(lesson); setUpdateMode(true); }}>
                                        <Link className=" mx-2 p-1"
                                        style={{ textDecoration: "none", color: "#fff" }}
                                        to={"/lesson/updateLesson/" + lesson._id}>
                                        <MdEdit className='mx-1 fs-4'/> Modifier 
                                    </Link>
                                          </button>}
                                    { role=="student"  &&    
                                    <Link className="btn btn-primary  my-1 mx-2 p-1" style={{ textDecoration: "none", color: "#fff" }} to={`/lesson/viewLesson/${lesson._id}/${chapter.courseId}/${chapter._id}`}>
                                    <MdStart className='mx-1 fs-4'/>  Commencer 
                                    </Link>
                                    }
                                    { role=="student"  &&  
                                    <Link className="btn btn-dark  my-1 mx-2 p-1" style={{ textDecoration: "none", color: "#fff" }} to={`/lesson/viewLessonExercices/${lesson._id}`}>
                                    <SiExercism className='mx-1 fs-4'/>  Exercices
                                    </Link>
                                    &&
                                    <Link className="btn btn-info  my-1 mx-2 p-1" style={{ textDecoration: "none", color: "#fff" }} to={`/quiz/lessonQuizs/${lesson._id}`}>
                                    <SiExercism className='mx-1 fs-4'/>  Quizz
                                    </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}
