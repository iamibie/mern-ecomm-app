import asyncHandler from 'express-async-handler'
import Product from '../dataSchema/productModel.js'
import Order from '../dataSchema/orderModel.js'
import mongoose from 'mongoose'


//@desc  Create new order
//@route /api/orders
//@access private

const order = asyncHandler(async (req, res) => {
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

const orderById = asyncHandler(async (req, res) => {

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

const orderPaid = asyncHandler(async (req, res) => {

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

 // @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const orderDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })


//@desc  getUserOrders
//@route GET /api/orders/myorders
//@access private

const orderUser = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})

    if(orders){
        res.status(201).json(orders)
    } else{
        res.status(404)
        throw new Error('No order found for this user!')
    }
       
})





const ordersAdmin = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
      
    
})




export{
    order,
    orderById,
    orderPaid, 
    orderDelivered,
    orderUser,
    ordersAdmin,  
}