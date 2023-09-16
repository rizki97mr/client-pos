import axios from "axios";
import axiosDriver from "../config/axios";

export const getProducts = (callback) => {
    axios.get("https://fakestoreapi.com/products")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getDetailProducts = (id, callback) => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getAllitems = (callback) => {
    axiosDriver.get("http://localhost:3000/api/products")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

// export const getAllitems = async (callback) => {
//     try {
//       const { data } = await axios.get("http://localhost:3000/api/products")
//       callback(res.data);
//     //   dispatch({type: "HIDE_LOADING"});
//       console.log(data.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
