
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
        const result = await db.query.product.findMany({
            with: {
                category: true
            }
        }).toSQL()

        console.log(result)
    }
}



export  {ProductServices}

