import React, { useState,useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../message'
import Loader from '../loader'
import { Link} from 'react-router-dom'
import {getOrderDetails, updateToPaid,updateOrderToDelivered} from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderDetailsScreen = ({match}) => {

    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()


    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver } = orderDeliver

    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals (order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }


    useEffect(() => {

        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script. onload = () => {
                setSdkReady(true)
            }

            document.body.appendChild(script)
        }


        if(!order || order._id !== orderId || successPay || successDeliver ){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
      
    }, [dispatch, orderId, order, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(updateToPaid(orderId, paymentResult))

    }

    const successDeliverHandler = () => {
        dispatch(updateOrderToDelivered(order))

    }


return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <div className='screens o-d'>

<h1>Order {order._id}</h1>
<Row>
             <Col l={1} style={{marginBottom:'2rem'}}>
                 <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h2>Shipping</h2>

                         <p><strong>Name: </strong> {order.user.name}</p>
                         <p>
                             <strong>Email: </strong> {' '}
                             <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                         <p>
                             <strong>Address:</strong>
                             {order.shippingAddress.address}, {order.shippingAddress.city}{''}
                             {order.shippingAddress.postalCode},{''}
                             {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'> Delivered on {order.deliveredAt} </Message> : <Message variant='danger'>Not Delivered</Message>}
                         
                     </ListGroup.Item>

                     <ListGroup.Item>
                         <h2>Payment Method</h2>
                         <p>
                         <strong>Payment Method:</strong>
                         {order.paymentMethod}
                         </p>

                         {order.isPaid ? <Message variant='success'> Paid on {order.paidAt} </Message> : <Message variant='danger'>Not Paid</Message>}
                         
                     </ListGroup.Item>

                     <ListGroup.Item>
                         <h2>Order Items</h2>
                         {order.orderItems.length === 0 ? <Message> Order is empty</Message> : (
                             <ListGroup variant='flush'>
                                 {order.orderItems.map((item, index) => (
                                     <ListGroup.Item key={index}>
                                         <Row>
                                             <Col md={1}>
                                                 <Image src={item.image} alt={item.name} fluid rounded />
                                                 <Col>
                                                 <Link to={`/product/${item.product}`}>
                                                     {item.name}
                                                 </Link>
                                                 </Col>
                                                 <Col md={4}>
                                                     {item.qty} x ${item.price} = ${item.qty * item.price}
                                                 </Col>
                                             </Col>
                                         </Row>
                                     </ListGroup.Item>
                                 ))}
                             </ListGroup>
                         )} 
                     </ListGroup.Item>
                 </ListGroup>
             </Col>
             <Col md={5}>
                 <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h2>Order Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Row>
                             <Col>Items</Col>
                                 <Col>${order.itemsPrice}</Col>
                         </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                         <Row>
                             <Col>Shipping</Col>
                                 <Col>${order.shippingPrice}</Col>
                         </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                         <Row>
                             <Col>Tax</Col>
                                 <Col>${order.taxPrice}</Col>
                         </Row>
                     </ListGroup.Item>

                     <ListGroup.Item>
                         <Row>
                             <Col>Total</Col>
                                 <Col>${order.totalPrice}</Col>
                         </Row>
                     </ListGroup.Item>
                     {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader/> }
                            {!sdkReady ? (<Loader/>) : 
                            (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>)}

                        </ListGroup.Item>)}

                       {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type='button' variant='primary' className='btn btn-block' onClick={successDeliverHandler}/>
                            Mark as delivered
                        </ListGroup.Item>)}
                     
                 </ListGroup>
             </Col>
         </Row>

</div>

}

export default OrderDetailsScreen