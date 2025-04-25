import React, { useEffect } from 'react'
import { RiShoppingBasketFill } from "react-icons/ri";
import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { MdOutlineContentCopy } from "react-icons/md";
import { useNavigate } from 'react-router';
import "./styles/coursesPage.css"
import Navbar from '../components/navbar'
import imageOne from "../assets/img/course-details.jpg"
import { useParams } from 'react-router';
import axios from "axios"
import { Link } from 'react-router-dom';

export default function CourseDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate()
  const role = (localStorage.getItem("role"));
  const courseId=useParams().id;
  const [course,setCourse]=useState({})
  const [isShown,setIsShown]=useState(false)
  const [selectedCourse,setSelectedCourse]=useState({});
  const updateCourse=()=>{
    axios.put("http://localhost:8080/courses/updateOne/"+selectedCourse._id,selectedCourse)
    .then(response=>{
      console.log(response.data)
      setIsShown(false)
      setCourse(selectedCourse)
    })
    .catch(error=>{
      console.log(error)
      setIsShown(false)
    })
  }
  const loadCourseDetails=()=>{
    axios.get("http://localhost:8080/courses/getById/"+courseId)
    .then(response=>{
      console.log(response)
      setCourse(response.data)
      
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  const deleteCourse=(courseId)=>{
    axios.delete("http://localhost:8080/courses/deleteOne/"+courseId)
    .then(response=>{
      console.log(response)
      navigate("/cours")
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const loadCategories=()=>{
    axios.get("http://localhost:8080/categories/getAllCategories/")
    .then((response)=>{
      console.log(response.data)
      setCategories(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  
  const [categories,setCategories]=useState()
  const subscribeToCourse=()=>{
    const courseId=course._id;
    const studentId=user._id
    const demand={courseId,
      studentId,
      subscribedStatus:"waiting"}
      axios.post("http://localhost:8080/subscriptions/postSubscription",demand)
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
  }
  useEffect(()=>{
    loadCourseDetails()
    loadCategories()
  },[user._id])
  return (
    <>
    <Navbar color="var(--mainColor)"></Navbar>
    <main className="main">


<div className="page-title" >
  <div className="heading my-5">
    <div className="container">
      <div className="row d-flex justify-content-center text-center">
        <div className="col-lg-8">
          <h5>Course Details</h5>
          <h3 style={{color:"var(--mainColor)"}}>{course.title}</h3>
          <p className="mb-0 fs-5">
            {course.description}
            </p>
        </div>
      </div>
    </div>
  </div>
  <nav className="breadcrumbs">
    <div className="container">
      <ol>
        <li><a href="index.html">Home/</a></li>
        <li className="current">Course Details/</li>
      </ol>
    </div>
  </nav>
</div>
<section id="courses-course-details" className="courses-course-details section">

  <div className="container" data-aos="fade-up">

    <div className="row">
      <div className="col-lg-8">
        <img src={imageOne} className="img-fluid" alt="" />
        <h3>{course.title}</h3>
        <p>
          {course.description}
        </p>
      </div>
      <div className="col-lg-4">

        <div className="course-info d-flex justify-content-between align-items-center">
          <h5>Course Duration</h5>
          <p>{course.duration}</p>
        </div>

        <div className="course-info d-flex justify-content-between align-items-center">
          <h5>Course Fee</h5>
          <p>{course.price} $</p>
        </div>

        <div className="course-info d-flex justify-content-between align-items-center">
          <h5>Course Lessons</h5>
          <p>{course.lessonsCount}</p>
        </div>
        
 
        <div className="col gap-2 d-flex flex-column">
            <button className="btn-danger btn" onClick={()=>{deleteCourse(course._id)}}> <MdDelete  className='fs-4 mx-2'/>Delete Course</button>
            <button className="btn-warning btn" onClick={()=>{setSelectedCourse(course);setIsShown(true)}}> <FaPen  className='fs-4 mx-2' />Update Course</button>
            <button className="btn-success btn" onClick={subscribeToCourse}> <FiSave className='fs-4 mx-2'/>Subscribe To Course</button>
            <button className="btn-primary btn">
            <Link style={{color:"#fff",textDecoration:"none"}} to={"/cours/updateCourse/"+course._id}>

               <MdOutlineContentCopy   className='fs-4 mx-2'/>
               Manage  Content
               </Link>
               </button>

            
 
        </div>

      </div>
    </div>

  </div>

</section>
{isShown && <div className="modal fade  show d-block" tabIndex="-1" role="dialog" id="courseModal">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="courseModalLabel">Modifier le cours</h5>
        <button
          type="button"
          className="btn-close"
          onClick={()=>{setIsShown(false)}}
        ></button>
      </div>
      <div className="modal-body">
      <form id="courseForm">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Titre</label>
    <input
      type="text"
      value={selectedCourse.title}
      className="form-control"
      id="title"
      name="title"
      onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <textarea
      className="form-control"
      id="description"
      name="description"
      rows="3"
      value={selectedCourse.description}
      onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
    ></textarea>
  </div>
  <div className="mb-3">
    <label htmlFor="categoryId" className="form-label">Catégorie</label>
    <select
      className="form-select"
      id="categoryId"
      name="categoryId"
      value={selectedCourse.categoryId}
      onChange={(e) => setSelectedCourse({ ...selectedCourse, categoryId: e.target.value })}
    >
      <option value="">Sélectionnez une catégorie</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.categoryName}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-3">
    <label htmlFor="duration" className="form-label">Durée (ex: 1h 30min)</label>
    <input
      type="text"
      className="form-control"
      id="duration"
      name="duration"
      value={selectedCourse.duration}
      onChange={(e) => setSelectedCourse({ ...selectedCourse, duration: e.target.value })}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="lessonsCount" className="form-label">Nombre de leçons</label>
    <input
      type="number"
      className="form-control"
      id="lessonsCount"
      name="lessonsCount"
      value={selectedCourse.lessonsCount}
      onChange={(e) => setSelectedCourse({ ...selectedCourse, lessonsCount: e.target.value })}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="price" className="form-label">Prix</label>
    <input
      type="number"
      className="form-control"
      id="price"
      name="price"
      value={selectedCourse.price}
      onChange={(e) => setSelectedCourse({ ...selectedCourse, price: e.target.value })}
    />
  </div>
</form>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={()=>{setIsShown(false)}}>Annuler</button>
        <button type="button" className="btn btn-primary" form="courseForm" onClick={()=>{updateCourse()}}>Modifier</button>
      </div>
    </div>
  </div>
</div>
}



</main>
    </>
  )
}
