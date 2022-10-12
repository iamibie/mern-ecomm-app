import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
import mongoose from 'mongoose'


//@desc  Create new order
//@route /api/orders
//@access private

const addOrderItems = asyncHandler(async (req, res) => {
   const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

   if (orderItems && orderItems.length === 0){
       res.status(400)
       throw new Error('No order items')
       return

   }else{
       const order = new Order({
        orderItems, user:req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice

       })

       const createdOrder = await order.save()

       res.status(201).json(createdOrder)
   }
})


//@desc  getOrderById
//@route GET /api/orders/:id
//@access private

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order){
        res.json(order)

    }else{
        res.status(404)
        throw new Error ('Order Not Found')
    }
   
 })

 //@desc  updateOrderToPaid
//@route GET /api/orders/:id/pay
//@access private

const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
    
    if (order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)

    }else{
        res.status(404)
        throw new Error ('Order Not Found')
    }
   
 })


//@desc  getUserOrders
//@route GET /api/orders/myorders
//@access private

const getUserOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({user: req.user.id})

    res.json(orders)
      
    
 })

export{
    addOrderItems,
    getOrderById,
    updateOrderToPaid, 
    getUserOrders,
}