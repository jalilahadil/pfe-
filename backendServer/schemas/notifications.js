const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  notificationDate: { type: String },
  notificationTitle: { type: String },
  notificationDescription: { type: String },
  notificationReceiver: { type: String }
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports=Notification