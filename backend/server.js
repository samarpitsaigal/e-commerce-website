import dns from 'node:dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinaries.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

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
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})