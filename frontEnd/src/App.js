import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import LatestNews from './views/LatestNews';
import OurGallery from './views/ourGallery';
import AskUs from './views/askUs';
import OurServices from './views/ourServices';
import Login from "./views/login/Login";
import Signup from "./views/Signup";
import Profile from "./views/ProfilePage";
import NotificationManager from './views/notification';
import Cours from './views/Cours.js';
import CourseDetails from './views/CourseDetails.js';
import Etudiants from './views/etudiants.js';
import Teachers from './views/teachers.js';
import MyCourses from './views/myCourses.js';
import CourseStructure from "./views/manageCourse.js";
import ManageChapter from "./views/manageChapter.js";
import AddNewLesson from './components/addNewLesson.js';
import DisplayLesson from './components/displayLesson.js';
import UpdateLesson from './components/updateLesson.js';
import Subscribtion from './views/Subscribtion.js';
import Exercices from './views/Exercices.js';
import SolveExercice from './solveExercice.js';
import MyExercices from './views/myExercices.js';
import DisplayQuiz from './views/displayQuiz.js';
import CourseQuiz from './views/courseQuiz.js';
import MyQuizes from './views/myQuizes.js';
import Dashboard from './views/dashboard.js';

function App() {
  const role = localStorage.getItem("role"); // or check if user is logged in
  const isLoggedIn = role != null; // Check if the user is logged in (you can refine this based on your authentication logic)
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<LandingPage />} />
      <Route path='/gallery' element={<OurGallery />} />
      <Route path='/latestNews' element={<LatestNews />} />
      <Route path='/askUs' element={<AskUs />} />
      <Route path='/services' element={<OurServices />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path='/profile'
        element={ <Profile />} 
      />
      <Route
        path='/notification'
        element={ <NotificationManager /> }
      />
      <Route
        path='/cours'
        element={ <Cours />}
      />
      <Route
        path='/cours/courseDetails/:id'
        element={ <CourseDetails /> }
      />
      <Route
        path='/etudiants'
        element={ <Etudiants /> }
      />
      <Route
        path='/enseignants'
        element={ <Teachers />}
      />
      <Route
        path='/myCourses'
        element={ <MyCourses /> }
      />
      <Route
        path='/cours/updateCourse/:id'
        element={<CourseStructure />}
      />
      <Route
        path='/chapter/manageContent/:id'
        element={ <ManageChapter /> }
      />
      <Route
        path='/lesson/addNewOne/:id'
        element={ <AddNewLesson /> }
      />
      <Route
        path='/lesson/viewLesson/:id/:courseId/:chapterId'
        element={ <DisplayLesson />}
      />
      <Route
        path='/lesson/viewLessonExercices/:id'
        element={<Exercices />}
      />
      <Route
        path='/lesson/updateLesson/:id/'
        element={ <UpdateLesson />}
      />
      <Route
        path='/subscribtion/'
        element={<Subscribtion /> }
      />
      <Route
        path='/exercice/solveExercice/:id'
        element={<SolveExercice /> }
      />
      <Route
        path='/exercice/myExercices/'
        element={<MyExercices /> }
      />
      <Route
        path='/quiz/lessonQuizs/:lessonId'
        element={<CourseQuiz /> }
      />
      <Route
        path='/quiz/displayQuiz/:quizId'
        element={<DisplayQuiz /> }
      />
      <Route
        path='/myQuizes'
        element={<MyQuizes /> }
      />
      <Route
        path='/dashboard'
        element={<Dashboard /> }
      />
    </Routes>
  );
}

export default App;
