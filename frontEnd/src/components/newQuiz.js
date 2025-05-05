import React from 'react'
import { useState } from 'react'
import axios from 'axios'
export default function NewQuiz(props) {
    const lessonId = props.lessonId;
    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        lessonId: lessonId
    })
    const submitForm=()=>{
        axios.post("http://localhost:8080/quizzes/postNewQuiz/",quiz)
        .then((response)=>{
            console.log(response.data)
            props.onAddQuizz()
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createQuizModal">
                Créer un nouveau  Quiz
            </button>

            <div className="modal fade" id="createQuizModal" tabIndex="-1" aria-labelledby="createQuizModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form id="quizForm" onSubmit={submitForm}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="createQuizModalLabel">Create New Quiz</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                        onChange={(e) => {
                                            setQuiz((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label for="quizDescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="quizDescription" name="description" rows="3" required
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
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Quiz</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
