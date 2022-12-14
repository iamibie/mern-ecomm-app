import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }


    return <div className='screens'>
    <FormContainer >

        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                 type='Address'
                 placeholder='Enter Address'
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}>
                 </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                 type='City'
                 placeholder='Enter City'
                 value={city}
                 onChange={(e) => setCity(e.target.value)}>
                 </Form.Control>
            </Form.Group>

            <Form.Group controlId='postal code'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                 type='Postal Code'
                 placeholder='Enter Postal Code'
                 value={postalCode}
                 onChange={(e) => setPostalCode(e.target.value)}>
                 </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                 type='Country'
                 placeholder='Enter Country'
                 value={country}
                 onChange={(e) => setCountry(e.target.value)}>
                 </Form.Control>
            </Form.Group>

            <Button style={{marginTop:"1rem"}} type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
    </div>
}

export default ShippingScreen
