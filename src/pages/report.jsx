import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayouts';
import { useLogin } from '../hooks/useLogin';
import { getInvoices } from '../services/product.service';
import { numberWithCommas } from '../utils/utils';
import { Button } from 'antd';
import { PaginationMedium } from '../components/Fragments/Pagination';
import axiosDriver from '../config/axios';


const ReportPage = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [data, setData] = useState(null)
       
    useLogin();

    useEffect(() => {
        fetchData()
    }, [page])

    const fetchData = async () => {
        const data = await getInvoices({
            limit: limit,
            skip: (page-1) * limit,
        })
        console.log(data.data)
        setOrders(data.data)
        setTotalData(data.count)
    }
    
    const handlePay = async(id) => {
        try {
         await axiosDriver.put(`http://localhost:3000/api/orders/${id}`,{
            status:"delivered"
          });
          fetchData()
        } catch (error) {
            console.log(error)
        }
      }
  
return (
    <DefaultLayout>
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100 shadow-lg">
                <thead className="text-xs text-white uppercase bg-blue-800 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                                No Order
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Item
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delivery Address 
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delivery Fee
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action  
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                    <tr key={order._id} className="bg-blue-500 border-b border-blue-400">
                        <td scope="row" className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            {order.order_number}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            {order.createdAt?.substring(0,10)}
                        </td>
                        {order.order_items.map(data => ( 
                        <td key={data._id} scope="row" className="flex px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                           {data.name} <span className='text-sm text-white px-3'>{data.qty}</span> 
                        </td>
                        ))}
                        <td className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            {order.delivery_address.provinsi}, {order.delivery_address.kabupaten}, {order.delivery_address.kecamatan}, {order.delivery_address.kelurahan}, {order.delivery_address.detail}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                        Rp {numberWithCommas(order.delivery_fee)}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 dark:text-blue-100">
                            {order.status==="waiting payment" 
                            ? 
                            <Button 
                                onClick={()=>handlePay(order._id)}
                                className="block border-lime-200 bg-blue-900 text-white text-base my-3 justify-right items-right " 
                                >
                                Pay
                            </Button> 
                            : 
                            <button 
                                className={`cursor-not-allowed rounded-full border-2 px-2 py-1 text-black font-semibold text-base my-3 justify-right items-right`} 
                                >
                                Paid
                            </button>}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-50 whitespace-nowrap dark:text-blue-100">
                            <button 
                                className={`cursor-not-allowed rounded-full px-2 py-1 
                                    ${order.status==="delivered" 
                                    ? "bg-stone-200"
                                    : "bg-yellow-400"} text-black font-semibold text-base my-3 justify-right items-right`} 
                                >
                                    {order.status}
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center py-3'>
              <PaginationMedium
                  total={totalData}
                  itemsPerPage={limit}
                  currentPage={page}
                  onPageChange={setPage}
              />
            </div>  
        </div>
    </DefaultLayout>
    )
}

export default ReportPage;