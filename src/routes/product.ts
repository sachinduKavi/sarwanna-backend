import express from 'express';
import multer from 'multer';
import { Request, Response } from 'express';
import { uploadProductImage } from '../controllers/product';
import { imageFileType } from '../middleware/types';
import { v4 } from 'uuid';

const router = express.Router();


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/images/');  // Folder where the file will be saved
    },
    filename: function (req, file, cb) {
        console.log(file)
        return cb(null, `${Date.now()}-${v4()}${imageFileType(file.mimetype)}`);  // File naming convention
    }
});

// Initialize multer with storage options
const upload = multer({storage: storage});

// POST route to handle file upload
router.post('/uploadImage', upload.array("file"), uploadProductImage);

export default router;
