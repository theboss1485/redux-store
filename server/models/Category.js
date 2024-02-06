

const mongoose = require('mongoose');

const { Schema } = mongoose;

// This file defines the Category model for this application.
const categorySchema = new Schema({

    name: {
        
        type: String,
        required: true,
        trim: true
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
