import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import bgImage from "../assets/img/undraw_online-learning_tgmv.png"
export default function CategoryBox(props) {
    const [category,setCategory]=useState(props.category)
    const formatDateToFrench=(timestamp)=> {
        const date = new Date(Number(timestamp)); // make sure it's a number
        const day = String(date.getDate()).padStart(2, '0');     // jj
        const month = String(date.getMonth() + 1).padStart(2, '0'); // mm
        const year = date.getFullYear();                         // aaaa

        return `${day}-${month}-${year}`;
        }
    const removeCategory=(categoryId)=>{
        axios.delete("http://localhost:8080/categories/deleteOne/"+categoryId)
        .then(response=>{
            console.log(response)
            props.onUpdate()
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const [showModal, setShowModal] = useState(false);
const [selectedCategory, setSelectedCategory] = useState(null);
const [formData, setFormData] = useState({ categoryName: "", categoryDescription: "" });
const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription
    });
    setShowModal(true);
  };
  const updateCategory=(categoryId,categoryData)=>{
    axios.put("http://localhost:8080/categories/updateOne/"+categoryId,categoryData)
    .then((response)=>{
        console.log(response)
        
    })
    .catch((error)=>{
        console.log(error)
    })
  }
  const handleUpdateCategory = async () => {
    try {
      // Make your update API call here
      await updateCategory(selectedCategory._id, formData);
      setShowModal(false);
      props.onUpdate()
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  
  return (
    <div className="col-lg-4 col-md-6 wow fadeInUp" >
      <div className="course-item bg-light">
        <div className="position-relative overflow-hidden">
          <img className="img-fluid" src={bgImage}  />
       
        </div>
        <div className="text-center p-4 pb-0">
         
          <h5 className="mb-4">{category.categoryName}</h5>
          <p className="mb-4 " style={{height:"50px",overflow:"hiden"}}>{category.categoryDescription}</p>
        </div>
        <div className="d-flex border-top">
          <small className="flex-fill text-center border-end py-2">
            <i className="fa fa-user-tie specialText me-2"></i>Pr Jane Smith
          </small>
          <small className="flex-fill text-center border-end py-2">
            <i className="fa fa-clock specialText me-2"></i>
            {formatDateToFrench(category.creationDate)}
          </small>
          <small className="flex-fill text-center py-2">
            <i className="fa fa-user specialText me-2"></i>45 Lessons
          </small>
        </div>
        <div className="d-flex border-top">
          <small className="flex-fill text-center border-end py-2">
            <button className='btn btn-danger '  onClick={()=>removeCategory(category._id)}>Supprimer Catégorie </button>
          </small>
          <small className="flex-fill text-center border-end py-2">
            <button className='btn btn-warning '  onClick={() => openUpdateModal(category)}>Modifier Catégorie </button>
          </small>
         
        </div>
      </div>
      {showModal && (
  <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
                value={formData.categoryName}
                onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.categoryDescription}
                onChange={(e) => setFormData({ ...formData, categoryDescription: e.target.value })}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
          <button type="button" className="btn btn-primary" onClick={handleUpdateCategory}>Mettre à jour</button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
    
  )
}
