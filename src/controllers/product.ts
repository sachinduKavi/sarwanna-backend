import { Client } from "basic-ftp";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const uploadProductImage = async (req: Request, res: Response) => {

    console.log(req.files)
   

    const client = new Client();
    client.ftp.verbose = true; // Enable FTP verbose logging

    try {
        // Access FTP server
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            port: 21,
            secure: false,
        });

        console.log("FTP connection successful");

        await client.uploadFrom(req.body , '/sarvanna'); // Upload the file to the FTP server

       
    } catch (error: any) {
        console.error("FTP Error:", error);
        // Send back a server error response
        res.status(500).json({ message: 'Error uploading file to FTP server', error: error.message });
    } finally {
        client.close(); // Always close the connection after the operation is done
    }

    res.status(200).json({ message: 'File uploaded successfully' });
};

export { uploadProductImage };
