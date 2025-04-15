
import db from "../database";
import Product from "../../models/Product";
import { category, product, productImages } from "../schema";
import { randomUUID } from "crypto";
import {eq} from 'drizzle-orm'

class ProductServices {
    static async createProduct(values: any) {
        // Create transaction 
        const result = await db.transaction(async (tx) => {
            const productID = randomUUID()

            const result = await tx.insert(product).values({productId: productID, ...values})
            console.log(result)
            // Updating product image table
            let count = 0;
            for(const url of values.imageList) {
                await tx.insert(productImages).values({productId: productID, url: url, sortNo: count++})
            }
        })
    }


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
}



export  {ProductServices}

