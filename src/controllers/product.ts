import { Client } from "basic-ftp";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const uploadProductImage = (req: Request, res: Response) => {
    // Log incoming request body (should be empty for file uploads)
    console.log('Request Body:', req.body);

    // Log uploaded file details
    console.log('Uploaded File:', req.file);

    // You can process the file here (e.g., upload to FTP, database, etc.)
    res.status(200).send({ message: 'File uploaded successfully' });
};

export { uploadProductImage };
