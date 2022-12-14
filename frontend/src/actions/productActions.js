import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    ADMIN_PRODUCT_LIST_REQUEST,
    ADMIN_PRODUCT_LIST_FAIL,
    ADMIN_PRODUCT_LIST_SUCCESS,
    ADMIN_UPDATE_PRODUCT_REQUEST,
    ADMIN_UPDATE_PRODUCT_SUCCESS,
    ADMIN_UPDATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_REQUEST,
    ADMIN_CREATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL
} from '../constants/productConstants'

export const listProducts = () => async dispatch => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        })

        const {data} = await axios.get('/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,

        })
    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message,
        })
        

        
    }

}


export const listProductDetails = (id) => async dispatch => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        })

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,

        })
    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message,
        })
        

        
    }

}

export const adminListProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_LIST_REQUEST,
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/products/admin/products', config)

        dispatch({
            type: ADMIN_PRODUCT_LIST_SUCCESS,
            payload: data,

        })
    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message :error.message,
        })
        

        
    }

}



export const adminUpdateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_REQUEST

        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Ttype': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/products/${product._id}/admin-edit-product`, product, config)


        dispatch({
            type: ADMIN_UPDATE_PRODUCT_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}


export const adminCreateProduct = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CREATE_PRODUCT_REQUEST

        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Ttype': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/products/',{}, config)


        dispatch({
            type: ADMIN_CREATE_PRODUCT_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type: ADMIN_CREATE_PRODUCT_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}




export const adminDeleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_REQUEST

        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Ttype': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

       await axios.delete(`/api/products/${id}`, config)


        dispatch({
            type: ADMIN_DELETE_PRODUCT_SUCCESS,
           
        })


    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}

