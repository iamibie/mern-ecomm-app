import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../message.js'
import Loader from '../loader.js'
import FormContainer from '../Components/FormContainer'
import {login} from '../actions/userActions'


const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() =>{
        if(userInfo){
            history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(login(email, password))

    }

    return <div className='screens'><FormContainer>
        <h1>LOGIN</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button style={{marginTop:"1rem"}} type='submit' variant='secondary'>LOGIN</Button>
        </Form>

        <Row className='py-3' >
            <Col>
            New Customer{''}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{color:'black'}}>Sign up</Link>
            </Col>
        </Row>


    </FormContainer></div>
}
export default LoginScreen
