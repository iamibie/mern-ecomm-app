import React ,{useState, useEffect}from 'react'
import { Table,Container, Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from '../Components/Rating'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../Components/Product'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../message'
import Loader from '../loader'
import {adminListProducts} from '../actions/productActions'



const ProductsListScreen = () => {

    const dispatch = useDispatch()

    const adminProductsList = useSelector(state => state.adminProductsList)
    const {loading, error, products} = adminProductsList

    

    useEffect(() => {
        dispatch(adminListProducts())
    },
    [dispatch])



    return (
        <>
        {loading ? ( <Loader/> ) : error ? (<Message variant='danger'>{error}</Message>) : (
        <Table striped bordered hover responsive className='table-sm'>
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
                                    <Button variant='danger' className='btn-sm'>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
                )}
        </>
    )
}

export default ProductsListScreen
