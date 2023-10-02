import axios from "axios";
import axiosDriver from "../config/axios";

export const getDetailItems = (id, callback) => {
    axiosDriver.get(`http://localhost:3000/api/products/${id}`)
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

export const getProducts = async (params) => {
    try {
        const response = await axiosDriver.get("http://localhost:3000/api/products",{params})
        return response.data
    } catch (error) {
        console.log(error)
    }
} 

export const deleteitems = (_id, callback) => {
    axiosDriver.get(`http://localhost:3000/api/products/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}



// export const deleteItems = async (id) => {
//     try {
//       await axiosDriver.delete(`http://localhost:3000/api/products/${id}`);
//       getAllitems();
//     } catch (error) {
//       console.log(error);
//     }
//   };

export const getAllTag= (callback) => {
    axiosDriver.get("http://localhost:3000/api/tag")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getAllCategory= (callback) => {
    axiosDriver.get("http://localhost:3000/api/category")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getAllAddres= (callback) => {
    axiosDriver.get("http://localhost:3000/api/delivery-addresses")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getAllOrder= (callback) => {
    axiosDriver.get("http://localhost:3000/api/orders")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

