import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, 
         USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
         USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_LIST_PROFILE_FAIL, USER_LIST_PROFILE_SUCCESS, USER_LIST_PROFILE_REQUEST, USER_LIST_PROFILE_RESET, USER_REMOVE_PROFILE_REQUEST, USER_REMOVE_PROFILE_SUCCESS, USER_REMOVE_PROFILE_FAIL, USER_GET_PROFILE_FAIL, USER_GET_PROFILE_SUCCESS, USER_GET_PROFILE_REQUEST, UPDATE_USER_PROFILE_FAIL, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_RESET} from "../constants/userConstants"



export const userLoginReducer = (state= {}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
            default:
                return state
    }

}

export const userRegisterReducer = (state= {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}

export const userDetailReducer = (state= { user: {} }, action) => {
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {...state, loading: true}
        case USER_DETAIL_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_DETAIL_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}

export const userUpdateProfileReducer = (state= { }, action) => {
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true, userInfo: action.payload}
        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}

export const usersListReducer = (state= {users: []}, action) => {
    switch(action.type){
        case USER_LIST_PROFILE_REQUEST:
            return {loading: true}
        case USER_LIST_PROFILE_SUCCESS:
            return {loading: false, users: action.payload}
        case USER_LIST_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        case USER_LIST_PROFILE_RESET:
            return { users: []}
            default:
                return state
    }

}

export const deleteUserReducer = (state= {}, action) => {
    switch(action.type){
        case USER_REMOVE_PROFILE_REQUEST:
            return {loading: true}
        case USER_REMOVE_PROFILE_SUCCESS:
            return {loading: false, success: true}
        case USER_REMOVE_PROFILE_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}

export const getUserByIdReducer = (state= {}, action) => {
    switch(action.type){
        case USER_GET_PROFILE_REQUEST:
            return {loading: true}
        case USER_GET_PROFILE_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_GET_PROFILE_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}

export const updateUserReducer = (state= { user:{}}, action) => {
    switch(action.type){
        case UPDATE_USER_PROFILE_REQUEST:
            return {loading: true}
        case UPDATE_USER_PROFILE_SUCCESS:
            return {loading: false, success: true}
        case UPDATE_USER_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        case UPDATE_USER_PROFILE_RESET:
            return{
                user:{}
            }
            default:
                return state
    }

}