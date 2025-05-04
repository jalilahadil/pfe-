import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useParams } from 'react-router';
import axios from 'axios';
import AddQuestion from '../components/addQuestion';
import { useNavigate } from 'react-router';
const QuizPage = () => {
  const quizId = useParams().quizId;
  const navigate=useNavigate()
  const [questions, setQuestions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [answers, setAnswers] = useState({});
  const role=localStorage.getItem("role")
  // Load questions from the API
  const loadQuestions = () => {
    axios
      .get(`http://localhost:8080/questions/getByQuizId/${quizId}`)
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle option change for the selected answer
  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  // Calculate total points based on the user's answers
  const calculateTotalPoints = () => {
    let points = 0;
    questions.forEach((question) => {
      if (answers[question._id] === question.correctAnswer) {
        points += question.points; 
      }
    });
    setTotalPoints(points); // Set total points after checking answers
  };
  const updateQuestion=(questionId)=>{

  }
  const deleteQuestion=(questionId)=>{
    axios.delete("http://localhost:8080/questions/deleteOne/"+questionId)
    .then((response)=>{
      console.log(response)
      loadQuestions()
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  const sendNotification=()=>{
    const message = `Votre réponse a été bien enregistrée !`;
    const date=new Date().toISOString()
    const title ="Alerte !  "
    const waring={
      notificationDate:date,
      notificationTitle:title,
      notificationDescription:message,
      notificationReceiver:"All",
    }
    console.log(waring)
    axios.post("http://localhost:8080/notifications/postNotifications/",waring)
    .then((response)=>{
      console.log(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
  };
  // Handle form submission
  const handleSubmit = (e) => {
    setTotalPoints(0)
    e.preventDefault();
    console.log('User answers:', answers);
    calculateTotalPoints(); // Calculate points on submission
    alert(`Quiz submitted! Your total score is ${totalPoints} points.`);
    const data={
      totalPoints:totalPoints,
      quizId:quizId,
      responseDate:((new Date())).toString(),
      studentId:JSON.parse(localStorage.getItem("user"))._id
    }
    axios.post("http://localhost:8080/quizReponse/addResponse/",data)
    .then((response)=>{
      console.log(response.data)
      sendNotification()
      navigate("/myQuizes")
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  // Load questions when the component mounts or quizId changes
  useEffect(() => {
    loadQuestions();
  }, [quizId]);

  return (
    <>
      <Navbar color="var(--mainColor)" />
      <div className="container mt-5" style={{ zIndex: '1' }}>
        <h1 className="mb-4">Quiz</h1>
        {role!="student" && 
        <AddQuestion quizId={quizId} onAddQuestion={loadQuestions} />
        }
        <form onSubmit={handleSubmit}>
          {questions.map((question, idx) => (
            <div key={question.id} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  {idx + 1}. {question.text} ({question.points} Points)
                </h5>
                <div className="mt-3">
                  {question.options.map((option, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question-${question._id}`} // Ensuring each question has a unique name
                        id={`q${question.id}-option${index}`}
                        value={option}
                        onChange={() => handleOptionChange(question._id, option)} // Update state on change
                        checked={answers[question._id] === option} // Check if this option is selected
                        required
                      />
                      <label className="form-check-label" htmlFor={`q${question.id}-option${index}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {role!="student" && 
              <div className="actions p-2">
                <button type="button" className="btn btn-warning mx-2" onClick={()=>{updateQuestion(question._id)}}>
                  Modifier Question
                </button>
                <button type="button" className="btn btn-danger" onClick={()=>{deleteQuestion(question._id)}}>
                  Supprimer Question
                </button>
              </div>
              }
            </div>
          ))}
          {role=="student" && 
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success btn-lg">
              Soumettre Quiz
            </button>
          </div>
          }
        </form>
        {role=="student" &&   totalPoints > 0 && (
          <div className="mt-4 text-center">
            <h3>Total Points: {totalPoints}</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
