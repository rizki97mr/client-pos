// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./slices/cartSlice";

// const store = configureStore({
//     reducer: {cart: cartReducer},
// });

// console.log("oncreate store : ", store.getState());

// store.subscribe(() => {
//     console.log("STORE CHANGE: ", store.getState());  
// }); 

// export default store;

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import counterReducer from "./feature/card/reducer";
import thunk from "redux-thunk";


let rootReducers = combineReducers({
    cart: counterReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
export default store;

