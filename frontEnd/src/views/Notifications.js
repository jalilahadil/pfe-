import React, { useEffect, useState } from 'react';
import { Bell, Check } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/navbar';
import axios from 'axios';
const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"))._id; 


  const roseColor = '#833F92'; 
const loadNotifications=()=>{
  console.log(`http:///localhost:8080/notifications/getUserNotifications/${userId}`)
  setLoading(true);
    fetch(`http:///localhost:8080/notifications/getUserNotifications/${userId}`,{withCredentials:true})
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching notifications:', err);
        setLoading(false);
        // Provide fallback data for testing if API fails
        setNotifications([
          {
            _id: '1',
            title: 'Bienvenue!',
            message: 'Bienvenue sur notre plateforme.',
            date: "new Date().toISOString()",
            read: false
          },
          {
            _id: '2',
            title: 'Nouveau message',
            message: 'Vous avez reçu un nouveau message.',
            date: "new Date().toISOString()",
            read: false
          }
        ]);
      });
}
  // 🟢 Get Notifications
  useEffect(() => {
    loadNotifications()
  }, [userId]);

  const markAsRead = (notification) => {
    if(notification.notificationReceiver==userId)
    {
      axios.delete("http://localhost:3030/notification/deleteNotification/"+notification._id)
      .then((response)=>{
        console.log(response)
        loadNotifications()
      })
      .catch((error)=>{
        console.log(error)
      })
    }
   
  };

 

  // Custom style for rose theme
  const roseStyle = {
    heading: {
      color: roseColor
    },
    button: {
      backgroundColor: roseColor,
      borderColor: roseColor
    },
    outlineButton: {
      color: roseColor,
      borderColor: roseColor
    },
    alertBorder: {
      borderLeft: `4px solid ${roseColor}`
    }
  };

  return (
    <>
    <NavBar color="var(--mainColor)"></NavBar>
    <div className="container mt-5 d-block">
    <div className="text-center ">
          <h6 className="section-title bg-white specialText px-3">Notifications</h6>
          <h1 className="mb-5">Vos Notifications</h1>
          
        </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status" style={roseStyle.heading}>
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="alert alert-light text-center py-4">
          <Bell size={24} className="mb-2 text-secondary" />
          <p className="mb-0 text-secondary">Aucune notification pour le moment.</p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`alert d-flex justify-content-between align-items-center`}
              style={!notif.read ? roseStyle.alertBorder : {}}
            >
              <div>
                <h6 className="mb-1 fw-bold">{notif.notificationTitle}</h6>
                <p className="mb-0">{notif.notificationDescription}</p>
                <small className="text-muted">{new Date(notif.notificationDate).toLocaleString('fr-FR')}</small>
              </div>
              {notif.notificationReceiver==userId && (
                <button
                  className="btn btn-sm rounded-pill text-white"
                  onClick={() => markAsRead(notif)}
                  style={roseStyle.button}
                  type="button"
                >
                  Marquer comme lu
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default NotificationManager;