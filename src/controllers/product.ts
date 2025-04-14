import { Client } from "basic-ftp";
import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../db/database";
import { category } from "../db/schema";
import { ProductServices } from "../db/services/Product";

dotenv.config();

const uploadProductImage = async (req: Request, res: Response) => {
    let proceed = false, content = null, message = null
    if (Array.isArray(req.files)) {
        content = req.files.map((element) => {
            return element.path.slice(7);
        });
        proceed = true
    } else {
        message = 'Error'
    }

    res.status(201).json({
        proceed: proceed,
        content: content,
        message: message
    })
};


const categoryEdit = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {        
        await db.insert(category).values(req.body)
    } catch(e) {
        console.log(e)
        proceed = false
        message = 'category update failed'
    }
    

    res.status(201).json({
        proceed: proceed,
        message: message,
        content: content
    })

}


const fetchCategory = async(req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        content = await db.query.category.findMany({})
    } catch(e) {
        proceed = false
        message = 'category update failed'
    }

    res.status(200).json({
        proceed: proceed,
        message: message,
        content: content
    })
}



const createProduct = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null
    
    try {
        await ProductServices.createProduct(req.body)
    } catch(e) {
        console.error(e)
        proceed = false
        message = 'transaction failed'
    }
    

    res.status(proceed?201:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}


const loadProducts = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null
    console.log('load products')

    await ProductServices.fetchProducts()

    res.status(proceed?201:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

export { 
    uploadProductImage,
    categoryEdit,
    fetchCategory,
    createProduct,
    loadProducts
 };
