import {ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, 
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDERS_GET_REQUEST, ORDERS_GET_SUCCESS, ORDERS_GET_FAIL, ADMIN_ORDERS_GET_REQUEST, ADMIN_ORDERS_GET_SUCCESS, ADMIN_ORDERS_GET_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET} from '../constants/orderConstants'
 
 
 
 export const orderCreateReducer = (state= {}, action) => {
     switch(action.type){
         case ORDER_CREATE_REQUEST:
             return {loading: true}
         case ORDER_CREATE_SUCCESS:
             return {loading: false, success: true, order: action.payload}
         case ORDER_CREATE_FAIL:
             return {loading: false, error: action.payload}
             default:
                 return state
     }

 }

 
 export const orderDetailsReducer = (state= { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true}
        case ORDER_DETAILS_SUCCESS:
            return {loading: false,  order: action.payload}
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}

export const updateToPaidReducer = (state= { }, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {loading: false,  success:true}
        case ORDER_PAY_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_PAY_RESET:
                return {}
            default:
                return state
    }

}

export const updateToDeliveredReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELIVER_REQUEST:
        return {
          loading: true,
        }
      case ORDER_DELIVER_SUCCESS:
        return {
          loading: false,
          success: true,
        }
      case ORDER_DELIVER_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      case ORDER_DELIVER_RESET:
        return {}
      default:
        return state
    }
  }


export const getUserOrdersReducer = (state= { orders:[] }, action) => {
    switch(action.type){
        case ORDERS_GET_REQUEST:
            return {
                loading: true
            }
        case ORDERS_GET_SUCCESS:
            return {loading: false,  orders: action.payload}
            
        case ORDERS_GET_FAIL:
            return {loading: false, error: action.payload}
       
            default:
                return state
    }

}


export const adminGetOrdersReducer = (state= { orders:[] }, action) => {
    switch(action.type){
        case ADMIN_ORDERS_GET_REQUEST:
            return {
                loading: true
            }
        case ADMIN_ORDERS_GET_SUCCESS:
            return {loading: false,  orders: action.payload}
            
        case ADMIN_ORDERS_GET_FAIL:
            return {loading: false, error: action.payload}
       
            default:
                return state
    }

}