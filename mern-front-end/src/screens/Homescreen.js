import React, {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Product from '../Components/Product'
import {Row, Col} from 'react-bootstrap'
import {listProducts}from '../actions/productActions'
import Loader from '../loader'
import Message from '../message'


const Homescreen = () => {
    const dispatch = useDispatch()


    const productList = useSelector( state => state.productList)
    const { loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts())
       
    },[dispatch])

   

    return (
        <>
           <h1>Featured Products</h1>
           {loading ? ( <Loader/> )
           : error ? (<Message variant='danger'>{error}</Message>) : (
        <Row>
            {products.map(product =>(
                <Col sm={12} md={6} l={4} xl={3} key={product._id}>
                    <Product product={product} key={product._id}/>
                </Col>
            ))}
        </Row>
           ) }
           

            
        </>
    )
}

export default Homescreen


