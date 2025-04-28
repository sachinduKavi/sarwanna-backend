import { Client } from "basic-ftp";
import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../db/database";
import { category } from "../db/schema";
import { ProductServices } from "../db/services/Product";

dotenv.config();

const uploadProductImage = async (req: Request, res: Response) => {
    let proceed = false, content = null, message = null

    // console.log(req.files)

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
    console.log('load product')
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

    try {
        content = await ProductServices.fetchProducts()
    } catch(e) {
        proceed = false
    }
    

    res.status(proceed?200:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

const loadBestProducts = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        content = await ProductServices.fetchBestProducts()
        // console.log(content )
    } catch(e) {
        proceed = false
    }
    res.status(proceed?200:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}



const deleteCategory = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null
    console.log('delete category', req.params.catId)

    try {
        await ProductServices.deleteCategory(req.params.catId)
        message = 'category deleted'
    } catch(e) {
        proceed = false
        message = 'server error'
    }

    res.status(proceed?200:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}


const deleteProduct = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        await ProductServices.deleteProduct(req.params.productId, Boolean(req.params.confirm ?? false))
        message = 'product delete success'
    } catch(e: any) {
        message = 'server error'
        if(typeof e.message === 'string') message = e.message;
        proceed = false
    }
    

    res.status(proceed?200:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}


const deleteSingleImage = async(req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    console.log('delete single image')

    try {
        await ProductServices.deleteSingleImage(req.params.imageId)
    } catch(e) {
        console.log(e)
        proceed = false
        message = 'server error'
    }
    

    res.status(proceed?200:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}

const fetchProductsRelevantToCategoryRequest = async (req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        content = await ProductServices.fetchProductsRelevantToCategoryRequest(req.params.catId)
        message="fetch product complete"
    } catch(e) {
        proceed = false
        message="fetch product Failed"
    }

    res.status(proceed?200:500).json({
        proceed: proceed,
        message: message,
        content: content
    })
}


const updateProductValues = async(req: Request, res: Response) => {
    let proceed = true, message = null, content = null

    try {
        await ProductServices.updateProduct(req.body)
    } catch(e) {
        console.log(e)
        proceed = false
        message = 'update fail'
    }

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
    loadProducts,
    deleteCategory,
    deleteProduct,
    deleteSingleImage,
    fetchProductsRelevantToCategoryRequest,
    updateProductValues,
    loadBestProducts
 };
