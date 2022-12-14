import express from 'express'
import dotenv  from 'dotenv'
import connectDB from './DB.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import path from 'path'



dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use(express.json({limit: "200mb"}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

//app.get('/api/config/paypal', (req, res) => (process.env.PAYPAL_CLIENT_ID))

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))



const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Server is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
