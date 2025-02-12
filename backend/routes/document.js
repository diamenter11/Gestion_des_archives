// routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const documentController = require('../controllers/document');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files will be saved
    },
    filename: function (req, file, cb) {
        // Generate a unique filename here, e.g., using Date.now()
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Add a new document
router.post('/add', upload.single('document'), documentController.addDocument);

// Delete a document
router.delete('/:documentId', documentController.deleteDocument);

// Get all documents
router.get('/', documentController.getAllDocuments);

// Get  documents by id
router.get('/:documentId', documentController.getDocumentById);

// Download a document
router.get('/:documentId/download', documentController.downloadDocument);

// Search documents
router.get('/search', documentController.searchDocuments);

// Sort documents
router.get('/sort', documentController.sortDocuments);

// Filter documents
router.get('/filter', documentController.filterDocuments);

module.exports = router;
