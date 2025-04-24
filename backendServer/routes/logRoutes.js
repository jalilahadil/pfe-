const express = require("express");
const router = express.Router();
const {
    getLoginHistoryByUserId,
    getLoginHistoryById,
    getAllLoginHistories,
    deleteLoginHistory,
    updateLoginHistory
} = require("../controller/logController");

// 🔍 Get login history by user ID
router.get("/loginHistory/user/:userId", getLoginHistoryByUserId);

// 🔍 Get login history by ID
router.get("/loginHistory/:id", getLoginHistoryById);

// 📜 Get all login histories
router.get("/loginHistory", getAllLoginHistories);

// ❌ Delete login history by ID
router.delete("/loginHistory/:id", deleteLoginHistory);

// 🔄 Update login history by ID
router.put("/loginHistory/:id", updateLoginHistory);

module.exports = router;
