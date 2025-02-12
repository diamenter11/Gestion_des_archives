// controllers/documentController.js
const fs = require('fs');
const Document = require('../models/document');
const path = require('path');

// Add a new document
exports.addDocument = async (req, res) => {
    try {
        const { title, type, level, course, department, author } = req.body;
        const fileUrl =  req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
       // const fileUrl = req.file.path; 
        // Create a new document with the file URL
        const newDocument = new Document({ title, type, level, course, department, author, url: fileUrl });
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        console.error('Error adding document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findById(documentId);
        // Delete the file from the server
        fs.unlinkSync(document.url);
        // Delete the document from the database
        await Document.findByIdAndDelete(documentId);
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Get a document by ID
exports.getDocumentById = async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findById(documentId);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        console.error('Error getting document by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Download a document
exports.downloadDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        // Assurez-vous que document.url contient le chemin complet ou relatif au fichier
        const filePath = path.resolve(__dirname, '..', 'uploads', document.url);

        // Set the appropriate headers for file download
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename=${document.title}`
        });

        // Send the file as a response
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error downloading document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Search documents
exports.searchDocuments = async (req, res) => {
    try {
        // Extract search query from request parameters
        const { query } = req.query;
        // Search documents based on the query
        const documents = await Document.find({ $text: { $search: query } });
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error searching documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Sort documents
exports.sortDocuments = async (req, res) => {
    try {
        // Extract sort criteria from request query parameters
        const { sortBy, sortOrder } = req.query;
        // Sort documents based on the criteria
        const documents = await Document.find().sort({ [sortBy]: sortOrder });
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error sorting documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Filter documents
exports.filterDocuments = async (req, res) => {
    try {
        // Extract filter criteria from request query parameters
        const { type, level, department } = req.query;
        // Construct filter object based on provided criteria
        const filter = {};
        if (type) filter.type = type;
        if (level) filter.level = level;
        if (department) filter.department = department;
        // Find documents matching the filter criteria
        const documents = await Document.find(filter);
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error filtering documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
