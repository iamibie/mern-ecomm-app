import React, {useState, useEffect} from 'react'
import { Form, Button,} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../message.js'
import Loader from '../loader.js'
import {adminGetUser, getUserDetail, adminUpdateUser} from '../actions/userActions'
import FormContainer from '../Components/FormContainer.js'
import { UPDATE_USER_PROFILE_RESET } from '../constants/userConstants.js'





const AdminUpdateUserScreen = ({match, history}) => {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    


    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const {loading, error, user} = userDetail

    const updateUser = useSelector(state => state.updateUser)
    const {loading:loadingUpdate, error: errorUpdate, success:successUpdate} = updateUser

   


    useEffect(() =>{

        if(successUpdate){
            dispatch({type: UPDATE_USER_PROFILE_RESET})
            history.push('/admin/users')
        } else{

            if(!user.name || user._id !== userId){
                dispatch(getUserDetail(userId))
            } else {
    
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
    
            }

        }
        
    
    }, [dispatch, user, userId, history, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        
            dispatch(adminUpdateUser({_id: userId, name, email, isAdmin}))
        

    }

    return (
    <>
    <Link to='/admin/users'>Go back</Link>
    <FormContainer> 
    <h1>Edit User</h1>
    {loadingUpdate && <Loader/>}
    {errorUpdate && <Message variant='danger'/>}
    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Name</Form.Label>
            <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='isAdmin'>
            <Form.Check
            type='checkbox'
            label='Is Admin'
            checked={isAdmin}
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
        </Form.Group>

        <Button type='submit' variant='primary'>UPDATE</Button>
        </Form>
        
        )}   

    </FormContainer>
     
    </>

)}

export default AdminUpdateUserScreen