import React, { useRef, useState } from 'react';
import Navbar from './navbar';
import styles from './FileUploader.module.css';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function AddNewLesson() {
    const navigate=useNavigate()
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [videoLink, setVideoLink] = useState('');
  const chapterId=useParams().id
  const [lessonForm, setLessonForm] = useState({
    title: '',
    content: '',
    chapterId: chapterId,
    attachmentLink: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLessonForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', lessonForm);
    axios.post("http://localhost:8080/lessons/addOne/",lessonForm)
    .then(response=>{
        console.log(response)
        navigate("/chapter/manageContent/"+chapterId)
    })
    .catch((error)=>{
        console.log(error)
    })
  };

  return (
    <>
      <Navbar color="var(--mainColor)" />
      <h4 className='text-center p-3'>Create New Lesson</h4>
      <div className={styles.fileInputBox}>
        <small className={styles.smallText}>
            <p className="alert alert-warning">
            Please upload your video to YouTube as private or unlisted (so only people with the link can view it), then paste the video link in the form below.
            </p>
          <p className="text-center">Files Supported: MP4, MPEG, AVI , Video Tags Supported</p>
        </small>

       

        <div className={styles.linkInputSection}>
          <h5>Paste Video Link</h5>
          <input
            type="text"
            name="attachmentLink"
            className={"form-control " + styles.linkInput}
            value={lessonForm.attachmentLink}
            placeholder="https://example.com/video.mp4"
            onChange={handleInputChange}
            />


        </div>

        {lessonForm.attachmentLink.includes("youtube.com") && lessonForm.attachmentLink.includes("v=") && (
  <div className={styles.videoPreview}>
    <h5>Video Preview</h5>
    <iframe
      id="ytplayer"
      type="text/html"
      width="640"
      height="390"
      src={`https://www.youtube.com/embed/${lessonForm.attachmentLink.split('v=')[1].split('&')[0]}`}
      frameBorder="0"
      allowFullScreen
    />
  </div>
)}


        <div className={styles.formSection}>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={lessonForm.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={lessonForm.content}
                onChange={handleInputChange}
                required
              />
            </div>

         

            

            <div className={styles.submitButton}>
              <button type="submit">Create Lesson</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
