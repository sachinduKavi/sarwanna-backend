import { Client } from "basic-ftp";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const uploadProductImage = async (req: Request, res: Response) => {
    // Ensure the file exists in the request
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

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

        // Upload the file to FTP server
        const remoteFilePath = `/uploads/${req.file.filename}`; // Define remote file path (you can modify this based on your needs)
        await client.uploadFrom(req.file.path, remoteFilePath);

        console.log(`File uploaded to ${remoteFilePath}`);

        // Optionally, list files in the remote directory (you can remove or modify this as needed)
        console.log("Files in remote directory:", await client.list());

        // Respond to the client
        res.status(201).json({
            message: 'File uploaded successfully!',
            filePath: remoteFilePath, // Return the remote file path
        });
    } catch (error: any) {
        console.error("FTP Error:", error);
        // Send back a server error response
        res.status(500).json({ message: 'Error uploading file to FTP server', error: error.message });
    } finally {
        client.close(); // Always close the connection after the operation is done
    }
};

export { uploadProductImage };
