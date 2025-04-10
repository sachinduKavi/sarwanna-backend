import express from 'express';
import multer from 'multer';
import { uploadProductImage } from '../controllers/product';

const router = express.Router();


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/images/');  // Folder where the file will be saved
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);  // File naming convention
    }
});

// Initialize multer with storage options
const upload = multer({storage: storage});

// POST route to handle file upload
router.post('/uploadImage', upload.single('file'), uploadProductImage);

export default router;
