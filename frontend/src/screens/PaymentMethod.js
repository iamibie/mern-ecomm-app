import React, {useState} from 'react'
import { Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'

const PaymentScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }


    return <div className='screens'><FormContainer>

        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method
        </h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label as='legend' style={{color:'darkgray'}}>Select Method</Form.Label>
            
            <Col>
            <Form.Check 
            type='radio' 
            label='PayPal or Credit Card' 
            id='PayPal'
            name='paymentMethod' 
            value='PayPal' 
            checked 
            onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check>
            </Col>
            </Form.Group>

            
            <Button style={{marginTop:"1rem"}} type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer></div>
}

export default PaymentScreen