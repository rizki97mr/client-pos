import axios from "axios";
import jwt_decode from "jwt-decode";

// export const login = (data) => {
//     axios.post('https://fakestoreapi.com/auth/login', data)
//         .then((res) => {
//             console.log(res)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }
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

// export const logins = async () => {
//     try {
//         const result = await axios.post("http://localhost:3000/auth/login", userData);
//         // alert(result.data.msg)
        
//     } catch (err) {
//         console.log(err)
//     }
// }

export const getEmail = (token) => {
    const decoded = jwt_decode(token);
    // console.log(decoded)
    return decoded.email;
}