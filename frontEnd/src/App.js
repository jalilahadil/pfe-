import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import LatestNews from './views/LatestNews';
import OurGallery from './views/ourGallery';
import AskUs from './views/askUs';
import OurServices from './views/ourServices';
import Login from "./views/login/Login"
import Signup from "./views/Signup"
import Profile from "./views/ProfilePage"
import NotificationManager from './views/notification';
import Cours from './views/Cours.js';
import CourseDetails from './views/CourseDetails.js';
import Etudiants from './views/etudiants.js';
import Teachers from './views/teachers.js';
import MyCourses from './views/myCourses.js';
import CourseStructure from "./views/manageCourse.js"
import ManageChapter from "./views/manageChapter.js"
import AddNewLesson from './components/addNewLesson.js';
import DisplayLesson from './components/displayLesson.js';
import UpdateLesson from './components/updateLesson.js';
import Subscribtion from './views/Subscribtion.js';
import Exercices from './views/Exercices.js';
import SolveExercice from './solveExercice.js';
import MyExercices from './views/myExercices.js';

function App() {
  return (
    <>
      <Routes>
        
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<LandingPage />} />
        <Route path='/gallery' element={<OurGallery />} /> 
        <Route path='/latestNews' element={<LatestNews />} /> 
        <Route path='/askUs' element={<AskUs />} /> 
        <Route path='/services' element={<OurServices />} /> 
        <Route path='/login' element={<Login />} /> 
        <Route path='/signup' element={<Signup />} /> 
        <Route path='/profile' element={<Profile />} /> 
        <Route path='/notification' element={<NotificationManager />} /> 
        <Route path='/cours' element={<Cours />} /> 
        <Route path='/cours/courseDetails/:id' element={<CourseDetails />} /> 
        <Route path='/etudiants' element={<Etudiants />} /> 
        <Route path='/enseignants' element={<Teachers />} /> 
        <Route path='/myCourses' element={<MyCourses />} /> 
        <Route path='/cours/updateCourse/:id' element={<CourseStructure />} /> 
        <Route path='/chapter/manageContent/:id' element={<ManageChapter />} /> 
        <Route path='/lesson/addNewOne/:id' element={<AddNewLesson />} /> 
        <Route path='/lesson/viewLesson/:id/:courseId/:chapterId' element={<DisplayLesson />} /> 
        <Route path='/lesson/viewLessonExercices/:id' element={<Exercices />} /> 
        <Route path='/lesson/updateLesson/:id/' element={<UpdateLesson />} /> 
        <Route path='/subscribtion/' element={<Subscribtion />} /> 
        <Route path='/exercice/solveExercice/:id' element={<SolveExercice />} /> 
        <Route path='/exercice/myExercices/' element={<MyExercices />} /> 
        
        
      </Routes>
    </>
  );
}

export default App;
