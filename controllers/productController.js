
import asyncHandler from 'express-async-handler'
import Product from '../dataSchema/productModel.js'

const products = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


const productById = asyncHandler(async (req, res) => {
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


const createProduct = asyncHandler(async (req, res) => { 
 
     
    const product = new Product({
        user:req.user._id,
        name:"Add name", 
        category:"Add category", 
        description:"Add description", 
        price:0, 
        countInStock:0,
        numReviewa:0, 
        image:"/img/lipgloss.jpeg"
    })


    const createdProduct = await product.save()
    
    if (createdProduct) {
        
        res.status(201).json(product)


    }else{
        res.status(404)
        throw new Error('product not created')
            
    } 
    
})

const deleteProduct = asyncHandler(async (req, res) => { 
   
    const product = await Product.findById(req.params.id)
    if (product){
        await product.remove()
         res.json({message:"Product removed!"}) 
    } else{
        res.status(401)
        throw new Error ('Product not found')

    }
   
       
})

export{
    products, productById, updateProduct, createProduct, deleteProduct
}

