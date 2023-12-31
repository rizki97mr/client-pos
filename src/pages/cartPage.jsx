import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts'
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getAllAddres, getAllitems } from '../services/product.service';
import { useLogin } from '../hooks/useLogin';
import { numberWithCommas } from '../utils/utils';
import axiosDriver from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { plusQty, removeFromCart, updateQty } from '../redux/feature/card/actions';
import { message } from 'antd';


const CartPage = () => {
    const carts = useSelector((state) => state.cart.cart);
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    const handleInputQTY = async (cart, quantity) => {
        console.log(quantity)
        dispatch(updateQty(cart, quantity))
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
                                <th className="text-left font-semibold pl-10">Quantity</th>
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
                                <td className="py-4">Rp {numberWithCommas (cart.product.price)}</td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <input type="number" 
                                            defaultValue={cart.qty} 
                                            onChange={(e) => handleInputQTY(cart, e.target.value)} 
                                            min={1} 
                                            className="border rounded-md h-8 w-9 pl-3" 
                                        />
                                        <a href='#' className="font-medium text-red-600 dark:text-red-500 mx-3 my-2" 
                                           onClick={() => {
                                            dispatch(removeFromCart( cart ));
                                            message.info('item remove Sucessfully');
                                        }}
                                        >
                                        <DeleteOutlined/>
                                        </a>
                                    </div>
                                </td>
                                <td className="py-4">Rp {numberWithCommas (cart.qty * cart.product.price)}</td>
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