import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GiCubes } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import "./styles/Signup.css"
import signUpImage from "../assets/img/undraw_account_g3rf (1).png"
function SignupS() {
  const [formData, setFormData] = useState({
    userLastName: "",
    userFirstName: "",
    userBirthDate: "",
    userAge: "",
    userEmail: "",
    userPassword: "",
    userPhoneNumber: "",
    role: "Étudiant",
    userGender: "",
    userCountry: "",
    userCity: "",
    userAddress: "",
    specialty: "",
    teachingLevel: "",
    yearsOfExperience: "",
    educationLevel: "",
    school: "",
  });
  const  navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value, files } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    if(formData.role=="Enseignant")
    {
      try {
        const response = await axios.post("http://localhost:8080/teachers/addNewTeacher/", formData);
        console.log("Utilisateur créé :", response.data);
        navigate("/login")
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        alert("Erreur lors de l'inscription");

      }
    }
    else
      {
        try {
          const response = await axios.post("http://localhost:8080/students/addNewStudent/", formData);
          console.log("Utilisateur créé :", response.data);
          navigate("/login")
        } catch (error) {
          console.error("Erreur lors de l'inscription :", error);
          alert("Erreur lors de l'inscription");
        }
      }
    
  };

  return (

    <section className="sectionformContainer m-0 p-4 d-flex justify-content-center align-items-center " style={{ backgroundColor: "#3A3858", height: "100vh" }}>
      <div className="col formContainer" style={{ height: "fit-content" }}>
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            <div className="col-md-7 col-lg-5 d-none d-md-block d-flex justify-content-center align-items-center h-100">
              <img
                src={signUpImage}
                alt="login form"
                className="img-fluid"
                style={{ borderRadius: "1rem" }}
              />
            </div>

            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body  text-black w-100">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <GiCubes className="fs-2 mx-2" style={{ color: "var(--mainColor)" }} />
                    <span className="h1 fw-bold mb-0">Bienvenue</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                    Créer votre compte
                  </h5>

                  <div className="d-flex flex-wrap gap-3">
                    {/* Nom */}
                    <div className="form-outline">
                      <label className="form-label" htmlFor="nom">Nom</label>
                      <input
                        type="text"
                        id="nom"
                        name="userLastName"
                        className="form-control"
                        value={formData.userLastName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Prénom */}
                    <div className="form-outline">
                      <label className="form-label" htmlFor="prenom">Prénom</label>
                      <input
                        type="text"
                        id="prenom"
                        name="userFirstName"
                        className="form-control"
                        value={formData.userFirstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
{/* Date de naissance */}
<div className="form-outline">
  <label className="form-label" htmlFor="dateNaissance">Date de naissance</label>
  <input
    type="date"
    id="dateNaissance"
    name="userBirthDate"
    className="form-control"
    value={formData.userBirthDate}
    onChange={handleChange}
    required
  />
</div>

{/* Âge */}
<div className="form-outline">
  <label className="form-label" htmlFor="age">Âge</label>
  <input
    type="number"
    id="age"
    name="userAge"
    readOnly
    className="form-control"
    value={
      formData.userBirthDate
        ? new Date().getFullYear() - new Date(formData.userBirthDate).getFullYear()
        : ''
    }
    required
  />
</div>


                    {/* Email */}
                    <div className="form-outline">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="userEmail"
                        className="form-control"
                        value={formData.userEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Mot de passe */}
                    <div className="form-outline">
                      <label className="form-label" htmlFor="motDePasse">Mot de passe</label>
                      <input
                        type="password"
                        id="motDePasse"
                        name="userPassword"
                        className="form-control"
                        value={formData.userPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Numéro de téléphone */}
                    <div className="form-outline">
                      <label className="form-label" htmlFor="numeroTelephone">Numéro de téléphone</label>
                      <input
                        type="tel"
                        id="numeroTelephone"
                        name="userPhoneNumber"
                        className="form-control"
                        value={formData.userPhoneNumber}
                        onChange={handleChange}
                        required
                        maxLength={8}
                      />
                    </div>

                    {/* Rôle */}
                    <div className="form-outline">
                      <label className="form-label" htmlFor="role">Rôle</label>
                      <select
                        id="role"
                        name="role"
                        className="form-control"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="Enseignant">Enseignant</option>
                        <option value="Étudiant" selected>Étudiant</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-outline">
                    <label className="form-label" htmlFor="userGender">Sexe</label>
                    <select
                      id="userGender"
                      name="userGender"
                      className="form-control"
                      value={formData.userGender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                  </div>

                  <div className="d-flex flex-wrap gap-3 mt-2">
                    <div className="form-outline col">
                      <label className="form-label" htmlFor="userCountry">Pays</label>
                      <input
                        type="text"
                        id="userCountry"
                        name="userCountry"
                        className="form-control"
                        value={formData.userCountry}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-outline col">
                      <label className="form-label" htmlFor="userCity">Ville</label>
                      <input
                        type="text"
                        id="userCity"
                        name="userCity"
                        className="form-control"
                        value={formData.userCity}
                        onChange={handleChange}
                        required
                      />
                    </div>




                    <div className="form-outline col">
                      <label className="form-label" htmlFor="userAddress">Adresse</label>
                      <input
                        type="text"
                        id="userAddress"
                        name="userAddress"
                        className="form-control"
                        value={formData.userAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-3 mt-2 ">
                    
                    {formData.role == "Enseignant" &&
                      <div className="form-outline col">
                        <label className="form-label" htmlFor="specialty">Spécialité</label>
                        <input
                          type="text"
                          id="specialty"
                          name="specialty"
                          className="form-control"
                          value={formData.specialty}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    }
                    {formData.role == "Enseignant" &&
                      <div className="form-outline col">
                        <label className="form-label" htmlFor="teachingLevel">Niveau d'enseignement</label>
                        <input
                          type="text"
                          id="teachingLevel"
                          name="teachingLevel"
                          className="form-control"
                          value={formData.teachingLevel}
                          onChange={handleChange}
                          required
                        />
                      </div>

                    }
                    {formData.role == "Enseignant" &&
                      <div className="form-outline col">
                        <label className="form-label" htmlFor="yearsOfExperience">Années d'expérience</label>
                        <input
                          type="number"
                          id="yearsOfExperience"
                          name="yearsOfExperience"
                          className="form-control"
                          value={formData.yearsOfExperience}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    }

                    {formData.role == "Étudiant" &&
                      <div className="form-outline col">
                        <label className="form-label" htmlFor="educationLevel">Niveau d'éducation</label>
                        <input
                          type="text"
                          id="educationLevel"
                          name="educationLevel"
                          className="form-control"
                          value={formData.educationLevel}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    }
                    
                  </div>
                  <p className="  " style={{ color: "var(--mainColor)" }}>
                    Déjà un compte ?{" "}
                    <Link to="/Login" style={{ color: "var(--mainColor)" }}>
                      Login
                    </Link>
                  </p>
                  <div className="d-flex justify-content-center ">
                    <button type="submit" className="btn btn-primary btn-lg" style={{ backgroundColor: "var(--mainColor)", border: "none" }}>Créer votre compte</button>
                  </div>


                </form>
              </div>
            </div>


          </div>
        </div>
      </div>


    </section>

  );
}

export default SignupS;
