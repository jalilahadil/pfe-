const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryDescription: {
        type: String,
        required: true
    },
    categoryPhoto: {
        type: String,
        required: true,
        default: "https://placehold.co/400x250/png"
    },
    creationDate: {
        type: String,
        required: true,
        default: () => Date.now().toString()
    }
    
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;