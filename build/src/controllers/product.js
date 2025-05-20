"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductFromId = exports.loadBestProducts = exports.updateProductValues = exports.fetchProductsRelevantToCategoryRequest = exports.deleteSingleImage = exports.deleteProduct = exports.deleteCategory = exports.loadProducts = exports.createProduct = exports.fetchCategory = exports.categoryEdit = exports.uploadProductImage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const Product_1 = require("../db/services/Product");
dotenv_1.default.config();
const uploadProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = false, content = null, message = null;
    // console.log(req.files)
    if (Array.isArray(req.files)) {
        content = req.files.map((element) => {
            return element.path.slice(7);
        });
        proceed = true;
    }
    else {
        message = 'Error';
    }
    res.status(201).json({
        proceed: proceed,
        content: content,
        message: message
    });
});
exports.uploadProductImage = uploadProductImage;
const categoryEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        yield database_1.default.insert(schema_1.category).values(req.body);
    }
    catch (e) {
        console.log(e);
        proceed = false;
        message = 'category update failed';
    }
    res.status(201).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.categoryEdit = categoryEdit;
const fetchCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('load product');
    let proceed = true, message = null, content = null;
    try {
        content = yield database_1.default.query.category.findMany({});
    }
    catch (e) {
        proceed = false;
        message = 'category update failed';
    }
    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.fetchCategory = fetchCategory;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        yield Product_1.ProductServices.createProduct(req.body);
    }
    catch (e) {
        console.error(e);
        proceed = false;
        message = 'transaction failed';
    }
    res.status(proceed ? 201 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.createProduct = createProduct;
const loadProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        content = yield Product_1.ProductServices.fetchProducts();
    }
    catch (e) {
        proceed = false;
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.loadProducts = loadProducts;
const loadBestProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        content = yield Product_1.ProductServices.fetchBestProducts();
        // console.log(content )
    }
    catch (e) {
        proceed = false;
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.loadBestProducts = loadBestProducts;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    console.log('delete category', req.params.catId);
    try {
        yield Product_1.ProductServices.deleteCategory(req.params.catId);
        message = 'category deleted';
    }
    catch (e) {
        proceed = false;
        message = 'server error';
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.deleteCategory = deleteCategory;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let proceed = true, message = null, content = null;
    try {
        yield Product_1.ProductServices.deleteProduct(req.params.productId, Boolean((_a = req.params.confirm) !== null && _a !== void 0 ? _a : false));
        message = 'product delete success';
    }
    catch (e) {
        message = 'server error';
        if (typeof e.message === 'string')
            message = e.message;
        proceed = false;
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.deleteProduct = deleteProduct;
const deleteSingleImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    console.log('delete single image');
    try {
        yield Product_1.ProductServices.deleteSingleImage(req.params.imageId);
    }
    catch (e) {
        console.log(e);
        proceed = false;
        message = 'server error';
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.deleteSingleImage = deleteSingleImage;
const fetchProductsRelevantToCategoryRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        content = yield Product_1.ProductServices.fetchProductsRelevantToCategoryRequest(req.params.catId);
        message = "fetch product complete";
    }
    catch (e) {
        proceed = false;
        message = "fetch product Failed";
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.fetchProductsRelevantToCategoryRequest = fetchProductsRelevantToCategoryRequest;
const getProductFromId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        content = yield Product_1.ProductServices.getProductFromId(req.params.productId);
        message = 'product load successfully';
    }
    catch (e) {
        console.log(e);
        proceed = false;
        message = 'server error';
    }
    res.status(proceed ? 200 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.getProductFromId = getProductFromId;
const updateProductValues = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let proceed = true, message = null, content = null;
    try {
        yield Product_1.ProductServices.updateProduct(req.body);
    }
    catch (e) {
        console.log(e);
        proceed = false;
        message = 'update fail';
    }
    res.status(proceed ? 201 : 500).json({
        proceed: proceed,
        message: message,
        content: content
    });
});
exports.updateProductValues = updateProductValues;
