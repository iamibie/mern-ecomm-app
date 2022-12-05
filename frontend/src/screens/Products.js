import React ,{useState, useEffect}from 'react'
import { Table,Container, Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import Rating from '../Components/Rating'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../Components/ProductCard'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../message'
import Loader from '../loader'
import {adminCreateProduct, adminListProducts, adminDeleteProduct} from '../actions/productActions'
import { ADMIN_CREATE_PRODUCT_RESET } from '../constants/productConstants'



const ProductsListScreen = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const {loading:userLoading, error:userError, userInfo} = userLogin

    const adminProductsList = useSelector(state => state.adminProductsList)
    const {loading, error, products} = adminProductsList


    const createProduct = useSelector(state => state.createProduct)
    const {loading:createLoading, error:createError,success:successCreate, product:createdProduct} = createProduct

    

    useEffect(() => {
        dispatch({type:ADMIN_CREATE_PRODUCT_RESET})

        if(!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/products/${createdProduct._id}/edit`)
        } else{
            dispatch(adminListProducts())
        }
        
    },
    [dispatch,userInfo, successCreate, createdProduct, history])



    const createProductHandler = () => {
        dispatch(adminCreateProduct())
    }

    const deleteProductHandler = (id) => {
      
            if(window.confirm('Areyou sure')){
                dispatch(adminDeleteProduct(id))
            }
    
    }


    return (
        < div className='screens' >
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>

            <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> CreateProduct
            </Button>
            </Col>

        </Row>
        {loading ? ( <Loader/> ) : error ? (<Message variant='danger'>{error}</Message>) : (
        <Table striped bordered hover responsive className='table-sm' style={{color:'black'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>CATEGORY</th>
                            <th>DESCRIPTION</th>
                            <th>PRICE</th>
                            <th>CCOUNT-IN-STCOK</th>
                            <th>IMAGE</th>
                            <th>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.countInStock}</td>
                                <td><Image src={product.image} alt={product.name} fluid width='50px' height='50px' /></td>
                                <td>
                                    <LinkContainer to={`/products/${product._id}/edit`}>
                                        <Button variant='danger' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteProductHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
                )}
        </div>
    )
}

export default ProductsListScreen
