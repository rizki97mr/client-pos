import axiosDriver from "../../../config/axios";
import { ADD_TO_CART } from "./constant"

export const addtocart = (product) => {
    return (dispatch, getState) => {
        const cart = getState().cart.cart
        const itemInCart = cart.find(
            (item) => item.product._id === product._id
        );
        if (itemInCart) {
            itemInCart.qty++;
        } else {
        cart.push({
            qty: 1,
            product: product
        });
        }  
        axiosDriver.put("http://localhost:3000/api/carts", {
            items: cart
        })       
    
        dispatch({
            type: ADD_TO_CART,
            cart: [...cart]
        }) 
    }  
}

export const getCart =  () => {
    return (dispatch, getState) => {
    axiosDriver.get("http://localhost:3000/api/carts")
        .then((res) => {
            console.log(res.data)
            dispatch({
                type: ADD_TO_CART,
                cart: res.data
            })
        })
        .catch((err) => {
            console.log(err);
        }) 
}
}
