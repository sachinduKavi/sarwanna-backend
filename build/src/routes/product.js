"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const product_1 = require("../controllers/product");
const types_1 = require("../middleware/types");
const uuid_1 = require("uuid");
const authorization_1 = require("../middleware/authorization");
const router = express_1.default.Router();
// Multer storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/images/'); // Folder where the file will be saved
    },
    filename: function (req, file, cb) {
        // console.log(file)
        return cb(null, `${Date.now()}-${(0, uuid_1.v4)()}${(0, types_1.imageFileType)(file.mimetype)}`); // File naming convention
    }
});
// Initialize multer with storage options
const upload = (0, multer_1.default)({ storage: storage });
// POST route to handle file upload
router.post('/uploadImage', upload.array("file"), product_1.uploadProductImage);
router.post('/editCategory', authorization_1.authorization, product_1.categoryEdit);
router.get('/fetchCategories', authorization_1.authorization, product_1.fetchCategory);
router.post('/createProduct', authorization_1.authorization, product_1.createProduct);
router.get('/loadProducts', authorization_1.authorization, product_1.loadProducts);
router.delete('/deleteCategory/:catId', authorization_1.authorization, product_1.deleteCategory);
router.delete('/deleteProduct/:productId/:confirm', authorization_1.authorization, product_1.deleteProduct);
router.delete('/deleteSingleImage/:imageId', authorization_1.authorization, product_1.deleteSingleImage);
router.get('/fetchProductsOfCategory/:catId', authorization_1.authorization, product_1.fetchProductsRelevantToCategoryRequest);
router.get('/getBestProducts/', authorization_1.authorization, product_1.loadBestProducts);
router.put('/updateProduct', authorization_1.authorization, product_1.updateProductValues);
exports.default = router;
