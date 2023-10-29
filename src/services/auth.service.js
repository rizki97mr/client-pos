import axios from "axios";
import jwt_decode from "jwt-decode";

export const login = (data, callback) => {
    axios.post('http://localhost:3000/auth/login', data)
        .then((res) => {
            callback(true, res.data.token);
        })
        .catch((error) => {
            callback(false, error)
            console.log(error)
        })
}

export const logout = (data, callback) => {
    axios.post('http://localhost:3000/auth/logout', data)
        .then((res) => {
            callback(true, res.data.token);
        })
        .catch((error) => {
            callback(false, error)
            console.log(error)
        })
}

export const getUser = (callback) => {
    axiosDriver.get("http://localhost:3000/auth/me")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}



export const getEmail = (token) => {
    const decoded = jwt_decode(token);
    // console.log(decoded)
    return decoded.email;
}