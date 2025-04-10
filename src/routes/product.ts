import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { uploadProductImage } from '../controllers/product';

const router = express.Router();

// Ensure uploadImage directory exists
if (!fs.existsSync('uploadImage')) {
    fs.mkdirSync('uploadImage');
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadImage/');  // Folder where the file will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // File naming convention
    }
});

// Initialize multer with storage options
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
        }
        cb(null, true);
    }
});

// POST route to handle file upload
router.post('/uploadImage', upload.single('file'), (req, res, next) => {
    uploadProductImage(req, res).catch(next);
});

export default router;
