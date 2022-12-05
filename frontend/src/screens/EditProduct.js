import React, {useState, useEffect} from 'react'
import { Form, Button, Col, Image, InputGroup, Input, FormControl, } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../message.js'
import Loader from '../loader.js'
import {adminGetUser, getUserDetail, adminUpdateUser} from '../actions/userActions'
import FormContainer from '../Components/FormContainer.js'
import { ADMIN_UPDATE_PRODUCT_RESET } from '../constants/productConstants.js'
import { listProductDetails, adminUpdateProduct } from '../actions/productActions.js'
import FileBase64 from 'react-filebase64'






const AdminUpdateProductScreen = ({match, history}) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [image, setImage] = useState([''])
    


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const updateProduct = useSelector(state => state.updateProduct)
    const {loading:loadingUpdate, error: errorUpdate, success:successUpdate} = updateProduct

   


    useEffect(() =>{

        if(successUpdate){
            dispatch({type: ADMIN_UPDATE_PRODUCT_RESET})
            history.push('/admin/products/')
        } else{

            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            } else {
    
                setName(product.name)
                setCategory(product.category)
                setDescription(product.description)
                setPrice(product.price)
                setCountInStock(product.countInStock)
                setImage(product.image)
    
            }

        }
        
    
    }, [dispatch, product, productId, history, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        
            dispatch(adminUpdateProduct({_id: productId, name, category,description,price,countInStock,image}))    

    }

    const changeImageHandler = () => {

    }

    return (
    <div className='screens'>
    <Link to='/admin/products/'>Go back</Link>
    <FormContainer> 
    <h1>Edit Product</h1>
    {loadingUpdate && <Loader/>}
    {errorUpdate && <Message variant='danger'/>}
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
        <Form.Label>Description</Form.Label>
            <Form.Control
            type='text'
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
        <Form.Label>Price</Form.Label>
            <Form.Control
            type='number'
            label='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='count in stock'>
        <Form.Label>Count In Stock</Form.Label>
            <Form.Control
            type='number'
            label='Count in stock'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
        </Form.Group>

       <Form.Group>
          <Image src={product.image} alt={product.name} fluid width='50px' height='50px'/>
       </Form.Group>
       
        <Form.Group>
        <FileBase64 multiple={ false } onDone={ ({base64}) => setImage(base64)} />
        </Form.Group>

        <Button type='submit' variant='primary'>UPDATE</Button>

        </Form>
        
        )}  

    

    </FormContainer>

    
     
    </div>

)}

export default AdminUpdateProductScreen