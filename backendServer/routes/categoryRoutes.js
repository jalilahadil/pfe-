const express = require("express");
const router = express.Router();
const {
    getCategoryByName,
    getCategoryById,
    getAllCategories,
    deleteCategory,
    updateCategory,
    addCategory
} = require("../controller/categoryController"); // Adjust the path if needed

// 📜 Get all categories
router.get("/categories/getAllCategories/", getAllCategories);

// 🔍 Get category by name
router.get("/categories/getByName/:name", getCategoryByName);

// 🔍 Get category by ID
router.get("/categories/getById/:id", getCategoryById);

// 🔄 Update category
router.put("/categories/updateOne/:id", updateCategory);

// ❌ Delete category
router.delete("/categories/deleteOne/:id", deleteCategory);

// + Create category
router.post("/categories/addCategory/", addCategory);

module.exports = router;
