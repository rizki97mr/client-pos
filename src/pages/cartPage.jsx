import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { useSelector } from "react-redux";
import { getAllAddres, getAllCarts, getAllitems } from '../services/product.service';
import { useLogin } from '../hooks/useLogin';
import { numberWithCommas } from '../utils/utils';
import axiosDriver from '../config/axios';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
    // const cart = useSelector((state) => state.cart.data);
    const carts = useSelector((state) => state.cart.cart);
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    

    useLogin();

    useEffect(() => {
        getAllitems((data) => {
           setProducts(data.data)
        });
        getAllAddres((data) => {
            setAddress(data.data)
        });
    }, [])

    const total = carts.reduce(
        (total, currentItem) => (total = total + currentItem.price * currentItem.qty),
        0,
      );

    // useEffect(() => {
    //     if (products.length > 0 && carts.length > 0) {
    //         const sum = carts((acc, item) => {
    //             const product = products.find((product) => product.id === item.id);
    //             return acc + product.price * item.qty;
    //         }, 0)
    //         setTotalPrice(sum);
    //         localStorage.setItem("cart", JSON.stringify(cart));
    //     }
    // }, [carts, products])
    

    const handleCheckOut = async (event) => {
        event.preventDefault();
        try {
          const response = await axiosDriver.post("http://localhost:3000/api/orders", {
            delivery_fee:10000,
            delivery_address:event.target.address.value,
        });
        navigate(`/invoice/${response.data._id}`)
          // dispatch({type: "HIDE_LOADING"});
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <DefaultLayout>
    <div className="bg-gray-100 h-screen py-8">
    <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left font-semibold">Product</th>
                                <th className="text-left font-semibold">Price</th>
                                <th className="text-left font-semibold">Quantity</th>
                                <th className="text-left font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map(cart => (
                            <tr key={cart._id}>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <img className="h-16 w-16 mr-4" src={"http://localhost:3000/images/products/"+ cart.image_url} alt={cart.image}/>
                                        <span className="font-semibold">{cart.name}</span>
                                    </div>
                                </td>
                                <td className="py-4">Rp {numberWithCommas (cart.price)}</td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        {/* <button className="border rounded-md py-2 px-4 mr-2">-</button> */}
                                        <span className="text-center w-8">{cart.qty}</span>
                                        {/* <button className="border rounded-md py-2 px-4 ml-2">+</button> */}
                                    </div>
                                </td>
                                <td className="py-4">Rp {numberWithCommas (cart.qty * cart.price)}</td>
                            </tr>
                   
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <form onSubmit={handleCheckOut} className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>{numberWithCommas (total)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>Rp 10.000</span>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">Rp {numberWithCommas (total)}</span>
                    </div>
                    <div className="w-full">
                        <select id="address" name="address" className="mr-1 my-2  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Addres
                                <option value="disabledOption" disabled>Address</option>
                                {address.map(addres => (
                                <option key={addres.nama} value={addres._id}>{addres.provinsi}, {addres.kabupaten}</option>
                                ))}
                        </select>
                    </div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                </div>
            </form>

        </div>
    </div>
</div>
    </DefaultLayout>
  )
}

export default CartPage