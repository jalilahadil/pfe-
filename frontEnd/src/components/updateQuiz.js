import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UpdateQuiz(props) {
  const [quiz, setQuiz] = useState({
    title: props.title,
    description: props.description, // FIXED typo here
    id: props.quizId,
    lessonId: props.lessonId
  });
  const [isDisplay,setIsDisplay]=useState(props.isDisplay)
  useEffect(() => {
    setQuiz({
      title: props.title,
      description: props.description,
      id: props.quizId,
      lessonId: props.lessonId
    });
  }, [props.quizId, props.title, props.description, props.lessonId]);

  const submitForm = (e) => {
    e.preventDefault(); // prevent page reload
    axios.put("http://localhost:8080/quizzes/updateOne/" + quiz.id, quiz)
      .then((response) => {
        console.log(response.data);
        props.onUpdateQuiz(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isDisplay==true && <div className="modal fade show d-block" id="updateQuizModal" tabIndex="-1" aria-labelledby="updateQuizModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form id="quizForm" onSubmit={submitForm}>
              <div className="modal-header">
                <h5 className="modal-title" id="updateQuizModalLabel">Update Quiz</h5>
                <button type="button" onClick={()=>{props.onUpdateQuiz()}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="quizTitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="quizTitle"
                    name="title"
                    required
                    value={quiz.title}
                    onChange={(e) => {
                      setQuiz((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value
                      }));
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="quizDescription" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="quizDescription"
                    name="description"
                    rows="3"
                    required
                    value={quiz.description}
                    onChange={(e) => {
                      setQuiz((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value
                      }));
                    }}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{props.onUpdateQuiz()}}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>}
    </>
  );
}
