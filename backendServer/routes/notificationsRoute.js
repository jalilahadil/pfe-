const express = require('express');
const router = express.Router();
const { getAllNotifications,
    getUserNotifications,
    deleteNotifications,postNotification
} = require('../controller/notificationController');

// Route to get all notifications
router.get('/notifications/getAllNotifications/', getAllNotifications);
// Route to post  new  notification
router.post('/notifications/postNotifications/', postNotification);

// Route to get all notifications of a specific User 
router.get('/notifications/getUserNotifications/:id', getUserNotifications);

// Route to get all notifications of a specific User 
router.delete('/notification/deleteNotification/:id', deleteNotifications);



module.exports = router;
