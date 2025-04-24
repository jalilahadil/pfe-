// Login.js
import React, { useState } from "react";
import Cookies from 'universal-cookie';

import { useNavigate, Link } from "react-router-dom";
import  axios from "axios" ;
import loginImage from "../../assets/img/undraw_secure-login_m11a (1).png"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [correct, setCorrect] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        userEmail:email,
        userPassword:password,
      });
     
      
      if(response.data.message.indexOf("Login Error")!=-1)
      {
        console.log("login error")
        setError(response.data.message)
      }
      else 
      {
        console.log(response.data.message)
        setCorrect(response.data.message)
        setUser(response.data.userData);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", (response.data.role));
        const cookies = new Cookies();
        cookies.set('token', response.data.token, { path: '/' });
        navigate("/home") 
        
      }
      
      
    } catch (error) {
      console.error(error);
     
    }
  };

 
  return (
    <div>
      <section className="vh-100 m-0 p-0" style={{ backgroundColor: "#3A3858" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-7 col-lg-5 d-none d-md-block d-flex justify-content-center align-items-center h-100">
                    <img
                      src={loginImage}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem", maxHeight: "80%" }}
                    />
                  </div>

                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#FF69B4" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">Bienvenue</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                          Sign into your account
                        </h5>
                        {error!="" && <p className="alert alert-danger">{error}</p>}
                        {correct!="" && <p className="alert alert-success">{error}</p>}
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="email">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </div>
                    
                        <a className="small text-muted" href="#"> Mot de passe oublié?</a>
                        <p className="mb-5 pb-lg-2" style={{ color: "var(--mainColor)" }}>
                        Vous n'avez pas de compte ? {' '}
                          <Link to="/signup" style={{ color: "var(--mainColor)" }}>
                             Inscrivez-vous 
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
