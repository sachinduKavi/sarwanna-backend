
import db from "../database";
import Product from "../../models/Product";
import { category, product, productImages, productList } from "../schema";
import { randomUUID } from "crypto";
import {eq, and, not} from 'drizzle-orm'
import { deleteImage } from "../../middleware/fileHandling";
import e from "express";

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
                                        .where(not(eq(product.productId, '53330c45-7bfb-4f76-8c4b-ef2843012860')))


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

    static async fetchBestProducts() {
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
        })
            .from(product)
            .leftJoin(productImages, eq(productImages.productId, product.productId))
            .leftJoin(category, eq(category.catId, product.catId))
            .where(eq(product.topItem, true)) // Filter for top products
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
        return Object.values(productMap);
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

    static async deleteProduct(productId: string, confirm: boolean = false) {
        // Check whether orders exists  ID: 53330c45-7bfb-4f76-8c4b-ef2843012860 - deleted product placeholder
        await db.transaction(async (tx) => {
            const orderResult = await tx.select().from(productList).where(eq(productList.productId, productId))
            if(orderResult.length > 0) {
                if(confirm) {
                    // Update the list 
                    await tx.update(productList).set({productId: '53330c45-7bfb-4f76-8c4b-ef2843012860'}).where(eq(productList.productId, productId))
                } else {
                    throw new Error("delete confirmation")
                }
            }
            
            // Get all the image name relating to product
            const result = await tx.select().from(productImages).where(eq(productImages.productId, productId))
            // Delete all the images related
            await tx.delete(productImages).where(eq(productImages.productId, productId))

            // Final step delete the product
            await tx.delete(product).where(eq(product.productId, productId))

            for(const image of result) {
                deleteImage(image.url) // Deleting images from the file location
            }
        })
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
            .where(and(eq(product.catId, catId), not(eq(product.productId, '53330c45-7bfb-4f76-8c4b-ef2843012860'))))
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

