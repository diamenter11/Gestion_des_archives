// models/document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: String, required: true },
    course: { type: String, required: true },
    department: { type: String, required: true },
    author: { type: String, required: true } ,// Changed to String type
    url: { type: String, required: true } 
}, { timestamps: true });

// Create a text index on the fields you want to search
documentSchema.index({ title: 'text', type: 'text', level: 'text', class: 'text', department: 'text', author: 'text' });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
