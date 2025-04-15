
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
        const result = await db
            .select({
                product,        // Select fields from the product table
                category,       // Select fields from the category table
                productImages,  // Select fields from the product_images table
            })
            .from(product)
            .leftJoin(category, eq(product.catId, category.catId))  // Left join category
            .leftJoin(productImages, eq(product.productId, productImages.productId));  // Left join product_images

        // Format the result
        const formatted = result.map(({ product, category, productImages }) => ({
            ...product,
            category: category ? {  // Check if category is not null
                catId: category.catId,
                name: category.name,
            } : null, // If category is null, set it to null
            // Ensure productImages is an array before using .map()
            imageList: Array.isArray(productImages) ? productImages.map((image) => image.url) : []  // Only map if productImages is an array
        }));

        console.log(formatted)
    }




}



export  {ProductServices}

