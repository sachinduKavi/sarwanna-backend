
import db from "../database";
import Product from "../../models/Product";
import { category, product, productImages } from "../schema";
import { randomUUID } from "crypto";
import {eq} from 'drizzle-orm'
import { deleteImage } from "../../middleware/fileHandling";

class ProductServices {
    static async createProduct(values: any) {
        // Create transaction 
        const result = await db.transaction(async (tx) => {
            const productID = randomUUID()

            const result = await tx.insert(product).values({productId: productID, ...values})
            // console.log('results',result)
            // Updating product image table
            let count = 0;
            // console.log('values', values)
            for(const url of values.productImages) {
                await tx.insert(productImages).values({productId: productID, url: url, sortNo: count++})
            }
        })
    }

    // Update all ready existing product
    static async updateProduct(productValues: any) {
        const result = await db.transaction(async (tx) => {
            const result = await tx.update(product).set({
                ...productValues,
                unitPrice: productValues.unitPrice?.toString()
            }).where(eq(product.productId, productValues.productId!))


            console.log(result)
            let count = 0;
            for(const url of productValues.productImages) {
                await tx.insert(productImages).values({productId: productValues.productId, url: url, sortNo: count++})
            }
        })
    }


    // Fetch product items and format it to json 
    static async fetchProducts() {
        const result = await db.select({
            productId: product.productId,
            name: product.name,
            stock: product.stock,
            unitPrice: product.unitPrice,
            unitMeasure: product.unitMeasure,
            topItem: product.topItem,
            description: product.description,
            createdAt: product.createdAt,
            category: {
                catId: category.catId,
                name: category.name
            },
            productImages: {
                imageId: productImages.imageId,
                url: productImages.url,
                sortNo: productImages.sortNo
            }
        }).from(product).leftJoin(productImages, eq(productImages.productId, product.productId))
                                        .leftJoin(category, eq(category.catId, product.catId)).orderBy(product.createdAt)


        // console.log(result)
        const productMap: Record<string, any> = {}
        for(const row of result) {
            if(!productMap[row.productId]) {
                productMap[row.productId] = {
                    ...row,
                    productImages: []
                }
            }

            if(row.productImages) {
                productMap[row.productId].productImages.push(row.productImages)
            }
        }
        const productList = []
        for(const value of Object.values(productMap)) {
            productList.push(value)
        }
        return productList

    }


    static async deleteCategory(catId: string) {
        // Undefine category c088afdf-16c3-11f0-a8f8-04d4c438f3ef
        // change to undefine category 
        const result = await db.transaction(async (tx) => {
            await tx.update(product).set({catId: 'c088afdf-16c3-11f0-a8f8-04d4c438f3ef'}).where(eq(product.catId, catId))

            // Delete the category from the database
            const res = await tx.delete(category).where(eq(category.catId, catId))
            console.log(res)
        })
        
    }

    static async deleteProduct(productId: string) {
        // Get all the image name relating to product
        const result = await db.select().from(productImages).where(eq(productImages.productId, productId))
        console.log(result)

        for(const image of result) {
            deleteImage(image.url) // Deleting images from the file location
        }

        // Delete all the images related
        await db.delete(productImages).where(eq(productImages.productId, productId))

        // Final step delete the product
        await db.delete(product).where(eq(product.productId, productId))
    }


    static async deleteSingleImage(imageId: string) {
        await db.transaction(async (tx) => {
            const imageResult = await tx.query.productImages.findFirst({
                where: eq(productImages.imageId, imageId)
            })
            // Delete image from the database
            await tx.delete(productImages).where(eq(productImages.imageId, imageId))

            deleteImage(imageResult!.url) // Deleting the image from server storage
        })
    }

    static async fetchProductsRelevantToCategoryRequest(catId: string) {

        const result = await db.select({
            productId: product.productId,
            name: product.name,
            stock: product.stock,
            unitPrice: product.unitPrice,
            unitMeasure: product.unitMeasure,
            topItem: product.topItem,
            description: product.description,
            createdAt: product.createdAt,
            category: {
                catId: category.catId,
                name: category.name
            },
            productImages: {
                imageId: productImages.imageId,
                url: productImages.url,
                sortNo: productImages.sortNo
            }
        }).from(product)
            .leftJoin(productImages, eq(productImages.productId, product.productId))
            .leftJoin(category, eq(category.catId, product.catId))
            .where(eq(product.catId, catId))
            .orderBy(product.createdAt);

        const productMap: Record<string, any> = {};
        for (const row of result) {
            if (!productMap[row.productId]) {
                productMap[row.productId] = {
                    ...row,
                    productImages: []
                };
            }

            if (row.productImages) {
                productMap[row.productId].productImages.push(row.productImages);
            }
        }
        const productList = []
        for(const value of Object.values(productMap)) {
            productList.push(value)
        }

        return productList
    }


    
}



export  {ProductServices}

