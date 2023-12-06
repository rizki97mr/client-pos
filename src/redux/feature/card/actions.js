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

export const updateQty = (product, quantity) => {
    return (dispatch, getState) => {
        const cart = getState().cart.cart
        const itemInCart = cart.find(
            (item) => item._id === product._id
        );
        console.log(itemInCart, product, cart)
        if (itemInCart) {
            itemInCart.qty = quantity;
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


export const removeFromCart = (product) => {
    return (dispatch, getState) => {
        const cart = getState().cart.cart
        const newCart = cart.filter((item) => item._id !== product._id)
        
        axiosDriver.put("http://localhost:3000/api/carts", {
            items: newCart
        })       
    
        dispatch({
            type: ADD_TO_CART,
            cart: [...newCart]
        }) 
    }  
}