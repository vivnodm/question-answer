const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        unique: true
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;