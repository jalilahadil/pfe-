import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function AddCourse(props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    creatorId: "",
    duration: "",
    chapters: "",
    lessonsCount: "",
    price: ""
  });
  const [isShown,setIsShown]=useState(false)
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));

  const [categories, setCategories] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const sendNotification=()=>{
    const message = `Un nouveau cours a été ajouté ! Veuillez consulter vos cours si vous souhaitez y participer.`;
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
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      ...form,
      chapters: form.chapters.split(",").map((chap) => chap.trim())
    };
    saveNewCourse(courseData);
  };
  const saveNewCourse=(courseData)=>{
   
    courseData["creatorId"]= user._id
    axios.post("http://localhost:8080/courses/addCourse",courseData)
    .then((response)=>{
        console.log(response)
        sendNotification()
        setIsShown(false)
        props.onUpdate()
        
    })
    .catch((error)=>{
        console.log(error)
        setIsShown(false)
    })
  }
  // Fetch categories from the API
  const loadCategories = () => {
    axios
      .get("http://localhost:8080/categories/getAllCategories/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadCategories();
  }, [role]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
       onClick={()=>{setIsShown(true)}}
      >
        <FaPlus className="fs-5 mx-2"></FaPlus>
        Ajouter un cours
      </button>
    {isShown &&
      <div
        className="modal fade show d-block"
        id="courseModal"
        tabIndex="-1"
        aria-labelledby="courseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="courseModalLabel">
                Ajouter un nouveau cours
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="courseForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Titre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="categoryId" className="form-label">
                    Catégorie
                  </label>
                  <select
                    className="form-select"
                    id="categoryId"
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                

                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">
                    Durée (ex: 1h 30min)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="chapters" className="form-label">
                    Chapitres (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="chapters"
                    name="chapters"
                    value={form.chapters}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lessonsCount" className="form-label">
                    Nombre de leçons
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="lessonsCount"
                    name="lessonsCount"
                    value={form.lessonsCount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Prix
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={()=>{setIsShown(false)}}
              >
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div> }
    </>
  );
}
