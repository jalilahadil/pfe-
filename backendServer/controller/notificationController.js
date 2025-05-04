const Notification =require("../schemas/notifications")

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({notificationReceiver:"all"});
        if (notifications && notifications.length > 0) {
            res.status(200).json(notifications);
        } else {
            res.status(404).json({ message: "No notifications found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const getUserNotifications = async (req, res) => {
    try {
        const {id}=req.params;
        const notifications = await Notification.find({
            $or: [
              { notificationReceiver: id },
              { notificationReceiver: "All" }
            ]
          });
        if (notifications && notifications.length > 0) {
            res.status(200).json(notifications);
        } else {
            res.status(404).json({ message: "No notifications found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const saveNotification = async (notificationDate, notificationTitle, notificationDescription, notificationReceiver) => {
  if (!notificationDate || !notificationTitle || !notificationDescription || !notificationReceiver) {
    throw new Error("All fields are required.");
  }

  const newNotification = new Notification({
    notificationDate,
    notificationTitle,
    notificationDescription,
    notificationReceiver
  });
  console.log(newNotification)
  await newNotification.save();
  return true;
};
const postNotification=(req,res)=>{
    const {notificationDate, notificationTitle, notificationDescription, notificationReceiver}=req.body;
    try{
        saveNotification(notificationDate, notificationTitle, notificationDescription, notificationReceiver);
        res.status(200).json({message:"Operation success"})
    }
    catch(error)
    {
        res.status(500).json({message:"Operation Failed"})
    }
    
}
const deleteNotifications = async (req, res) => {
    try {
        const {id}=req.params;
        const notification = await Notification.findByIdAndDelete(id)
            res.status(200).json(notification);
        if(notification)
        {
            res.status(200).json({ message: "Notification Deleted" });
        }
        else {
            res.status(404).json({ message: "No notifications found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
module.exports={getAllNotifications,
    getUserNotifications,deleteNotifications,
    saveNotification,postNotification}