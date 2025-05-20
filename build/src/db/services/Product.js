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
exports.ProductServices = void 0;
const database_1 = __importDefault(require("../database"));
const schema_1 = require("../schema");
const crypto_1 = require("crypto");
const drizzle_orm_1 = require("drizzle-orm");
const fileHandling_1 = require("../../middleware/fileHandling");
class ProductServices {
    static createProduct(values) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create transaction 
            const result = yield database_1.default.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const productID = (0, crypto_1.randomUUID)();
                const result = yield tx.insert(schema_1.product).values(Object.assign({ productId: productID }, values));
                // console.log('results',result)
                // Updating product image table
                let count = 0;
                // console.log('values', values)
                for (const url of values.productImages) {
                    yield tx.insert(schema_1.productImages).values({ productId: productID, url: url, sortNo: count++ });
                }
            }));
        });
    }
    // Update all ready existing product
    static updateProduct(productValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const result = yield tx.update(schema_1.product).set(Object.assign(Object.assign({}, productValues), { unitPrice: (_a = productValues.unitPrice) === null || _a === void 0 ? void 0 : _a.toString() })).where((0, drizzle_orm_1.eq)(schema_1.product.productId, productValues.productId));
                console.log(result);
                let count = 0;
                for (const url of productValues.productImages) {
                    yield tx.insert(schema_1.productImages).values({ productId: productValues.productId, url: url, sortNo: count++ });
                }
            }));
        });
    }
    // Fetch product items and format it to json 
    static fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.select({
                productId: schema_1.product.productId,
                name: schema_1.product.name,
                stock: schema_1.product.stock,
                unitPrice: schema_1.product.unitPrice,
                unitMeasure: schema_1.product.unitMeasure,
                topItem: schema_1.product.topItem,
                description: schema_1.product.description,
                createdAt: schema_1.product.createdAt,
                category: {
                    catId: schema_1.category.catId,
                    name: schema_1.category.name
                },
                productImages: {
                    imageId: schema_1.productImages.imageId,
                    url: schema_1.productImages.url,
                    sortNo: schema_1.productImages.sortNo
                }
            }).from(schema_1.product).leftJoin(schema_1.productImages, (0, drizzle_orm_1.eq)(schema_1.productImages.productId, schema_1.product.productId))
                .leftJoin(schema_1.category, (0, drizzle_orm_1.eq)(schema_1.category.catId, schema_1.product.catId)).orderBy(schema_1.product.createdAt)
                .where((0, drizzle_orm_1.not)((0, drizzle_orm_1.eq)(schema_1.product.productId, '53330c45-7bfb-4f76-8c4b-ef2843012860')));
            // console.log(result)
            const productMap = {};
            for (const row of result) {
                if (!productMap[row.productId]) {
                    productMap[row.productId] = Object.assign(Object.assign({}, row), { productImages: [] });
                }
                if (row.productImages) {
                    productMap[row.productId].productImages.push(row.productImages);
                }
            }
            const productList = [];
            for (const value of Object.values(productMap)) {
                productList.push(value);
            }
            return productList;
        });
    }
    static fetchBestProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.select({
                productId: schema_1.product.productId,
                name: schema_1.product.name,
                stock: schema_1.product.stock,
                unitPrice: schema_1.product.unitPrice,
                unitMeasure: schema_1.product.unitMeasure,
                topItem: schema_1.product.topItem,
                description: schema_1.product.description,
                createdAt: schema_1.product.createdAt,
                category: {
                    catId: schema_1.category.catId,
                    name: schema_1.category.name
                },
                productImages: {
                    imageId: schema_1.productImages.imageId,
                    url: schema_1.productImages.url,
                    sortNo: schema_1.productImages.sortNo
                }
            })
                .from(schema_1.product)
                .leftJoin(schema_1.productImages, (0, drizzle_orm_1.eq)(schema_1.productImages.productId, schema_1.product.productId))
                .leftJoin(schema_1.category, (0, drizzle_orm_1.eq)(schema_1.category.catId, schema_1.product.catId))
                .where((0, drizzle_orm_1.eq)(schema_1.product.topItem, true)) // Filter for top products
                .orderBy(schema_1.product.createdAt);
            const productMap = {};
            for (const row of result) {
                if (!productMap[row.productId]) {
                    productMap[row.productId] = Object.assign(Object.assign({}, row), { productImages: [] });
                }
                if (row.productImages) {
                    productMap[row.productId].productImages.push(row.productImages);
                }
            }
            return Object.values(productMap);
        });
    }
    static deleteCategory(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Undefine category c088afdf-16c3-11f0-a8f8-04d4c438f3ef
            // change to undefine category 
            const result = yield database_1.default.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                yield tx.update(schema_1.product).set({ catId: 'c088afdf-16c3-11f0-a8f8-04d4c438f3ef' }).where((0, drizzle_orm_1.eq)(schema_1.product.catId, catId));
                // Delete the category from the database
                const res = yield tx.delete(schema_1.category).where((0, drizzle_orm_1.eq)(schema_1.category.catId, catId));
                console.log(res);
            }));
        });
    }
    static deleteProduct(productId_1) {
        return __awaiter(this, arguments, void 0, function* (productId, confirm = false) {
            // Check whether orders exists  ID: 53330c45-7bfb-4f76-8c4b-ef2843012860 - deleted product placeholder
            yield database_1.default.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const orderResult = yield tx.select().from(schema_1.productList).where((0, drizzle_orm_1.eq)(schema_1.productList.productId, productId));
                if (orderResult.length > 0) {
                    // Check for active products
                    const activeProducts = yield tx.select().from(schema_1.order).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.inArray)(schema_1.order.orderId, orderResult.map(element => element.orderId)), (0, drizzle_orm_1.eq)(schema_1.order.status, true)));
                    if (activeProducts.length > 0)
                        throw new Error('active products exists'); // Terminate the deletion
                    if (confirm) {
                        // Update the list 
                        yield tx.update(schema_1.productList).set({ productId: '53330c45-7bfb-4f76-8c4b-ef2843012860' }).where((0, drizzle_orm_1.eq)(schema_1.productList.productId, productId));
                    }
                    else {
                        throw new Error("delete confirmation");
                    }
                }
                // Get all the image name relating to product
                const result = yield tx.select().from(schema_1.productImages).where((0, drizzle_orm_1.eq)(schema_1.productImages.productId, productId));
                // Delete all the images related
                yield tx.delete(schema_1.productImages).where((0, drizzle_orm_1.eq)(schema_1.productImages.productId, productId));
                // Final step delete the product
                yield tx.delete(schema_1.product).where((0, drizzle_orm_1.eq)(schema_1.product.productId, productId));
                for (const image of result) {
                    (0, fileHandling_1.deleteImage)(image.url); // Deleting images from the file location
                }
            }));
        });
    }
    static deleteSingleImage(imageId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const imageResult = yield tx.query.productImages.findFirst({
                    where: (0, drizzle_orm_1.eq)(schema_1.productImages.imageId, imageId)
                });
                // Delete image from the database
                yield tx.delete(schema_1.productImages).where((0, drizzle_orm_1.eq)(schema_1.productImages.imageId, imageId));
                (0, fileHandling_1.deleteImage)(imageResult.url); // Deleting the image from server storage
            }));
        });
    }
    static getProductFromId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.select({
                productId: schema_1.product.productId,
                name: schema_1.product.name,
                stock: schema_1.product.stock,
                unitPrice: schema_1.product.unitPrice,
                unitMeasure: schema_1.product.unitMeasure,
                topItem: schema_1.product.topItem,
                description: schema_1.product.description,
                createdAt: schema_1.product.createdAt,
                category: {
                    catId: schema_1.category.catId,
                    name: schema_1.category.name
                },
                productImages: {
                    imageId: schema_1.productImages.imageId,
                    url: schema_1.productImages.url,
                    sortNo: schema_1.productImages.sortNo
                }
            })
                .from(schema_1.product)
                .leftJoin(schema_1.productImages, (0, drizzle_orm_1.eq)(schema_1.productImages.productId, schema_1.product.productId))
                .leftJoin(schema_1.category, (0, drizzle_orm_1.eq)(schema_1.category.catId, schema_1.product.catId))
                .where((0, drizzle_orm_1.eq)(schema_1.product.productId, productId))
                .orderBy(schema_1.productImages.sortNo);
            if (result.length === 0) {
                return null;
            }
            const productData = Object.assign(Object.assign({}, result[0]), { productImages: [] });
            for (const row of result) {
                if (row.productImages) {
                    productData.productImages.push(row.productImages);
                }
            }
            return productData;
        });
    }
    static fetchProductsRelevantToCategoryRequest(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.select({
                productId: schema_1.product.productId,
                name: schema_1.product.name,
                stock: schema_1.product.stock,
                unitPrice: schema_1.product.unitPrice,
                unitMeasure: schema_1.product.unitMeasure,
                topItem: schema_1.product.topItem,
                description: schema_1.product.description,
                createdAt: schema_1.product.createdAt,
                category: {
                    catId: schema_1.category.catId,
                    name: schema_1.category.name
                },
                productImages: {
                    imageId: schema_1.productImages.imageId,
                    url: schema_1.productImages.url,
                    sortNo: schema_1.productImages.sortNo
                }
            }).from(schema_1.product)
                .leftJoin(schema_1.productImages, (0, drizzle_orm_1.eq)(schema_1.productImages.productId, schema_1.product.productId))
                .leftJoin(schema_1.category, (0, drizzle_orm_1.eq)(schema_1.category.catId, schema_1.product.catId))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.product.catId, catId), (0, drizzle_orm_1.not)((0, drizzle_orm_1.eq)(schema_1.product.productId, '53330c45-7bfb-4f76-8c4b-ef2843012860'))))
                .orderBy(schema_1.product.createdAt);
            const productMap = {};
            for (const row of result) {
                if (!productMap[row.productId]) {
                    productMap[row.productId] = Object.assign(Object.assign({}, row), { productImages: [] });
                }
                if (row.productImages) {
                    productMap[row.productId].productImages.push(row.productImages);
                }
            }
            const productList = [];
            for (const value of Object.values(productMap)) {
                productList.push(value);
            }
            return productList;
        });
    }
}
exports.ProductServices = ProductServices;
