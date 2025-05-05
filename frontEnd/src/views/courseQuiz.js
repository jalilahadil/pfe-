import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import axios from "axios";
import NewQuiz from '../components/newQuiz';
import UpdateQuiz from "../components/updateQuiz";
import { useNavigate } from 'react-router-dom';
export default function CourseQuiz() {
  const { lessonId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  const [quizes, setQuizes] = useState([]);
  const [updateQuiz, setUpdateQuiz] = useState(null);
  const navigate=useNavigate("")
  const loadQuizzes = () => {
    console.log(lessonId);
    axios.get(`http://localhost:8080/quizzes/getByLessonId/${lessonId}`)
      .then(response => {
        console.log(response.data);
        setQuizes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteQuiz = (quizId) => {
    axios.delete(`http://localhost:8080/quizzes/deleteOne/${quizId}`)
      .then(response => {
        console.log(response.data);
        loadQuizzes();
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user && user._id) {
      loadQuizzes();
    }
  }, [user?._id]);

  return (
    <>
      <Navbar color="var(--mainColor)" />
      <div className="container-fluid py-5 category">
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="section-title bg-white text-center specialText px-3">Questions à Choix Multiples</h6>
            <h1 className="mb-5">Quiz</h1>
            {role!="student" && 
            <NewQuiz lessonId={lessonId} onAddQuizz={loadQuizzes} />}
          </div>
          <div className="row g-3">
            {quizes.length > 0 ? quizes.map((quiz, index) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" key={index}>
                <div className="course-item bg-light">
                  <div className="position-relative overflow-hidden">
                    <img className="img-fluid" src="https://placehold.co/600x400" alt="quiz" />
                  </div>
                  <div className="text-center p-4 pb-0">
                    <h4 className="mb-0">{quiz.title}</h4>
                  </div>
                  <div className="d-flex border-top">
                    <p className='p-2'>{quiz.description.slice(0, 50)}...</p>
                  </div>
                  <div className="d-flex justify-content-center p-3">
                    {role !="student" && <button className='btn btn-danger mx-2' onClick={() => deleteQuiz(quiz._id)}>Delete Quiz</button>}
                    {role =="student" && <button className='btn btn-primary mx-2' onClick={() => {navigate("/quiz/displayQuiz/"+quiz._id)}}>Start Quiz</button> }
                    {role !="student" && <button className='btn btn-primary mx-2' onClick={() => {navigate("/quiz/displayQuiz/"+quiz._id)}}>Manage Quiz</button>}
                    {role !="student" && <button className='btn btn-warning mx-2' onClick={() => setUpdateQuiz(quiz)}>Update Quiz</button>}
                  </div>
                </div>
              </div>
            )) : (
              <p className='alert alert-danger'>Pas encore de quiz pour cette leçon !</p>
            )}
          </div>

          {updateQuiz && (
  <UpdateQuiz
    onUpdateQuiz={() => {
      loadQuizzes();  
      setUpdateQuiz(null);
    }}
    isDisplay={updateQuiz != null}
    quizId={updateQuiz._id}
    title={updateQuiz.title}
    description={updateQuiz.description}
  />
)}

        </div>
      </div>
    </>
  );
}
