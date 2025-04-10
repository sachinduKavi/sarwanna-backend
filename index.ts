import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import productRouter from './src/routes/product'


dotenv.config()


const app = express()
const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))



app.use('/product', productRouter)


app.listen(PORT, () => {
    console.log("App is running on port " + PORT)
})