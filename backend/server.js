import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinaries.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

connectDB()
connectCloudinary()

app.get('/', (req, res) => {
  res.send('API WORKING')
})

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})