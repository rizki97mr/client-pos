import { ADD_TO_CART } from "./constant"

let initialState = {
    cart: []
}

const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            // console.log("reducer", action)
            return{
                ...state,
                cart: action.cart 
            }
        default: 
            return state
    }
}

export default counterReducer;