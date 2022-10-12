import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_REQUEST, USER_LIST_PROFILE_REQUEST, USER_LIST_PROFILE_SUCCESS, USER_LIST_PROFILE_FAIL, USER_LIST_PROFILE_RESET, USER_REMOVE_PROFILE_REQUEST, USER_REMOVE_PROFILE_SUCCESS, USER_REMOVE_PROFILE_FAIL, USER_GET_PROFILE_REQUEST, UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_REQUEST, USER_GET_PROFILE_SUCCESS, USER_GET_PROFILE_FAIL } from "../constants/userConstants"
import axios from "axios"

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST

        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('/api/users/login', {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(
        {
            type: USER_LOGOUT
        }
    )

    dispatch(
        {
            type: USER_LIST_PROFILE_RESET
        }
    )
}

export const register = (name, email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST

        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('/api/users', {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}


export const getUserDetail = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAIL_REQUEST

        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}

export const updateUserProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST

        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/users/profile', user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}


export const listUsers = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_PROFILE_REQUEST

        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/users/', config)

        dispatch({
            type: USER_LIST_PROFILE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_PROFILE_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}

export const deleteUser = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_REMOVE_PROFILE_REQUEST

        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/users/${id}`, config)

        dispatch({
            type: USER_REMOVE_PROFILE_SUCCESS
        })


    } catch (error) {
        dispatch({
            type: USER_REMOVE_PROFILE_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}



export const adminUpdateUser = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_USER_PROFILE_REQUEST

        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Ttype': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/${user._id}`, user, config)

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS
        })

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload:data
        })


    } catch (error) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}