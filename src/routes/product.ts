import express from 'express';
import multer from 'multer';
import { Request, Response } from 'express';

import {
    uploadProductImage,
    categoryEdit,
    fetchCategory,
    createProduct,
    loadProducts,
    deleteCategory,
    deleteProduct,
    deleteSingleImage,
    fetchProductsRelevantToCategoryRequest,
    updateProductValues, loadBestProducts, getProductFromId
} from '../controllers/product';
import { imageFileType } from '../middleware/types';
import { v4 } from 'uuid';
import { authorization } from '../middleware/authorization';

const router = express.Router();


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/images/');  // Folder where the file will be saved
    },
    filename: function (req, file, cb) {
        // console.log(file)
        return cb(null, `${Date.now()}-${v4()}${imageFileType(file.mimetype)}`);  // File naming convention
    }
});

// Initialize multer with storage options
const upload = multer({storage: storage});

// POST route to handle file upload
router.post('/uploadImage', upload.array("file"), uploadProductImage);

router.post('/editCategory', authorization, categoryEdit)

router.get('/fetchCategories', authorization, fetchCategory)

router.post('/createProduct', authorization, createProduct)

router.get('/loadProducts', authorization, loadProducts)

router.delete('/deleteCategory/:catId',authorization, deleteCategory)

router.delete('/deleteProduct/:productId/:confirm', authorization, deleteProduct)

router.delete('/deleteSingleImage/:imageId', authorization, deleteSingleImage)

router.get('/fetchProductsOfCategory/:catId',authorization,fetchProductsRelevantToCategoryRequest)

router.get('/getBestProducts/',authorization,loadBestProducts)

router.put('/updateProduct', authorization, updateProductValues)

router.get('/getProductFromId/:productId', authorization, getProductFromId)


export default router;
