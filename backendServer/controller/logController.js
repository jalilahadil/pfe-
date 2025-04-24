const Log=require("../schemas/logSchema");
// 🔍 Search: Retrieves login history by user ID
const getLoginHistoryByUserId = async (req, res) => {
    try {
        const loginHistory = await LoginHistory.find({ userId: req.params.userId });

        if (!loginHistory || loginHistory.length === 0) {
            return res.status(404).json({ error: "No login history found for this user" });
        }

        res.status(200).json(loginHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves login history by its unique ID
const getLoginHistoryById = async (req, res) => {
    try {
        const history = await LoginHistory.findById(req.params.id);

        if (!history) {
            return res.status(404).json({ error: "Login history not found" });
        }

        res.status(200).json(history);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all login histories from the database
const getAllLoginHistories = async (req, res) => {
    try {
        const loginHistories = await LoginHistory.find();
        res.status(200).json(loginHistories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ❌ Delete: Deletes a login history record by its unique ID
const deleteLoginHistory = async (req, res) => {
    try {
        const history = await LoginHistory.findByIdAndDelete(req.params.id);

        if (!history) {
            return res.status(404).json({ error: "Login history not found" });
        }

        res.status(200).json({ message: "Login history deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates login history with new data
const updateLoginHistory = async (req, res) => {
    try {
        const { loginTimestamp, logoutTimestamp } = req.body;

        const updatedHistory = await LoginHistory.findByIdAndUpdate(
            req.params.id,
            { loginTimestamp, logoutTimestamp },
            { new: true, runValidators: true }
        );

        if (!updatedHistory) {
            return res.status(404).json({ error: "Login history not found" });
        }

        res.status(200).json(updatedHistory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports={
    getLoginHistoryByUserId,
    getLoginHistoryById,
    getAllLoginHistories,
    deleteLoginHistory,
    updateLoginHistory,
}