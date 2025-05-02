import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

export default function Subscribtion() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [subs, setSubs] = useState([]);

  const loadData = () => {
    axios.get("http://localhost:8080/subscriptions/getAllSubDetailed/")
      .then((response) => {
        console.log(response.data);
        setSubs(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des abonnements :", error);
      });
  };
  const deleteSubscribe=(subscribeId)=>{
    console.log(subscribeId)
    axios.delete("http://localhost:8080/subscriptions/deleteOne/"+subscribeId)
    .then(response=>{
        console.log(response)
        loadData()
    })
    .catch(error=>{
        console.log(error)
    }) 
  }
  useEffect(() => {
    loadData();
  }, [user?.id]);

  return (
    <>
      <Navbar color="var(--mainColor)" />

      <div className="container mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Étudiant</th>
              <th scope="col">Enseignant</th>
              <th scope="col">Cours</th>
              <th scope="col">Date d’abonnement</th>
              <th scope="col">Statut d’abonnement</th>
              <th scope="col">Total des points</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subs.map.length>0 &&  subs.map((subscribe, index) => (
              <tr key={index}>
                <td>{subscribe.studentInfo?.userFirstName} {subscribe.studentInfo?.userLastName}</td>
                <td>
                  {subscribe.courseInfo?.creatorInfo?.userFirstName
                    ? `${subscribe.courseInfo.creatorInfo.userFirstName} ${subscribe.courseInfo.creatorInfo.userLastName}`
                    : 'N/A'}
                </td>
                <td>{(subscribe.courseInfo.title) }</td>
                <td>{new Date(subscribe.subscribedAt).toLocaleDateString()}</td>
                <td>{subscribe.subscribedStatus}</td>
                <td>{subscribe.totalPoints}</td>
                <td><button className="btn btn-danger" onClick={()=>{deleteSubscribe(subscribe._id)}}>Supprimer l'abonnement</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
