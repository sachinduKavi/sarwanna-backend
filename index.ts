import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import productRouter from './src/routes/product'
import adminRouter from './src/routes/admin'
import orderRouter from './src/routes/order'


dotenv.config()


const app = express()
const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use('/product', productRouter)

app.use('/admin', adminRouter)
app.use('/order', orderRouter)


app.listen(PORT, () => {
    console.log("App is running on port " + PORT)
})