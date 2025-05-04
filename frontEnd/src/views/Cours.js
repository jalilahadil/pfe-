import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import courseImage from "../assets/KID ROCK.png"
import "./styles/coursesPage.css"
import CategoryBox from '../components/categoryBox';
import axios from 'axios';
import Navbar from '../components/navbar';
import AddCategory from '../components/addCategory';
import AddCourse from '../components/addCourse';
function PersonalProfileCours() {
  const [show, setShow] = useState(false);
  const [courses,setCourses]=useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  const [categories,setCategories]=useState([]);
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
  const loadCourses=()=>{
    axios.get("http://localhost:8080/courses/getAllCourses/")
    .then((response)=>{
      console.log(response.data)
      setCourses(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    loadCategories();
    loadCourses();
  },[user.userId])





  

  return (
    <>
    
    <Navbar color="var(--mainColor)"></Navbar>

    {role=="admin" && 
      <div className="container-xxl py-5 category">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="section-title bg-white text-center specialText px-3">Catégories</h6>
            <h1 className="mb-5">Catégories des cours</h1>
          </div>
          <AddCategory onUpdate={()=>{loadCategories()}}></AddCategory>
          <div className="row g-3">
          {categories.map((category,index)=>{
            return <CategoryBox category={category} key={index} onUpdate={loadCategories}></CategoryBox>
          })}

          </div>
        </div>
      </div>
    }
      <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center specialText px-3">Courses</h6>
          <h1 className="mb-5">Popular Courses</h1>
            
        </div>
        <div className="container-fluid d-flex justify-content-center p-2 ">
        {role!="student" && 
        <AddCourse onUpdate={()=>{loadCourses()}}></AddCourse>
        }
        </div>
        <div className="row g-4 justify-content-center">
  {courses.map((course, index) => (
    <div className="col-lg-4 col-md-6 wow fadeInUp" key={index}>
      <div className="course-item bg-light">
        <div className="position-relative overflow-hidden">
          <img className="img-fluid" src={courseImage} alt={`Course ${index + 1}`} />
          <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
            <a href={"/cours/courseDetails/"+course._id} className="flex-shrink-0 btn btn-sm specialButton px-3" style={{ borderRadius: '30px' }}>Voir les détails</a>
          </div>
        </div>
        <div className="text-center p-4 pb-0">
          <h3 className="mb-0">{course.price} $</h3>
          <h5 className="mb-4">{course.title}</h5>
        </div>
        <div className="d-flex border-top">
          <small className="flex-fill text-center border-end py-2">
            <i className="fa fa-user-tie specialText me-2"></i>
            {course.chapters.length} Chapitres
          </small>
          <small className="flex-fill text-center border-end py-2">
            <i className="fa fa-clock specialText me-2"></i>{course.duration}
          </small>
          <small className="flex-fill text-center py-2">
            <i className="fa fa-user specialText me-2"></i>{course.lessonsCount} Leçons
          </small>
        </div>
      </div>
    </div>
  ))}
</div>

      </div>
      
    </div>
    </>
  );
}

export default PersonalProfileCours;
