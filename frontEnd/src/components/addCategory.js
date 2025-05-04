import React from 'react'
import { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import axios from "axios"
export default function AddCategory(props) {
    const [formData,setFormData]=useState({});
    const [showModal,setShowModal]=useState(false)
    const handleAddCategory=()=>{
        axios.post("http://localhost:8080/categories/addCategory/",formData)
        .then((response)=>{
            console.log(response.data)
            props.onUpdate()
            setShowModal(false)
            const sendNotification=()=>{
                const message = `Une nouvelle catégorie de cours a été ajoutée ! Veuillez consulter vos cours si vous souhaitez y participer. `;
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
              sendNotification()
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <>
        <div className="text-center mb-5 d-flex flex-column align-items-center">
            <button className='btn btn-success' onClick={()=>{setShowModal(true)}}><FaPlus className="fs-4 mx-2"/>Créer une nouvelle catégorie</button>
        </div>
        {showModal && 
        <div className="modal show fade d-block " tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modifier la Catégorie</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Nom de la catégorie</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    
                                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    
                                    onChange={(e) => setFormData({ ...formData, categoryDescription: e.target.value })}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>{setShowModal(false)}}>
                            Annuler
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleAddCategory}>Créer une nouvelle catégorie

                        </button>
                    </div>
                </div>
            </div>
        </div>}
        </>
        
    )
}
