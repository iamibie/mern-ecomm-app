
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product){
        res.json(product)

    }else{
        res.status(404)
        throw new Error ('Product Not Found')
    }
})

const updateProduct = asyncHandler(async (req, res) => { 

    
    const product = await Product.findById(req.params.id)
    
    if (product) {
        product.name = req.body.name || product.name
        product.category = req.body.category || product.category
        product.description = req.body.description || product.description
        product.price = req.body.price || product.price
        product.countInStock = req.body.countInStock || product.countInStock
        product.image = req.body.image || product.image


        const updatedproduct = await product.save()


        res.json({
            _id: updatedproduct._id,
            name: updatedproduct.name,
            category: updatedproduct.category,
            description: updatedproduct.description,
            price: updatedproduct.price,
            countInStock: updatedproduct.countInStock,
            image: updatedproduct.image,
    
        })


    }else{
        res.status(404)
        throw new Error('product not found')
            
    } 
    
})

export{
    getProducts, getProductById, updateProduct
}

