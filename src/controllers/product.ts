import { Client } from "basic-ftp";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const uploadProductImage = (req: Request, res: Response) => {
    // Log incoming request body (should be empty for file uploads)
    console.log('Request Body:', req.body);


    console.log('Uploaded Files:', req.files);
    console.log('Uploaded File:', req.file);

    res.status(200).send({ message: 'File uploaded successfully' });
};

export { uploadProductImage };
