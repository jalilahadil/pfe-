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
  const isLoggedIn = role !== null; // Check if the user is logged in (you can refine this based on your authentication logic)
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
        element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path='/notification'
        element={isLoggedIn ? <NotificationManager /> : <Navigate to="/login" />}
      />
      <Route
        path='/cours'
        element={isLoggedIn ? <Cours /> : <Navigate to="/login" />}
      />
      <Route
        path='/cours/courseDetails/:id'
        element={isLoggedIn ? <CourseDetails /> : <Navigate to="/login" />}
      />
      <Route
        path='/etudiants'
        element={isLoggedIn ? <Etudiants /> : <Navigate to="/login" />}
      />
      <Route
        path='/enseignants'
        element={isLoggedIn ? <Teachers /> : <Navigate to="/login" />}
      />
      <Route
        path='/myCourses'
        element={isLoggedIn ? <MyCourses /> : <Navigate to="/login" />}
      />
      <Route
        path='/cours/updateCourse/:id'
        element={isLoggedIn ? <CourseStructure /> : <Navigate to="/login" />}
      />
      <Route
        path='/chapter/manageContent/:id'
        element={isLoggedIn ? <ManageChapter /> : <Navigate to="/login" />}
      />
      <Route
        path='/lesson/addNewOne/:id'
        element={isLoggedIn ? <AddNewLesson /> : <Navigate to="/login" />}
      />
      <Route
        path='/lesson/viewLesson/:id/:courseId/:chapterId'
        element={isLoggedIn ? <DisplayLesson /> : <Navigate to="/login" />}
      />
      <Route
        path='/lesson/viewLessonExercices/:id'
        element={isLoggedIn ? <Exercices /> : <Navigate to="/login" />}
      />
      <Route
        path='/lesson/updateLesson/:id/'
        element={isLoggedIn ? <UpdateLesson /> : <Navigate to="/login" />}
      />
      <Route
        path='/subscribtion/'
        element={isLoggedIn ? <Subscribtion /> : <Navigate to="/login" />}
      />
      <Route
        path='/exercice/solveExercice/:id'
        element={isLoggedIn ? <SolveExercice /> : <Navigate to="/login" />}
      />
      <Route
        path='/exercice/myExercices/'
        element={isLoggedIn ? <MyExercices /> : <Navigate to="/login" />}
      />
      <Route
        path='/quiz/lessonQuizs/:lessonId'
        element={isLoggedIn ? <CourseQuiz /> : <Navigate to="/login" />}
      />
      <Route
        path='/quiz/displayQuiz/:quizId'
        element={isLoggedIn ? <DisplayQuiz /> : <Navigate to="/login" />}
      />
      <Route
        path='/myQuizes'
        element={isLoggedIn ? <MyQuizes /> : <Navigate to="/login" />}
      />
      <Route
        path='/dashboard'
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
