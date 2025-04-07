import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3500





app.listen(PORT, () => {
    console.log("App is running on port " + PORT)
})